import { supabase } from "../lib/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

//====================================================
// LISTA TODOS OS PIX
//====================================================

export async function listarPix() {
  const { data, error } = await supabase
    .from("pix_pagamentos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

//====================================================
// LISTA MENSALIDADES
//====================================================

export async function listarMensalidades() {
  const { data, error } = await supabase
    .from("mensalidades")
    .select("*")
    .order("competencia", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

//====================================================
// GERA PIX
//====================================================

export async function gerarPix(mensalidadeId) {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/mercadopago-pix`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        mensalidade_id: mensalidadeId,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.erro || "Erro ao gerar PIX");
  }

  return json;
}

//====================================================
// BUSCA PIX DE UMA MENSALIDADE
//====================================================

export async function buscarPixDaMensalidade(mensalidadeId) {
  const { data, error } = await supabase
    .from("pix_pagamentos")
    .select("*")
    .eq("mensalidade_id", mensalidadeId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

//====================================================
// CONSULTA STATUS DA MENSALIDADE
//====================================================

export async function buscarMensalidade(id) {
  const { data, error } = await supabase
    .from("mensalidades")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}