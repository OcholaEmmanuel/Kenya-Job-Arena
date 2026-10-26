from django.contrib.auth.decorators import user_passes_test
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS

class IsAdminUserOrReadOnly(BasePermission):
    """
    Custom permission to only allow admins to edit/create objects,
    but allow authenticated end users to read, comment, and like.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS: 
            return True
        return request.user and request.user.is_staff