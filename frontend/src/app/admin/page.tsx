"use client";

import { api } from "@/services/api";
import { Estatistica } from "@/types";

import Link from "next/link";
import { useEffect, useState } from "react";


const empresasRecentes = [
  {
    ticker: "PETR4",
    nome: "Petrobras",
    setor: "Petróleo, Gás e Biocombustíveis",
  },
  {
    ticker: "VALE3",
    nome: "Vale",
    setor: "Materiais Básicos",
  },
  {
    ticker: "WEGE3",
    nome: "WEG",
    setor: "Bens Industriais",
  },
  {
    ticker: "ITUB4",
    nome: "Itaú Unibanco",
    setor: "Financeiro",
  },
];

export default function AdminDashboard() {
  const [dadosEstatisticas, setEstatisticas] = useState<Estatistica | null>(null);

  useEffect(() => {

    async function carregar() {
      const dados = await api.getEstatisticas();
      setEstatisticas(dados);

    }

    carregar();
  }, []);

  const estatisticas = [
  {
    titulo: "Empresas",
    valor: dadosEstatisticas?.empresas ?? 0,
    descricao: "cadastradas"
  },
  {
    titulo: "Indicadores",
    valor: dadosEstatisticas?.indicadores ?? 0,
    descricao: "registros"
  },
  {
    titulo: "Preços",
    valor: dadosEstatisticas?.precos ?? 0,
    descricao: "registros"
  },
  {
    titulo: "Dividendos",
    valor: dadosEstatisticas?.dividendos ?? 0,
    descricao: "registros"
  }
];

  return (
    <div>
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-500">Visão geral do sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
            👤
          </div>

          <div>
            <p className="text-sm font-medium">Administrador</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {estatisticas.map((item) => (
            <div
              key={item.titulo}
              className="bg-[#111111] border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{item.titulo}</span>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold">{item.valor}</p>

                <p className="text-xs text-gray-500 mt-1">{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-[#111111] border border-white/10 rounded-xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  Empresas cadastradas recentemente
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Últimos registros adicionados
                </p>
              </div>

              <Link
                href="/admin/empresas"
                className="text-sm text-pink-400 hover:text-pink-300"
              >
                Ver todas
              </Link>
            </div>

            <div className="divide-y divide-white/10">
              {empresasRecentes.map((empresa) => (
                <div
                  key={empresa.ticker}
                  className="p-5 flex items-center justify-between hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center font-bold">
                      {empresa.ticker.slice(0, 2)}
                    </div>

                    <div>
                      <p className="font-semibold">{empresa.ticker}</p>

                      <p className="text-sm text-gray-400">{empresa.nome}</p>
                    </div>
                  </div>

                  <span className="text-xs text-gray-500 max-w-48 text-right">
                    {empresa.setor}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold">Ações rápidas</h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/admin/empresas"
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <span>🏢</span>

                <div>
                  <p className="text-sm font-medium">Gerenciar empresas</p>

                  <p className="text-xs text-gray-500">
                    Cadastrar ou editar empresas
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/indicadores"
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <span>📊</span>

                <div>
                  <p className="text-sm font-medium">Adicionar indicadores</p>

                  <p className="text-xs text-gray-500">
                    Inserir dados financeiros
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/precos"
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <span>💹</span>

                <div>
                  <p className="text-sm font-medium">Atualizar preços</p>

                  <p className="text-xs text-gray-500">
                    Gerenciar histórico de preços
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/dividendos"
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <span>💰</span>

                <div>
                  <p className="text-sm font-medium">Gerenciar dividendos</p>

                  <p className="text-xs text-gray-500">Adicionar pagamentos</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
