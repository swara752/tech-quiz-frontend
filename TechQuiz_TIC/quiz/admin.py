from django.contrib import admin
from .models import Question, Team, QuizAttempt, Answer, OTP


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'round', 'domain', 'text_preview']
    list_filter = ['round', 'domain']
    search_fields = ['text']
    
    def text_preview(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    text_preview.short_description = 'Question'


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at']
    search_fields = ['name', 'email']


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ['team', 'round', 'score', 'total_questions', 'percentage', 'qualified', 'completed_at']
    list_filter = ['round', 'qualified']
    search_fields = ['team__name']


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'selected_option', 'is_correct']
    list_filter = ['is_correct']


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ['team', 'otp_code', 'created_at', 'expires_at', 'is_verified']
    list_filter = ['is_verified']
    search_fields = ['team__email']
