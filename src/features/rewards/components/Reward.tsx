"use client";

import { useState } from "react";
import { Reward } from "@/features/rewards/type";

import styles from "./Reward.module.css";
import FormInput from "@/components/forms/FormInput";
import Link from "next/link";
import ConfirmModal from "@/components/modal/ConfirmModal";
import RewardRow from "@/features/rewards/components/RewardRow";

export default function Rewards({ rewards }: { rewards: Reward[] }) {
  const [search, setSearch] = useState("");
  const [deleteReward, setDeleteReward] = useState<Reward | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filtered = rewards.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const recompensasPagina = filtered.slice(start, end);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Recompensas</h1>

          <Link href="/rewards/newrewards" className={styles.addButton}>
            Agregar Recompensa
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <FormInput
            type="text"
            value={search}
            placeholder="Buscar Recompensa..."
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
                <th>Beneficio</th>
                <th>Requisito</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {recompensasPagina.map((reward) => (
                <RewardRow
                  key={reward.id}
                  reward={reward}
                  onDelete={() => setDeleteReward(reward)}
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
          open={!!deleteReward}
          title="¿Eliminar recompensa?"
          message={
            deleteReward
              ? `¿Estás seguro de eliminar la recompensa "${deleteReward.name}"? Esta acción no se puede deshacer.`
              : ""
          }
          confirmLabel="Eliminar"
          confirmColor="danger"
          onCancel={() => setDeleteReward(null)}
          onConfirm={() => {
            console.log("Eliminado:", deleteReward?.id);
            setDeleteReward(null);
          }}
        />
      </div>
    </div>
  );
}
