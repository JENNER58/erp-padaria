import {
  Search,
  Bell,
  Moon,
  UserCircle
} from "lucide-react";

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

    <header style={styles.header}>

      <div>

        <h2 style={styles.titulo}>
          Bem-vindo 👋
        </h2>

        <span style={styles.data}>
          {hoje}
        </span>

      </div>

      <div style={styles.direita}>

        <div style={styles.pesquisa}>

          <Search
            size={18}
            color="#64748B"
          />

          <input
            type="text"
            placeholder="Pesquisar..."
            style={styles.input}
          />

        </div>

        <button style={styles.botaoIcone}>
          <Bell size={20} />
        </button>

        <button style={styles.botaoIcone}>
          <Moon size={20} />
        </button>

        <div style={styles.usuario}>

          <UserCircle
            size={34}
            color="#2563EB"
          />

          <div>

            <div style={styles.nome}>
              Jenner Aviles
            </div>

            <div style={styles.cargo}>
              Administrador
            </div>

          </div>

        </div>

      </div>

    </header>

  );

}

const styles = {

  header: {

    height: "80px",

    background: "#FFFFFF",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    padding: "0 30px",

    borderBottom: "1px solid #E2E8F0",

    position: "sticky",

    top: 0,

    zIndex: 100

  },

  titulo: {

    margin: 0,

    fontSize: "24px",

    color: "#0F172A"

  },

  data: {

    color: "#64748B",

    fontSize: "14px"

  },

  direita: {

    display: "flex",

    alignItems: "center",

    gap: "18px"

  },

  pesquisa: {

    display: "flex",

    alignItems: "center",

    gap: "10px",

    background: "#F1F5F9",

    padding: "10px 16px",

    borderRadius: "12px",

    width: "320px"

  },

  input: {

    flex: 1,

    border: "none",

    outline: "none",

    background: "transparent",

    fontSize: "14px"

  },

  botaoIcone: {

    width: "42px",

    height: "42px",

    borderRadius: "12px",

    border: "1px solid #E2E8F0",

    background: "#FFFFFF",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    justifyContent: "center"

  },

  usuario: {

    display: "flex",

    alignItems: "center",

    gap: "10px",

    marginLeft: "10px"

  },

  nome: {

    fontWeight: "600",

    color: "#0F172A"

  },

  cargo: {

    fontSize: "13px",

    color: "#64748B"

  }

};