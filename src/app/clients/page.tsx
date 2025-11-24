"use client";

import { useState } from "react";
import { clientsMock } from "@/config/constants";

import styles from "./page.module.css";
import Image from "next/image";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";

export default function ClientesPage() {
  const [search, setSearch] = useState("");

  const clientes = clientsMock.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Clientes</h1>

          <Link href="/clients/newClient" className={styles.addButton}>
            Agregar Cliente
          </Link>
        </div>
        <div className={styles.searchContainer}>
          <FormInput
            type="text"
            value={search}
            placeholder="Buscar clientes..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Nombre</th>
                <th>Visitas</th>
                <th>Recompensa Disponible</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.visitas}</td>
                  <td>{cliente.recompensa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
