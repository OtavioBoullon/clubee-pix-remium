'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Shield,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarClock,
  Filter,
  CheckCircle2,
  Clock3,
  Landmark,
  Search,
  CircleDollarSign,
  BadgeCheck,
  ChevronRight,
  AlertCircle,
  Lock,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type Filtro = 'todos' | 'entradas' | 'saidas' | 'configuracoes';

type Movimentacao = {
  id: number;
  data: string;
  hora: string;
  titulo: string;
  descricao: string;
  valor: string;
  tipo: 'entrada' | 'saida' | 'neutro';
  status: string;
  categoria: 'liberacao' | 'retirada' | 'configuracao';
};

const movimentacoesBase: Movimentacao[] = [
  {
    id: 1,
    data: '28/03/2026',
    hora: '20:14',
    titulo: 'Valor liberado na carteira',
    descricao: 'Entrada referente à última apuração contemplada.',
    valor: '+ R$ 8.500',
    tipo: 'entrada',
    status: 'Concluído',
    categoria: 'liberacao',
  },
  {
    id: 2,
    data: '12/03/2026',
    hora: '11:28',
    titulo: 'Retirada concluída',
    descricao: 'Transferência enviada para a conta cadastrada.',
    valor: '- R$ 3.200',
    tipo: 'saida',
    status: 'Concluído',
    categoria: 'retirada',
  },
  {
    id: 3,
    data: '03/03/2026',
    hora: '09:42',
    titulo: 'Atualização de conta bancária',
    descricao: 'Dados de destino alterados com sucesso.',
    valor: '—',
    tipo: 'neutro',
    status: 'Atualizado',
    categoria: 'configuracao',
  },
  {
    id: 4,
    data: '01/03/2026',
    hora: '20:03',
    titulo: 'Valor liberado na carteira',
    descricao: 'Entrada registrada após fechamento da apuração.',
    valor: '+ R$ 2.400',
    tipo: 'entrada',
    status: 'Concluído',
    categoria: 'liberacao',
  },
  {
    id: 5,
    data: '26/02/2026',
    hora: '10:17',
    titulo: 'Solicitação de retirada',
    descricao: 'Solicitação registrada e enviada para processamento.',
    valor: '- R$ 1.200',
    tipo: 'saida',
    status: 'Em análise',
    categoria: 'retirada',
  },
];

