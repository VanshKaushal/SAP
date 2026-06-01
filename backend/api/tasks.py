from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models.database import get_db
from backend.models.workflow import Task as TaskModel
from backend.schemas.workflow import Task
from typing import List

router = APIRouter()


@router.get("/", response_model=List[Task])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(TaskModel).all()
    return tasks


@router.get("/workflow/{workflow_id}", response_model=List[Task])
def get_workflow_tasks(workflow_id: str, db: Session = Depends(get_db)):
    tasks = db.query(TaskModel).filter(
        TaskModel.workflow_id == workflow_id).all()
    return tasks
