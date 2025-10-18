import React, { useState, useEffect } from "react";
import { DollarSign, Calculator, HelpCircle, CheckCircle, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const Permodalan = ({ language }) => {
  const isIndonesian = language === "id";
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessType: "",
    loanAmount: "",
    purpose: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: isIndonesian ? "Pengajuan Berhasil!" : "Application Successful!",
      description: isIndonesian
        ? "Tim kami akan menghubungi Anda dalam 2-3 hari kerja."
        : "Our team will contact you within 2-3 business days.",
    });
    setFormData({
      name: "",
      phone: "",
      businessType: "",
      loanAmount: "",
      purpose: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 px-4 text-center"
        data-aos="fade-down"
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
            data-aos="zoom-in"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            {isIndonesian ? "Permodalan Warga" : "Community Capital"}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
          >
            {isIndonesian
              ? "Sistem Permodalan untuk Warga"
              : "Capital System for Citizens"}
          </h1>
          <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
            {isIndonesian
              ? "Akses modal usaha dengan bunga rendah untuk mengembangkan bisnis Anda. Kami mendukung pertumbuhan UMKM Desa Sale."
              : "Access business capital with low interest to develop your business. We support the growth of Sale Village SMEs."}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isIndonesian ? "Keunggulan Program" : "Program Benefits"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-100 hover:shadow-lg transition-all" data-aos="zoom-in">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-center">
                  {isIndonesian ? "Bunga Rendah" : "Low Interest"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {isIndonesian
                    ? "Bunga kompetitif mulai dari 6% per tahun"
                    : "Competitive interest starting from 6% per year"}
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-2 border-green-100 hover:shadow-lg transition-all"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-center">
                  {isIndonesian ? "Proses Cepat" : "Fast Process"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {isIndonesian
                    ? "Persetujuan dalam 7 hari kerja"
                    : "Approval within 7 business days"}
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-2 border-green-100 hover:shadow-lg transition-all"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-center">
                  {isIndonesian ? "Tenor Fleksibel" : "Flexible Terms"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {isIndonesian
                    ? "Pilihan tenor 6-36 bulan sesuai kebutuhan"
                    : "Term options 6-36 months as needed"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white" data-aos="fade-up">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-green-200 shadow-xl" data-aos="zoom-in">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                {isIndonesian ? "Form Pengajuan Modal" : "Capital Application Form"}
              </CardTitle>
              <CardDescription className="text-center">
                {isIndonesian
                  ? "Lengkapi formulir di bawah ini untuk mengajukan permodalan usaha"
                  : "Complete the form below to apply for business capital"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2" data-aos="fade-right">
                  <Label htmlFor="name">{isIndonesian ? "Nama Lengkap" : "Full Name"} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-2"
                    placeholder={isIndonesian ? "Masukkan nama lengkap" : "Enter full name"}
                  />
                </div>

                <div className="space-y-2" data-aos="fade-left">
                  <Label htmlFor="phone">{isIndonesian ? "Nomor WhatsApp" : "WhatsApp Number"} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-2"
                    placeholder="+62 812-xxxx-xxxx"
                  />
                </div>

                <div className="space-y-2" data-aos="fade-right">
                  <Label htmlFor="businessType">{isIndonesian ? "Jenis Usaha" : "Business Type"} *</Label>
                  <Input
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    className="border-2"
                    placeholder={isIndonesian ? "Contoh: Pertanian, Warung, dll" : "Example: Agriculture, Shop, etc"}
                  />
                </div>

                <div className="space-y-2" data-aos="fade-left">
                  <Label htmlFor="loanAmount">{isIndonesian ? "Jumlah Modal" : "Loan Amount"} *</Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    className="border-2"
                    placeholder="Rp 5.000.000"
                  />
                </div>

                <div className="space-y-2" data-aos="fade-up">
                  <Label htmlFor="purpose">{isIndonesian ? "Tujuan Penggunaan Modal" : "Capital Usage Purpose"} *</Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    className="border-2 min-h-[100px]"
                    placeholder={isIndonesian ? "Jelaskan rencana penggunaan modal..." : "Explain the capital usage plan..."}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700" data-aos="zoom-in">
                  <Send className="h-5 w-5 mr-2" />
                  {isIndonesian ? "Kirim Pengajuan" : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10" data-aos="zoom-in">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isIndonesian ? "Pertanyaan Umum" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: isIndonesian ? "Siapa yang bisa mengajukan?" : "Who can apply?",
                a: isIndonesian
                  ? "Warga Desa Sale yang memiliki usaha atau rencana usaha produktif"
                  : "Sale Village residents who have a business or productive business plan",
              },
              {
                q: isIndonesian
                  ? "Berapa minimal dan maksimal pinjaman?"
                  : "What is the minimum and maximum loan?",
                a: isIndonesian
                  ? "Minimal Rp 1 juta, maksimal Rp 50 juta tergantung jenis usaha"
                  : "Minimum IDR 1 million, maximum IDR 50 million depending on business type",
              },
              {
                q: isIndonesian ? "Apa saja syarat pengajuan?" : "What are the requirements?",
                a: isIndonesian
                  ? "KTP, KK, proposal usaha sederhana, dan agunan (jika diperlukan)"
                  : "ID card, family card, simple business proposal, and collateral (if needed)",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-2 border-green-100" data-aos="fade-up" data-aos-delay={index * 150}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Permodalan;