export default function ExtratoPage() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);

  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [busca, setBusca] = useState('');

  const [saldoDisponivel, setSaldoDisponivel] = useState(8500);
  const [totalEntradas, setTotalEntradas] = useState(10900);
  const [totalSaidas, setTotalSaidas] = useState(4400);
  const [periodoAtual, setPeriodoAtual] = useState('Março/2026');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('Hoje, 20:14');

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(movimentacoesBase);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const logged = localStorage.getItem('isLogged') === 'true';
    const ativa = localStorage.getItem('assinatura_ativa') === 'true';

    if (!logged) {
      window.location.href = '/login';
      return;
    }

    setIsLogged(logged);
    setAssinaturaAtiva(ativa);

    // PLACEHOLDER BACKEND
    // Depois você pode substituir por:
    // const response = await fetch('/api/extrato');
    // const data = await response.json();
    // setSaldoDisponivel(data.saldoDisponivel);
    // setTotalEntradas(data.totalEntradas);
    // setTotalSaidas(data.totalSaidas);
    // setPeriodoAtual(data.periodoAtual);
    // setUltimaAtualizacao(data.ultimaAtualizacao);
    // setMovimentacoes(data.movimentacoes);
  }, []);

  const extratoFiltrado = useMemo(() => {
    return movimentacoes.filter((item) => {
      const matchFiltro =
        filtro === 'todos'
          ? true
          : filtro === 'entradas'
            ? item.tipo === 'entrada'
            : filtro === 'saidas'
              ? item.tipo === 'saida'
              : item.categoria === 'configuracao';

      const termo = busca.trim().toLowerCase();
      const matchBusca =
        termo.length === 0
          ? true
          : item.titulo.toLowerCase().includes(termo) ||
            item.descricao.toLowerCase().includes(termo) ||
            item.data.toLowerCase().includes(termo) ||
            item.status.toLowerCase().includes(termo);

      return matchFiltro && matchBusca;
    });
  }, [filtro, busca, movimentacoes]);

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando extrato...
        </div>
      </div>
    );
  }

  if (!isLogged) return null;

  if (!assinaturaAtiva) {
    return (
      <div className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao dashboard
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
              <Lock className="h-4 w-4" />
              Extrato bloqueado
            </div>
          </motion.div>

          <section className="mb-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              {...cardHover}
              className="rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Lock className="h-4 w-4" />
                Área pronta para ativação
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                O extrato completo ficará disponível após ativar sua assinatura
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                Esta área foi desenhada para mostrar entradas, retiradas, configurações
                da conta e toda a movimentação financeira associada à sua experiência.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ['Saldo disponível', '—'],
                  ['Movimentações', 'Bloqueadas'],
                  ['Próximo passo', 'Ativar plano'],
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-white p-5 text-gray-900 shadow-lg"
                  >
                    <p className="text-sm text-gray-500">{item[0]}</p>
                    <h3 className="mt-2 text-3xl font-bold">{item[1]}</h3>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/planos"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                >
                  Ativar assinatura
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status da área</p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Extrato indisponível
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  <AlertCircle className="h-4 w-4" />
                  Aguardando assinatura
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  Assim que a assinatura for ativada, esta área passa a exibir o
                  histórico completo de movimentações da conta.
                </p>
              </div>
            </motion.div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                O que você verá aqui depois
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Esta área vai mostrar a timeline financeira da conta
              </p>

              <div className="mt-6 space-y-4">
                {[
                  'Entradas liberadas na carteira',
                  'Saídas e retiradas processadas',
                  'Alterações de conta bancária',
                  'Busca e filtro por movimentação',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-gray-50 p-4 text-sm font-medium text-gray-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Próximo passo
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Libere esta área com a assinatura
              </p>

              <div className="mt-6">
                <Link
                  href="/planos"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
                >
                  Ver planos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href="/resultados"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos resultados
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Shield className="h-4 w-4" />
            Extrato da conta
          </div>
        </motion.div>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            {...cardHover}
            className="rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <FileText className="h-4 w-4" />
              Extrato principal
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Acompanhe todas as movimentações da sua conta
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Consulte entradas, retiradas, atualizações da conta e acompanhe o
              histórico financeiro da sua carteira com clareza e organização.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Saldo disponível', `R$ ${saldoDisponivel.toLocaleString('pt-BR')}`],
                ['Entradas no período', `R$ ${totalEntradas.toLocaleString('pt-BR')}`],
                ['Saídas no período', `R$ ${totalSaidas.toLocaleString('pt-BR')}`],
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-white p-5 text-gray-900 shadow-lg"
                >
                  <p className="text-sm text-gray-500">{item[0]}</p>
                  <h3 className="mt-2 text-3xl font-bold">{item[1]}</h3>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4" />
                Estrutura pronta para backend
              </div>
              <p className="text-sm leading-relaxed text-blue-50">
                Esta página já pode receber depois movimentações reais, filtros reais,
                saldo consolidado e histórico financeiro autenticado via API.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resumo do extrato</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Conta organizada
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-green-50 p-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Extrato atualizado
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Todas as movimentações recentes ficam centralizadas nesta página,
                incluindo entradas na carteira, retiradas e alterações da conta.
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Última atualização</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {ultimaAtualizacao}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Período consultado</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {periodoAtual}
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Wallet className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Saldo disponível',
              value: `R$ ${saldoDisponivel.toLocaleString('pt-BR')}`,
              className: 'text-3xl',
            },
            {
              icon: <ArrowDownLeft className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Entradas',
              value: `R$ ${totalEntradas.toLocaleString('pt-BR')}`,
              className: 'text-3xl',
            },
            {
              icon: <ArrowUpRight className="h-6 w-6 text-red-500" />,
              bg: 'bg-red-100',
              label: 'Saídas',
              value: `R$ ${totalSaidas.toLocaleString('pt-BR')}`,
              className: 'text-3xl',
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Período',
              value: periodoAtual,
              className: 'text-2xl',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}
              >
                {item.icon}
              </div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h3 className={`mt-2 font-bold text-gray-900 ${item.className}`}>
                {item.value}
              </h3>
            </motion.div>
          ))}
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Filtrar movimentações
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Consulte por tipo ou pesquise no extrato
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Filtro rápido
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {[
                ['todos', 'Todos'],
                ['entradas', 'Entradas'],
                ['saidas', 'Saídas'],
                ['configuracoes', 'Configurações'],
              ].map(([key, label]) => {
                const ativo = filtro === key;
                return (
                  <motion.button
                    key={key}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setFiltro(key as Filtro)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      ativo
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3"
            >
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Pesquisar movimentação"
                className="w-full bg-transparent outline-none placeholder:text-gray-400"
              />
              <Filter className="h-5 w-5 text-gray-400" />
            </motion.div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Filtro atual</p>
                <h3 className="mt-1 text-xl font-bold capitalize text-gray-900">
                  {filtro === 'todos' ? 'Todos' : filtro}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Resultados</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {extratoFiltrado.length}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Período</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {periodoAtual}
                </h3>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100">
                <Landmark className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Visão rápida da conta
                </h2>
                <p className="text-sm text-gray-500">Leitura institucional</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'Entradas aparecem no extrato',
                  'Toda liberação vinculada à carteira fica registrada com data e valor.',
                ],
                [
                  'Saídas também ficam visíveis',
                  'As retiradas podem ser consultadas com status e histórico.',
                ],
                [
                  'Alterações da conta são registradas',
                  'Atualizações cadastrais também compõem a timeline da conta.',
                ],
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="font-semibold text-gray-900">{item[0]}</p>
                  <p className="mt-1 text-sm text-gray-600">{item[1]}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4"
            >
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                <FileText className="h-4 w-4" />
                Estrutura pronta para backend
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                Os filtros, os totais do período e a lista do extrato podem ser
                facilmente conectados depois à API real da plataforma.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="mb-8 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Histórico de movimentações
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Entradas, retiradas e eventos da conta
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Atualizado hoje
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {extratoFiltrado.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-5 ${
                    item.tipo === 'entrada'
                      ? 'border-green-200 bg-green-50/40'
                      : item.tipo === 'saida'
                        ? 'border-red-200 bg-red-50/40'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="grid gap-4 xl:grid-cols-[0.8fr_1.3fr_0.7fr_0.7fr_0.7fr] xl:items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        {item.data} • {item.hora}
                      </p>
                      <p className="mt-1 font-bold text-gray-900">{item.titulo}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">{item.descricao}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Categoria</p>
                      <p className="mt-1 text-base font-semibold capitalize text-gray-900">
                        {item.categoria}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Valor</p>
                      <p
                        className={`mt-1 text-lg font-bold ${
                          item.tipo === 'entrada'
                            ? 'text-green-700'
                            : item.tipo === 'saida'
                              ? 'text-red-600'
                              : 'text-gray-700'
                        }`}
                      >
                        {item.valor}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                            item.tipo === 'entrada'
                              ? 'bg-green-100 text-green-700'
                              : item.tipo === 'saida'
                                ? item.status === 'Em análise'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {extratoFiltrado.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center"
              >
                <p className="text-base font-semibold text-gray-800">
                  Nenhuma movimentação encontrada
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Ajuste os filtros ou altere o termo da pesquisa.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -3 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Carteira</h2>
                <p className="text-sm text-gray-500">
                  Consulte saldo e retirada
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Se quiser continuar a jornada, a carteira reúne o saldo liberado e o
              fluxo de solicitação de retirada.
            </p>

            <Link
              href="/carteira"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
            >
              Ir para a carteira
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            whileHover={{ y: -3 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Resultados
                </h2>
                <p className="text-sm text-gray-500">
                  Volte para consultar apurações
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              A página de resultados continua sendo o ponto principal para
              acompanhar número sorteado, valor da apuração e status da participação.
            </p>

            <Link
              href="/resultados"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Voltar aos resultados
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}