"use client";

import { useState } from "react";

type Empresa = {
  ticker: string;
  nome: string;
  razaoSocial: string;
  setor: string;
  segmento: string;
  status: "ATIVA" | "INATIVA";
};

const empresasIniciais: Empresa[] = [
  {
    ticker: "PETR4",
    nome: "Petrobras",
    razaoSocial: "Petróleo Brasileiro S.A.",
    setor: "Petróleo, Gás e Biocombustíveis",
    segmento: "Petróleo",
    status: "ATIVA",
  },
  {
    ticker: "VALE3",
    nome: "Vale",
    razaoSocial: "Vale S.A.",
    setor: "Materiais Básicos",
    segmento: "Mineração",
    status: "ATIVA",
  },
  {
    ticker: "WEGE3",
    nome: "WEG",
    razaoSocial: "WEG S.A.",
    setor: "Bens Industriais",
    segmento: "Máquinas e Equipamentos",
    status: "ATIVA",
  },
  {
    ticker: "ITUB4",
    nome: "Itaú Unibanco",
    razaoSocial: "Itaú Unibanco Holding S.A.",
    setor: "Financeiro",
    segmento: "Bancos",
    status: "ATIVA",
  },
];

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState(empresasIniciais);
  const [busca, setBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const empresasFiltradas = empresas.filter((empresa) => {
    const termo = busca.toLowerCase();

    return (
      empresa.ticker.toLowerCase().includes(termo) ||
      empresa.nome.toLowerCase().includes(termo)
    );
  });

  function excluirEmpresa(ticker: string) {
    const confirmar = window.confirm(
      `Deseja realmente excluir ${ticker}?`
    );

    if (!confirmar) return;

    setEmpresas((empresas) =>
      empresas.filter((empresa) => empresa.ticker !== ticker)
    );
  }

  return (
    <div>
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8">
        <div>
          <h2 className="text-2xl font-bold">
            Empresas
          </h2>

          <p className="text-sm text-gray-500">
            Gerencie as empresas cadastradas
          </p>
        </div>

        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-pink-500 hover:bg-pink-600 px-5 py-2.5 rounded-lg font-medium transition"
        >
          + Nova empresa
        </button>
      </header>

      <div className="p-8">
        <div className="bg-[#111111] border border-white/10 rounded-xl">
          <div className="p-5 border-b border-white/10">
            <input
              type="text"
              placeholder="Pesquisar por ticker ou nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full md:w-96 bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-pink-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Ticker
                  </th>

                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Empresa
                  </th>

                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Setor
                  </th>

                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Segmento
                  </th>

                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {empresasFiltradas.map((empresa) => (
                  <tr
                    key={empresa.ticker}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-5">
                      <span className="font-bold">
                        {empresa.ticker}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-medium">
                        {empresa.nome}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {empresa.razaoSocial}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-400">
                      {empresa.setor}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-400">
                      {empresa.segmento}
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                        {empresa.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            excluirEmpresa(empresa.ticker)
                          }
                          className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {empresasFiltradas.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                Nenhuma empresa encontrada.
              </div>
            )}
          </div>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-[#151515] border border-white/10 rounded-2xl p-7">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  Nova empresa
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Cadastre uma nova empresa no sistema
                </p>
              </div>

              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-gray-500 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <form className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-400">
                  Ticker
                </label>

                <input
                  placeholder="PETR4"
                  className="mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Nome
                </label>

                <input
                  placeholder="Petrobras"
                  className="mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-400">
                  Razão social
                </label>

                <input
                  placeholder="Petróleo Brasileiro S.A."
                  className="mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Setor
                </label>

                <input
                  placeholder="Petróleo, Gás e Biocombustíveis"
                  className="mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Segmento
                </label>

                <input
                  placeholder="Petróleo"
                  className="mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 font-medium"
                >
                  Cadastrar empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}