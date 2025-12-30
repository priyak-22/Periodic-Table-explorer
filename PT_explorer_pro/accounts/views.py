from django.shortcuts import render

# Create your views here.
def table_structure(request):
    return render(request, 'table_structure.html')

def atomic_shell(request):
    return render(request, 'atomic_shell.html')
 
def blocks(request):
    return render(request, 'blocks.html')

def ec_shells(request):
    return render(request, 'ec_shells.html')

def login(request):
    return render(request, 'login.html')

def mindmap(request):
    return render(request, 'mindmap.html')

def pd(request):
    return render(request, 'pd.html')

def quizes(request):
    return render(request, 'quizes.html')

def timeline(request):
    return render(request, 'timeline.html')