from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import Question, Team, QuizAttempt, Answer
from .serializers import (
    QuestionSerializer, TeamSerializer, 
    RoundSubmissionSerializer, QuizAttemptSerializer
)


class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    
    @action(detail=False, methods=['get'])
    def by_round(self, request):
        round_num = request.query_params.get('round', 1)
        questions = Question.objects.filter(round=round_num)
        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class QuizViewSet(viewsets.ViewSet):
    
    @action(detail=False, methods=['post'])
    def submit_round(self, request):
        serializer = RoundSubmissionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        team_id = data['team_id']
        round_num = data['round']
        answers_data = data['answers']
        
        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        
        round_questions = Question.objects.filter(round=round_num)
        total_questions = round_questions.count()
        
        if total_questions == 0:
            return Response({'error': 'No questions found for this round'}, status=status.HTTP_400_BAD_REQUEST)
        
        correct_count = 0
        
        with transaction.atomic():
            attempt = QuizAttempt.objects.create(
                team=team,
                round=round_num,
                score=0,
                total_questions=total_questions,
                percentage=0,
                qualified=False
            )
            
            for answer_data in answers_data:
                try:
                    question = Question.objects.get(id=answer_data['question_id'])
                    selected = answer_data['selected_option']
                    is_correct = (selected == question.correct_option)
                    
                    if is_correct:
                        correct_count += 1
                    
                    Answer.objects.create(
                        attempt=attempt,
                        question=question,
                        selected_option=selected,
                        is_correct=is_correct
                    )
                except Question.DoesNotExist:
                    continue
            
            percentage = (correct_count / total_questions) * 100
            
            pass_percentages = {1: 50, 2: 60}
            qualified = percentage >= pass_percentages.get(round_num, 0)
            
            attempt.score = correct_count
            attempt.percentage = percentage
            attempt.qualified = qualified
            attempt.save()
        
        return Response({
            'score': correct_count,
            'total': total_questions,
            'percentage': percentage,
            'qualified': qualified,
            'next_round': round_num + 1 if qualified and round_num < 2 else None
        })
    
    @action(detail=False, methods=['get'])
    def leaderboard(self, request):
        round_num = request.query_params.get('round')
        
        if round_num:
            attempts = QuizAttempt.objects.filter(round=round_num).order_by('-score', 'completed_at')
        else:
            attempts = QuizAttempt.objects.filter(round=2).order_by('-score', 'completed_at')
        
        serializer = QuizAttemptSerializer(attempts, many=True)
        return Response(serializer.data)

class AuthViewSet(viewsets.ViewSet):
    
    @action(detail=False, methods=['post'])
    def send_otp(self, request):
        import random
        from django.utils import timezone
        from datetime import timedelta
        from .models import OTP
        
        email = request.data.get('email')
        name = request.data.get('name', email)  # Use email as default name if not provided
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        team, created = Team.objects.get_or_create(
            email=email,
            defaults={'name': name}
        )
        
        otp_code = str(random.randint(1000, 9999))  # 4-digit OTP
        expires_at = timezone.now() + timedelta(minutes=10)
        
        OTP.objects.filter(team=team, is_verified=False).delete()
        
        otp = OTP.objects.create(
            team=team,
            otp_code=otp_code,
            expires_at=expires_at
        )
        
        print(f"OTP for {email}: {otp_code}")
        
        return Response({
            'message': 'OTP sent successfully',
            'otp': otp_code  # In production, don't return OTP in response
        })
    
    @action(detail=False, methods=['post'])
    def verify_otp(self, request):
        from django.utils import timezone
        from .models import OTP
        
        email = request.data.get('email')
        otp_code = request.data.get('otp')
        
        if not email or not otp_code:
            return Response({'error': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            team = Team.objects.get(email=email)
            otp = OTP.objects.filter(
                team=team,
                otp_code=otp_code,
                is_verified=False
            ).latest('created_at')
            
            if not otp.is_valid():
                return Response({'error': 'OTP expired or invalid'}, status=status.HTTP_400_BAD_REQUEST)
            
            otp.is_verified = True
            otp.save()
            
            return Response({
                'message': 'OTP verified successfully',
                'team_id': team.id,
                'team_name': team.name
            })
            
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        except OTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
