// Mock data for BUMDes Desa Sale website

export const siteContent = {
  id: {
    siteName: 'BUMDes Desa Sale',
    tagline: 'Transformasi Digital Desa untuk Kesejahteraan Bersama',
    hero: {
      title: 'Membangun Desa Sale yang Mandiri dan Sejahtera',
      subtitle: 'BUMDes Desa Sale hadir sebagai penggerak ekonomi desa melalui transparansi, inovasi, dan pemberdayaan masyarakat',
      cta1: 'Lihat Laporan Transparansi',
      cta2: 'Ajukan Modal Usaha'
    },
    highlights: [
      { label: 'Pendapatan Tahunan', value: 'Rp 2.5 Miliar', icon: 'TrendingUp' },
      { label: 'Unit Usaha Aktif', value: '12 Unit', icon: 'Building2' },
      { label: 'Mitra Kerjasama', value: '45 Mitra', icon: 'Handshake' },
      { label: 'Warga Terlayani', value: '850+ Warga', icon: 'Users' }
    ],
    quickLinks: [
      { title: 'Laporan Keuangan', desc: 'Transparansi penuh laporan keuangan BUMDes', icon: 'FileText', link: '/transparansi' },
      { title: 'Produk Lokal', desc: 'Belanja produk unggulan Desa Sale', icon: 'ShoppingBag', link: '/produk' },
      { title: 'Modal Usaha', desc: 'Ajukan permodalan untuk usaha Anda', icon: 'DollarSign', link: '/permodalan' },
      { title: 'Hubungi Kami', desc: 'Ada pertanyaan? Kami siap membantu', icon: 'MessageCircle', link: '/kontak' }
    ],
    navigation: [
      { name: 'Beranda', path: '/' },
      { name: 'Profil', path: '/profil' },
      { name: 'Unit Usaha', path: '/unit-usaha' },
      { name: 'Produk & Layanan', path: '/produk' },
      { name: 'Permodalan Warga', path: '/permodalan' },
      { name: 'Transparansi', path: '/transparansi' },
      { name: 'Berita', path: '/berita' },
      { name: 'Kontak', path: '/kontak' }
    ]
  },
  en: {
    siteName: 'BUMDes Desa Sale',
    tagline: 'Digital Village Transformation for Shared Prosperity',
    hero: {
      title: 'Building Independent and Prosperous Sale Village',
      subtitle: 'BUMDes Desa Sale drives village economy through transparency, innovation, and community empowerment',
      cta1: 'View Transparency Reports',
      cta2: 'Apply for Business Capital'
    },
    highlights: [
      { label: 'Annual Revenue', value: 'IDR 2.5 Billion', icon: 'TrendingUp' },
      { label: 'Active Business Units', value: '12 Units', icon: 'Building2' },
      { label: 'Partners', value: '45 Partners', icon: 'Handshake' },
      { label: 'People Served', value: '850+ Citizens', icon: 'Users' }
    ],
    quickLinks: [
      { title: 'Financial Reports', desc: 'Full transparency of BUMDes financial reports', icon: 'FileText', link: '/transparansi' },
      { title: 'Local Products', desc: 'Shop Sale Village featured products', icon: 'ShoppingBag', link: '/produk' },
      { title: 'Business Capital', desc: 'Apply for business funding', icon: 'DollarSign', link: '/permodalan' },
      { title: 'Contact Us', desc: 'Have questions? We are here to help', icon: 'MessageCircle', link: '/kontak' }
    ],
    navigation: [
      { name: 'Home', path: '/' },
      { name: 'Profile', path: '/profil' },
      { name: 'Business Units', path: '/unit-usaha' },
      { name: 'Products & Services', path: '/produk' },
      { name: 'Community Capital', path: '/permodalan' },
      { name: 'Transparency', path: '/transparansi' },
      { name: 'News', path: '/berita' },
      { name: 'Contact', path: '/kontak' }
    ]
  }
};

export const profileData = {
  id: {
    history: 'BUMDes Desa Sale didirikan pada tahun 2018 dengan tujuan meningkatkan perekonomian desa dan kesejahteraan masyarakat. Melalui pengelolaan aset desa yang profesional dan transparan, BUMDes Desa Sale telah menjadi motor penggerak ekonomi lokal.',
    vision: 'Menjadi BUMDes terdepan di Indonesia dalam pemberdayaan ekonomi desa berbasis digital dan berkelanjutan.',
    mission: [
      'Mengelola aset dan potensi desa secara profesional',
      'Meningkatkan pendapatan asli desa',
      'Memberdayakan ekonomi masyarakat melalui pelatihan dan permodalan',
      'Menerapkan transparansi dan akuntabilitas dalam setiap kegiatan'
    ],
    structure: [
      { position: 'Pembina', name: 'Kepala Desa Sale' },
      { position: 'Ketua BUMDes', name: 'Budi Santoso' },
      { position: 'Sekretaris', name: 'Siti Nurjanah' },
      { position: 'Bendahara', name: 'Ahmad Fauzi' }
    ]
  }
};

