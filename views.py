from django.core.mail import send_mail
from django.http import JsonResponse
from .models import JobVacancy

NOTIFICATION_EMAIL = 'ocholaemmanuelotieno@gmail.com'

def notify_admin(action_type, job_details):
    subject = f"[KaziHub Admin Alert] Job Vacancy {action_type.upper()}"
    message = (
        f"Admin Activity Notification:\n\n"
        f"A vacancy record was {action_type}.\n\n"
        f"Details:\n"
        f"Title: {job_details.get('title', 'N/A')}\n"
        f"Company: {job_details.get('company', 'N/A')}\n"
        f"Location: {job_details.get('location', 'N/A')}\n"
        f"Salary: {job_details.get('salary', 'N/A')}\n"
    )
    send_mail(
        subject,
        message,
        'noreply@kazihub.co.ke',
        [NOTIFICATION_EMAIL],
        fail_silently=False,
    )

def add_or_update_vacancy(request):
    
    notify_admin('Added/Updated', request.POST)
    
    return JsonResponse({'status': 'success'})