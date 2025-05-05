"use client";

import React from "react";
import { motion } from "framer-motion";
import SkillsSection from "./SkillsSection";
import ExercisesSection from "./ExercisesSection";
import AIFeaturesSection from "./AIFeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section - Made Responsive */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Decoration circles - responsive */}
        <div className="absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-100 rounded-full"></div>
        <div className="absolute top-1/4 right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-100 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-purple-100 rounded-full opacity-50"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                  <span className="text-blue-600">Eng</span>Study
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-4 md:mb-6">
                  Nền tảng học tiếng Anh thông minh
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                  Kết hợp công nghệ AI hiện đại với phương pháp học tập hiệu quả
                  giúp người Việt Nam nâng cao kỹ năng tiếng Anh nhanh chóng và
                  toàn diện.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href="/exercises"
                    className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Bắt đầu học ngay
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href="/about"
                    className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-medium rounded-lg bg-white text-blue-600 hover:bg-gray-50 border border-blue-200 transition-colors shadow"
                  >
                    Tìm hiểu thêm
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full max-w-lg mx-auto transform">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-20 blur-2xl"></div>
                  {/* <img
                    src="/hero-image.png"
                    alt="EngStudy Platform"
                    className="relative w-full h-auto rounded-lg shadow-xl"
                  /> */}
                </div>

                {/* Stats - responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md text-center">
                    <p className="text-lg sm:text-xl font-bold text-blue-600">
                      2000+
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Học viên</p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md text-center">
                    <p className="text-lg sm:text-xl font-bold text-green-600">
                      500+
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Bài học</p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md text-center col-span-2 sm:col-span-1">
                    <p className="text-lg sm:text-xl font-bold text-purple-600">
                      4.9/5
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Đánh giá</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Exercises Section */}
      <ExercisesSection />

      {/* AI Features Section */}
      <AIFeaturesSection />

      {/* CTA Section - Made Responsive */}
      <section className="py-16 md:py-20 lg:py-24 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
              Sẵn sàng nâng cao trình độ tiếng Anh của bạn?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto">
              Đăng ký tài khoản miễn phí ngay hôm nay và trải nghiệm phương pháp
              học tiếng Anh hiệu quả
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 text-base sm:text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
            >
              Đăng ký miễn phí
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Made Responsive */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
              Học viên nói gì về chúng tôi
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Hàng nghìn học viên đã cải thiện kỹ năng tiếng Anh của họ với
              EngStudy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                id: 1,
                name: "Nguyễn Văn A",
                role: "Sinh viên",
                content:
                  "EngStudy đã giúp tôi cải thiện khả năng nghe và nói tiếng Anh rất nhiều. Các bài tập thực tế và phản hồi từ AI giúp tôi tự tin hơn khi giao tiếp.",
                avatar: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              {
                id: 2,
                name: "Trần Thị B",
                role: "Nhân viên văn phòng",
                content:
                  "Tôi đã thử nhiều ứng dụng học tiếng Anh nhưng EngStudy là ứng dụng hiệu quả nhất. Phương pháp học được cá nhân hóa giúp tôi tiến bộ nhanh chóng.",
                avatar: "https://randomuser.me/api/portraits/women/2.jpg",
              },
              {
                id: 3,
                name: "Lê Văn C",
                role: "Kỹ sư phần mềm",
                content:
                  "Công nghệ AI của EngStudy thực sự ấn tượng. Nó phát hiện chính xác những lỗi phát âm của tôi và đưa ra hướng dẫn cụ thể để khắc phục.",
                avatar: "https://randomuser.me/api/portraits/men/3.jpg",
              },
            ].map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mr-4"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`;
                    }}
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-base text-gray-700">{testimonial.content}</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
