from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List, Dict
import datetime

from database import SessionLocal
from models import DBChat, DBChatMessage, DBUser
from schemas import Chat, ChatMessage
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/v1/chats", tags=["chat"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, chat_id: str):
        await websocket.accept()
        if chat_id not in self.active_connections:
            self.active_connections[chat_id] = []
        self.active_connections[chat_id].append(websocket)

    def disconnect(self, websocket: WebSocket, chat_id: str):
        if chat_id in self.active_connections:
            self.active_connections[chat_id].remove(websocket)

    async def broadcast(self, message: str, chat_id: str):
        if chat_id in self.active_connections:
            for connection in self.active_connections[chat_id]:
                await connection.send_text(message)

manager = ConnectionManager()

@router.get("", response_model=List[Chat])
def get_chats(db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBChat).all()

@router.get("/{chat_id}/messages", response_model=List[ChatMessage])
def get_messages(chat_id: str, db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)):
    return db.query(DBChatMessage).filter(DBChatMessage.chat_id == chat_id).order_by(DBChatMessage.timestamp.asc()).all()

@router.websocket("/ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: str, db: Session = Depends(get_db)):
    await manager.connect(websocket, chat_id)
    try:
        while True:
            data = await websocket.receive_text()
            # In a real app, you'd extract sender_id from a token passed during connection
            # For simplicity, we just save the message and broadcast
            message = DBChatMessage(
                chat_id=chat_id,
                sender_id="1", # Hardcoded admin for demo
                text=data
            )
            db.add(message)
            db.commit()
            await manager.broadcast(data, chat_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket, chat_id)
