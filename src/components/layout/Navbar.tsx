"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/config/constants";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Image
              loading="eager"
              src="/logo.svg"
              width={120}
              height={80}
              alt="Fideliza+"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={styles.center}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? `${styles.navLink} ${styles.navItem} ${styles.active}`
                  : `${styles.navLink} ${styles.navItem}`
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button className={styles.burger} onClick={() => setOpen(!open)}>
          <span className={open ? styles.b1open : ""}></span>
          <span className={open ? styles.b2open : ""}></span>
          <span className={open ? styles.b3open : ""}></span>
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${open ? styles.openMenu : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}
    </>
  );
}
