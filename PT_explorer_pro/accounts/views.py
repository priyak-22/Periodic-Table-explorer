from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str  # Django 4+
from django.core.mail import send_mail
from django.http import HttpResponse, Http404, FileResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
from pathlib import Path
import random
from datetime import timedelta
from django.utils import timezone
from .models import OTP

# -------------------------
# SIGNUP WITH EMAIL VERIFICATION
# -------------------------
def signup(request):
    context = {'error': None}
    if request.method == 'POST':
        username = request.POST.get('username')
        email    = request.POST.get('email')
        password = request.POST.get('password')

        # Check if username/email exists
        if User.objects.filter(username=username).exists():
            context['error'] = "Username already exists"
            return render(request, 'signup.html', context)
        if User.objects.filter(email=email).exists():
            context['error'] = "Email already registered"
            return render(request, 'signup.html', context)

        # Create inactive user
        user = User.objects.create_user(username=username, email=email, password=password, is_active=False)

        # Generate activation token and uid
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Build activation link
        activate_link = f"{request.scheme}://{request.get_host()}/account/activate/{uid}/{token}/"

        # For development: print activation link in console
        print(f"Activation link for {email}: {activate_link}")

        # Optional: send real email if SMTP is configured
        # send_mail(
        #     'Verify your email',
        #     f'Click this link to verify your account:\n{activate_link}',
        #     settings.DEFAULT_FROM_EMAIL,
        #     [email],
        #     fail_silently=False
        # )

        return redirect('login')

    return render(request, 'signup.html', context)

# -------------------------
# ACTIVATE ACCOUNT LINK
# -------------------------
def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError, OverflowError):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse("Account activated! You can now login.")
    return HttpResponse("Invalid or expired activation link.")

# -------------------------
# LOGIN BY EMAIL
# -------------------------
def login_view(request):
    context = {}
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None and user.is_active:
            auth_login(request, user)
            return redirect('home')
        else:
            context['error'] = "Invalid credentials or account not verified."
    return render(request, 'login.html', context)

# -------------------------
# LOGOUT
# -------------------------
def logout_view(request):
    auth_logout(request)
    return redirect('home')

# -------------------------
# OPTIONAL OTP (AFTER LOGIN)
# -------------------------
@login_required(login_url='login')
def send_otp(request):
    if request.method == 'POST':
        code = str(random.randint(100000, 999999))
        OTP.objects.create(user=request.user, code=code)

        # For dev: print OTP in console
        print(f"OTP for {request.user.email}: {code}")

        # Optional: send via email
        # send_mail(
        #     'Your OTP Code',
        #     f'Your OTP is {code}. It expires in 5 minutes.',
        #     settings.DEFAULT_FROM_EMAIL,
        #     [request.user.email],
        #     fail_silently=False
        # )

        return HttpResponse("OTP sent to your email/console.")
    return render(request, 'verify_otp.html')

@login_required(login_url='login')
def verify_otp(request):
    if request.method == 'POST':
        code = request.POST.get('otp')
        otp_obj = OTP.objects.filter(user=request.user, code=code).last()
        if otp_obj and otp_obj.created_at > timezone.now() - timedelta(minutes=5):
            return HttpResponse("OTP verified successfully!")
        return HttpResponse("Invalid or expired OTP.")
    return render(request, 'verify_otp.html')

# -------------------------
# MAIN PAGES
# -------------------------
def table_structure(request): return render(request, 'table_structure.html')
def blocks(request): return render(request, 'blocks.html')
def ec_shells(request): return render(request, 'ec-shells.html')
def pd(request): return render(request, 'pd.html')
def timeline(request): return render(request, 'timeline.html')
def ec(request): return render(request, 'ec.html')
def mindmap(request): return render(request, 'mindmap.html')

# -------------------------
# PROTECTED MINDMAP IMAGES
# -------------------------
@login_required(login_url='login')
def protected_mindmap(request, filename):
    file_path = Path(settings.BASE_DIR) / "protected_media/mindmaps" / filename
    if file_path.exists():
        return FileResponse(open(file_path, 'rb'))
    else:
        raise Http404("File not found")
