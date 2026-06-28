import {
  LayoutDashboard,
  Factory,
  CreditCard,
  Wallet,
  CalendarDays,
  Bell,
  Users,
  Settings
} from "lucide-react";

export const MENU = [
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
    rota: "/fechamento"
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