'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Trophy,
  Ticket,
  Wallet,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Search,
  BarChart3,
  Shield,
  ArrowUpRight,
  Clock3,
  FileText,
  AlertCircle,
  BadgeCheck,
  Lock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ResultadoItem = {
  data: string;
  campanha: string;
  numeroSorteado: string;
  premiacao: string;
  seuCupom: string;
  status: string;
  acertou: boolean;
};

const historicoBase: ResultadoItem[] = [
  {
    data: '28/03/2026',
    campanha: 'Apuração principal de março',
    numeroSorteado: '#928374',
    premiacao: 'R$ 8.500',
    seuCupom: '#928374',
    status: 'Contemplado',
    acertou: true,
  },
  {
    data: '25/03/2026',
    campanha: 'Apuração semanal',
    numeroSorteado: '#837221',
    premiacao: 'R$ 5.000',
    seuCupom: '#761290',
    status: 'Não contemplado',
    acertou: false,
  },
  {
    data: '22/03/2026',
    campanha: 'Apuração especial',
    numeroSorteado: '#712938',
    premiacao: 'R$ 6.200',
    seuCupom: '#712111',
    status: 'Não contemplado',
    acertou: false,
  },
];

export default function ResultadosPage() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [searchTouched, setSearchTouched] = useState(false);
  const [showDemoResult, setShowDemoResult] = useState(true);

  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 14 * 60 + 38);

  const [ultimoCupom, setUltimoCupom] = useState('#928374');
  const [ultimoResultado, setUltimoResultado] = useState('#928374');
  const [valorApuracao, setValorApuracao] = useState('R$ 8.500');
  const [ultimaData, setUltimaData] = useState('28/03/2026');
  const [ultimoHorario, setUltimoHorario] = useState('20:00');

  const [historico, setHistorico] = useState<ResultadoItem[]>(historicoBase);

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
    // Aqui depois você pode substituir por algo como:
    // const response = await fetch('/api/resultados');
    // const data = await response.json();
    // setUltimoCupom(data.ultimoCupom);
    // setUltimoResultado(data.ultimoResultado);
    // setValorApuracao(data.valorApuracao);
    // setHistorico(data.historico);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 2 * 60 * 60 + 14 * 60 + 38;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo(() => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, [timeLeft]);

  const ultimoItem = historico[0];

  const statusUltimoResultado = useMemo(() => {
    if (!ultimoItem) {
      return {
        titulo: 'Sem dados recentes',
        descricao: 'Ainda não há um resultado recente para exibir nesta conta.',
        acertou: false,
      };
    }

    return {
      titulo: ultimoItem.acertou ? 'Cupom contemplado' : 'Cupom não contemplado',
      descricao: ultimoItem.acertou
        ? 'Seu cupom mais recente corresponde ao número sorteado da última apuração. O valor associado já pode ser visualizado na sua carteira.'
        : 'Seu cupom mais recente não correspondeu ao número sorteado da última apuração, mas você pode continuar acompanhando os próximos ciclos nesta área.',
      acertou: ultimoItem.acertou,
    };
  }, [ultimoItem]);

  const consultaDemo = useMemo(() => {
    if (!searchTouched || searchValue.trim() === '') {
      return {
        cupom: ultimoCupom,
        situacao: ultimoItem?.acertou ? 'Contemplado' : 'Não contemplado',
        valor: valorApuracao,
        acertou: !!ultimoItem?.acertou,
      };
    }

    const normalized = searchValue.trim().toUpperCase();

    if (
      normalized.includes('928374') ||
      normalized.includes('OTAVIO') ||
      normalized.includes('EMAIL')
    ) {
      return {
        cupom: '#928374',
        situacao: 'Contemplado',
        valor: 'R$ 8.500',
        acertou: true,
      };
    }

    return {
      cupom: normalized.startsWith('#') ? normalized : '#000000',
      situacao: 'Não contemplado',
      valor: '—',
      acertou: false,
    };
  }, [searchTouched, searchValue, ultimoCupom, ultimoItem, valorApuracao]);

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  const handleConsultar = () => {
    setSearchTouched(true);
    setShowDemoResult(true);

    // PLACEHOLDER BACKEND
    // Aqui depois você troca por consulta real:
    // await fetch(`/api/resultados/consulta?query=${encodeURIComponent(searchValue)}`)
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando resultados...
        </div>
      </div>
    );
  }

  if (!isLogged) return null;

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

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Shield className="h-4 w-4" />
            Consulta de resultados
          </div>
        </motion.div>

        {!assinaturaAtiva ? (
          <>
            <section className="mb-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
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
                  Os resultados completos ficarão disponíveis após ativar sua assinatura
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                  Esta área foi desenhada para mostrar apurações, histórico, status de
                  participação e consulta de cupons. No momento, ela está bloqueada
                  porque ainda falta ativar um plano.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/95">
                  <Clock3 className="h-4 w-4" />
                  Próxima janela do ciclo em
                  <span className="rounded-full bg-white/15 px-3 py-1 font-bold">
                    {formattedTime}
                  </span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    ['Status', 'Bloqueado'],
                    ['Resultados', 'Indisponíveis'],
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
                      Resultados bloqueados
                    </h2>
                  </div>
                </div>

                <div className="rounded-2xl bg-yellow-50 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    <AlertCircle className="h-4 w-4" />
                    Aguardando assinatura
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    Assim que um plano for ativado, esta área passa a mostrar as
                    apurações, o histórico e a leitura completa da sua participação.
                  </p>
                </div>

                <div className="mt-5">
                  <Link
                    href="/planos"
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
                  >
                    Ver planos
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
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
                  Esta área vai mostrar a leitura das apurações da conta
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    'Último número sorteado',
                    'Comparação com seu cupom',
                    'Histórico recente das apurações',
                    'Acesso direto para carteira e extrato',
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
                    Ativar plano
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </section>
          </>
        ) : (
          <>
            <section className="mb-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                {...cardHover}
                className="rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Última apuração
                </div>

                <h1 className="text-4xl font-bold leading-tight">
                  Último resultado já disponível
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-blue-100">
                  Consulte o número sorteado, o valor da apuração, o seu cupom mais
                  recente e o status da sua participação.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/95">
                  <Clock3 className="h-4 w-4" />
                  Próxima janela do ciclo em
                  <span className="rounded-full bg-white/15 px-3 py-1 font-bold">
                    {formattedTime}
                  </span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    ['Número sorteado', ultimoResultado],
                    ['Valor da apuração', valorApuracao],
                    ['Seu cupom', ultimoCupom],
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

                <div className="mt-6 flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      href="/carteira"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                    >
                      Ver carteira
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      href="/extrato"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                    >
                      Ver extrato
                      <FileText className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      statusUltimoResultado.acertou ? 'bg-green-100' : 'bg-gray-100'
                    }`}
                  >
                    <Trophy
                      className={`h-6 w-6 ${
                        statusUltimoResultado.acertou ? 'text-green-600' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status da sua participação</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {statusUltimoResultado.titulo}
                    </h2>
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl p-5 ${
                    statusUltimoResultado.acertou ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                      statusUltimoResultado.acertou
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {statusUltimoResultado.acertou ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {statusUltimoResultado.acertou
                      ? 'Participação confirmada'
                      : 'Participação registrada'}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {statusUltimoResultado.descricao}
                  </p>

                  <div className="mt-5">
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <Link
                        href="/carteira"
                        className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition ${
                          statusUltimoResultado.acertou
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {statusUltimoResultado.acertou
                          ? 'Ir para a carteira'
                          : 'Ver movimentação'}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-sm text-gray-500">Data</p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {ultimaData}
                    </h3>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-sm text-gray-500">Horário</p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {ultimoHorario}
                    </h3>
                  </motion.div>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    <BadgeCheck className="h-4 w-4" />
                    Estrutura pronta para backend
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Esta área já pode receber depois o resultado real da apuração, o
                    cupom do usuário, a contemplação e o histórico vindos de API.
                  </p>
                </div>
              </motion.div>
            </section>

            <section className="mb-8 grid gap-5 md:grid-cols-4">
              {[
                {
                  icon: <Ticket className="h-6 w-6 text-blue-600" />,
                  bg: 'bg-blue-100',
                  label: 'Seu último cupom',
                  value: ultimoCupom,
                  valueClass: 'text-3xl',
                },
                {
                  icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
                  bg: 'bg-purple-100',
                  label: 'Próxima apuração',
                  value: 'Hoje, 20h',
                  valueClass: 'text-3xl',
                },
                {
                  icon: <Wallet className="h-6 w-6 text-yellow-500" />,
                  bg: 'bg-yellow-100',
                  label: 'Valor da apuração',
                  value: valorApuracao,
                  valueClass: 'text-3xl',
                },
                {
                  icon: statusUltimoResultado.acertou ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  ),
                  bg: statusUltimoResultado.acertou ? 'bg-green-100' : 'bg-red-100',
                  label: 'Status',
                  value: statusUltimoResultado.acertou ? 'Acertou' : 'Sem contemplação',
                  valueClass: statusUltimoResultado.acertou
                    ? 'text-3xl text-green-700'
                    : 'text-2xl text-red-700',
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
                  <h3 className={`mt-2 font-bold text-gray-900 ${item.valueClass}`}>
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
                    <h2 className="text-2xl font-bold text-gray-900">Consultar cupom</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Verifique rapidamente um email ou número de cupom
                    </p>
                  </div>

                  <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Consulta rápida
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3"
                  >
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Digite seu email ou número do cupom"
                      className="w-full bg-transparent outline-none placeholder:text-gray-400"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleConsultar}
                    className="rounded-2xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
                  >
                    Consultar
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showDemoResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5"
                    >
                      <p className="text-sm text-gray-500">
                        Resultado da consulta demonstrativa
                      </p>

                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm text-gray-500">Cupom consultado</p>
                          <h3 className="mt-1 text-xl font-bold text-gray-900">
                            {consultaDemo.cupom}
                          </h3>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Situação</p>
                          <div className="mt-1">
                            {consultaDemo.acertou ? (
                              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                <CheckCircle2 className="h-4 w-4" />
                                {consultaDemo.situacao}
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                <XCircle className="h-4 w-4" />
                                {consultaDemo.situacao}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Valor</p>
                          <h3 className="mt-1 text-xl font-bold text-gray-900">
                            {consultaDemo.valor}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <Link
                            href="/carteira"
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                          >
                            Ver carteira
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                          <Link
                            href="/extrato"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-white"
                          >
                            Ver extrato
                            <FileText className="h-4 w-4" />
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Como ler este resultado
                    </h2>
                    <p className="text-sm text-gray-500">
                      O que importa nesta página
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-gray-700">
                  {[
                    [
                      '1. Veja o número sorteado',
                      'O principal resultado da apuração precisa aparecer primeiro.',
                    ],
                    [
                      '2. Compare com seu cupom',
                      'Você precisa saber imediatamente se houve contemplação.',
                    ],
                    [
                      '3. Confira o valor',
                      'O valor da apuração deve estar visível logo na parte superior.',
                    ],
                    [
                      '4. Acesse carteira e extrato',
                      'Depois da confirmação, a leitura natural da jornada segue para carteira e extrato.',
                    ],
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <p className="font-semibold text-gray-900">{item[0]}</p>
                      <p className="mt-1 text-gray-600">{item[1]}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    <FileText className="h-4 w-4" />
                    Observação institucional
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Esta página foi desenhada para leitura de apuração, conferência de
                    cupom e continuidade do fluxo financeiro. Em backend real, todos os
                    dados poderão vir de consulta autenticada.
                  </p>
                </div>
              </motion.div>
            </section>

            <section className="mb-8 grid gap-6 xl:grid-cols-2">
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
                      Consulte saldo, retirada e status do valor
                    </p>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  Quando houver contemplação, o valor associado pode ser acompanhado
                  na carteira com visão clara de saldo e retirada.
                </p>

                <Link
                  href="/carteira"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
                >
                  Ir para a carteira
                  <ArrowUpRight className="h-4 w-4" />
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
                    <h2 className="text-xl font-bold text-gray-900">Extrato</h2>
                    <p className="text-sm text-gray-500">
                      Visualize movimentações e registros da conta
                    </p>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  O extrato organiza entradas, saídas e registros relacionados ao
                  saldo da carteira e à movimentação do valor.
                </p>

                <Link
                  href="/extrato"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Ver extrato
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </section>

            <section className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Histórico recente de apurações
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Resultados anteriores com valor, cupom e status
                  </p>
                </div>

                <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  Atualizado hoje
                </div>
              </div>

              <div className="space-y-4">
                {historico.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className={`rounded-2xl border p-5 ${
                      item.acertou
                        ? 'border-green-200 bg-green-50/40'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.7fr_0.8fr_0.8fr_0.8fr] xl:items-center">
                      <div>
                        <p className="text-sm text-gray-500">{item.data}</p>
                        <h3 className="mt-1 font-bold text-gray-900">{item.campanha}</h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Número sorteado</p>
                        <p className="mt-1 text-lg font-bold text-gray-900">
                          {item.numeroSorteado}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Seu cupom</p>
                        <p className="mt-1 text-lg font-bold text-gray-900">
                          {item.seuCupom}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Premiação</p>
                        <p className="mt-1 text-lg font-bold text-gray-900">
                          {item.premiacao}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="mt-1">
                          {item.acertou ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                              <CheckCircle2 className="h-4 w-4" />
                              {item.status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                              <XCircle className="h-4 w-4" />
                              {item.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Voltar ao painel
                </Link>

                <Link
                  href="/carteira"
                  className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Ir para a carteira
                </Link>

                <Link
                  href="/extrato"
                  className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Ver extrato
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}