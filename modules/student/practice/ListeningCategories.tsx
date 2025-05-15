"use client";

import { useCategories } from "@/hooks/useListeningCategory";
import CategoriesLoading from "./CategoriesLoading";
import CategoryCard from "./CategoryCard";

export default function ListeningCategories() {
  const { categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return <CategoriesLoading />;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading listening categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Listening Exercises</h1>
      {categories.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No categories found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
