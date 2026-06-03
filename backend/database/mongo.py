from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)

db = client["health_prediction_db"]

patients = db["patients"]