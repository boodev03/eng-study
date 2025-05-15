import { BookOpen, Headphones, Pencil, Mic, FileText } from "lucide-react";

const practiceItems = [
  {
    label: "Listening",
    icon: Headphones,
    description: "Practice your listening skills with audio exercises.",
    href: "/student/practice/listening",
  },
  {
    label: "Reading",
    icon: BookOpen,
    description: "Improve reading comprehension with texts and quizzes.",
    href: "/student/practice/reading",
  },
  {
    label: "Writing",
    icon: Pencil,
    description: "Enhance your writing with prompts and feedback.",
    href: "/student/practice/writing",
  },
  {
    label: "Speaking",
    icon: Mic,
    description: "Boost your speaking skills with conversation practice.",
    href: "/student/practice/speaking",
  },
  {
    label: "Exercises",
    icon: FileText,
    description: "General grammar and vocabulary exercises.",
    href: "/student/practice/exercises",
  },
];

export default function Practice() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
        Choose a Practice Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {practiceItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 text-center hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="flex items-center justify-center mb-4">
              <item.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary">
              {item.label}
            </div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
