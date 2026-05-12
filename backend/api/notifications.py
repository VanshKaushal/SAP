from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.models.workflow import Notification as NotificationModel
from backend.schemas.workflow import Notification
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Notification])
def get_notifications(db: Session = Depends(get_db)):
    notifications = db.query(NotificationModel).order_by(NotificationModel.timestamp.desc()).limit(50).all()
    return notifications
