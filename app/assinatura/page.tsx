'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Crown,
  Shield,
  Layers3,
  Ticket,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  RefreshCcw,
  CreditCard,
  XCircle,
  FileText,
  HelpCircle,
  Wallet,
  History,
  BarChart3,
  AlertCircle,
  Clock3,
  Lock,
} from 'lucide-react';

type PlanoKey = 'essencial' | 'pro' | 'premium';

type HistoricoTipo = 'success' | 'info' | 'neutral';

const historicoAssinatura = [
  {
    data: '12/03/2026',
    titulo: 'Renovação confirmada',
    descricao: 'Sua assinatura foi renovada com sucesso para o novo ciclo.',
    tipo: 'success' as HistoricoTipo,
  },
  {
    data: '02/03/2026',
    titulo: 'Plano ativo mantido',
    descricao:
      'Seu plano atual permanece com acesso liberado e experiência consistente.',
    tipo: 'info' as HistoricoTipo,
  },
  {
    data: '18/02/2026',
    titulo: 'Atualização de cobrança',
    descricao: 'O método de pagamento foi revisado e mantido como válido.',
    tipo: 'neutral' as HistoricoTipo,
  },
];

const planosConfig = {
  essencial: {
    nome: 'Essencial',
    preco: '29,90',
    valor: 'R$ 29,90',
    renovacao: '12 de abril',
    cuponsPorSemana: 4,
    beneficiosAtivos: 2,
    prioridade: 'Padrão',
    experiencia: 'Inicial',
    resumo:
      'Entrada ideal para começar no clube com acesso ao painel, recursos básicos e experiência inicial.',
    recursos: [
      'Acesso inicial à plataforma',
      'Painel do assinante',
      'Consulta de resultados',
      'Visualização básica da experiência',
      'Benefícios de entrada conforme disponibilidade',
      'Suporte por email',
    ],
    corCard: 'from-slate-700 to-slate-800',
    corBadge: 'bg-slate-100 text-slate-700',
  },
  pro: {
    nome: 'Pro',
    preco: '59,90',
    valor: 'R$ 59,90',
    renovacao: '12 de abril',
    cuponsPorSemana: 8,
    beneficiosAtivos: 3,
    prioridade: 'Intermediária',
    experiencia: 'Ampliada',
    resumo:
      'Mais equilíbrio entre custo, acesso e amplitude da experiência dentro da plataforma.',
    recursos: [
      'Tudo do plano Essencial',
      'Acesso ampliado ao painel',
      'Mais recursos disponíveis por período',
      'Prioridade intermediária',
      'Benefícios ampliados conforme regras vigentes',
      'Suporte prioritário',
    ],
    corCard: 'from-green-500 to-green-600',
    corBadge: 'bg-green-100 text-green-700',
  },
  premium: {
    nome: 'Premium',
    preco: '99,90',
    valor: 'R$ 99,90',
    renovacao: '12 de abril',
    cuponsPorSemana: 12,
    beneficiosAtivos: 4,
    prioridade: 'Alta',
    experiencia: 'Completa',
    resumo:
      'Experiência mais completa para membros que buscam maior acesso, prioridade e visibilidade.',
    recursos: [
      'Tudo do plano Pro',
      'Acesso premium a recursos selecionados',
      'Mais prioridade na experiência',
      'Visualização ampliada de carteira e extrato',
      'Benefícios avançados conforme disponibilidade',
      'Suporte VIP',
    ],
    corCard: 'from-blue-600 to-blue-700',
    corBadge: 'bg-blue-100 text-blue-700',
  },
} as const;

const comparativoPlanos = [
  {
    key: 'essencial' as PlanoKey,
    nome: 'Essencial',
    preco: '29,90',
    recursos: [
      'Acesso inicial à plataforma',
      'Painel do assinante',
      'Consulta de resultados',
      'Experiência essencial',
    ],
  },
  {
    key: 'pro' as PlanoKey,
    nome: 'Pro',
    preco: '59,90',
    recursos: [
      'Tudo do plano Essencial',
      'Acesso ampliado ao painel',
      'Mais recursos por período',
      'Prioridade intermediária',
    ],
  },
  {
    key: 'premium' as PlanoKey,
    nome: 'Premium',
    preco: '99,90',
    recursos: [
      'Tudo do plano Pro',
      'Acesso premium a recursos selecionados',
      'Mais prioridade',
      'Experiência completa',
    ],
  },
];

