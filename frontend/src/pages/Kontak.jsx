import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Kontak = ({ language }) => {
  const isIndonesian = language === "id";
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: isIndonesian ? "Pesan Terkirim!" : "Message Sent!",
      description: isIndonesian
        ? "Terima kasih. Kami akan segera menghubungi Anda."
        : "Thank you. We will contact you soon.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl ">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="h-4 w-4 mr-2" />
            {isIndonesian ? "Hubungi Kami" : "Contact Us"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isIndonesian ? "Kami Siap Membantu Anda" : "We Are Here to Help"}
          </h1>
          <p className="text-lg text-gray-600">
            {isIndonesian
              ? "Punya pertanyaan atau saran? Hubungi kami melalui berbagai saluran komunikasi yang tersedia"
              : "Have questions or suggestions? Contact us through various available communication channels"}
          </p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            { icon: Phone, title: "Telepon", text: "+62 812-3456-7890", desc: "Senin - Jumat, 08:00 - 16:00 WIB" },
            { icon: Mail, title: "Email", text: "info@bumdesdesasale.id", desc: "Respons dalam 24 jam" },
            { icon: MapPin, title: "Alamat", text: "Jl. Desa Sale No. 123", desc: "Kec. Sale, Indonesia" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Card className="border-2 border-green-100 hover:shadow-xl transition-all text-center">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle>{isIndonesian ? item.title : item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isIndonesian ? "Kirim Pesan" : "Send Message"}
                </CardTitle>
                <CardDescription>
                  {isIndonesian
                    ? "Isi formulir di bawah ini dan kami akan segera menghubungi Anda"
                    : "Fill out the form below and we will contact you soon"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {["name", "email", "phone", "subject", "message"].map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>
                        {isIndonesian
                          ? field === "name"
                            ? "Nama Lengkap"
                            : field === "email"
                            ? "Email"
                            : field === "phone"
                            ? "Nomor Telepon"
                            : field === "subject"
                            ? "Subjek"
                            : "Pesan"
                          : field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                        *
                      </Label>
                      {field === "message" ? (
                        <Textarea
                          id={field}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="border-2 min-h-[120px]"
                        />
                      ) : (
                        <Input
                          id={field}
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="border-2"
                        />
                      )}
                    </div>
                  ))}
                  <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <Send className="h-5 w-5 mr-2" />
                    {isIndonesian ? "Kirim Pesan" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">{isIndonesian ? "Lokasi Kami" : "Our Location"}</CardTitle>
                <CardDescription>
                  {isIndonesian
                    ? "Kunjungi kantor kami di Desa Sale"
                    : "Visit our office in Sale Village"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-green-100 to-amber-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                </div>
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {isIndonesian ? "Buka di Google Maps" : "Open in Google Maps"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {isIndonesian ? "Butuh Respons Cepat?" : "Need Quick Response?"}
          </h2>
          <p className="text-lg mb-8 text-green-50">
            {isIndonesian
              ? "Hubungi kami melalui WhatsApp untuk respons yang lebih cepat"
              : "Contact us via WhatsApp for faster response"}
          </p>
          <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 shadow-lg">
            {isIndonesian ? "Chat via WhatsApp" : "Chat via WhatsApp"}
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Kontak;
