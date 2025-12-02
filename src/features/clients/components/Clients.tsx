"use client";

import { useState } from "react";
import { Client } from "@/features/clients/type";

import styles from "./Clients.module.css";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";
import TableRow from "@/features/clients/components/TableRow";
import ConfirmModal from "@/components/modal/ConfirmModal";

export default function Clients({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState("");
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filtered = clients.filter((c) =>
    c.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const clientesPagina = filtered.slice(start, end);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Clientes</h1>

          <Link href="/clients/newclient" className={styles.addButton}>
            Agregar Cliente
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <FormInput
            type="text"
            value={search}
            placeholder="Buscar clientes..."
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
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
              {clientesPagina.map((cliente) => (
                <TableRow
                  key={cliente.id}
                  cliente={cliente}
                  onDelete={() => setDeleteClient(cliente)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a1773"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a1773"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </button>
        </div>

        <ConfirmModal
          open={!!deleteClient}
          title="¿Eliminar cliente?"
          message={
            deleteClient
              ? `¿Estás seguro de eliminar a ${deleteClient.fullname}? Esta acción no se puede deshacer.`
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
