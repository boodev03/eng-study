"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, GitBranch, Sparkles } from "lucide-react";

const aiFeatures = [
  {
    id: "pronunciation",
    title: "Phân tích phát âm",
    description:
      "AI phân tích phát âm của bạn để đưa ra đánh giá chính xác và gợi ý cải thiện",
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "blue",
    highlight: "97% chính xác trong phát hiện lỗi phát âm",
  },
  {
    id: "writing",
    title: "Kiểm tra bài viết",
    description:
      "Công nghệ AI giúp phát hiện lỗi ngữ pháp, chính tả và đưa ra gợi ý cải thiện văn phong",
    icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "green",
    highlight: "Cải thiện bài viết của bạn lên đến 82%",
  },
  {
    id: "personalized",
    title: "Lộ trình cá nhân hóa",
    description:
      "AI phân tích điểm mạnh và yếu để tạo lộ trình học tập phù hợp riêng cho bạn",
    icon: <GitBranch className="w-6 h-6 sm:w-8 sm:h-8" />,
    color: "purple",
    highlight: "Tăng hiệu quả học tập lên 3 lần",
  },
];

export default function AIFeaturesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background with gradient blur - responsive */}
      <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-200 rounded-full filter blur-[60px] sm:blur-[90px] md:blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-200 rounded-full filter blur-[60px] sm:blur-[90px] md:blur-[120px] opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6 text-gray-900 relative inline-block">
            Công nghệ AI hỗ trợ
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 rounded-full"></div>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Tận dụng sức mạnh của trí tuệ nhân tạo để cá nhân hóa trải nghiệm
            học tập của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: [-0, -8] }}
              className="h-full"
            >
              <Card className="border-0 shadow-lg sm:shadow-xl relative overflow-hidden h-full bg-gradient-to-br from-white to-gray-50">
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 opacity-0 hover:opacity-10 transition-opacity bg-${feature.color}-200 pointer-events-none`}
                ></div>

                {/* Top accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-${feature.color}-500`}
                ></div>

                <CardContent className="p-6 sm:p-8 md:p-10 flex flex-col h-full">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-${feature.color}-50 border border-${feature.color}-100 flex items-center justify-center mb-4 sm:mb-6 text-${feature.color}-500`}
                  >
                    {feature.icon}
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-${feature.color}-700`}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow">
                    {feature.description}
                  </p>

                  <div
                    className={`mt-auto rounded-lg bg-${feature.color}-50 p-3 sm:p-4 border border-${feature.color}-100`}
                  >
                    <p
                      className={`text-xs sm:text-sm font-medium text-${feature.color}-700 flex items-center`}
                    >
                      <span
                        className={`inline-block w-2 h-2 rounded-full bg-${feature.color}-500 mr-2`}
                      ></span>
                      {feature.highlight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Visualization - responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 md:mt-20 lg:mt-24 flex justify-center"
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 shadow-lg sm:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
            <div className="relative p-5 sm:p-6 md:p-8 flex flex-col items-center bg-white/90">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
                AI đang phát triển liên tục
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">
                Công nghệ của chúng tôi liên tục được cập nhật với những thuật
                toán mới nhất để đảm bảo rằng bạn nhận được trải nghiệm học tập
                tốt nhất có thể.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100 text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-0 sm:mb-1">
                    100+
                  </p>
                  <p className="text-xs sm:text-sm text-blue-600">Mô hình AI</p>
                </div>
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-100 text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 mb-0 sm:mb-1">
                    24/7
                  </p>
                  <p className="text-xs sm:text-sm text-green-600">
                    Hỗ trợ học tập
                  </p>
                </div>
                <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-100 text-center">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700 mb-0 sm:mb-1">
                    98%
                  </p>
                  <p className="text-xs sm:text-sm text-purple-600">
                    Độ chính xác
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
