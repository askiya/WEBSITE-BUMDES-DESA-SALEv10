from fastapi import APIRouter, HTTPException, status, Depends
from models import (
    User, DashboardStats,
    BusinessUnitCreate, BusinessUnit,
    ProductCreate, Product,
    CapitalApplication, CapitalApplicationUpdate, ApplicationStatus,
    NewsCreate, News,
    FinancialReportCreate, FinancialReport,
    SHUDistributionCreate, SHUDistribution,
    ContactMessage, ContactMessageReply, MessageStatus,
    EducationalResourceCreate, EducationalResource,
    DocumentCreate, Document
)
from dependencies import get_current_admin, db
from datetime import datetime
from typing import List
from bson import ObjectId

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Helper function
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# Dashboard Routes
@router.get("/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats(current_user: User = Depends(get_current_admin)):
    """Get dashboard statistics"""
    # Count active business units
    active_units = await db.unit_usaha.count_documents({"status": "active"})
    
    # Count total products
    total_products = await db.produk.count_documents({})
    
    # Count pending applications
    pending_applications = await db.permodalan.count_documents({"status": "pending"})
    
    # Count published news
    published_news = await db.berita.count_documents({"is_published": True})
    
    # Count new contact messages
    contact_messages = await db.kontak.count_documents({"status": "new"})
    
    # Calculate total revenue from latest financial report
    latest_report = await db.transparansi.find_one(sort=[("year", -1), ("quarter", -1)])
    total_revenue = f"Rp {latest_report.get('income', 0) / 1000000:.1f} Miliar" if latest_report else "Rp 0"
    
    return DashboardStats(
        total_revenue=total_revenue,
        active_units=active_units,
        partners=45,  # Static for now
        citizens_served=850,  # Static for now
        pending_applications=pending_applications,
        total_products=total_products,
        published_news=published_news,
        contact_messages=contact_messages
    )

# Business Units Management
@router.post("/unit-usaha", response_model=BusinessUnit)
async def create_business_unit(unit: BusinessUnitCreate, current_user: User = Depends(get_current_admin)):
    """Create new business unit"""
    unit_dict = unit.model_dump()
    unit_dict["created_at"] = datetime.utcnow()
    unit_dict["updated_at"] = datetime.utcnow()
    
    result = await db.unit_usaha.insert_one(unit_dict)
    unit_dict["_id"] = str(result.inserted_id)
    
    return BusinessUnit(**unit_dict)

@router.put("/unit-usaha/{unit_id}", response_model=BusinessUnit)
async def update_business_unit(unit_id: str, unit: BusinessUnitCreate, current_user: User = Depends(get_current_admin)):
    """Update business unit"""
    try:
        unit_dict = unit.model_dump()
        unit_dict["updated_at"] = datetime.utcnow()
        
        result = await db.unit_usaha.update_one(
            {"_id": ObjectId(unit_id)},
            {"$set": unit_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Business unit not found")
        
        updated_unit = await db.unit_usaha.find_one({"_id": ObjectId(unit_id)})
        return BusinessUnit(**serialize_doc(updated_unit))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/unit-usaha/{unit_id}")
async def delete_business_unit(unit_id: str, current_user: User = Depends(get_current_admin)):
    """Delete business unit"""
    try:
        result = await db.unit_usaha.delete_one({"_id": ObjectId(unit_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Business unit not found")
        return {"message": "Business unit deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Products Management
@router.post("/produk", response_model=Product)
async def create_product(product: ProductCreate, current_user: User = Depends(get_current_admin)):
    """Create new product"""
    product_dict = product.model_dump()
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    
    result = await db.produk.insert_one(product_dict)
    product_dict["_id"] = str(result.inserted_id)
    
    return Product(**product_dict)

@router.put("/produk/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductCreate, current_user: User = Depends(get_current_admin)):
    """Update product"""
    try:
        product_dict = product.model_dump()
        product_dict["updated_at"] = datetime.utcnow()
        
        result = await db.produk.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": product_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        updated_product = await db.produk.find_one({"_id": ObjectId(product_id)})
        return Product(**serialize_doc(updated_product))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/produk/{product_id}")
async def delete_product(product_id: str, current_user: User = Depends(get_current_admin)):
    """Delete product"""
    try:
        result = await db.produk.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Capital Applications Management
@router.get("/permodalan", response_model=List[CapitalApplication])
async def get_all_applications(current_user: User = Depends(get_current_admin)):
    """Get all capital applications"""
    applications = await db.permodalan.find().sort("submitted_at", -1).to_list(1000)
    return [CapitalApplication(**serialize_doc(app)) for app in applications]

@router.get("/permodalan/{application_id}", response_model=CapitalApplication)
async def get_application(application_id: str, current_user: User = Depends(get_current_admin)):
    """Get single application"""
    try:
        app = await db.permodalan.find_one({"_id": ObjectId(application_id)})
        if not app:
            raise HTTPException(status_code=404, detail="Application not found")
        return CapitalApplication(**serialize_doc(app))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/permodalan/{application_id}/approve", response_model=CapitalApplication)
async def approve_application(application_id: str, update: CapitalApplicationUpdate, current_user: User = Depends(get_current_admin)):
    """Approve or reject application"""
    try:
        update_dict = update.model_dump()
        update_dict["reviewed_at"] = datetime.utcnow()
        update_dict["reviewed_by"] = current_user.id
        
        result = await db.permodalan.update_one(
            {"_id": ObjectId(application_id)},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Application not found")
        
        updated_app = await db.permodalan.find_one({"_id": ObjectId(application_id)})
        return CapitalApplication(**serialize_doc(updated_app))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# News Management
@router.get("/berita/all", response_model=List[News])
async def get_all_news(current_user: User = Depends(get_current_admin)):
    """Get all news (including unpublished)"""
    news_list = await db.berita.find().sort("published_at", -1).to_list(1000)
    return [News(**serialize_doc(news)) for news in news_list]

@router.post("/berita", response_model=News)
async def create_news(news: NewsCreate, current_user: User = Depends(get_current_admin)):
    """Create new news article"""
    news_dict = news.model_dump()
    news_dict["author"] = current_user.id
    news_dict["published_at"] = datetime.utcnow()
    news_dict["created_at"] = datetime.utcnow()
    news_dict["updated_at"] = datetime.utcnow()
    
    result = await db.berita.insert_one(news_dict)
    news_dict["_id"] = str(result.inserted_id)
    
    return News(**news_dict)

@router.put("/berita/{news_id}", response_model=News)
async def update_news(news_id: str, news: NewsCreate, current_user: User = Depends(get_current_admin)):
    """Update news article"""
    try:
        news_dict = news.model_dump()
        news_dict["updated_at"] = datetime.utcnow()
        
        result = await db.berita.update_one(
            {"_id": ObjectId(news_id)},
            {"$set": news_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
        
        updated_news = await db.berita.find_one({"_id": ObjectId(news_id)})
        return News(**serialize_doc(updated_news))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/berita/{news_id}")
async def delete_news(news_id: str, current_user: User = Depends(get_current_admin)):
    """Delete news article"""
    try:
        result = await db.berita.delete_one({"_id": ObjectId(news_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="News article not found")
        return {"message": "News article deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Financial Reports Management
@router.post("/transparansi/reports", response_model=FinancialReport)
async def create_financial_report(report: FinancialReportCreate, current_user: User = Depends(get_current_admin)):
    """Create financial report"""
    report_dict = report.model_dump()
    report_dict["created_at"] = datetime.utcnow()
    report_dict["updated_at"] = datetime.utcnow()
    
    result = await db.transparansi.insert_one(report_dict)
    report_dict["_id"] = str(result.inserted_id)
    
    return FinancialReport(**report_dict)

@router.put("/transparansi/reports/{report_id}", response_model=FinancialReport)
async def update_financial_report(report_id: str, report: FinancialReportCreate, current_user: User = Depends(get_current_admin)):
    """Update financial report"""
    try:
        report_dict = report.model_dump()
        report_dict["updated_at"] = datetime.utcnow()
        
        result = await db.transparansi.update_one(
            {"_id": ObjectId(report_id)},
            {"$set": report_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Report not found")
        
        updated_report = await db.transparansi.find_one({"_id": ObjectId(report_id)})
        return FinancialReport(**serialize_doc(updated_report))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/transparansi/shu", response_model=SHUDistribution)
async def create_shu_distribution(shu: SHUDistributionCreate, current_user: User = Depends(get_current_admin)):
    """Create SHU distribution"""
    shu_dict = shu.model_dump()
    shu_dict["created_at"] = datetime.utcnow()
    shu_dict["updated_at"] = datetime.utcnow()
    
    result = await db.shu_distribution.insert_one(shu_dict)
    shu_dict["_id"] = str(result.inserted_id)
    
    return SHUDistribution(**shu_dict)

# Contact Messages Management
@router.get("/kontak", response_model=List[ContactMessage])
async def get_all_messages(current_user: User = Depends(get_current_admin)):
    """Get all contact messages"""
    messages = await db.kontak.find().sort("submitted_at", -1).to_list(1000)
    return [ContactMessage(**serialize_doc(msg)) for msg in messages]

@router.put("/kontak/{message_id}/reply", response_model=ContactMessage)
async def reply_to_message(message_id: str, reply: ContactMessageReply, current_user: User = Depends(get_current_admin)):
    """Reply to contact message"""
    try:
        update_dict = {
            "reply_message": reply.reply_message,
            "replied_at": datetime.utcnow(),
            "status": MessageStatus.REPLIED
        }
        
        result = await db.kontak.update_one(
            {"_id": ObjectId(message_id)},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        updated_msg = await db.kontak.find_one({"_id": ObjectId(message_id)})
        return ContactMessage(**serialize_doc(updated_msg))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/kontak/{message_id}/archive")
async def archive_message(message_id: str, current_user: User = Depends(get_current_admin)):
    """Archive contact message"""
    try:
        result = await db.kontak.update_one(
            {"_id": ObjectId(message_id)},
            {"$set": {"status": MessageStatus.ARCHIVED}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        
        return {"message": "Message archived successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Educational Resources Management
@router.get("/edukasi/all", response_model=List[EducationalResource])
async def get_all_resources(current_user: User = Depends(get_current_admin)):
    """Get all educational resources"""
    resources = await db.edukasi.find().to_list(1000)
    return [EducationalResource(**serialize_doc(resource)) for resource in resources]

@router.post("/edukasi", response_model=EducationalResource)
async def create_educational_resource(resource: EducationalResourceCreate, current_user: User = Depends(get_current_admin)):
    """Create educational resource"""
    resource_dict = resource.model_dump()
    resource_dict["created_at"] = datetime.utcnow()
    resource_dict["updated_at"] = datetime.utcnow()
    
    result = await db.edukasi.insert_one(resource_dict)
    resource_dict["_id"] = str(result.inserted_id)
    
    return EducationalResource(**resource_dict)

@router.put("/edukasi/{resource_id}", response_model=EducationalResource)
async def update_educational_resource(resource_id: str, resource: EducationalResourceCreate, current_user: User = Depends(get_current_admin)):
    """Update educational resource"""
    try:
        resource_dict = resource.model_dump()
        resource_dict["updated_at"] = datetime.utcnow()
        
        result = await db.edukasi.update_one(
            {"_id": ObjectId(resource_id)},
            {"$set": resource_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        updated_resource = await db.edukasi.find_one({"_id": ObjectId(resource_id)})
        return EducationalResource(**serialize_doc(updated_resource))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/edukasi/{resource_id}")
async def delete_educational_resource(resource_id: str, current_user: User = Depends(get_current_admin)):
    """Delete educational resource"""
    try:
        result = await db.edukasi.delete_one({"_id": ObjectId(resource_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Resource not found")
        return {"message": "Resource deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Documents Management
@router.post("/regulasi", response_model=Document)
async def create_document(document: DocumentCreate, current_user: User = Depends(get_current_admin)):
    """Create document"""
    doc_dict = document.model_dump()
    doc_dict["created_at"] = datetime.utcnow()
    doc_dict["updated_at"] = datetime.utcnow()
    
    result = await db.regulasi.insert_one(doc_dict)
    doc_dict["_id"] = str(result.inserted_id)
    
    return Document(**doc_dict)

@router.put("/regulasi/{document_id}", response_model=Document)
async def update_document(document_id: str, document: DocumentCreate, current_user: User = Depends(get_current_admin)):
    """Update document"""
    try:
        doc_dict = document.model_dump()
        doc_dict["updated_at"] = datetime.utcnow()
        
        result = await db.regulasi.update_one(
            {"_id": ObjectId(document_id)},
            {"$set": doc_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Document not found")
        
        updated_doc = await db.regulasi.find_one({"_id": ObjectId(document_id)})
        return Document(**serialize_doc(updated_doc))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/regulasi/{document_id}")
async def delete_document(document_id: str, current_user: User = Depends(get_current_admin)):
    """Delete document"""
    try:
        result = await db.regulasi.delete_one({"_id": ObjectId(document_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Document not found")
        return {"message": "Document deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
