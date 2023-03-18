from django.urls import include, path
from rest_framework import routers

from . import views

# CRUD API
urlpatterns = [
    # App API
    path('view/', views.ViewInspection.as_view()),
    path('create/', views.Inspection.as_view()),
    path('delete/<slug:id>/', views.Inspection.as_view()),
    path('register/', views.RegisterInspection.as_view()),
]