"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlignLeft,
  ChevronRight,
  FileText,
  Headphones,
  ListChecks,
  Mic,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const exercises = [
  {
    id: "fill-in",
    title: "Điền từ",
    description:
      "Điền từ thích hợp vào chỗ trống để hoàn thành câu và cải thiện vốn từ vựng",
    color: "blue",
    icon: <PenLine className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: "Bài tập trung cấp",
    examples: [
      "The ___ was rising in the east",
      "She ___ to the store yesterday",
    ],
    href: "/exercises/fill-in",
  },
  {
    id: "multiple-choice",
    title: "Trắc nghiệm",
    description:
      "Lựa chọn đáp án đúng cho câu hỏi đọc hiểu và ngữ pháp tiếng Anh",
    color: "green",
    icon: <ListChecks className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: "Nhiều cấp độ",
    examples: [
      "What is the main idea of the passage?",
      "Choose the correct verb form:",
    ],
    href: "/exercises/multiple-choice",
  },
  {
    id: "listening",
    title: "Luyện nghe",
    description:
      "Phiên âm đoạn hội thoại và trả lời câu hỏi theo nội dung bạn nghe được",
    color: "purple",
    icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: "Đa dạng chủ đề",
    examples: ["Listen and write what you hear", "Complete the conversation"],
    href: "/exercises/listening",
  },
  {
    id: "sentence-arrange",
    title: "Sắp xếp câu",
    description: "Sắp xếp các từ để tạo thành câu hoàn chỉnh và đúng ngữ pháp",
    color: "amber",
    icon: <AlignLeft className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: "Luyện cấu trúc câu",
    examples: ["to / want / I / home / go", "the / opened / door / she"],
    href: "/exercises/arrange",
  },
  {
    id: "pronunciation",
    title: "Phát âm",
    description:
      "Luyện phát âm chuẩn với công nghệ AI phân tích và đánh giá trực tiếp",
    color: "red",
    icon: <Mic className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: "Đánh giá real-time",
    examples: [
      "Record yourself reading the passage",
      "Practice these sounds: /θ/, /ð/",
    ],
    href: "/exercises/pronunciation",
  },
  {
    id: "writing",
    title: "Viết đoạn văn",
    description:
      "Viết đoạn văn ngắn theo chủ đề và nhận phản hồi từ AI cải thiện kỹ năng",
    color: "indigo",
    icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: "Cải thiện kỹ năng viết",
    examples: ["Write about your favorite hobby", "Describe your hometown"],
    href: "/exercises/writing",
  },
];

export default function ExercisesSection() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50 relative">
      {/* Decorative patterns - responsive */}
      <div className="absolute inset-0 bg-[url('/patterns/grid-light.svg')] opacity-5"></div>

      {/* Floating shapes - responsive */}
      <div className="absolute top-20 left-6 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-blue-200 rounded-lg opacity-10 rotate-12 hidden sm:block"></div>
      <div className="absolute bottom-20 right-6 sm:right-10 w-16 sm:w-24 h-16 sm:h-24 bg-green-200 rounded-full opacity-10 hidden sm:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6 text-gray-900 relative inline-block">
            Đa dạng bài tập
            <motion.div
              className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-indigo-400 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Trải nghiệm nhiều loại bài tập khác nhau giúp phát triển toàn diện
            kỹ năng tiếng Anh
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-${exercise.color}-500 border-t-0 border-r-0 border-b-0 relative`}
                onMouseEnter={() => setActiveExercise(exercise.id)}
                onMouseLeave={() => setActiveExercise(null)}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${exercise.color}-400 to-${exercise.color}-200`}
                ></div>

                <CardContent className="p-5 sm:p-6 md:p-8 pt-8 md:pt-10 h-full flex flex-col">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div
                      className={`p-2 sm:p-3 rounded-lg bg-${exercise.color}-100 text-${exercise.color}-600 mr-3 md:mr-4`}
                    >
                      {exercise.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {exercise.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow">
                    {exercise.description}
                  </p>

                  <AnimatePresence>
                    {activeExercise === exercise.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                          <p className="text-xs sm:text-sm text-gray-500 mb-2">
                            Ví dụ:
                          </p>
                          <ul className="space-y-1 sm:space-y-2">
                            {exercise.examples.map((example, i) => (
                              <li
                                key={i}
                                className="text-gray-700 text-xs sm:text-sm"
                              >
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-${exercise.color}-500 mr-2`}
                      ></span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {exercise.badge}
                      </span>
                    </div>

                    <Link href={exercise.href}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className={`text-${exercise.color}-600 flex items-center text-xs sm:text-sm font-medium`}
                      >
                        Thử ngay{" "}
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </motion.button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10 md:mt-16"
        >
          <Link href="/exercises/listening">
            <Button
              variant="outline"
              size="lg"
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg bg-white hover:bg-gray-50 shadow-sm hover:shadow border-gray-200"
            >
              Xem tất cả bài tập
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
