# BUMDes Desa Sale - Backend & Admin Contracts

## 1. Database Models (MongoDB Collections)

### 1.1 Users Collection
```javascript
{
  _id: ObjectId,
  username: string,
  email: string,
  password: string (hashed with bcrypt),
  full_name: string,
  phone: string,
  role: enum ['admin', 'operator', 'user'],
  created_at: datetime,
  updated_at: datetime,
  is_active: boolean
}
```

### 1.2 Business Units Collection (unit_usaha)
```javascript
{
  _id: ObjectId,
  name: { id: string, en: string },
  category: string,
  description: { id: string, en: string },
  revenue: string,
  contact: string,
  team_size: number,
  created_at: datetime,
  updated_at: datetime,
  status: enum ['active', 'inactive']
}
```

### 1.3 Products Collection (produk)
```javascript
{
  _id: ObjectId,
  name: { id: string, en: string },
  category: string,
  price: string,
  description: { id: string, en: string },
  stock_status: enum ['Tersedia', 'Pre-order', 'Habis'],
  image_url: string (optional),
  created_at: datetime,
  updated_at: datetime
}
```

### 1.4 Capital Applications Collection (permodalan)
```javascript
{
  _id: ObjectId,
  applicant_name: string,
  phone: string,
  email: string (optional),
  business_type: string,
  loan_amount: string,
  purpose: string,
  status: enum ['pending', 'approved', 'rejected'],
  submitted_at: datetime,
  reviewed_at: datetime (optional),
  reviewed_by: ObjectId (ref: users),
  admin_notes: string (optional)
}
```

### 1.5 News Collection (berita)
```javascript
{
  _id: ObjectId,
  title: { id: string, en: string },
  excerpt: { id: string, en: string },
  content: { id: string, en: string },
  category: string,
  image_url: string (optional),
  author: ObjectId (ref: users),
  published_at: datetime,
  created_at: datetime,
  updated_at: datetime,
  is_published: boolean
}
```

### 1.6 Financial Reports Collection (transparansi)
```javascript
{
  _id: ObjectId,
  period: string (e.g., "Q1 2025"),
  quarter: number,
  year: number,
  income: number,
  expense: number,
  profit: number,
  audit_status: enum ['pending', 'audited'],
  pdf_url: string (optional),
  created_at: datetime,
  updated_at: datetime
}
```

### 1.7 SHU Distribution Collection
```javascript
{
  _id: ObjectId,
  year: number,
  total_amount: number,
  member_count: number,
  per_member: number,
  distribution_date: datetime,
  created_at: datetime,
  updated_at: datetime
}
```

### 1.8 Contact Messages Collection (kontak)
```javascript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  status: enum ['new', 'replied', 'archived'],
  replied_at: datetime (optional),
  reply_message: string (optional),
  submitted_at: datetime
}
```

### 1.9 Educational Resources Collection (edukasi)
```javascript
{
  _id: ObjectId,
  title: { id: string, en: string },
  description: { id: string, en: string },
  content: { id: string, en: string },
  type: enum ['article', 'video', 'guide', 'training'],
  resource_url: string (optional),
  created_at: datetime,
  updated_at: datetime,
  is_published: boolean
}
```

### 1.10 Documents Collection (regulasi)
```javascript
{
  _id: ObjectId,
  title: { id: string, en: string },
  description: { id: string, en: string },
  year: number,
  file_url: string,
  file_size: string,
  category: string,
  created_at: datetime,
  updated_at: datetime
}
```

## 2. API Endpoints

### 2.1 Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login (returns JWT token)
- POST `/api/auth/logout` - Logout
- GET `/api/auth/me` - Get current user info
- POST `/api/auth/refresh` - Refresh token

### 2.2 Admin Dashboard
- GET `/api/admin/dashboard/stats` - Get overview statistics
- GET `/api/admin/dashboard/revenue-chart` - Revenue data for charts
- GET `/api/admin/dashboard/recent-activities` - Recent activities

### 2.3 Business Units
- GET `/api/unit-usaha` - Get all business units (public)
- GET `/api/unit-usaha/:id` - Get single business unit
- POST `/api/admin/unit-usaha` - Create new unit (admin only)
- PUT `/api/admin/unit-usaha/:id` - Update unit (admin only)
- DELETE `/api/admin/unit-usaha/:id` - Delete unit (admin only)

### 2.4 Products
- GET `/api/produk` - Get all products (public)
- GET `/api/produk/:id` - Get single product
- POST `/api/admin/produk` - Create product (admin only)
- PUT `/api/admin/produk/:id` - Update product (admin only)
- DELETE `/api/admin/produk/:id` - Delete product (admin only)

### 2.5 Capital Applications
- POST `/api/permodalan/apply` - Submit application (public)
- GET `/api/permodalan/status/:id` - Check application status (public)
- GET `/api/admin/permodalan` - Get all applications (admin only)
- GET `/api/admin/permodalan/:id` - Get single application (admin only)
- PUT `/api/admin/permodalan/:id/approve` - Approve application (admin only)
- PUT `/api/admin/permodalan/:id/reject` - Reject application (admin only)

