import styles from "./CardMetrics.module.css";

type Props = {
  title: string;
  data: string;
  metric: string;
};

const CardMetrics = ({ title, data, metric }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <h2 className={styles.subtitle}>{data}</h2>
      <span className={styles.textMetric}>
        Este mes <p className={styles.positive}>{`${metric}%`}</p>
      </span>
    </div>
  );
};

export default CardMetrics;
