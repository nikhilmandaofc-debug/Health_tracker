
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.resource import Resource
from app.models.ai_models import  (
    deepseek_r1,
    gpt4o,
    gpt4o_mini,
    deepseek_v3,
    llama_33,
    embeddings_model
)


def generate_hospital_insights(db):

    patients = db.query(Patient).all()
    doctors = db.query(Doctor).all()
    resources = db.query(Resource).all()

    patient_summary = []

    for p in patients:

        patient_summary.append(
            f"{p.name} severity={p.severity} oxygen={p.oxygen_level}"
        )

    doctor_summary = []

    for d in doctors:

        doctor_summary.append(
            f"{d.name} ward={d.ward} load={d.active_patients}"
        )

    resource_summary = []

    for r in resources:

        usage = (r.used / r.total) * 100 if r.total else 0

        resource_summary.append(
            f"{r.name}: {usage:.0f}% used"
        )

    prompt = f"""

You are an AI hospital operations assistant.

Analyze the hospital status and generate alerts.

Patients:
{patient_summary}

Doctors:
{doctor_summary}

Resources:
{resource_summary}

Return 3-5 operational insights for hospital administrators.

Focus on:
- ICU capacity
- oxygen usage
- overloaded doctors
- patient risk patterns

Keep insights short bullet points.

"""

    response = deepseek_v3.invoke(prompt)

    return response.content