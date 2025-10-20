import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { siteContent } from "../mock";

const Home = ({ language }) => {
    const content = siteContent[language];

    const renderIcon = (iconName) => {
        const IconComponent = Icons[iconName];
        return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="relative pt-32 pb-20 px-4 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-amber-50 -z-10"></div>
                <div
                    className="absolute inset-0 opacity-5 -z-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* ✅ Centered container */}
                <div className="max-w-7xl mx-auto text-center px-4">
                    <motion.div
                        className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                        {content.tagline}
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9 }}
                        viewport={{ once: true }}
                    >
                        {content.hero.title}
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {content.hero.subtitle}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            <Link to="/transparansi">{content.hero.cta1}</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-green-600 text-green-700 hover:bg-green-50"
                        >
                            <Link to="/permodalan">{content.hero.cta2}</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Highlights Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all group">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <div className="text-green-700">
                                                    {renderIcon(item.icon)}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900 mb-1">
                                                    {item.value}
                                                </p>
                                                <p className="text-sm text-gray-600">{item.label}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="py-20 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {language === "id"
                            ? "Bergabunglah dalam Membangun Desa Sale"
                            : "Join Us in Building Sale Village"}
                    </motion.h2>
                    <motion.p
                        className="text-lg mb-8 text-green-50"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {language === "id"
                            ? "Mari bersama-sama menciptakan ekonomi desa yang lebih kuat, transparan, dan sejahtera untuk generasi mendatang."
                            : "Let us together create a stronger, transparent, and prosperous village economy for future generations."}
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-green-700 hover:bg-green-50 shadow-lg"
                        >
                            <Link to="/permodalan">
                                {language === "id" ? "Ajukan Modal Usaha" : "Apply for Capital"}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white/10"
                        >
                            <Link to="/kontak">
                                {language === "id" ? "Hubungi Kami" : "Contact Us"}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;

