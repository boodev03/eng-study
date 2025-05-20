import BackButton from "@/components/BackButton";

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
}
