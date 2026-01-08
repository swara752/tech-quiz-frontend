from rest_framework import serializers
from .models import Question, Team, QuizAttempt, Answer


class QuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()
    
    class Meta:
        model = Question
        fields = ['id', 'round', 'domain', 'text', 'options']
    
    def get_options(self, obj):
        return [obj.option_a, obj.option_b, obj.option_c, obj.option_d]


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'email']


class AnswerSubmissionSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    selected_option = serializers.IntegerField(min_value=0, max_value=3)


class RoundSubmissionSerializer(serializers.Serializer):
    team_id = serializers.IntegerField()
    round = serializers.IntegerField(min_value=1, max_value=3)
    answers = AnswerSubmissionSerializer(many=True)


class QuizAttemptSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    
    class Meta:
        model = QuizAttempt
        fields = ['id', 'team_name', 'round', 'score', 'total_questions', 'percentage', 'qualified', 'completed_at']
