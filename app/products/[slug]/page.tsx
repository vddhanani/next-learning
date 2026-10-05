import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import Image from "next/image";
import styles from "./ProductDetails.module.css";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.product}>
        <Image
          className={styles.image}
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
        />

        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </main>

  );
}