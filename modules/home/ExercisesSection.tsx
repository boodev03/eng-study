"use client";

import { AlignLeft, ListChecks, PenLine } from "lucide-react";
import Link from "next/link";

const exercises = [
  {
    id: "fill-in",
    title: "Fill in the Blanks",
    description:
      "Complete the sentences by filling in the missing words and improve your vocabulary.",
    icon: PenLine,
    href: "/student/practice/exercises/fill-in",
  },
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    description:
      "Choose the correct answer for reading comprehension and grammar questions.",
    icon: ListChecks,
    href: "/student/practice/exercises/multiple-choice",
  },
  {
    id: "sentence-arrange",
    title: "Sentence Arrangement",
    description:
      "Arrange the words to form complete and grammatically correct sentences.",
    icon: AlignLeft,
    href: "/student/practice/exercises/sentence-arrangement",
  },
];

export default function ExercisesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Choose an Exercise Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <Link
                key={exercise.id}
                href={exercise.href}
                className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 text-center hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary">
                  {exercise.title}
                </div>
                <div className="text-sm text-gray-500">
                  {exercise.description}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
