'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Gift,
  Shield,
  CalendarClock,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronRight,
  Layers3,
  BadgeCheck,
  Clock3,
  Crown,
  BarChart3,
  Ticket,
  Star,
  AlertCircle,
  FileText,
} from 'lucide-react';

type PlanoKey = 'essencial' | 'pro' | 'premium';

const planosConfig = {
  essencial: {
    nome: 'Essencial',
    beneficiosAtivos: 2,
    destaque: 'Entrada inteligente',
    corBadge: 'bg-slate-100 text-slate-700',
    corCard: 'from-slate-700 to-slate-800',
  },
  pro: {
    nome: 'Pro',
    beneficiosAtivos: 3,
    destaque: 'Mais escolhido',
    corBadge: 'bg-green-100 text-green-700',
    corCard: 'from-green-500 to-green-600',
  },
  premium: {
    nome: 'Premium',
    beneficiosAtivos: 4,
    destaque: 'Experiência completa',
    corBadge: 'bg-blue-100 text-blue-700',
    corCard: 'from-blue-600 to-blue-700',
  },
} as const;

const beneficiosPorPlano: Record<
  PlanoKey,
  {
    titulo: string;
    status: string;
    categoria: string;
    descricao: string;
    destaque?: boolean;
  }[]
> = {
  essencial: [
    {
      titulo: 'Acesso inicial ao painel',
      status: 'Ativo no plano',
      categoria: 'Entrada',
      descricao:
        'Visualização básica da experiência e leitura dos recursos principais da conta.',
      destaque: true,
    },
    {
      titulo: 'Consulta de resultados',
      status: 'Ativo no plano',
      categoria: 'Visibilidade',
      descricao:
        'Acompanhamento dos resultados e leitura institucional da plataforma.',
    },
  ],
  pro: [
    {
      titulo: 'Acesso ampliado ao painel',
      status: 'Ativo no plano',
      categoria: 'Experiência',
      descricao:
        'Mais profundidade na leitura da conta, com visão organizada da jornada do membro.',
      destaque: true,
    },
    {
      titulo: 'Prioridade intermediária',
      status: 'Ativo no plano',
      categoria: 'Camada do plano',
      descricao:
        'O plano posiciona a conta em uma camada superior à base, com maior relevância operacional.',
    },
    {
      titulo: 'Mais recursos por período',
      status: 'Ativo no plano',
      categoria: 'Disponibilidade',
      descricao:
        'A conta recebe uma experiência mais ampla conforme a lógica do plano e do ciclo atual.',
    },
  ],
  premium: [
    {
      titulo: 'Acesso premium a recursos selecionados',
      status: 'Ativo no plano',
      categoria: 'Premium',
      descricao:
        'Camada mais completa de experiência, com leitura ampliada do ambiente do membro.',
      destaque: true,
    },
    {
      titulo: 'Mais prioridade na experiência',
      status: 'Ativo no plano',
      categoria: 'Prioridade',
      descricao:
        'O plano posiciona a conta no nível mais alto de prioridade visual e operacional.',
    },
    {
      titulo: 'Visualização ampliada de carteira e extrato',
      status: 'Ativo no plano',
      categoria: 'Financeiro',
      descricao:
        'Leitura mais completa das áreas de acompanhamento financeiro da plataforma.',
    },
    {
      titulo: 'Suporte VIP',
      status: 'Ativo no plano',
      categoria: 'Atendimento',
      descricao:
        'Canal de suporte e tratamento percebido como camada superior da assinatura.',
    },
  ],
};

