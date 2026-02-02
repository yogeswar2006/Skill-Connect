from rest_framework import serializers
from .models import Messages

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source="sender_id.username", read_only=True)
    receiver = serializers.CharField(source="receiver_id.username", read_only=True)
    message_type_display = serializers.CharField(source="get_message_type_display", read_only=True)

    class Meta: 
        model = Messages
        fields = [
            "id",
            "sender",
            "receiver",
            "content",
            "message_type",
            "message_type_display",
            "is_read",
            "sent_at",
        ]
