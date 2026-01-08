from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, TeamViewSet, QuizViewSet, AuthViewSet

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'quiz', QuizViewSet, basename='quiz')
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
