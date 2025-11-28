from django.shortcuts import render

# Create your views here.


from rest_framework import viewsets, permissions
from django.db.models import Q
from .models import Messages
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Messages.objects.all()

    def get_queryset(self):
        user = self.request.user
        receiver_id = self.request.query_params.get("receiver_id")

        if receiver_id:
            # Only messages between logged-in user and receiver
            return Messages.objects.filter(
                Q(sender_id=user, receiver_id_id=receiver_id)
                | Q(sender_id_id=receiver_id, receiver_id=user)
            ).order_by("sent_at")

        # Otherwise return all messages sent/received by this user
        return Messages.objects.filter(
            Q(sender_id=user) | Q(receiver_id=user)
        ).order_by("sent_at")

    def perform_create(self, serializer):
        # Automatically set sender as logged-in user
        serializer.save(sender_id=self.request.user)
