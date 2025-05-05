"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
  {
    letter: "L",
    title: "Listening",
    description:
      "Luyện nghe với bài tập phiên âm và trả lời câu hỏi theo nội dung",
    color: "blue",
    icon: "/icons/listening-icon.png",
    bgGradient: "from-blue-50 to-blue-100",
    href: "/exercises/listening",
  },
  {
    letter: "S",
    title: "Speaking",
    description:
      "Luyện phát âm chuẩn với công nghệ AI đánh giá và gợi ý cải thiện",
    color: "green",
    icon: "/icons/speaking-icon.png",
    bgGradient: "from-green-50 to-green-100",
    href: "/exercises/speaking",
  },
  {
    letter: "W",
    title: "Writing",
    description:
      "Luyện viết với hướng dẫn chi tiết và nhận xét từ AI giúp cải thiện kỹ năng",
    color: "purple",
    icon: "/icons/writing-icon.png",
    bgGradient: "from-purple-50 to-purple-100",
    href: "/exercises/writing",
  },
  {
    letter: "V",
    title: "Vocabulary",
    description:
      "Học từ vựng theo chủ đề với phương pháp spaced repetition hiệu quả",
    color: "amber",
    icon: "/icons/vocabulary-icon.png",
    bgGradient: "from-amber-50 to-amber-100",
    href: "/exercises/vocabulary",
  },
];

export default function SkillsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements - responsive adjustments */}
      <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-blue-50 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-green-50 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-10 w-10 md:w-16 h-10 md:h-16 bg-purple-100 rounded-full opacity-30 hidden sm:block"></div>
      <div className="absolute bottom-1/4 left-1/4 w-6 md:w-10 h-6 md:h-10 bg-amber-100 rounded-full opacity-40 hidden sm:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6 text-gray-900 relative inline-block">
            Kỹ năng ngôn ngữ
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-amber-300 rounded-full"></div>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Phát triển toàn diện các kỹ năng tiếng Anh với phương pháp học tập
            hiện đại
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={skill.href} className="block h-full">
                <Card
                  className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-gradient-to-br ${skill.bgGradient} h-full`}
                >
                  <div
                    className={`absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-${skill.color}-200 rounded-bl-full opacity-30 group-hover:opacity-50 transition-opacity`}
                  ></div>

                  <CardContent className="pt-8 pb-6 px-4 sm:px-6 relative h-full flex flex-col justify-between">
                    <div
                      className={`absolute top-3 md:top-4 right-3 md:right-4 text-${skill.color}-500 opacity-20 group-hover:opacity-30 transition-opacity text-3xl md:text-4xl font-bold`}
                    >
                      {skill.letter}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                      <div
                        className={`rounded-full bg-white shadow-inner p-3 md:p-4 mb-4 sm:mb-0 sm:mr-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 relative group-hover:shadow-lg transition-all border-2 border-${skill.color}-200`}
                      >
                        <div
                          className={`text-${skill.color}-600 font-bold text-xl`}
                        >
                          {skill.letter}
                        </div>
                        <div
                          className={`absolute -top-1 -right-1 w-3 md:w-4 h-3 md:h-4 bg-${skill.color}-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                        ></div>
                      </div>

                      <div className="text-center sm:text-left">
                        <h3
                          className={`text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-${skill.color}-700 transition-colors`}
                        >
                          {skill.title}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-4 md:mt-6 pt-3 md:pt-4 border-t border-${skill.color}-200 flex justify-between items-center mt-auto`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-medium text-${skill.color}-600`}
                      >
                        Bắt đầu học
                      </span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-${skill.color}-100 flex items-center justify-center text-${skill.color}-600`}
                      >
                        →
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
