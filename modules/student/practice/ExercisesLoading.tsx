import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExercisesLoading() {
  return (
    <div className="container mx-auto py-8 mt-20">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Listening Exercise</span>
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="icon"
                disabled
                className="h-8 w-8 text-foreground/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="font-medium text-foreground/70">
                <Skeleton className="h-4 w-10 inline-block" />
              </span>

              <Button
                variant="ghost"
                size="icon"
                disabled
                className="h-8 w-8 text-foreground/70"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg flex items-center justify-center">
            <Skeleton className="w-full h-12" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="p-6 rounded-lg bg-accent/20 border border-accent/30 shadow-sm">
            <div className="w-full">
              <Skeleton className="h-5 w-20 mb-4" />
              <div className="font-mono text-lg mb-12">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-16 inline-block mr-2 mb-2"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-9 w-32" />
              </div>

              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
