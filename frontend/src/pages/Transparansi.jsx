import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, TrendingUp, PieChart, Download, Eye, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { transparencyData } from "../mock";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Transparansi = ({ language }) => {
  const isIndonesian = language === "id";
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50"
      >
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Eye className="h-4 w-4 mr-2" />
            {isIndonesian ? "Transparansi & Akuntabilitas" : "Transparency & Accountability"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isIndonesian ? "Laporan Keuangan Transparan" : "Transparent Financial Reports"}
          </h1>
          <p className="text-lg text-gray-600">
            {isIndonesian
              ? "Komitmen kami terhadap transparansi penuh dalam pengelolaan keuangan BUMDes Desa Sale"
              : "Our commitment to full transparency in BUMDes Desa Sale financial management"}
          </p>
        </div>
      </motion.section>

      {/* KEY PRINCIPLES */}
      <section className="py-12 px-4 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isIndonesian ? "Prinsip Transparansi Kami" : "Our Transparency Principles"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye className="h-7 w-7 text-white" />,
                title: isIndonesian ? "Terbuka" : "Open",
                text: isIndonesian
                  ? "Semua laporan keuangan dapat diakses oleh masyarakat"
                  : "All financial reports accessible to the public",
              },
              {
                icon: <CheckCircle className="h-7 w-7 text-white" />,
                title: isIndonesian ? "Teraudit" : "Audited",
                text: isIndonesian
                  ? "Laporan diaudit oleh auditor independen"
                  : "Reports audited by independent auditors",
              },
              {
                icon: <TrendingUp className="h-7 w-7 text-white" />,
                title: isIndonesian ? "Berkala" : "Regular",
                text: isIndonesian
                  ? "Laporan dipublikasikan secara berkala setiap kuartal"
                  : "Reports published regularly every quarter",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="border-2 border-green-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <CardTitle className="text-center">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-600">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FINANCIAL REPORTS */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isIndonesian ? "Laporan Keuangan" : "Financial Reports"}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? "Laporan keuangan triwulanan yang telah diaudit"
                : "Audited quarterly financial reports"}
            </p>
          </motion.div>

          <div className="space-y-4">
            {transparencyData.financialReports.map((report, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="h-6 w-6 text-green-700" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {isIndonesian ? "Laporan" : "Report"} {report.period}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">
                                {isIndonesian ? "Pendapatan" : "Income"}:
                              </span>
                              <span className="font-semibold text-green-700 ml-2">{report.income}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {isIndonesian ? "Pengeluaran" : "Expense"}:
                              </span>
                              <span className="font-semibold text-gray-700 ml-2">{report.expense}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {isIndonesian ? "Laba" : "Profit"}:
                              </span>
                              <span className="font-semibold text-green-700 ml-2">{report.profit}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {report.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50">
                          <Download className="h-4 w-4 mr-2" />
                          {isIndonesian ? "Unduh" : "Download"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {isIndonesian ? "Punya Pertanyaan tentang Laporan?" : "Questions About Reports?"}
          </h2>
          <p className="text-lg mb-8 text-green-50">
            {isIndonesian
              ? "Tim kami siap menjawab pertanyaan Anda terkait laporan keuangan dan transparansi BUMDes Desa Sale"
              : "Our team is ready to answer your questions regarding financial reports and BUMDes Desa Sale transparency"}
          </p>
          <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 shadow-lg">
            {isIndonesian ? "Hubungi Kami" : "Contact Us"}
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Transparansi;
