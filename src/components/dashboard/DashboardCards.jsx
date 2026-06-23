import {
  Factory,
  Wallet,
  CreditCard,
  CircleDollarSign
} from "lucide-react";

import StatCard from "../StatCard";

export default function DashboardCards() {

  return (

    <div style={styles.grid}>

      <StatCard
        titulo="Produção Hoje"
        valor="0"
        subtitulo="Nenhuma produção registrada"
        cor="#2563EB"
        icone={<Factory size={30} />}
      />

      <StatCard
        titulo="Receita do Mês"
        valor="R$ 0,00"
        subtitulo="Atualizado agora"
        cor="#16A34A"
        icone={<Wallet size={30} />}
      />

      <StatCard
        titulo="PIX Pendentes"
        valor="0"
        subtitulo="Sem cobranças"
        cor="#D97706"
        icone={<CreditCard size={30} />}
      />

      <StatCard
        titulo="PIX Recebidos"
        valor="0"
        subtitulo="Mês atual"
        cor="#0891B2"
        icone={<CircleDollarSign size={30} />}
      />

    </div>

  )

}

const styles = {

  grid: {

    display: "grid",

    gridTemplateColumns: "repeat(4,1fr)",

    gap: "20px",

    marginBottom: "30px"

  }

}