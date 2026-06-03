from flask import Blueprint, request, jsonify
from database.mongo import patients
from bson import ObjectId
from services.ai_service import generate_health_remark

patient_bp = Blueprint("patient_bp", __name__)

@patient_bp.route("/test")
def test():
    data = list(patients.find())

    for d in data:
        d["_id"] = str(d["_id"])

    return data

# CREATE

@patient_bp.route("/patients", methods=["POST"])
def create_patient():

    print("Route Hit")

    data = request.json

    print("Before Gemini")

    remark = generate_health_remark(
        data["glucose"],
        data["haemoglobin"],
        data["cholesterol"]
    )

    print("After Gemini")
    print(remark)

    patient = {
        "full_name": data["full_name"],
        "dob": data["dob"],
        "email": data["email"],
        "glucose": float(data["glucose"]),
        "haemoglobin": float(data["haemoglobin"]),
        "cholesterol": float(data["cholesterol"]),
        "remarks": remark
    }

    result = patients.insert_one(patient)

    return jsonify({
        "message": "Patient Added",
        "remarks": remark,
        "id": str(result.inserted_id)
    })

   
# READ 

@patient_bp.route("/patients", methods=["GET"])
def get_patients():

    result = []

    for patient in patients.find():
        patient["_id"] = str(patient["_id"])
        result.append(patient)

    return jsonify(result)


# UPDATE

@patient_bp.route("/patients/<id>", methods=["PUT"])
def update_patient(id):

    data = request.json

    remark = generate_health_remark(
        data["glucose"],
        data["haemoglobin"],
        data["cholesterol"]
    )

    patients.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "full_name": data["full_name"],
                "dob": data["dob"],
                "email": data["email"],
                "glucose": float(data["glucose"]),
                "haemoglobin": float(data["haemoglobin"]),
                "cholesterol": float(data["cholesterol"]),
                "remarks": remark
            }
        }
    )

    return jsonify({
        "message": "Patient Updated"
    })


# DELETE

@patient_bp.route("/patients/<id>", methods=["DELETE"])
def delete_patient(id):

    patients.delete_one({"_id":ObjectId(id)})

    return jsonify({"message":"Deleted Successfully"})