import styles from "./PropsExample.module.css";

export default function PropsExample({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    // className={styles.card}
    // className={styles.card + " " + styles.highlighted}
    // className={`${styles.card} ${styles.highlighted}`}
    <section className={`${styles.card} ${styles.highlighted}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      <small>it's PropsExample file</small>
    </section>
  );
}