import {
  LayoutDashboard,
  Factory,
  CreditCard,
  Wallet,
  CalendarDays,
  Bell,
  Users,
  Settings,
  LogOut,
  Store
} from "lucide-react";

const menu = [
  {
    titulo: "Dashboard",
    icone: LayoutDashboard,
    rota: "/"
  },
  {
    titulo: "Produção",
    icone: Factory,
    rota: "/producao"
  },
  {
    titulo: "PIX",
    icone: CreditCard,
    rota: "/pix"
  },
  {
    titulo: "Financeiro",
    icone: Wallet,
    rota: "/financeiro"
  },
  {
    titulo: "Fechamentos",
    icone: CalendarDays,
    rota: "/fechamentos"
  },
  {
    titulo: "Notificações",
    icone: Bell,
    rota: "/notificacoes"
  },
  {
    titulo: "Usuários",
    icone: Users,
    rota: "/usuarios"
  },
  {
    titulo: "Configurações",
    icone: Settings,
    rota: "/configuracoes"
  }
];

export default function Sidebar() {

  const paginaAtual = window.location.pathname;

  return (

    <aside style={styles.sidebar}>

      <div>

        <div style={styles.logo}>

          <div style={styles.logoIcone}>
            <Store size={24} color="#fff" />
          </div>

          <div>

            <div style={styles.logoTitulo}>
              ERP Padaria
            </div>

            <div style={styles.logoVersao}>
              Professional v2.0
            </div>

          </div>

        </div>

        <nav style={styles.menu}>

          {
            menu.map(item => {

              const Icone = item.icone;

              const ativo =
                paginaAtual === item.rota;

              return (

                <a
                  key={item.rota}
                  href={item.rota}
                  style={{
                    ...styles.item,
                    ...(ativo ? styles.itemAtivo : {})
                  }}
                >

                  <Icone
                    size={20}
                  />

                  <span>
                    {item.titulo}
                  </span>

                </a>

              );

            })
          }

        </nav>

      </div>

      <div>

        <div style={styles.usuario}>

          <div style={styles.avatar}>
            J
          </div>

          <div>

            <div style={styles.nome}>
              Jenner Aviles
            </div>

            <div style={styles.cargo}>
              Administrador
            </div>

          </div>

        </div>

        <button style={styles.botaoSair}>

          <LogOut size={18} />

          <span>Sair</span>

        </button>

      </div>

    </aside>

  );

}

const styles = {

  sidebar: {

    position: "fixed",

    left: 0,

    top: 0,

    width: "260px",

    height: "100vh",

    background: "#1E293B",

    color: "#fff",

    display: "flex",

    flexDirection: "column",

    justifyContent: "space-between",

    padding: "25px 20px",

    boxSizing: "border-box",

    borderRight: "1px solid #334155"

  },

  logo: {

    display: "flex",

    alignItems: "center",

    gap: "15px",

    marginBottom: "40px"

  },

  logoIcone: {

    width: "50px",

    height: "50px",

    borderRadius: "14px",

    background: "#2563EB",

    display: "flex",

    justifyContent: "center",

    alignItems: "center"

  },

  logoTitulo: {

    fontWeight: "700",

    fontSize: "18px"

  },

  logoVersao: {

    color: "#CBD5E1",

    fontSize: "12px"

  },

  menu: {

    display: "flex",

    flexDirection: "column",

    gap: "8px"

  },

  item: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    color: "#E2E8F0",

    textDecoration: "none",

    padding: "14px",

    borderRadius: "12px",

    transition: "0.2s",

    fontWeight: "500"

  },

  itemAtivo: {

    background: "#2563EB",

    color: "#fff"

  },

  usuario: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    padding: "15px",

    borderTop: "1px solid #334155",

    marginTop: "20px"

  },

  avatar: {

    width: "45px",

    height: "45px",

    borderRadius: "50%",

    background: "#D97706",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontWeight: "700",

    color: "#fff"

  },

  nome: {

    fontWeight: "600"

  },

  cargo: {

    color: "#CBD5E1",

    fontSize: "13px"

  },

  botaoSair: {

    width: "100%",

    marginTop: "15px",

    background: "#DC2626",

    color: "#fff",

    border: "none",

    borderRadius: "12px",

    padding: "14px",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "10px",

    fontWeight: "600"

  }

};