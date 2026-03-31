'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Ticket,
  Shield,
  CalendarClock,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronRight,
  Layers3,
  BadgeCheck,
  Clock3,
  Hash,
  Crown,
  BarChart3,
  AlertCircle,
  FileText,
  Wallet,
} from 'lucide-react';

type PlanoKey = 'essencial' | 'pro' | 'premium';

const planosConfig = {
  essencial: {
    nome: 'Essencial',
    cuponsPorSemana: 4,
    destaque: 'Entrada inteligente',
    corBadge: 'bg-slate-100 text-slate-700',
    corCard: 'from-slate-700 to-slate-800',
  },
  pro: {
    nome: 'Pro',
    cuponsPorSemana: 8,
    destaque: 'Mais escolhido',
    corBadge: 'bg-green-100 text-green-700',
    corCard: 'from-green-500 to-green-600',
  },
  premium: {
    nome: 'Premium',
    cuponsPorSemana: 12,
    destaque: 'Experiência completa',
    corBadge: 'bg-blue-100 text-blue-700',
    corCard: 'from-blue-600 to-blue-700',
  },
} as const;

const cuponsPorPlano: Record<
  PlanoKey,
  {
    numero: string;
    status: string;
    tipo: string;
    destaque?: boolean;
  }[]
> = {
  essencial: [
    { numero: '#182341', status: 'Ativo no ciclo', tipo: 'Cupom base', destaque: true },
    { numero: '#182342', status: 'Ativo no ciclo', tipo: 'Cupom base' },
    { numero: '#182343', status: 'Ativo no ciclo', tipo: 'Cupom base' },
    { numero: '#182344', status: 'Ativação elegível', tipo: 'Ativação elegível' },
  ],
  pro: [
    { numero: '#928374', status: 'Ativo no ciclo', tipo: 'Cupom principal', destaque: true },
    { numero: '#928375', status: 'Ativo no ciclo', tipo: 'Cupom ampliado' },
    { numero: '#928376', status: 'Ativo no ciclo', tipo: 'Cupom ampliado' },
    { numero: '#928377', status: 'Ativo no ciclo', tipo: 'Cupom ampliado' },
    { numero: '#928378', status: 'Reservado ao período', tipo: 'Prioridade intermediária' },
    { numero: '#928379', status: 'Reservado ao período', tipo: 'Prioridade intermediária' },
    { numero: '#928380', status: 'Elegível nesta semana', tipo: 'Cupom adicional' },
    { numero: '#928381', status: 'Elegível nesta semana', tipo: 'Cupom adicional' },
  ],
  premium: [
    { numero: '#761901', status: 'Ativo no ciclo', tipo: 'Cupom principal', destaque: true },
    { numero: '#761902', status: 'Ativo no ciclo', tipo: 'Cupom premium' },
    { numero: '#761903', status: 'Ativo no ciclo', tipo: 'Cupom premium' },
    { numero: '#761904', status: 'Ativo no ciclo', tipo: 'Cupom premium' },
    { numero: '#761905', status: 'Reservado ao período', tipo: 'Prioridade alta' },
    { numero: '#761906', status: 'Reservado ao período', tipo: 'Prioridade alta' },
    { numero: '#761907', status: 'Elegível nesta semana', tipo: 'Cupom ampliado' },
    { numero: '#761908', status: 'Elegível nesta semana', tipo: 'Cupom ampliado' },
    { numero: '#761909', status: 'Elegível nesta semana', tipo: 'Cupom ampliado' },
    { numero: '#761910', status: 'Elegível nesta semana', tipo: 'Cupom ampliado' },
    { numero: '#761911', status: 'Em observação do ciclo', tipo: 'Camada avançada' },
    { numero: '#761912', status: 'Em observação do ciclo', tipo: 'Camada avançada' },
  ],
};

