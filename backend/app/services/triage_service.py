from app.models.rules import TriageRule
from app.models.doctor import Doctor


def evaluate_patient(db, vitals):

    hr = int(vitals["heart_rate"])
    oxygen = int(vitals["oxygen_level"])
    temp = float(vitals["temperature"])

    rules = db.query(TriageRule).all()

    severity = "Stable"
    ward = "General"
    reasons = []

    # --------------------------------
    # RULE ENGINE
    # --------------------------------

    for rule in rules:

        if rule.parameter == "oxygen_level" and oxygen < rule.threshold:
            severity = rule.category
            ward = rule.ward
            reasons.append(f"Oxygen below {rule.threshold}")
            break

        if rule.parameter == "heart_rate" and hr > rule.threshold:
            severity = rule.category
            ward = rule.ward
            reasons.append(f"Heart rate above {rule.threshold}")
            break

        if rule.parameter == "temperature" and temp > rule.threshold:
            severity = rule.category
            ward = rule.ward
            reasons.append(f"Temperature above {rule.threshold}")
            break


    # --------------------------------
    # SMART DOCTOR ASSIGNMENT
    # --------------------------------

    doctor = (
        db.query(Doctor)
        .filter(Doctor.ward == ward)
        .order_by(Doctor.active_patients.asc())
        .first()
    )

    doctor_name = "Not Assigned"

    if doctor:

        doctor_name = doctor.name

        # increase active patient count
        doctor.active_patients += 1
        db.commit()

    return {
        "severity": severity,
        "ward": ward,
        "doctor": doctor_name,
        "reasons": reasons
    }

