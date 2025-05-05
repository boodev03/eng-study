import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">
                <span className="text-blue-600">Eng</span>Study
              </h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md">
              Nền tảng học tiếng Anh thông minh kết hợp công nghệ AI hiện đại,
              giúp người Việt Nam nâng cao kỹ năng tiếng Anh nhanh chóng và toàn
              diện.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "facebook", href: "#" },
                { icon: "twitter", href: "#" },
                { icon: "instagram", href: "#" },
                { icon: "youtube", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <span className="sr-only">{social.icon}</span>
                  <i className={`ri-${social.icon}-fill text-lg`}></i>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-base md:text-lg mb-4 text-gray-900">
              Đường dẫn nhanh
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: "Trang chủ", href: "/" },
                { name: "Về chúng tôi", href: "/about" },
                { name: "Kỹ năng ngôn ngữ", href: "/skills" },
                { name: "Bài tập", href: "/exercises" },
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 text-sm md:text-base transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-span-1">
            <h3 className="font-semibold text-base md:text-lg mb-4 text-gray-900">
              Liên hệ
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-600 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 text-sm md:text-base">
                  contact@engstudy.vn
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-600 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-600 text-sm md:text-base">
                  (+84) 123 456 789
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-600 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-600 text-sm md:text-base">
                  Hà Nội, Việt Nam
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs md:text-sm">
            © {new Date().getFullYear()} EngStudy. Tất cả các quyền được bảo
            lưu.
          </p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-blue-600 text-xs md:text-sm transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-blue-600 text-xs md:text-sm transition-colors"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 hover:text-blue-600 text-xs md:text-sm transition-colors"
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
