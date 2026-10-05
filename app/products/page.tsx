import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  return (
    <main>
        <h1>Our Products</h1>
        <div className={styles.grid}>
            {products.map((product) => (
                // <article key={product.name}>
                //   <h2>{product.name}</h2>
                //   <p>{product.description}</p>
                // </article>
                <ProductCard
                    key={product.name}
                    name={product.name}
                    description={product.description}
                    slug={product.slug}
                />
            ))}
        </div>
    </main>
  );
}