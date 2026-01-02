"""
URL configuration for periodic_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from accounts import views

urlpatterns = [
    path('', views.table_structure, name='home'),
    path('admin/', admin.site.urls),
    path('table_structure/', views.table_structure, name='table_structure'),
    path('atomic_shell/', views.atomic_shell, name='atomic_shell'),
    path('blocks/', views.blocks, name='blocks'),
    path('ec- shells/', views.ec_shells, name='ec_shells'),
    path('login/', views.login, name='login'),
    path('mindmap/', views.mindmap, name='mindmap'),
    path('pd/', views.pd, name='pd'),
    path('quizes/', views.quizes, name='quizes'),
    path('timeline/', views.timeline, name='timeline'),
    path('ec/', views.ec, name='ec'),
    
]