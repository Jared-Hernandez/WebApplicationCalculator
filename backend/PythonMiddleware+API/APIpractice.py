from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# create fastAPI app instance
app = FastAPI()

#Define a simple Get endpoint
@app.get("/")
def read_root():
    return {"Hello": "World"}

#in memory database:
items = []

#pydantic model for item data:
class Item(BaseModel):
    name: "HereWe"
    descr: "GoAgain"

#create an item
@app.post("/items",response_model= Item)
async def create_item(item = Item):
    items.append(item)
    return item

@app.get("/hello")
def read_root():
    return {"message": "I am here"}