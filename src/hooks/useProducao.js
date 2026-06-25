import { useEffect, useState } from "react";

import {

    listarProducoes,

    salvarProducao

} from "../services/producaoService";

import {

    criarNotificacaoAutomatica

} from "../services/notificacaoService";

export default function useProducao(){

    const [tipoPao,setTipoPao]=useState("");

    const [quantidade,setQuantidade]=useState("");

    const [valorUnitario,setValorUnitario]=useState("");

    const [lista,setLista]=useState([]);

    const [loading,setLoading]=useState(false);

    async function carregarProducoes(){

        const dados=await listarProducoes();

        if(dados){

            setLista(dados);

        }

    }

    useEffect(()=>{

        carregarProducoes();

    },[]);

    async function salvar(){

        if(!tipoPao||!quantidade||!valorUnitario){

            alert("Preencha todos os campos");

            return;

        }

        setLoading(true);

        const valorTotal=

            Number(quantidade)*

            Number(valorUnitario);

        await salvarProducao({

            tipo_pao:tipoPao,

            quantidade:Number(quantidade),

            valor_unitario:Number(valorUnitario),

            valor_total:valorTotal

        });

        await criarNotificacaoAutomatica(

`🏭 Produção registrada

Tipo: ${tipoPao}

Quantidade: ${quantidade}

Valor Total: R$ ${valorTotal.toFixed(2)}`

        );

        setTipoPao("");

        setQuantidade("");

        setValorUnitario("");

        await carregarProducoes();

        setLoading(false);

    }

    return{

        tipoPao,

        setTipoPao,

        quantidade,

        setQuantidade,

        valorUnitario,

        setValorUnitario,

        lista,

        loading,

        salvar

    };

}