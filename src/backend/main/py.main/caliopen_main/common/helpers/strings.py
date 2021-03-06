# -*- coding: utf-8 -*-
"""helpers to work with strings"""
from __future__ import absolute_import, unicode_literals
import re

import logging

log = logging.getLogger(__name__)


def unicode_truncate(s, length):
    """"Truncate string after `length` bytes less trailing unicode char."""
    if isinstance(s, str):
        s = s.decode("utf8", 'ignore')

    partial = s[:length]
    return re.sub("([\xf6-\xf7][\x80-\xbf]{0,2}|[\xe0-\xef][\x80-\xbf]{0,1}"
                  "|[\xc0-\xdf])$", "", partial)


def to_utf8(input, charset):
    """Convert input string to utf-8 return input string if it fails.

    :param input: string
    :param charset: string
    :return: utf-8 string
    """
    if charset is not None:
        try:
            return input.decode(charset, "replace"). \
                encode("utf-8", "replace")
        except Exception as exc:
            log.info("decoding <{}> string to utf-8 failed "
                     "with error : {}".format(input, exc))
            return input
    else:
        try:
            return input.decode("us-ascii", "replace"). \
                encode("utf-8", "replace")
        except Exception as exc:
            log.info("decoding <{}> string to utf-8 failed "
                     "with error : {}".format(input, exc))
            return input
