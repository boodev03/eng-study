"use client";

import { motion } from "framer-motion";
import { PenLine, Clock, Sparkles } from "lucide-react";

export default function WrittingPage() {
  return (
    <div className="container mx-auto py-8 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PenLine className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Writing Practice
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            This feature is currently under development. Please check back
            later!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-muted/50 rounded-xl border border-border/50"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Clock className="w-5 h-5 text-primary animate-pulse" />
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">
              We're working hard to bring you an interactive writing practice
              experience. Stay tuned for updates!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
