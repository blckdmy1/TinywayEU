import { prisma } from "@/lib/prisma";

export default async function TestDbPage() {
  const products = await prisma.product.findMany();

  return (
    <main style={{ padding: "40px" }}>
      <h1>Database test</h1>
      <p>Products in DB: {products.length}</p>
    </main>
  );
}