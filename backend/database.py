import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://adi123:abb131705@cluster0.kugtute.mongodb.net/?retryWrites=true&w=majority')
db = client.Road
collection = db.detection
