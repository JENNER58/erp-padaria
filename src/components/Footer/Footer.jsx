export default function Footer() {

  return (

    <footer style={styles.footer}>

      <div>

        <strong>
          ERP Padaria Professional Edition
        </strong>

        <span style={styles.versao}>
          Versão 2.0
        </span>

      </div>

      <div style={styles.direitos}>
        © 2026 Jenner Rafael • Todos os direitos reservados
      </div>

    </footer>

  )

}

const styles = {

  footer: {

    height: "65px",

    background: "#FFFFFF",

    borderTop: "1px solid #E2E8F0",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    padding: "0 30px",

    color: "#64748B",

    fontSize: "14px"

  },

  versao: {

    marginLeft: "10px",

    color: "#2563EB",

    fontWeight: "600"

  },

  direitos: {

    fontSize: "13px"

  }

}