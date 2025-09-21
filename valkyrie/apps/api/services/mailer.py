"""Mail delivery helpers (console backend by default)."""
from __future__ import annotations

import logging

from ..config import get_settings

logger = logging.getLogger(__name__)


class Mailer:
    def __init__(self) -> None:
        self.settings = get_settings()

    def send_magic_link(self, to_email: str, link: str) -> None:
        if self.settings.mail_backend == "console":
            logger.info("Magic link for %s: %s", to_email, link)
        else:  # pragma: no cover
            logger.info("Pretending to send email to %s via %s", to_email, self.settings.mail_backend)


_mailer = Mailer()


def get_mailer() -> Mailer:
    return _mailer
