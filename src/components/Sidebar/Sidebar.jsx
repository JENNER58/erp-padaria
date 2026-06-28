import { NavLink } from "react-router-dom";
import { LogOut, Store } from "lucide-react";

import { MENU } from "../../constants/menu";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <div>

        <div className={styles.logo}>

          <div className={styles.logoIcone}>
            <Store size={24} />
          </div>

          <div>

            <h2 className={styles.logoTitulo}>
              ERP Padaria
            </h2>

            <span className={styles.logoVersao}>
              Professional v2.0
            </span>

          </div>

        </div>

        <nav className={styles.menu}>

          {MENU.map((item) => {

            const Icon = item.icone;

            return (

              <NavLink
                key={item.rota}
                to={item.rota}
                end={item.rota === "/"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.item} ${styles.ativo}`
                    : styles.item
                }
              >

                <Icon size={20} />

                <span>{item.titulo}</span>

              </NavLink>

            );

          })}

        </nav>

      </div>

      <div>

        <div className={styles.usuario}>

          <div className={styles.avatar}>
            J
          </div>

          <div>

            <div className={styles.nome}>
              Jenner Aviles
            </div>

            <div className={styles.cargo}>
              Administrador
            </div>

          </div>

        </div>

        <button className={styles.botaoSair}>

          <LogOut size={18} />

          <span>Sair</span>

        </button>

      </div>

    </aside>
  );
}