export const businessUnits = [
  { id: 1, name: 'Toko Serba Ada Desa', category: 'Retail', revenue: 'Rp 450 Juta', description: 'Menyediakan kebutuhan sehari-hari warga dengan harga terjangkau' },
  { id: 2, name: 'Simpan Pinjam Desa', category: 'Keuangan', revenue: 'Rp 650 Juta', description: 'Layanan simpan pinjam untuk modal usaha warga' },
  { id: 3, name: 'Pengelolaan Sampah', category: 'Lingkungan', revenue: 'Rp 180 Juta', description: 'Bank sampah dan daur ulang untuk desa bersih' },
  { id: 4, name: 'Wisata Desa', category: 'Pariwisata', revenue: 'Rp 320 Juta', description: 'Paket wisata alam dan budaya Desa Sale' },
  { id: 5, name: 'Produk Pertanian', category: 'Agribisnis', revenue: 'Rp 520 Juta', description: 'Pemasaran hasil pertanian lokal' },
  { id: 6, name: 'Kerajinan Tangan', category: 'UMKM', revenue: 'Rp 280 Juta', description: 'Produksi dan pemasaran kerajinan khas desa' }
];

export const products = [
  { id: 1, name: 'Beras Organik Sale', price: 'Rp 15.000/kg', category: 'Pertanian', image: 'rice', stock: 'Tersedia' },
  { id: 2, name: 'Madu Hutan Lokal', price: 'Rp 85.000/botol', category: 'Pertanian', image: 'honey', stock: 'Tersedia' },
  { id: 3, name: 'Keripik Singkong', price: 'Rp 20.000/pack', category: 'UMKM', image: 'chips', stock: 'Tersedia' },
  { id: 4, name: 'Tas Anyaman Bambu', price: 'Rp 75.000', category: 'Kerajinan', image: 'bag', stock: 'Tersedia' },
  { id: 5, name: 'Kopi Robusta Sale', price: 'Rp 45.000/pack', category: 'Pertanian', image: 'coffee', stock: 'Tersedia' },
  { id: 6, name: 'Batik Tulis Sale', price: 'Rp 350.000', category: 'Kerajinan', image: 'batik', stock: 'Pre-order' }
];

export const newsData = [
  {
    id: 1,
    title: 'Pelatihan Kewirausahaan untuk UMKM Desa Sale',
    date: '15 Mei 2025',
    category: 'Pelatihan',
    excerpt: 'BUMDes Desa Sale mengadakan pelatihan kewirausahaan untuk 50 pelaku UMKM lokal.',
    image: 'training'
  },
  {
    id: 2,
    title: 'Launching Produk Beras Organik Premium',
    date: '10 Mei 2025',
    category: 'Produk',
    excerpt: 'Produk unggulan baru dari unit usaha pertanian BUMDes Desa Sale.',
    image: 'product'
  },
  {
    id: 3,
    title: 'BUMDes Sale Raih Penghargaan Transparansi Terbaik',
    date: '5 Mei 2025',
    category: 'Penghargaan',
    excerpt: 'Penghargaan dari Kementerian Desa untuk kategori transparansi dan akuntabilitas.',
    image: 'award'
  }
];

export const capitalApplications = [];

export const transparencyData = {
  financialReports: [
    { period: 'Q1 2025', income: 'Rp 625 Juta', expense: 'Rp 380 Juta', profit: 'Rp 245 Juta', status: 'Teraudit' },
    { period: 'Q4 2024', income: 'Rp 580 Juta', expense: 'Rp 350 Juta', profit: 'Rp 230 Juta', status: 'Teraudit' },
    { period: 'Q3 2024', income: 'Rp 550 Juta', expense: 'Rp 340 Juta', profit: 'Rp 210 Juta', status: 'Teraudit' }
  ],
  shuDistribution: [
    { year: 2024, total: 'Rp 850 Juta', members: 320, perMember: 'Rp 2.65 Juta' },
    { year: 2023, total: 'Rp 720 Juta', members: 280, perMember: 'Rp 2.57 Juta' }
  ]
};