"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  topic: z.string().min(1, "Please enter a topic"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  numberOfSentences: z
    .number()
    .min(1, "Number of sentences must be greater than 0")
    .max(10, "Number of sentences cannot exceed 10"),
});

const difficultyOptions = {
  beginner: {
    title: "Easy",
    level: "A1-A2",
    description:
      "Simple sentences with basic vocabulary. Suitable for A1-A2 level learners.",
  },
  intermediate: {
    title: "Intermediate",
    level: "B1-B2",
    description:
      "Moderately complex sentences with common expressions. Suitable for B1-B2 level learners.",
  },
  advanced: {
    title: "Advanced",
    level: "C1-C2",
    description:
      "Complex sentences with sophisticated vocabulary. Suitable for C1-C2 level learners.",
  },
};

const exerciseCounts = {
  5: {
    title: "5 sentences",
    description: "Quick practice",
  },
  10: {
    title: "10 sentences",
    description: "Full practice",
  },
};

interface ExerciseFormProps {
  onSubmit: (data: {
    topic: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    numberOfSentences: number;
  }) => void;
  isLoading: boolean;
}

export default function ExerciseForm({
  onSubmit,
  isLoading,
}: ExerciseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      difficulty: "beginner",
      numberOfSentences: 5,
    },
  });

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-3xl h-fit">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Create Sentence Arrangement Exercise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter exercise topic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-2"
                    >
                      {Object.entries(difficultyOptions).map(
                        ([key, { title, level, description }]) => (
                          <div key={key} className="h-full">
                            <RadioGroupItem
                              value={key}
                              id={`d${key}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`d${key}`}
                              className="flex flex-col h-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-lg font-semibold">
                                  {title}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  ({level})
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground text-center mt-2 flex-grow">
                                {description}
                              </span>
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfSentences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Sentences</FormLabel>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                      className="grid grid-cols-2 gap-2"
                    >
                      {Object.entries(exerciseCounts).map(
                        ([count, { title, description }]) => (
                          <div key={count}>
                            <RadioGroupItem
                              value={count}
                              id={`c${count}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`c${count}`}
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-lg font-semibold">
                                {title}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {description}
                              </span>
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Exercise"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
