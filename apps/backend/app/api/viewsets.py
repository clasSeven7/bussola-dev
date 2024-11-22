from rest_framework import viewsets, permissions
from app import models
from app.api import serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = models.Portfolio.objects.all()
    serializer_class = serializers.PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]


class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = models.Recommendation.objects.all()
    serializer_class = serializers.RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = models.Assessment.objects.all()
    serializer_class = serializers.AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]
