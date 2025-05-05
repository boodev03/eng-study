"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CongratulationsProps {
  title?: string;
  message?: string;
  backUrl?: string;
}

export default function Congratulations({
  title = "Congratulations!",
  message = "You have successfully completed all exercises.",
  backUrl = "/",
}: CongratulationsProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([]);

  useEffect(() => {
    // Create initial fireworks
    createFireworks();

    // Add more fireworks every 2 seconds
    const interval = setInterval(() => {
      createFireworks();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const createFireworks = () => {
    const colors = [
      "#FF5252",
      "#FFD740",
      "#64FFDA",
      "#448AFF",
      "#E040FB",
      "#69F0AE",
    ];
    const newParticles: {
      id: number;
      x: number;
      y: number;
      color: string;
    }[] = [];

    // Create a burst of particles
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4 relative overflow-hidden">
      {/* Firework particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute z-0 rounded-full"
          initial={{
            left: "50%",
            top: "50%",
            width: "5px",
            height: "5px",
            opacity: 1,
          }}
          animate={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0,
            scale: [1, 1.5, 0.5],
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ backgroundColor: particle.color }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-primary/10 shadow-md relative">
          <CardHeader className="bg-primary/5 text-center pb-6">
            <div className="flex justify-center mb-4">
              <motion.div
                className="bg-primary/10 p-3 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
              >
                <CheckCircle className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6 text-center">
            <p className="text-foreground/70">{message}</p>
          </CardContent>

          <CardFooter className="flex justify-center gap-3 pb-6">
            <Link href={backUrl}>
              <Button>Return to Categories</Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
