import styles from "./ProductCard.module.css";
import Link from "next/link";
export default function ProductCard({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <article className={styles.card}>
      {/* <h2>{name}</h2> */}
      <Link href={`/products/${slug}`}>{name}</Link>
      <p>{description}</p>
    </article>
  );
}