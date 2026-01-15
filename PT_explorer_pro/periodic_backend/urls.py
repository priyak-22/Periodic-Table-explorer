from django.contrib import admin
from django.urls import path, include
from accounts import views  # only for homepage / other main pages

urlpatterns = [
    path('admin/', admin.site.urls),

    # Main pages
    path('', views.table_structure, name='home'),
    path('table_structure/', views.table_structure, name='table_structure'),
    path('blocks/', views.blocks, name='blocks'),
    path('ec-shells/', views.ec_shells, name='ec_shells'),
    path('pd/', views.pd, name='pd'),
    path('timeline/', views.timeline, name='timeline'),
    path('ec/', views.ec, name='ec'),
    path('mindmap/', views.mindmap, name='mindmap'),

    # Account-related pages
    path('account/', include('accounts.urls')),  # login/signup/logout routes
]
