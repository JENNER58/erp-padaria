import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { listarFinanceiro, salvarTransacao, calcularResumo } from '../../services/financeiroService'

export default function Financeiro() {
  const [descricao, setDescricao] = useState('')
  const [tipo, setTipo] = useState('entrada')
  const [valor, setValor] = useState('')
  const [lista, setLista] = useState([])
  const [resumo, setResumo] = useState({ receita: 0, despesa: 0, saldo: 0 })
  const [loading, setLoading] = useState(false)

  async function carregarDados() {
    const l = await listarFinanceiro()
    setLista(l)
    const r = await calcularResumo()
    setResumo(r)
  }

  useEffect(() => { carregarDados() }, [])

  async function salvar() {
    if (!descricao || !valor) {
      alert('Preencha todos os campos')
      return
    }

    setLoading(true)
    await salvarTransacao({
      descricao,
      tipo,
      valor: Number(valor),
      status: 'pendente'
    })
    setDescricao('')
    setValor('')
    await carregarDados()
    setLoading(false)
  }

  return (
    <Layout>
      <h1 style={titulo}>💰 Financeiro</h1>

      <div style={resumoCard}>
        <div>Receita: R$ {resumo.receita.toFixed(2)}</div>
        <div>Despesa: R$ {resumo.despesa.toFixed(2)}</div>
        <div>Saldo: R$ {resumo.saldo.toFixed(2)}</div>
      </div>

      <div style={card}>
        <input type="text" placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} style={input}/>
        <select value={tipo} onChange={e=>setTipo(e.target.value)} style={input}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input type="number" step="0.01" placeholder="Valor" value={valor} onChange={e=>setValor(e.target.value)} style={input}/>
        <button onClick={salvar} disabled={loading} style={botao}>{loading ? 'Salvando...' : 'Salvar'}</button>
      </div>

      <div style={listaCard}>
        <h2>📋 Histórico</h2>
        {lista.length === 0 && <p>Nenhuma transação cadastrada.</p>}
        {lista.map(item => (
          <div key={item.id} style={linha}>
            <span>{item.descricao}</span>
            <span>{item.tipo}</span>
            <span>R$ {Number(item.valor).toFixed(2)}</span>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </Layout>
  )
}

const titulo = { color:'#fff', marginBottom:'20px' }
const card = { background:'#1e293b', padding:'20px', borderRadius:'20px', display:'flex', flexDirection:'column', gap:'10px', maxWidth:'400px' }
const input = { padding:'10px', borderRadius:'10px', border:'none', outline:'none' }
const botao = { background:'#2563eb', color:'#fff', border:'none', padding:'10px', borderRadius:'10px', cursor:'pointer', fontWeight:'bold' }
const listaCard = { marginTop:'30px', background:'#1e293b', padding:'20px', borderRadius:'20px', color:'#fff' }
const linha = { display:'flex', justifyContent:'space-between', padding:'8px', marginTop:'5px', background:'#0f172a', borderRadius:'8px' }
const resumoCard = { display:'flex', justifyContent:'space-between', gap:'20px', marginBottom:'20px', padding:'20px', background:'#0f172a', borderRadius:'20px', color:'#fff' }