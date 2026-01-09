from django.db import models

class Question(models.Model):
    ROUND_CHOICES = [
        (1, 'Round 1 - Beginner'),
        (2, 'Round 2 - Moderate'),
    ]
    
    DOMAIN_CHOICES = [
        ('AI/ML', 'AI/ML'),
        ('Cybersecurity', 'Cybersecurity'),
        ('Cloud', 'Cloud Computing'),
        ('Data Science', 'Data Science'),
        ('Big Data', 'Big Data'),
    ]
    
    round = models.IntegerField(choices=ROUND_CHOICES)
    domain = models.CharField(max_length=50, choices=DOMAIN_CHOICES)
    text = models.TextField()
    option_a = models.CharField(max_length=500)
    option_b = models.CharField(max_length=500)
    option_c = models.CharField(max_length=500)
    option_d = models.CharField(max_length=500)
    correct_option = models.IntegerField(help_text="0=A, 1=B, 2=C, 3=D")
    
    class Meta:
        ordering = ['round', 'id']
    
    def __str__(self):
        return f"Round {self.round} - {self.domain}: {self.text[:50]}"


class Team(models.Model):
    name = models.CharField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class QuizAttempt(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    round = models.IntegerField()
    score = models.IntegerField()
    total_questions = models.IntegerField()
    percentage = models.FloatField()
    qualified = models.BooleanField(default=False)
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-completed_at']
        unique_together = ['team', 'round']
    
    def __str__(self):
        return f"{self.team.name} - Round {self.round}: {self.score}/{self.total_questions}"


class Answer(models.Model):
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.IntegerField()
    is_correct = models.BooleanField()
    
    def __str__(self):
        return f"{self.attempt.team.name} - Q{self.question.id}"

class OTP(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    expires_at = models.DateTimeField()
    
    def __str__(self):
        return f"{self.team.email} - {self.otp_code}"
    
    def is_valid(self):
        from django.utils import timezone
        return not self.is_verified and timezone.now() < self.expires_at