### 2.6 News
- GET `/api/berita` - Get all published news (public)
- GET `/api/berita/:id` - Get single news article (public)
- POST `/api/admin/berita` - Create news (admin only)
- PUT `/api/admin/berita/:id` - Update news (admin only)
- DELETE `/api/admin/berita/:id` - Delete news (admin only)

### 2.7 Financial Reports
- GET `/api/transparansi/reports` - Get all financial reports (public)
- GET `/api/transparansi/shu` - Get SHU distribution data (public)
- POST `/api/admin/transparansi/reports` - Create financial report (admin only)
- PUT `/api/admin/transparansi/reports/:id` - Update report (admin only)
- POST `/api/admin/transparansi/shu` - Create SHU distribution (admin only)

### 2.8 Contact Messages
- POST `/api/kontak/send` - Send message (public)
- GET `/api/admin/kontak` - Get all messages (admin only)
- PUT `/api/admin/kontak/:id/reply` - Reply to message (admin only)
- PUT `/api/admin/kontak/:id/archive` - Archive message (admin only)

### 2.9 Educational Resources
- GET `/api/edukasi` - Get all published resources (public)
- GET `/api/edukasi/:id` - Get single resource (public)
- POST `/api/admin/edukasi` - Create resource (admin only)
- PUT `/api/admin/edukasi/:id` - Update resource (admin only)
- DELETE `/api/admin/edukasi/:id` - Delete resource (admin only)

### 2.10 Documents
- GET `/api/regulasi` - Get all documents (public)
- POST `/api/admin/regulasi` - Upload document (admin only)
- PUT `/api/admin/regulasi/:id` - Update document (admin only)
- DELETE `/api/admin/regulasi/:id` - Delete document (admin only)

## 3. Frontend Integration Changes

### 3.1 Replace Mock Data
- Remove all imports from `mock.js`
- Replace with API calls using axios
- Add loading states and error handling

### 3.2 Pages to Update
1. **Home.jsx** - Fetch highlights from `/api/admin/dashboard/stats`
2. **Profil.jsx** - Fetch from static content or CMS
3. **UnitUsaha.jsx** - Fetch from `/api/unit-usaha`
4. **Produk.jsx** - Fetch from `/api/produk`
5. **Permodalan.jsx** - Submit form to `/api/permodalan/apply`
6. **Transparansi.jsx** - Fetch from `/api/transparansi/*`
7. **Berita.jsx** - Fetch from `/api/berita`
8. **Kontak.jsx** - Submit to `/api/kontak/send`
9. **Edukasi.jsx** - Fetch from `/api/edukasi`
10. **Regulasi.jsx** - Fetch from `/api/regulasi`

## 4. Admin Dashboard Structure

### 4.1 Admin Routes
- `/admin/login` - Login page
- `/admin/dashboard` - Overview with stats and charts
- `/admin/unit-usaha` - Manage business units
- `/admin/produk` - Manage products
- `/admin/permodalan` - Review loan applications
- `/admin/berita` - Manage news
- `/admin/transparansi` - Manage financial reports
- `/admin/kontak` - View and reply to messages
- `/admin/edukasi` - Manage educational resources
- `/admin/regulasi` - Manage documents
- `/admin/users` - Manage users (super admin only)
- `/admin/profile` - Admin profile settings

### 4.2 Admin Components
- AdminLayout.jsx - Main layout with sidebar
- AdminNavbar.jsx - Top navigation
- AdminSidebar.jsx - Left sidebar with menu
- Dashboard.jsx - Overview page
- DataTable.jsx - Reusable table component
- StatsCard.jsx - Metric card component
- Chart components - Revenue, SHU charts

## 5. Security Implementation

### 5.1 Authentication
- Use JWT tokens with 24-hour expiry
- Store token in httpOnly cookie
- Implement refresh token mechanism
- Password hashing with bcrypt (12 rounds)

### 5.2 Authorization
- Role-based middleware for protected routes
- Admin-only routes for CRUD operations
- User can only view their own applications

### 5.3 Input Validation
- Use Pydantic models for request validation
- Sanitize all user inputs
- File upload restrictions (type, size)

## 6. Implementation Order

1. **Backend Database Models** (server.py)
2. **Authentication System** (auth routes)
3. **Public API Endpoints** (for frontend consumption)
4. **Admin API Endpoints** (protected routes)
5. **Admin Dashboard UI** (React components)
6. **Frontend Integration** (replace mock data)
7. **Testing** (backend and frontend)

## 7. Notes

- All bilingual content should be stored with `{ id: string, en: string }` structure
- Use MongoDB's `motor` async driver for all database operations
- Implement pagination for list endpoints (limit=10, skip=0)
- Add search and filter capabilities where needed
- All datetime fields should be stored in UTC
- File uploads will use local storage initially (can be migrated to S3 later)
