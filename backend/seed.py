"""
Seed script to populate database with initial data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from auth import get_password_hash
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_database():
    print("Starting database seeding...")
    
    # Clear existing data (optional - comment out if you want to keep existing data)
    # await db.users.delete_many({})
    # await db.unit_usaha.delete_many({})
    # await db.produk.delete_many({})
    # await db.transparansi.delete_many({})
    # await db.shu_distribution.delete_many({})
    # await db.berita.delete_many({})
    
    # Create admin user
    existing_admin = await db.users.find_one({"username": "admin"})
    if not existing_admin:
        admin_user = {
            "username": "admin",
            "email": "admin@bumdesdesasale.id",
            "password": get_password_hash("admin123"),  # Change this in production!
            "full_name": "Administrator",
            "phone": "+62 812-3456-7890",
            "role": "admin",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        }
        await db.users.insert_one(admin_user)
        print("✅ Admin user created (username: admin, password: admin123)")
    else:
        print("⚠️  Admin user already exists")
    
    # Seed Business Units
    units_count = await db.unit_usaha.count_documents({})
    if units_count == 0:
        business_units = [
            {
                "name": {"id": "Toko Serba Ada Desa", "en": "Village General Store"},
                "category": "Retail",
                "description": {"id": "Menyediakan kebutuhan sehari-hari warga dengan harga terjangkau", "en": "Providing daily necessities for residents at affordable prices"},
                "revenue": "Rp 450 Juta",
                "contact": "+62 812-1111-1111",
                "team_size": 8,
                "status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Simpan Pinjam Desa", "en": "Village Savings and Loans"},
                "category": "Keuangan",
                "description": {"id": "Layanan simpan pinjam untuk modal usaha warga", "en": "Savings and loan services for villagers' business capital"},
                "revenue": "Rp 650 Juta",
                "contact": "+62 812-2222-2222",
                "team_size": 5,
                "status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Pengelolaan Sampah", "en": "Waste Management"},
                "category": "Lingkungan",
                "description": {"id": "Bank sampah dan daur ulang untuk desa bersih", "en": "Waste bank and recycling for a clean village"},
                "revenue": "Rp 180 Juta",
                "contact": "+62 812-3333-3333",
                "team_size": 12,
                "status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Wisata Desa", "en": "Village Tourism"},
                "category": "Pariwisata",
                "description": {"id": "Paket wisata alam dan budaya Desa Sale", "en": "Nature and culture tourism packages of Sale Village"},
                "revenue": "Rp 320 Juta",
                "contact": "+62 812-4444-4444",
                "team_size": 10,
                "status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Produk Pertanian", "en": "Agricultural Products"},
                "category": "Agribisnis",
                "description": {"id": "Pemasaran hasil pertanian lokal", "en": "Marketing of local agricultural products"},
                "revenue": "Rp 520 Juta",
                "contact": "+62 812-5555-5555",
                "team_size": 15,
                "status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Kerajinan Tangan", "en": "Handicrafts"},
                "category": "UMKM",
                "description": {"id": "Produksi dan pemasaran kerajinan khas desa", "en": "Production and marketing of village handicrafts"},
                "revenue": "Rp 280 Juta",
                "contact": "+62 812-6666-6666",
                "team_size": 18,
                "status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.unit_usaha.insert_many(business_units)
        print(f"✅ Inserted {len(business_units)} business units")
    else:
        print(f"⚠️  {units_count} business units already exist")
    
    # Seed Products
    products_count = await db.produk.count_documents({})
    if products_count == 0:
        products = [
            {
                "name": {"id": "Beras Organik Sale", "en": "Sale Organic Rice"},
                "category": "Pertanian",
                "price": "Rp 15.000/kg",
                "description": {"id": "Beras organik berkualitas tinggi dari sawah Desa Sale", "en": "High-quality organic rice from Sale Village rice fields"},
                "stock_status": "Tersedia",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Madu Hutan Lokal", "en": "Local Forest Honey"},
                "category": "Pertanian",
                "price": "Rp 85.000/botol",
                "description": {"id": "Madu murni dari hutan sekitar desa", "en": "Pure honey from forests around the village"},
                "stock_status": "Tersedia",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Keripik Singkong", "en": "Cassava Chips"},
                "category": "UMKM",
                "price": "Rp 20.000/pack",
                "description": {"id": "Keripik singkong renyah dengan berbagai rasa", "en": "Crispy cassava chips with various flavors"},
                "stock_status": "Tersedia",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Tas Anyaman Bambu", "en": "Bamboo Woven Bag"},
                "category": "Kerajinan",
                "price": "Rp 75.000",
                "description": {"id": "Tas ramah lingkungan dari anyaman bambu", "en": "Eco-friendly bag made from woven bamboo"},
                "stock_status": "Tersedia",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Kopi Robusta Sale", "en": "Sale Robusta Coffee"},
                "category": "Pertanian",
                "price": "Rp 45.000/pack",
                "description": {"id": "Kopi robusta pilihan dari kebun kopi Desa Sale", "en": "Selected robusta coffee from Sale Village coffee plantations"},
                "stock_status": "Tersedia",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": {"id": "Batik Tulis Sale", "en": "Sale Hand-drawn Batik"},
                "category": "Kerajinan",
                "price": "Rp 350.000",
                "description": {"id": "Batik tulis motif khas Desa Sale", "en": "Hand-drawn batik with Sale Village unique patterns"},
                "stock_status": "Pre-order",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.produk.insert_many(products)
        print(f"✅ Inserted {len(products)} products")
    else:
        print(f"⚠️  {products_count} products already exist")
    
    # Seed Financial Reports
    reports_count = await db.transparansi.count_documents({})
    if reports_count == 0:
        financial_reports = [
            {
                "period": "Q1 2025",
                "quarter": 1,
                "year": 2025,
                "income": 625000000,
                "expense": 380000000,
                "profit": 245000000,
                "audit_status": "audited",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "period": "Q4 2024",
                "quarter": 4,
                "year": 2024,
                "income": 580000000,
                "expense": 350000000,
                "profit": 230000000,
                "audit_status": "audited",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "period": "Q3 2024",
                "quarter": 3,
                "year": 2024,
                "income": 550000000,
                "expense": 340000000,
                "profit": 210000000,
                "audit_status": "audited",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.transparansi.insert_many(financial_reports)
        print(f"✅ Inserted {len(financial_reports)} financial reports")
    else:
        print(f"⚠️  {reports_count} financial reports already exist")
    
    # Seed SHU Distribution
    shu_count = await db.shu_distribution.count_documents({})
    if shu_count == 0:
        shu_distributions = [
            {
                "year": 2024,
                "total_amount": 850000000,
                "member_count": 320,
                "per_member": 2656250,
                "distribution_date": datetime(2025, 1, 15),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "year": 2023,
                "total_amount": 720000000,
                "member_count": 280,
                "per_member": 2571429,
                "distribution_date": datetime(2024, 1, 15),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.shu_distribution.insert_many(shu_distributions)
        print(f"✅ Inserted {len(shu_distributions)} SHU distributions")
    else:
        print(f"⚠️  {shu_count} SHU distributions already exist")
    
    # Get admin user ID for news
    admin_user = await db.users.find_one({"username": "admin"})
    admin_id = str(admin_user["_id"]) if admin_user else "unknown"
    
    # Seed News
    news_count = await db.berita.count_documents({})
    if news_count == 0:
        news_articles = [
            {
                "title": {"id": "Pelatihan Kewirausahaan untuk UMKM Desa Sale", "en": "Entrepreneurship Training for Sale Village SMEs"},
                "excerpt": {"id": "BUMDes Desa Sale mengadakan pelatihan kewirausahaan untuk 50 pelaku UMKM lokal.", "en": "BUMDes Desa Sale holds entrepreneurship training for 50 local SME actors."},
                "content": {"id": "Pada tanggal 15 Mei 2025, BUMDes Desa Sale berhasil menyelenggarakan program pelatihan kewirausahaan yang diikuti oleh 50 pelaku UMKM lokal. Pelatihan ini bertujuan untuk meningkatkan kapasitas wirausaha di Desa Sale.", "en": "On May 15, 2025, BUMDes Desa Sale successfully held an entrepreneurship training program attended by 50 local SME actors. This training aims to increase entrepreneurial capacity in Sale Village."},
                "category": "Pelatihan",
                "author": admin_id,
                "published_at": datetime.utcnow(),
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {"id": "Launching Produk Beras Organik Premium", "en": "Premium Organic Rice Product Launch"},
                "excerpt": {"id": "Produk unggulan baru dari unit usaha pertanian BUMDes Desa Sale.", "en": "New featured product from BUMDes Desa Sale agricultural business unit."},
                "content": {"id": "BUMDes Desa Sale meluncurkan produk beras organik premium yang diproduksi langsung oleh petani lokal. Produk ini telah mendapat sertifikasi organik dan siap dipasarkan ke berbagai daerah.", "en": "BUMDes Desa Sale launches premium organic rice products produced directly by local farmers. This product has received organic certification and is ready to be marketed to various regions."},
                "category": "Produk",
                "author": admin_id,
                "published_at": datetime.utcnow(),
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {"id": "BUMDes Sale Raih Penghargaan Transparansi Terbaik", "en": "BUMDes Sale Receives Best Transparency Award"},
                "excerpt": {"id": "Penghargaan dari Kementerian Desa untuk kategori transparansi dan akuntabilitas.", "en": "Award from the Ministry of Villages for transparency and accountability category."},
                "content": {"id": "BUMDes Desa Sale berhasil meraih penghargaan Transparansi Terbaik dari Kementerian Desa, PDTT. Penghargaan ini diberikan atas komitmen BUMDes dalam menerapkan prinsip transparansi dan akuntabilitas dalam pengelolaan keuangan.", "en": "BUMDes Desa Sale successfully won the Best Transparency Award from the Ministry of Villages, PDTT. This award was given for BUMDes' commitment to implementing principles of transparency and accountability in financial management."},
                "category": "Penghargaan",
                "author": admin_id,
                "published_at": datetime.utcnow(),
                "is_published": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.berita.insert_many(news_articles)
        print(f"✅ Inserted {len(news_articles)} news articles")
    else:
        print(f"⚠️  {news_count} news articles already exist")
    
    print("\n✅ Database seeding completed successfully!")
    print("\n📝 Admin credentials:")
    print("   Username: admin")
    print("   Password: admin123")
    print("   ⚠️  Please change the password in production!\n")

if __name__ == "__main__":
    asyncio.run(seed_database())
    client.close()
