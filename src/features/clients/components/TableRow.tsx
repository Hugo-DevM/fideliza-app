import { useState, useRef } from "react";
import { Client } from "../type";
import { useClickOutside } from "../hooks/useClickOutside";

import Link from "next/link";
import styles from "./TableRow.module.css";

interface Props {
  cliente: Client;
  onDelete: (cliente: Client) => void;
}

export default function TableRow({ cliente, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setOpen(false));

  return (
    <tr>
      <td>{cliente.fullname}</td>
      <td>{cliente.total_visits}</td>
      <td>{cliente.phone}</td>

      <td className={styles.actionsCell}>
        <div ref={menuRef} className={styles.menuWrapper}>
          <button
            className={styles.menuButton}
            onClick={() => setOpen((prev) => !prev)}
          >
            ⋮
          </button>

          {open && (
            <div className={styles.dropdownMenu}>
              <Link href={`/clients/${cliente.id}`} className={styles.menuItem}>
                Editar
              </Link>

              <button
                className={`${styles.menuItem} ${styles.delete}`}
                onClick={() => onDelete(cliente)}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
