from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, List
from backend.config.settings import settings

# This is a mock implementation that simulates enterprise auth
# In a real production system, this would integrate with Supabase or an IDP

SECRET_KEY = "SUPER_SECRET_SAP_KEY"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserAuth:
    def __init__(self, id: str, email: str, role: str, department: str):
        self.id = id
        self.email = email
        self.role = role
        self.department = department

def get_current_user(token: str = Depends(oauth2_scheme)) -> UserAuth:
    # Simulating token validation
    if token == "mock-admin-token":
        return UserAuth(id="1", email="admin@sap.com", role="Admin", department="Executive")
    elif token == "mock-manager-token":
        return UserAuth(id="2", email="manager@sap.com", role="Workflow Manager", department="Operations")
    
    # In reality, decode JWT and check database
    try:
        # payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # email: str = payload.get("sub")
        # if email is None: raise credentials_exception
        pass
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return UserAuth(id="3", email="user@sap.com", role="Finance Reviewer", department="Finance")

def check_role(required_roles: List[str]):
    def role_checker(current_user: UserAuth = Depends(get_current_user)):
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted for this role"
            )
        return current_user
    return role_checker
