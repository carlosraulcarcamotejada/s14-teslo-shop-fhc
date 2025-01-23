import { PageProps } from "@/interfaces/page/page-props";

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>{id}</h1>
      <h2>Category Page</h2>
    </div>
  );
}
