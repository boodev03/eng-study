import { ListeningCategory } from "@/types/listening";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";
import Link from "next/link";

interface IProps {
  category: ListeningCategory;
}

export default function CategoryCard({ category }: IProps) {
  const { type, index, exercises_count, id } = category;
  const exercisesCount = exercises_count?.[0]?.count || 0;

  return (
    <Link href={`/exercises/listening/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md gap-0 py-2 border-gray-300 cursor-pointer">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium">{`${type} ${index}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Headphones className="mr-1 h-4 w-4" />
            <span className="text-sm">{exercisesCount} exercises</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
