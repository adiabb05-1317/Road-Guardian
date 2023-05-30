from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from model import auth
from passlib.hash import bcrypt
from bson import ObjectId
from database import db, collection
from jose import jwt

from datetime import datetime, timedelta
import io
import json
from PIL import Image
import torch


app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://roadsafetyguardian.netlify.app",
    "http://localhost:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def home():
    return {"message": "hello world"}


@app.post('/signup')
async def signup_user(user: auth):
    hashed_password = bcrypt.hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    existing_user = await collection.find_one({"username": user_dict["username"]})
    if existing_user:
        raise HTTPException(status_code=400, detail="username already exists")
    user_id = await collection.insert_one(user_dict)
    user_dict["_id"] = str(user_id.inserted_id)
    return user_dict


@app.post('/login')
async def login_user(user: auth):
    existing_user = await collection.find_one({"username": user.username})
    if not existing_user or not bcrypt.verify(user.password.encode('utf-8'), existing_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = jwt.encode(
        {"sub": str(existing_user["_id"]), "exp": datetime.utcnow() + timedelta(minutes=30)},
        "secret",
        algorithm="HS256",
    )
    return {"access_token": access_token, "token_type": "bearer"}


model = torch.hub.load("ultralytics/yolov5", "custom", path="./static/best.pt", source="local", force_reload=True)


@app.post("/objectdetection/")
async def objectdetection(file: UploadFile = File(...)):
    contents = await file.read()  # read the contents of the UploadFile object
    input_image = Image.open(io.BytesIO(contents)).convert("RGB")
    results = model(input_image)
    results_json = json.loads(results.pandas().xyxy[0].to_json(orient="records"))
    return {"result": results_json}
