import {
  Search,
  Bell,
  Moon,
  UserCircle
} from "lucide-react";

import styles from "./Header.module.css";

export default function Header() {

  const hoje = new Date().toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

  return (

    <header className={styles.header}>

      <div className={styles.left}>

        <h2 className={styles.title}>
          Bem-vindo 👋
        </h2>

        <span className={styles.date}>
          {hoje}
        </span>

      </div>

      <div className={styles.right}>

        <div className={styles.search}>

          <Search
            size={18}
          />

          <input
            type="text"
            placeholder="Pesquisar..."
          />

        </div>

        <button className={styles.iconButton}>
          <Bell size={20}/>
        </button>

        <button className={styles.iconButton}>
          <Moon size={20}/>
        </button>

        <div className={styles.user}>

          <UserCircle
            size={42}
          />

          <div>

            <div className={styles.name}>
              Jenner Aviles
            </div>

            <div className={styles.role}>
              Administrador
            </div>

          </div>

        </div>

      </div>

    </header>

  );

}