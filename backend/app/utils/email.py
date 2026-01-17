import smtplib
from email.message import EmailMessage
from pathlib import Path

# 🔐 Gmail SMTP (recommended)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# ⚠️ USE ENV VARIABLES IN REAL PROJECT
SENDER_EMAIL = "urgentmails111@gmail.com"
SENDER_PASSWORD = "jyvoejllqqfncrse"


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

    # 📤 Send email
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
