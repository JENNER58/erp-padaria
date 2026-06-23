export default function StatCard({

  titulo,
  valor,
  subtitulo,
  icone,
  cor = "#2563EB"

}) {

  return (

    <div style={styles.card}>

      <div
        style={{
          ...styles.icone,
          background: cor
        }}
      >

        {icone}

      </div>

      <div style={{ flex: 1 }}>

        <div style={styles.titulo}>
          {titulo}
        </div>

        <div style={styles.valor}>
          {valor}
        </div>

        <div style={styles.subtitulo}>
          {subtitulo}
        </div>

      </div>

    </div>

  )

}

const styles = {

  card: {

    background: "#FFFFFF",

    borderRadius: "18px",

    padding: "22px",

    display: "flex",

    alignItems: "center",

    gap: "20px",

    boxShadow: "0 4px 18px rgba(0,0,0,.06)",

    transition: ".25s",

    border: "1px solid #E2E8F0"

  },

  icone: {

    width: "64px",

    height: "64px",

    borderRadius: "18px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    color: "#fff"

  },

  titulo: {

    fontSize: "14px",

    color: "#64748B",

    marginBottom: "8px"

  },

  valor: {

    fontSize: "30px",

    fontWeight: "700",

    color: "#0F172A"

  },

  subtitulo: {

    marginTop: "6px",

    fontSize: "13px",

    color: "#94A3B8"

  }

}