from fastapi import APIRouter, HTTPException, status, Depends
from models import (
    UserCreate, UserLogin, Token, User, UserRole,
    CapitalApplicationCreate, CapitalApplication,
    ContactMessageCreate, ContactMessage,
    BusinessUnit, Product, News, FinancialReport, SHUDistribution,
    EducationalResource, Document
)
from auth import verify_password, get_password_hash, create_access_token
from dependencies import db
from datetime import datetime
from typing import List
from bson import ObjectId

router = APIRouter(prefix="/api", tags=["public"])

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# Authentication Routes
@router.post("/auth/register", response_model=User)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"username": user_data.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    existing_email = await db.users.find_one({"email": user_data.email})
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user document
    user_dict = user_data.model_dump(exclude={"password"})
    user_dict["password"] = hashed_password
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    user_dict["is_active"] = True
    
    result = await db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    
    return User(**user_dict)

@router.post("/auth/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """Login and get access token"""
    user = await db.users.find_one({"username": user_credentials.username})
    
    if not user or not verify_password(user_credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user["username"]})
    
    user["_id"] = str(user["_id"])
    user_obj = User(**user)
    
    return Token(access_token=access_token, user=user_obj)

# Business Units Routes
@router.get("/unit-usaha", response_model=List[BusinessUnit])
async def get_business_units():
    """Get all active business units"""
    units = await db.unit_usaha.find({"status": "active"}).to_list(100)
    return [BusinessUnit(**serialize_doc(unit)) for unit in units]

@router.get("/unit-usaha/{unit_id}", response_model=BusinessUnit)
async def get_business_unit(unit_id: str):
    """Get single business unit"""
    try:
        unit = await db.unit_usaha.find_one({"_id": ObjectId(unit_id)})
        if not unit:
            raise HTTPException(status_code=404, detail="Business unit not found")
        return BusinessUnit(**serialize_doc(unit))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid unit ID")

# Products Routes
@router.get("/produk", response_model=List[Product])
async def get_products():
    """Get all products"""
    products = await db.produk.find().to_list(100)
    return [Product(**serialize_doc(product)) for product in products]

@router.get("/produk/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get single product"""
    try:
        product = await db.produk.find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return Product(**serialize_doc(product))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid product ID")

# Capital Application Routes
@router.post("/permodalan/apply", response_model=CapitalApplication)
async def submit_capital_application(application: CapitalApplicationCreate):
    """Submit capital application"""
    app_dict = application.model_dump()
    app_dict["status"] = "pending"
    app_dict["submitted_at"] = datetime.utcnow()
    
    result = await db.permodalan.insert_one(app_dict)
    app_dict["_id"] = str(result.inserted_id)
    
    return CapitalApplication(**app_dict)

@router.get("/permodalan/status/{application_id}", response_model=CapitalApplication)
async def get_application_status(application_id: str):
    """Check application status"""
    try:
        app = await db.permodalan.find_one({"_id": ObjectId(application_id)})
        if not app:
            raise HTTPException(status_code=404, detail="Application not found")
        return CapitalApplication(**serialize_doc(app))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid application ID")

# News Routes
@router.get("/berita", response_model=List[News])
async def get_news():
    """Get all published news"""
    news_list = await db.berita.find({"is_published": True}).sort("published_at", -1).to_list(100)
    return [News(**serialize_doc(news)) for news in news_list]

@router.get("/berita/{news_id}", response_model=News)
async def get_news_article(news_id: str):
    """Get single news article"""
    try:
        news = await db.berita.find_one({"_id": ObjectId(news_id), "is_published": True})
        if not news:
            raise HTTPException(status_code=404, detail="News article not found")
        return News(**serialize_doc(news))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid news ID")

# Financial Reports Routes
@router.get("/transparansi/reports", response_model=List[FinancialReport])
async def get_financial_reports():
    """Get all financial reports"""
    reports = await db.transparansi.find().sort("year", -1).sort("quarter", -1).to_list(100)
    return [FinancialReport(**serialize_doc(report)) for report in reports]

@router.get("/transparansi/shu", response_model=List[SHUDistribution])
async def get_shu_distribution():
    """Get SHU distribution data"""
    shu_list = await db.shu_distribution.find().sort("year", -1).to_list(100)
    return [SHUDistribution(**serialize_doc(shu)) for shu in shu_list]

# Contact Routes
@router.post("/kontak/send", response_model=ContactMessage)
async def send_contact_message(message: ContactMessageCreate):
    """Send contact message"""
    msg_dict = message.model_dump()
    msg_dict["status"] = "new"
    msg_dict["submitted_at"] = datetime.utcnow()
    
    result = await db.kontak.insert_one(msg_dict)
    msg_dict["_id"] = str(result.inserted_id)
    
    return ContactMessage(**msg_dict)

# Educational Resources Routes
@router.get("/edukasi", response_model=List[EducationalResource])
async def get_educational_resources():
    """Get all published educational resources"""
    resources = await db.edukasi.find({"is_published": True}).to_list(100)
    return [EducationalResource(**serialize_doc(resource)) for resource in resources]

@router.get("/edukasi/{resource_id}", response_model=EducationalResource)
async def get_educational_resource(resource_id: str):
    """Get single educational resource"""
    try:
        resource = await db.edukasi.find_one({"_id": ObjectId(resource_id), "is_published": True})
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        return EducationalResource(**serialize_doc(resource))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid resource ID")

# Documents Routes
@router.get("/regulasi", response_model=List[Document])
async def get_documents():
    """Get all documents"""
    documents = await db.regulasi.find().sort("year", -1).to_list(100)
    return [Document(**serialize_doc(doc)) for doc in documents]