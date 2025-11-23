import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image
        loading="eager"
        className={styles.image}
        src="/logo.svg"
        alt="Fideliza+ Logo"
        width={500}
        height={500}
      />
    </div>
  );
}
