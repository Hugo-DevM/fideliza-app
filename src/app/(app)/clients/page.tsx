"use client";

import { useState } from "react";
import { clientsMock } from "@/config/constants";
import { Client } from "@/features/clients/type";

import styles from "./page.module.css";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";
import TableRow from "@/features/clients/components/TableRow";
import ConfirmModal from "@/components/modal/ConfirmModal";

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);

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
                <th></th>
              </tr>
            </thead>

            <tbody>
              {clientes.map((cliente) => (
                <TableRow
                  key={cliente.id}
                  cliente={cliente}
                  onDelete={() => setDeleteClient(cliente)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmModal
          open={!!deleteClient}
          title="¿Eliminar cliente?"
          message={
            deleteClient
              ? `¿Estás seguro de eliminar a ${deleteClient.nombre}? Esta acción no se puede deshacer.`
              : ""
          }
          confirmLabel="Eliminar"
          confirmColor="danger"
          onCancel={() => setDeleteClient(null)}
          onConfirm={() => {
            console.log("Eliminado:", deleteClient?.id);
            setDeleteClient(null);
          }}
        />
      </div>
    </div>
  );
}
