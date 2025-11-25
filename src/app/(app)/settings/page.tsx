"use client";
import { useState } from "react";
import { BusinessSection } from "@/features/settings/components/BusinessSection";
import { AccountSection } from "@/features/settings/components/AccountSection";
import { BillingSection } from "@/features/settings/components/BillingSection";

import styles from "./page.module.css";

type Section = "business" | "account" | "billing";

export default function Settings() {
  const [activeSection, setActiveSection] = useState<Section>("business");

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Ajustes</h2>

          <nav className={styles.menu}>
            <button
              className={`${styles.menuItem} ${
                activeSection === "business" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveSection("business")}
            >
              Perfil del negocio
            </button>

            <button
              className={`${styles.menuItem} ${
                activeSection === "account" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveSection("account")}
            >
              Cuenta
            </button>

            <button
              className={`${styles.menuItem} ${
                activeSection === "billing" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveSection("billing")}
            >
              Pago
            </button>
          </nav>
        </aside>

        <main className={styles.content}>
          {activeSection === "business" && <BusinessSection />}
          {activeSection === "account" && <AccountSection />}
          {activeSection === "billing" && <BillingSection />}
        </main>
      </div>
    </div>
  );
}
