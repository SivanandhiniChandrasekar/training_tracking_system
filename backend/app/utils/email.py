from datetime import datetime
import smtplib
from email.message import EmailMessage
from pathlib import Path

# 🔐 Gmail SMTP (recommended)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# ⚠️ USE ENV VARIABLES IN REAL PROJECT
SENDER_EMAIL = "urgentmails111@gmail.com"
SENDER_PASSWORD = "jyvoejllqqfncrse"

def _send_email(msg: EmailMessage):
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        
def send_certificate_email(
    to_email: str,
    user_name: str,
    course_name: str,
    pdf_path: str
):
    msg = EmailMessage()
    msg["Subject"] = "🎓 Your Course Certificate"
    msg["From"] = SENDER_EMAIL
    msg["To"] = to_email

    msg.set_content(
        f"""
Hello {user_name},

Congratulations! 🎉

You have successfully completed the course:
➡ {course_name}

Your certificate is attached to this email.

Best regards,
CERITRACK Team
"""
    )

    # 📎 Attach PDF
    pdf_file = Path(pdf_path)
    with open(pdf_file, "rb") as f:
        msg.add_attachment(
            f.read(),
            maintype="application",
            subtype="pdf",
            filename=pdf_file.name
        )
    
    _send_email(msg)

# -------------------------------------------------
# 2️⃣ CERTIFICATE EXPIRY REMINDER
# -------------------------------------------------
def send_certificate_expiry_reminder(
    to_email: str,
    user_name: str,
    course_name: str,
    expiry_date: datetime
):
    msg = EmailMessage()
    msg["Subject"] = "⏰ Certificate Expiry Reminder"
    msg["From"] = SENDER_EMAIL
    msg["To"] = to_email

    msg.set_content(
        f"""
Hello {user_name},

This is a reminder that your certificate for the course
➡ {course_name}

will expire on:
📅 {expiry_date.strftime('%d %B %Y')}

Please renew or re-enroll if required.

Best regards,
CERITRACK Team
"""
    )

    _send_email(msg)


# -------------------------------------------------
# 3️⃣ CERTIFICATE EXPIRED EMAIL
# -------------------------------------------------
def send_certificate_expired_email(
    to_email: str,
    user_name: str,
    course_name: str
):
    msg = EmailMessage()
    msg["Subject"] = "❌ Certificate Expired"
    msg["From"] = SENDER_EMAIL
    msg["To"] = to_email

    msg.set_content(
        f"""
Hello {user_name},

Your certificate for the course
➡ {course_name}

has expired.

To obtain a new certificate, please re-enroll and complete the course again.

Best regards,
CERITRACK Team
"""
    )

    _send_email(msg)