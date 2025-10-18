from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    OPERATOR = "operator"
    USER = "user"

class StockStatus(str, Enum):
    AVAILABLE = "Tersedia"
    PREORDER = "Pre-order"
    OUT_OF_STOCK = "Habis"

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class AuditStatus(str, Enum):
    PENDING = "pending"
    AUDITED = "audited"

class MessageStatus(str, Enum):
    NEW = "new"
    REPLIED = "replied"
    ARCHIVED = "archived"

class ResourceType(str, Enum):
    ARTICLE = "article"
    VIDEO = "video"
    GUIDE = "guide"
    TRAINING = "training"

class BilingualText(BaseModel):
    id: str
    en: str

# User Models
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    phone: str
    role: UserRole = UserRole.USER

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime
    is_active: bool = True

    class Config:
        populate_by_name = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

# Business Unit Models
class BusinessUnitBase(BaseModel):
    name: BilingualText
    category: str
    description: BilingualText
    revenue: str
    contact: Optional[str] = None
    team_size: Optional[int] = 0
    status: str = "active"

class BusinessUnitCreate(BusinessUnitBase):
    pass

class BusinessUnit(BusinessUnitBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Product Models
class ProductBase(BaseModel):
    name: BilingualText
    category: str
    price: str
    description: Optional[BilingualText] = None
    stock_status: StockStatus = StockStatus.AVAILABLE
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Capital Application Models
class CapitalApplicationBase(BaseModel):
    applicant_name: str
    phone: str
    email: Optional[EmailStr] = None
    business_type: str
    loan_amount: str
    purpose: str

class CapitalApplicationCreate(CapitalApplicationBase):
    pass

class CapitalApplicationUpdate(BaseModel):
    status: ApplicationStatus
    admin_notes: Optional[str] = None

class CapitalApplication(CapitalApplicationBase):
    id: str = Field(alias="_id")
    status: ApplicationStatus = ApplicationStatus.PENDING
    submitted_at: datetime
    reviewed_at: Optional[datetime] = None
    reviewed_by: Optional[str] = None
    admin_notes: Optional[str] = None

    class Config:
        populate_by_name = True

# News Models
class NewsBase(BaseModel):
    title: BilingualText
    excerpt: BilingualText
    content: BilingualText
    category: str
    image_url: Optional[str] = None
    is_published: bool = True

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: str = Field(alias="_id")
    author: str
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Financial Report Models
class FinancialReportBase(BaseModel):
    period: str
    quarter: int
    year: int
    income: float
    expense: float
    profit: float
    audit_status: AuditStatus = AuditStatus.PENDING
    pdf_url: Optional[str] = None

class FinancialReportCreate(FinancialReportBase):
    pass

class FinancialReport(FinancialReportBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# SHU Distribution Models
class SHUDistributionBase(BaseModel):
    year: int
    total_amount: float
    member_count: int
    per_member: float
    distribution_date: datetime

class SHUDistributionCreate(SHUDistributionBase):
    pass

class SHUDistribution(SHUDistributionBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Contact Message Models
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageReply(BaseModel):
    reply_message: str

class ContactMessage(ContactMessageBase):
    id: str = Field(alias="_id")
    status: MessageStatus = MessageStatus.NEW
    replied_at: Optional[datetime] = None
    reply_message: Optional[str] = None
    submitted_at: datetime

    class Config:
        populate_by_name = True

# Educational Resource Models
class EducationalResourceBase(BaseModel):
    title: BilingualText
    description: BilingualText
    content: BilingualText
    type: ResourceType
    resource_url: Optional[str] = None
    is_published: bool = True

class EducationalResourceCreate(EducationalResourceBase):
    pass

class EducationalResource(EducationalResourceBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Document Models
class DocumentBase(BaseModel):
    title: BilingualText
    description: BilingualText
    year: int
    file_url: str
    file_size: str
    category: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Dashboard Stats Model
class DashboardStats(BaseModel):
    total_revenue: str
    active_units: int
    partners: int
    citizens_served: int
    pending_applications: int
    total_products: int
    published_news: int
    contact_messages: int