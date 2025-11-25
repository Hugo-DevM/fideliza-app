import styles from "./CardReports.module.css";

type Props = {
  title: string;
  data: string;
};

const CardReports = ({ title, data }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <h2 className={styles.subtitle}>{data}</h2>
    </div>
  );
};

export default CardReports;
