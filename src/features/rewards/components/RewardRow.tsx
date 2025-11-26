import { useRef, useState } from "react";
import { useClickOutside } from "@/features/clients/hooks/useClickOutside";
import { Reward } from "../type";

import styles from "./RewardRow.module.css";
import Link from "next/link";

interface Props {
  reward: Reward;
  onDelete: () => void;
}

export default function RewardRow({ reward, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setOpen(false));

  return (
    <tr>
      <td>{reward.beneficio.nombre}</td>

      <td>
        {reward.beneficio.tipo_beneficio}: {reward.beneficio.valor_beneficio}
      </td>

      <td>
        {reward.requisito.tipo_requisito}: {reward.requisito.valor_requisito}
      </td>

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
              <Link href={`/rewards/${reward.id}`} className={styles.menuItem}>
                Editar
              </Link>

              <button
                className={`${styles.menuItem} ${styles.delete}`}
                onClick={onDelete}
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
