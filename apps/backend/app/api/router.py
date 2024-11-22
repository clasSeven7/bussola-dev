from rest_framework import routers
from app.api import viewsets

user_router = routers.DefaultRouter()
user_router.register(r'users', viewsets.UserViewSet)

project_router = routers.DefaultRouter()
project_router.register(r'projects', viewsets.ProjectViewSet)

portfolio_router = routers.DefaultRouter()
portfolio_router.register(r'portfolios', viewsets.PortfolioViewSet)

recommendation_router = routers.DefaultRouter()
recommendation_router.register(
    r'recommendations', viewsets.RecommendationViewSet)

assessment_router = routers.DefaultRouter()
assessment_router.register(r'assessment', viewsets.AssessmentViewSet)

router = user_router.urls + project_router.urls + portfolio_router.urls + \
    recommendation_router.urls + assessment_router.urls
