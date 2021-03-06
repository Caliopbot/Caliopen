# -*- coding: utf-8 -*-

import logging
import json
from datetime import datetime
import pytz
import hashlib

import zope.interface

from caliopen_main.common.interfaces import (IMessageParser, IParticipantParser)

log = logging.getLogger(__name__)


class TwitterDM(object):
    """
    Twitter direct message structure
    """

    zope.interface.implements(IMessageParser)

    recipient_headers = ['From', 'To']
    message_protocol = 'twitter'
    warnings = []
    body_html = ""
    body_plain = ""

    def __init__(self, raw_data):
        self.raw = raw_data
        self.dm = json.loads(self.raw)
        self.recipient_name = self.dm["message_create"]["target"][
            "recipient_screen_name"]
        self.sender_name = self.dm["message_create"]["sender_screen_name"]
        self.protocol = self.message_protocol
        self.is_unread = True  # TODO: handle DM sent by user
        #                                     if broker keeps them when fetching
        self.is_draft = False
        self.is_answered = False
        self.is_received = True  # TODO: handle DM sent by user
        #                                     if broker keeps them when fetching
        self.importance_level = 0
        self.get_bodies()

    def get_bodies(self):
        self.body_plain = self.dm["message_create"]["message_data"]["text"]

    @property
    def subject(self):
        """
        tweets don't have subject
        should we return an excerpt ?
        """
        return ''

    @property
    def size(self):
        """Get json tweet object size in bytes."""
        return len(self.dm.as_string())

    @property
    def date(self):
        return datetime.fromtimestamp(float(self.dm["created_timestamp"])/1000,
                                      tz=pytz.utc)

    @property
    def participants(self):
        "one sender only for now"
        return [TwitterParticipant("To", self.recipient_name),
                TwitterParticipant("From", self.sender_name)]

    @property
    def external_references(self):
        return {'message_id': self.dm["id"]}

    @property
    def attachments(self):
        """TODO"""
        return []

    @property
    def extra_parameters(self):
        """TODO"""
        return {}


class TwitterParticipant(object):
    """
    Twitter sender and recipient parser
    """

    zope.interface.implements(IParticipantParser)

    def __init__(self, type, screen_name):
        """Parse a twitter address and create a participant."""
        self.type = type
        self.address = screen_name
        self.label = screen_name
