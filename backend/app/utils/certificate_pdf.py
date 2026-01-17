from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from datetime import datetime
import os

def generate_certificate_pdf(
    certificate_id: int,
    user_name: str,
    course_name: str
) -> str:
    os.makedirs("certificates", exist_ok=True)

    file_path = f"certificates/certificate_{certificate_id}.pdf"

    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(width / 2, height - 150, "CERTIFICATE OF COMPLETION")

    c.setFont("Helvetica", 16)
    c.drawCentredString(
        width / 2,
        height - 250,
        f"This certifies that"
    )

    c.setFont("Helvetica-Bold", 20)
    c.drawCentredString(
        width / 2,
        height - 290,
        user_name
    )

    c.setFont("Helvetica", 16)
    c.drawCentredString(
        width / 2,
        height - 340,
        f"has successfully completed the course"
    )

    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(
        width / 2,
        height - 380,
        course_name
    )

    c.setFont("Helvetica", 12)
    c.drawCentredString(
        width / 2,
        height - 450,
        f"Issue Date: {datetime.utcnow().date()}"
    )

    c.showPage()
    c.save()

    return file_path