export default function AssinaturaPage() {
  const [mounted, setMounted] = useState(false);
  const [planoAtivo, setPlanoAtivo] = useState<PlanoKey>('premium');
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(true);
  const [userName, setUserName] = useState('Otavio');
  const [billingStatus, setBillingStatus] = useState<'paid' | 'pending' | 'failed'>('paid');
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 14 * 60 + 38);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const isLogged = localStorage.getItem('isLogged') === 'true';
    if (!isLogged) {
      window.location.href = '/login';
      return;
    }

    const ativa = localStorage.getItem('assinatura_ativa') === 'true';
    const plano = localStorage.getItem('plano_ativo') as PlanoKey | null;
    const storedName = localStorage.getItem('user_name');
    const storedBilling = localStorage.getItem('billing_status');

    if (storedName) setUserName(storedName);
    if (storedBilling === 'paid' || storedBilling === 'pending' || storedBilling === 'failed') {
      setBillingStatus(storedBilling);
    }

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

  const statusPagamentoTexto =
    billingStatus === 'paid'
      ? 'Regular'
      : billingStatus === 'pending'
      ? 'Em análise'
      : 'Revisar';

  const statusPagamentoClass =
    billingStatus === 'paid'
      ? 'bg-green-100 text-green-700'
      : billingStatus === 'pending'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-700';

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando assinatura...
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
            href="/dashboard"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao dashboard
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <BadgeCheck className="h-4 w-4" />
            Minha assinatura
          </div>
        </motion.div>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            {...cardHover}
            className={`rounded-[28px] bg-gradient-to-br ${planoAtual.corCard} p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Gestão da assinatura
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              {assinaturaAtiva
                ? 'Sua assinatura está ativa e pronta para os próximos ciclos'
                : 'Sua conta já está pronta. Agora falta ativar o seu plano'}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              {assinaturaAtiva
                ? 'Consulte o plano atual, entenda o que está incluído, acompanhe a renovação e visualize as opções relacionadas à sua assinatura.'
                : 'Escolha e ative um plano para liberar a experiência completa da conta, com acesso ampliado, prioridade e recursos do clube.'}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/95">
              <Clock3 className="h-4 w-4" />
              Próxima atualização do ciclo em
              <span className="rounded-full bg-white/15 px-3 py-1 font-bold">
                {formattedTime}
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Plano atual', assinaturaAtiva ? planoAtual.nome : 'Sem assinatura'],
                ['Valor mensal', assinaturaAtiva ? planoAtual.valor : '—'],
                ['Próxima renovação', assinaturaAtiva ? planoAtual.renovacao : '—'],
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
                  href="/planos"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                >
                  {assinaturaAtiva ? 'Alterar plano' : 'Escolher plano'}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Link
                  href="/pagamento"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Ver pagamento
                  <CreditCard className="h-4 w-4" />
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Status da assinatura</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  {assinaturaAtiva ? 'Assinatura ativa' : 'Sem assinatura ativa'}
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className={`rounded-2xl p-5 ${
                assinaturaAtiva ? 'bg-green-50' : 'bg-yellow-50'
              }`}
            >
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                  assinaturaAtiva
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {assinaturaAtiva ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {assinaturaAtiva ? 'Renovação em dia' : 'Aguardando ativação'}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                {assinaturaAtiva
                  ? 'Sua assinatura segue válida e a conta continua apta a acessar os recursos e experiências ligados ao plano atual.'
                  : 'Sua conta existe, mas os recursos premium só serão liberados após a ativação de um plano.'}
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Próxima renovação</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {assinaturaAtiva ? planoAtual.renovacao : '—'}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Cobrança mensal</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {assinaturaAtiva ? planoAtual.valor : '—'}
                </h3>
              </motion.div>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Status do pagamento</p>
              <div
                className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${statusPagamentoClass}`}
              >
                <Lock className="h-4 w-4" />
                {statusPagamentoTexto}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Ticket className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Recursos por ciclo',
              value: assinaturaAtiva ? planoAtual.cuponsPorSemana : 0,
              className: 'text-3xl',
            },
            {
              icon: <Layers3 className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Benefícios ativos',
              value: assinaturaAtiva ? planoAtual.beneficiosAtivos : 0,
              className: 'text-3xl',
            },
            {
              icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Prioridade',
              value: assinaturaAtiva ? planoAtual.prioridade : 'Nenhuma',
              className: 'text-2xl',
            },
            {
              icon: <Crown className="h-6 w-6 text-yellow-500" />,
              bg: 'bg-yellow-100',
              label: 'Experiência',
              value: assinaturaAtiva ? planoAtual.experiencia : 'Inicial',
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
                  O que o seu plano libera
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Resumo prático do que está associado à sua assinatura
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {assinaturaAtiva ? `Plano ${planoAtual.nome}` : 'Conta sem plano'}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {assinaturaAtiva
                ? [
                    [
                      'Nível de acesso',
                      'Seu plano mantém uma camada coerente de acesso dentro da plataforma.',
                    ],
                    [
                      'Mais recursos disponíveis',
                      'A experiência do plano libera mais visibilidade sobre assinatura, resultado e painel.',
                    ],
                    [
                      'Prioridade compatível',
                      'Sua conta entra com prioridade correspondente ao plano escolhido.',
                    ],
                    [
                      'Acompanhamento completo',
                      'Você visualiza assinatura, histórico e recursos do produto com mais clareza.',
                    ],
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-5"
                    >
                      <p className="font-semibold text-gray-900">{item[0]}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {item[1]}
                      </p>
                    </motion.div>
                  ))
                : [
                    [
                      'Conta criada',
                      'Sua estrutura já existe, mas ainda falta ativar um plano.',
                    ],
                    [
                      'Sem acesso premium',
                      'Os recursos avançados só aparecem após a assinatura.',
                    ],
                    [
                      'Próximo passo',
                      'Escolher um plano para liberar a experiência completa.',
                    ],
                    [
                      'Painel inicial',
                      'Enquanto isso, sua conta permanece no modo inicial.',
                    ],
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-5"
                    >
                      <p className="font-semibold text-gray-900">{item[0]}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {item[1]}
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
                <CalendarClock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Resumo de renovação
                </h2>
                <p className="text-sm text-gray-500">Situação atual do ciclo</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                ['Plano atual', assinaturaAtiva ? planoAtual.nome : 'Sem assinatura'],
                ['Status', assinaturaAtiva ? 'Ativa' : 'Pendente'],
                ['Próxima renovação', assinaturaAtiva ? planoAtual.renovacao : '—'],
                ['Valor mensal', assinaturaAtiva ? planoAtual.valor : '—'],
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-500">{item[0]}</p>
                  <p className="mt-1 text-base font-semibold text-gray-900">
                    {item[1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mb-8 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Comparação de planos
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Veja rapidamente onde seu plano se posiciona
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Comparativo rápido
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {comparativoPlanos.map((plano, idx) => {
              const destaque = assinaturaAtiva && plano.key === planoAtivo;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`rounded-3xl border p-6 shadow-sm ${
                    destaque ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plano.nome}</h3>
                      <p className="mt-1 text-sm text-gray-500">R$ {plano.preco}/mês</p>
                    </div>

                    {destaque && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                        Seu plano
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {plano.recursos.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                        <p className="text-sm leading-relaxed text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/planos"
                      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                        destaque
                          ? 'border border-blue-300 bg-white text-blue-700 hover:bg-blue-100'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Ver detalhes
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                <History className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Histórico da assinatura
                </h2>
                <p className="text-sm text-gray-500">
                  Eventos recentes ligados ao plano
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {historicoAssinatura.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-4 ${
                    item.tipo === 'success'
                      ? 'border-green-200 bg-green-50/40'
                      : item.tipo === 'info'
                      ? 'border-blue-200 bg-blue-50/40'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <p className="text-sm text-gray-500">{item.data}</p>
                  <p className="mt-1 font-semibold text-gray-900">{item.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.descricao}
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
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100">
                <RefreshCcw className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Ações da assinatura
                </h2>
                <p className="text-sm text-gray-500">Opções rápidas da conta</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                ['/planos', assinaturaAtiva ? 'Alterar plano' : 'Escolher plano', <Crown key="1" className="h-4 w-4" />],
                ['/pagamento', 'Atualizar pagamento', <CreditCard key="2" className="h-4 w-4" />],
                ['/cancelar-assinatura', 'Cancelar assinatura', <XCircle key="3" className="h-4 w-4" />],
                ['/termos', 'Ver regras do plano', <FileText key="4" className="h-4 w-4" />],
                ['/suporte', 'Falar com suporte', <HelpCircle key="5" className="h-4 w-4" />],
              ].map((item, idx) => (
                <motion.div key={idx} whileHover={{ x: 2 }}>
                  <Link
                    href={item[0] as string}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    <span className="inline-flex items-center gap-2">
                      {item[2]}
                      {item[1]}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
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
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Carteira</h2>
                <p className="text-sm text-gray-500">
                  Continue para saldo e retirada
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Se quiser seguir o fluxo financeiro do produto, a carteira reúne o
              saldo disponível, a retirada e a conta vinculada.
            </p>

            <Link
              href="/carteira"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Regras rápidas
                </h2>
                <p className="text-sm text-gray-500">
                  Leitura institucional da assinatura
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'Cobrança recorrente',
                  'A assinatura opera por ciclo mensal com renovação vinculada à conta.',
                ],
                [
                  'Acesso conforme plano',
                  'O plano atual define a camada de experiência e os recursos visíveis.',
                ],
                [
                  'Cancelamento e alteração',
                  'Qualquer mudança de plano ou cancelamento deve seguir o fluxo da conta.',
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
      </div>
    </div>
  );
}