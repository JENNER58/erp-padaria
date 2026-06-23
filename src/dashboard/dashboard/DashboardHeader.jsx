export default function DashboardHeader() {

  const agora = new Date();

  const saudacao =
    agora.getHours() < 12
      ? "Bom dia"
      : agora.getHours() < 18
      ? "Boa tarde"
      : "Boa noite";

  const dataAtual = agora.toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <div style={styles.container}>

      <div>

        <h1 style={styles.titulo}>
          {saudacao}, Jenner 👋
        </h1>

        <p style={styles.data}>
          {dataAtual}
        </p>

      </div>

      <div style={styles.logo}>

        <div style={styles.logoIcone}>
          🥖
        </div>

        <div>

          <div style={styles.nomeSistema}>
            ERP Padaria
          </div>

          <div style={styles.versao}>
            Professional Edition v2.0
          </div>

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "30px"

  },

  titulo: {

    margin: 0,

    fontSize: "34px",

    fontWeight: "700",

    color: "#0F172A"

  },

  data: {

    marginTop: "8px",

    color: "#64748B",

    fontSize: "16px"

  },

  logo: {

    display: "flex",

    alignItems: "center",

    gap: "15px",

    background: "#FFFFFF",

    padding: "18px 22px",

    borderRadius: "18px",

    boxShadow: "0 4px 18px rgba(0,0,0,.06)"

  },

  logoIcone: {

    width: "60px",

    height: "60px",

    background: "#D97706",

    borderRadius: "16px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "28px"

  },

  nomeSistema: {

    fontWeight: "700",

    fontSize: "20px",

    color: "#0F172A"

  },

  versao: {

    color: "#64748B",

    marginTop: "4px"

  }

};