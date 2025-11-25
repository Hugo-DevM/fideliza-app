"use client";
import CardReports from "@/features/reports/components/CardReports";
import styles from "./page.module.css";
import CardMetrics from "@/features/reports/components/CardMetrics";
import MonthsLineChart from "@/features/reports/components/MonthsLineChart";
import DonutChart from "@/features/reports/components/DonutChart";

export default function Reports() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/**reportes */}
        <div className={styles.contentPanel}>
          <h1 className={styles.titleReports}>Panel de control</h1>
        </div>
        <div className={styles.contentReports}>
          <CardReports title="Clientes Registrados" data={"1,234"} />
          <CardReports title="Recompensas activas" data={"24"} />
          <CardReports title="Compras registradas" data={"8,901"} />
          <CardReports title="Recompensas entregadas" data={"103"} />
        </div>
        <div>
          <p className={styles.titleMetrics}>Resumen de actividad</p>
        </div>
        <div className={styles.contentMetrics}>
          <CardMetrics
            title="Nuevos clientes este mes"
            data="+15%"
            metric="+23"
          />
          <CardMetrics
            title="Recompensas canjeadas este mes"
            data="+3%"
            metric="+4"
          />
        </div>
        {/**graficas */}
        <div className={styles.contentCharts}>
          <div className={styles.chartBox}>
            <MonthsLineChart />
          </div>

          <div className={styles.chartBoxDonut}>
            <DonutChart redeemed={5} />

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.circleGray}></span>
                <span>Recompensas no canjeadas</span>
              </div>

              <div className={styles.legendItem}>
                <span className={styles.circleBlue}></span>
                <span>Recompensas canjeadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