export default function BeneficiosPage() {
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
  const listaBeneficios = useMemo(
    () => beneficiosPorPlano[planoAtivo],
    [planoAtivo]
  );

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
          Carregando benefícios...
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
            <Gift className="h-4 w-4" />
            Benefícios ativos
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
                  Camada de valor da assinatura
                </div>

                <h1 className="text-4xl font-bold leading-tight">
                  Seus benefícios ativos estão organizados nesta área
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                  Aqui você acompanha o que o seu plano está liberando no momento,
                  com leitura clara do status, da categoria e da função de cada benefício.
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
                    ['Benefícios ativos', String(planoAtual.beneficiosAtivos)],
                    ['Camada', planoAtual.destaque],
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
                    href="/assinatura"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                  >
                    Ver assinatura
                    <BadgeCheck className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/cupons"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    Ver cupons
                    <Ticket className="h-4 w-4" />
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
                    <p className="text-sm text-gray-500">Status da camada</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Benefícios liberados
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
                    Os benefícios abaixo representam o que está ativo na sua assinatura
                    neste momento, conforme o plano e a lógica do produto.
                  </p>
                </motion.div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-sm text-gray-500">Plano</p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {planoAtual.nome}
                    </h3>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-sm text-gray-500">Status</p>
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
                    Esta área mostra a leitura dos recursos ativos do plano. Ela não
                    representa promessa de resultado, ganho ou entrega financeira garantida.
                  </p>
                </div>
              </motion.div>
            </section>

            <section className="mb-8 grid gap-5 md:grid-cols-4">
              {[
                {
                  icon: <Gift className="h-6 w-6 text-blue-600" />,
                  bg: 'bg-blue-100',
                  label: 'Benefícios ativos',
                  value: planoAtual.beneficiosAtivos,
                },
                {
                  icon: <Layers3 className="h-6 w-6 text-green-600" />,
                  bg: 'bg-green-100',
                  label: 'Camada do plano',
                  value: planoAtual.nome,
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
                  label: 'Status',
                  value: 'Ativo',
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
                      Benefícios ativos do ciclo
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      O que está liberado para a sua conta neste momento
                    </p>
                  </div>

                  <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {planoAtual.nome}
                  </div>
                </div>

                <div className="grid gap-4">
                  {listaBeneficios.map((beneficio, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className={`rounded-2xl border p-5 ${
                        beneficio.destaque
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-500">{beneficio.categoria}</p>
                          <h3 className="mt-1 text-xl font-bold text-gray-900">
                            {beneficio.titulo}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {beneficio.destaque && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                              Destaque
                            </span>
                          )}
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            {beneficio.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-gray-700">
                        {beneficio.descricao}
                      </p>
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
                      Como ler seus benefícios
                    </h2>
                    <p className="text-sm text-gray-500">
                      Organização prática desta área
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    [
                      'Título do benefício',
                      'Mostra claramente o que está ativo dentro da experiência do seu plano.',
                    ],
                    [
                      'Categoria',
                      'Ajuda a entender a natureza daquele benefício dentro do produto.',
                    ],
                    [
                      'Status',
                      'Indica se aquele item está efetivamente ativo no momento.',
                    ],
                    [
                      'Descrição',
                      'Traduz o papel do benefício para o usuário sem deixar a leitura confusa.',
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
                    <Star className="h-5 w-5 text-blue-600" />
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
                  Esta área existe para transformar o card resumido de “Benefícios ativos”
                  do dashboard em uma visão própria, mais organizada e com mais valor percebido.
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
                    href="/cupons"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <span>Ver cupons</span>
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
                  Seus benefícios ativos aparecerão aqui quando a assinatura for ativada
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                  Esta área foi desenhada para mostrar o que a conta libera dentro do plano.
                  No momento, ela está bloqueada porque ainda falta ativar a assinatura.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    ['Plano', 'Sem assinatura'],
                    ['Benefícios ativos', '0'],
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
                      Sem acesso aos benefícios
                    </h2>
                  </div>
                </div>

                <div className="rounded-2xl bg-yellow-50 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    <AlertCircle className="h-4 w-4" />
                    Aguardando assinatura
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    Assim que um plano for ativado, esta área passa a exibir os benefícios
                    vinculados à sua conta e a leitura do que está liberado no ciclo atual.
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
                  Esta área vai mostrar a camada de valor do plano
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    'Benefícios ativos do ciclo',
                    'Categoria de cada benefício',
                    'Status de disponibilidade',
                    'Descrição clara do que está liberado',
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