export default function CuponsPage() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);
  const [planoAtivo, setPlanoAtivo] = useState<PlanoKey>('premium');
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 14 * 60 + 38);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const logged = localStorage.getItem('isLogged') === 'true';
    const ativa = localStorage.getItem('assinatura_ativa') === 'true';
    const plano = localStorage.getItem('plano_ativo') as PlanoKey | null;

    if (!logged) {
      window.location.href = '/login';
      return;
    }

    setIsLogged(logged);
    setAssinaturaAtiva(ativa);

    if (plano && planosConfig[plano]) {
      setPlanoAtivo(plano);
    } else {
      setPlanoAtivo('premium');
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 2 * 60 * 60 + 14 * 60 + 38;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const planoAtual = useMemo(() => planosConfig[planoAtivo], [planoAtivo]);
  const listaCupons = useMemo(() => cuponsPorPlano[planoAtivo], [planoAtivo]);

  const formattedTime = useMemo(() => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, [timeLeft]);

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando cupons...
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
            <Ticket className="h-4 w-4" />
            Gestão de cupons
          </div>
        </motion.div>

        {assinaturaAtiva ? (
          <>
            <section className="mb-8 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                {...cardHover}
                className={`rounded-[28px] bg-gradient-to-br ${planoAtual.corCard} p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]`}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Gestão operacional dos cupons
                </div>

                <h1 className="text-4xl font-bold leading-tight">
                  Seus cupons do ciclo atual já estão organizados nesta área
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                  Aqui você acompanha os números vinculados ao seu plano, o status
                  de cada cupom e a leitura prática do que está ativo nesta semana.
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
                    ['Plano atual', planoAtual.nome],
                    ['Cupons disponíveis', String(planoAtual.cuponsPorSemana)],
                    ['Ciclo atual', 'Semana ativa'],
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
                  <Link
                    href="/resultados"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                  >
                    Ver resultados
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/assinatura"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    Ver assinatura
                    <BadgeCheck className="h-4 w-4" />
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status do ciclo</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Cupons ativos
                    </h2>
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-green-50 p-5"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Leitura confirmada
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    Seus cupons já estão vinculados ao ciclo atual da assinatura e
                    podem ser acompanhados nesta área conforme o plano ativo.
                  </p>
                </motion.div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-sm text-gray-500">Camada</p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {planoAtual.nome}
                    </h3>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-sm text-gray-500">Posicionamento</p>
                    <div
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${planoAtual.corBadge}`}
                    >
                      {planoAtual.destaque}
                    </div>
                  </motion.div>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    <FileText className="h-4 w-4" />
                    Transparência
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Esta área organiza os números vinculados ao plano e ao ciclo atual.
                    Ela não representa promessa de ganho, retorno garantido ou resultado certo.
                  </p>
                </div>
              </motion.div>
            </section>

            <section className="mb-8 grid gap-5 md:grid-cols-4">
              {[
                {
                  icon: <Ticket className="h-6 w-6 text-blue-600" />,
                  bg: 'bg-blue-100',
                  label: 'Cupons do plano',
                  value: planoAtual.cuponsPorSemana,
                },
                {
                  icon: <Hash className="h-6 w-6 text-green-600" />,
                  bg: 'bg-green-100',
                  label: 'Primeiro número',
                  value: listaCupons[0]?.numero ?? '—',
                },
                {
                  icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
                  bg: 'bg-purple-100',
                  label: 'Ciclo',
                  value: 'Atual',
                },
                {
                  icon: <Clock3 className="h-6 w-6 text-yellow-500" />,
                  bg: 'bg-yellow-100',
                  label: 'Leitura',
                  value: 'Organizada',
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
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
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
                      Lista de cupons do ciclo
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Números disponíveis para sua conta nesta semana
                    </p>
                  </div>

                  <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {planoAtual.nome}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {listaCupons.map((cupom, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className={`rounded-2xl border p-5 ${
                        cupom.destaque
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-gray-500">{cupom.tipo}</p>
                        {cupom.destaque && (
                          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                            Principal
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl font-bold text-gray-900">
                        {cupom.numero}
                      </h3>

                      <div className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        {cupom.status}
                      </div>
                    </motion.div>
                  ))}
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Como ler seus cupons
                    </h2>
                    <p className="text-sm text-gray-500">
                      Organização prática desta área
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    [
                      'Número do cupom',
                      'Cada linha representa um número vinculado ao seu plano no ciclo atual.',
                    ],
                    [
                      'Status do ciclo',
                      'Mostra se o cupom está ativo, reservado ou elegível nesta semana.',
                    ],
                    [
                      'Tipo do cupom',
                      'Ajuda a diferenciar o papel daquele número dentro da sua experiência.',
                    ],
                    [
                      'Leitura rápida',
                      'A ideia desta área é transformar um card resumido do dashboard em visão operacional.',
                    ],
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <p className="font-semibold text-gray-900">{item[0]}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {item[1]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                    <Layers3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Leitura institucional
                    </h2>
                    <p className="text-sm text-gray-500">
                      Função desta página no produto
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-600">
                  Esta área existe para organizar os números do usuário em uma tela
                  própria, deixando o dashboard mais limpo e mais profissional. O
                  card “Cupons por semana” vira um ponto de entrada para detalhe.
                </p>
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                    <Crown className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Continuidade do fluxo
                    </h2>
                    <p className="text-sm text-gray-500">
                      Próximos passos naturais
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/beneficios"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <span>Ver benefícios ativos</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/resultados"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <span>Ir para resultados</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/assinatura"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <span>Ver assinatura</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </section>
          </>
        ) : (
          <>
            <section className="mb-8 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
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
                  Seus cupons aparecerão aqui assim que a assinatura for ativada
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                  Esta tela foi desenhada para organizar os números do ciclo da sua
                  conta. No momento, ela está bloqueada porque ainda falta ativar um plano.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    ['Plano', 'Sem assinatura'],
                    ['Cupons disponíveis', '0'],
                    ['Status', 'Bloqueado'],
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
                    <ChevronRight className="h-4 w-4" />
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                    <Lock className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Sem acesso aos cupons
                    </h2>
                  </div>
                </div>

                <div className="rounded-2xl bg-yellow-50 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    <AlertCircle className="h-4 w-4" />
                    Aguardando assinatura
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    Assim que um plano for ativado, esta área passa a exibir os números
                    vinculados à sua conta e o status do ciclo atual.
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
                  Esta área vai mostrar a camada operacional dos seus cupons
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    'Lista dos números do ciclo atual',
                    'Status de cada cupom',
                    'Organização por tipo e prioridade',
                    'Ligação direta com resultados e assinatura',
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
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}