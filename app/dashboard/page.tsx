'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  User,
  Home,
  Ticket,
  CalendarClock,
  Trophy,
  Gift,
  Wallet,
  ArrowRight,
  Sparkles,
  BarChart3,
  Shield,
  Crown,
  Clock3,
  Layers3,
  CircleCheckBig,
  Lock,
  LayoutDashboard,
  CheckCircle2,
  LogOut,
  ChevronRight,
  AlertCircle,
  Gem,
  CreditCard,
  Star,
  FileText,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const planosConfig = {
  essencial: {
    nome: 'Essencial',
    cuponsPorSemana: 4,
    cuponsUsados: 1,
    proximaAtualizacao: 'Nova liberação em 6 dias',
    renovacao: '12 de abril',
    beneficiosAtivos: 2,
    ultimoBeneficio: 'Acesso inicial liberado',
    destaque: 'Entrada inteligente',
    statusConta: 'Ativa',
    corBadge: 'bg-slate-100 text-slate-700',
    corCard: 'from-slate-700 to-slate-800',
    economiaEstimada: 'R$ 39',
  },
  pro: {
    nome: 'Pro',
    cuponsPorSemana: 8,
    cuponsUsados: 3,
    proximaAtualizacao: 'Nova liberação em 4 dias',
    renovacao: '12 de abril',
    beneficiosAtivos: 3,
    ultimoBeneficio: 'Benefício ampliado liberado',
    destaque: 'Mais escolhido',
    statusConta: 'Ativa',
    corBadge: 'bg-green-100 text-green-700',
    corCard: 'from-green-500 to-green-600',
    economiaEstimada: 'R$ 92',
  },
  premium: {
    nome: 'Premium',
    cuponsPorSemana: 12,
    cuponsUsados: 4,
    proximaAtualizacao: 'Nova liberação em 2 dias',
    renovacao: '12 de abril',
    beneficiosAtivos: 4,
    ultimoBeneficio: 'Transferência via Pix',
    destaque: 'Experiência completa',
    statusConta: 'Ativa',
    corBadge: 'bg-blue-100 text-blue-700',
    corCard: 'from-blue-600 to-blue-700',
    economiaEstimada: 'R$ 168',
  },
} as const;

type PlanoKey = keyof typeof planosConfig;

type NotificationItem = {
  title: string;
  description: string;
};

type HistoryItem = {
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'success' | 'info' | 'neutral';
};

export default function DashboardPage() {
  const [openNotif, setOpenNotif] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [planoAtivo, setPlanoAtivo] = useState<PlanoKey | null>(null);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 14 * 60 + 38);
  const [userName, setUserName] = useState('Otavio');
  const [userEmail, setUserEmail] = useState('');
  const [billingStatus, setBillingStatus] = useState('paid');

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
    const storedEmail = localStorage.getItem('user_email');
    const storedBilling = localStorage.getItem('billing_status');

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    if (storedBilling) setBillingStatus(storedBilling);

    setAssinaturaAtiva(ativa);

    if (ativa && plano && planosConfig[plano]) {
      setPlanoAtivo(plano);
    } else {
      setPlanoAtivo(null);
    }

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

  const planoAtual = useMemo(() => {
    if (!assinaturaAtiva || !planoAtivo) return null;
    return planosConfig[planoAtivo];
  }, [assinaturaAtiva, planoAtivo]);

  const percentualUso = planoAtual
    ? (planoAtual.cuponsUsados / planoAtual.cuponsPorSemana) * 100
    : 0;

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  const historicoPremium: HistoryItem[] = planoAtual
    ? [
        {
          titulo: 'Liberação semanal concluída',
          descricao: `Os recursos do plano ${planoAtual.nome} foram disponibilizados conforme o ciclo atual.`,
          data: 'Hoje, 09:12',
          tipo: 'success',
        },
        {
          titulo: 'Benefício do período disponível',
          descricao:
            'Um novo benefício foi ativado para membros com assinatura válida.',
          data: 'Ontem, 18:40',
          tipo: 'info',
        },
        {
          titulo: 'Resultado da última apuração publicado',
          descricao:
            'O número do último ciclo já está disponível para consulta.',
          data: '26 mar, 20:05',
          tipo: 'neutral',
        },
        {
          titulo: 'Renovação do plano confirmada',
          descricao:
            'Sua assinatura segue ativa e pronta para os próximos ciclos.',
          data: '24 mar, 08:21',
          tipo: 'success',
        },
      ]
    : [];

  const beneficiosPremium = planoAtual
    ? [
        {
          titulo: `Acesso prioritário ${planoAtual.nome}`,
          descricao:
            'Disponível conforme o nível do plano ativo neste ciclo.',
          tag: 'Ativo',
        },
        {
          titulo: 'Benefício exclusivo do período',
          descricao:
            'Recurso especial liberado conforme as condições atuais da plataforma.',
          tag: planoAtual.nome,
        },
        {
          titulo: 'Acesso antecipado a novidade',
          descricao:
            'Disponível em períodos específicos para planos com maior nível.',
          tag: 'Novo',
        },
      ]
    : [];

  const comparativoPlanos = [
    { key: 'essencial', nome: 'Essencial', cupons: 4, destaque: planoAtivo === 'essencial' },
    { key: 'pro', nome: 'Pro', cupons: 8, destaque: planoAtivo === 'pro' },
    { key: 'premium', nome: 'Premium', cupons: 12, destaque: planoAtivo === 'premium' },
  ];

  const notifications: NotificationItem[] = assinaturaAtiva && planoAtual
    ? [
        {
          title: `Sua assinatura ${planoAtual.nome} está ativa`,
          description: 'Sua conta está pronta para os próximos ciclos.',
        },
        {
          title: 'Liberação semanal atualizada',
          description: 'Seu painel foi sincronizado com o ciclo atual.',
        },
        {
          title: 'Apuração programada',
          description: 'O próximo fechamento segue previsto para hoje às 20h.',
        },
      ]
    : [
        {
          title: 'Sua conta foi criada com sucesso',
          description: 'Agora falta ativar um plano para liberar a experiência completa.',
        },
        {
          title: 'Acesso parcial ativo',
          description: 'Seu painel existe, mas resultados, carteira e histórico completo ainda estão bloqueados.',
        },
        {
          title: 'Próximo passo recomendado',
          description: 'Escolha um plano para transformar sua conta em uma experiência premium completa.',
        },
      ];

  const handleLogout = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('isLogged');
    localStorage.removeItem('assinatura_ativa');
    localStorage.removeItem('plano_ativo');
    localStorage.removeItem('plano_escolhido');
    localStorage.removeItem('fluxo_pagamento');
    localStorage.removeItem('billing_status');

    window.location.href = '/login';
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando painel...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-[60] border-b border-blue-400/20 bg-gradient-to-r from-[#1450ff] via-[#2158f5] to-[#173ec9] text-white shadow-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2.5 text-sm font-semibold">
          <Clock3 className="h-4 w-4" />
          <span>
            {assinaturaAtiva
              ? 'Próxima atualização do período em'
              : 'Sua conta está pronta. Próxima janela de atualização em'}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 font-bold tracking-wide">
            {formattedTime}
          </span>
        </div>
      </motion.div>

      <div className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <Home className="h-4 w-4" />
                Voltar ao site
              </Link>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Clube Pix Premium
                </h1>
                <p className="text-sm text-gray-500">
                  {assinaturaAtiva ? 'Painel do membro' : 'Conta criada com sucesso'}
                </p>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-3">
              <motion.button
                onClick={() => setOpenNotif(!openNotif)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-full border border-gray-200 bg-white p-3 shadow-sm transition hover:bg-gray-50"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-500"
                />
              </motion.button>

              <AnimatePresence>
                {openNotif && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl"
                  >
                    <p className="mb-3 text-sm font-semibold text-gray-900">
                      Notificações
                    </p>

                    <div className="space-y-3 text-sm text-gray-600">
                      {notifications.map((item, index) => (
                        <div key={index} className="rounded-xl bg-gray-50 p-3">
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="mt-1 text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/perfil"
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">
                    {assinaturaAtiva && planoAtual ? `Membro ${planoAtual.nome}` : 'Conta criada'}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </motion.header>

          {assinaturaAtiva && planoAtual ? (
            <>
              <section className="mb-8 grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.02 }}
                  whileHover={{ y: -3 }}
                  className={`overflow-hidden rounded-[28px] bg-gradient-to-br ${planoAtual.corCard} p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]`}
                >
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Painel principal
                  </div>

                  <h2 className="max-w-3xl text-4xl font-bold leading-tight">
                    Sua assinatura está ativa e pronta para os próximos ciclos
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                    Acompanhe seus recursos liberados, veja o histórico da conta,
                    consulte resultados publicados e tenha visão clara do que seu
                    plano deixa disponível neste momento.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/resultados"
                      className="inline-flex items-center rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                    >
                      Ver resultados
                    </Link>

                    <Link
                      href="/assinatura"
                      className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                    >
                      Ver assinatura
                    </Link>

                    <Link
                      href="/historico"
                      className="inline-flex items-center rounded-xl border border-white/25 bg-transparent px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
                    >
                      Ver histórico
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      ['Plano ativo', planoAtual.nome],
                      ['Status de cobrança', billingStatus === 'paid' ? 'Regular' : 'Revisar'],
                      ['Valor potencial do plano', planoAtual.economiaEstimada],
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                      >
                        <p className="text-sm text-white/70">{item[0]}</p>
                        <p className="mt-2 text-2xl font-bold text-white">{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="grid gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 }}
                    {...cardHover}
                    className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
                        <Crown className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Plano atual</p>
                        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                          {planoAtual.nome}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-gray-600">
                      Seu plano define o nível de acesso da conta, prioridade interna
                      e quantidade de recursos visíveis por ciclo.
                    </p>

                    <div
                      className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${planoAtual.corBadge}`}
                    >
                      {planoAtual.destaque}
                    </div>
                  </motion.div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      {...cardHover}
                      className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100"
                    >
                      <p className="text-sm text-gray-500">Próxima apuração</p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900">
                        Hoje, 20h
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                        <CalendarClock className="h-4 w-4" />
                        Fechamento do ciclo atual
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.14 }}
                      {...cardHover}
                      className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100"
                    >
                      <p className="text-sm text-gray-500">Último resultado</p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900">
                        #928374
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                        <Trophy className="h-4 w-4" />
                        Resultado já publicado
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              <section className="mb-8 grid gap-5 md:grid-cols-4">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.18 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <Link
                    href="/cupons"
                    className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                      <Ticket className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-500">Recursos por ciclo</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      {planoAtual.cuponsPorSemana}
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">
                      Ver detalhes
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.22 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <Link
                    href="/beneficios"
                    className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-green-200 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                      <Gift className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-500">Benefícios ativos</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      {planoAtual.beneficiosAtivos}
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-600 opacity-0 transition group-hover:opacity-100">
                      Ver benefícios
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.26 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-500">Status da conta</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {planoAtual.statusConta}
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                    <Wallet className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-500">Último benefício</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    {planoAtual.ultimoBeneficio}
                  </h3>
                </motion.div>
              </section>

              <section className="mb-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
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
                        Como funciona sua assinatura
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Fluxo claro da conta até o benefício visível
                      </p>
                    </div>

                    <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Fluxo principal
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                      {[
                        ['Assinatura ativa', 'Seu plano fica válido'],
                        ['Liberação', 'Recursos aparecem no painel'],
                        ['Entrada no ciclo', 'Sua conta fica pronta'],
                      ].map((item, idx) => (
                        <div key={idx} className="contents">
                          <motion.div
                            whileHover={{ y: -3 }}
                            className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 text-center shadow-sm"
                          >
                            <p className="font-bold text-gray-900">{item[0]}</p>
                            <p className="mt-2 text-sm text-gray-500">{item[1]}</p>
                          </motion.div>
                          {idx < 2 && (
                            <div className="flex justify-center">
                              <ArrowRight className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        ['Apuração', 'O sistema fecha o ciclo'],
                        ['Resultado', 'Você consulta o número publicado'],
                        ['Benefício', 'Pode ser liberado conforme as regras'],
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -3 }}
                          className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 text-center shadow-sm"
                        >
                          <p className="font-bold text-gray-900">{item[0]}</p>
                          <p className="mt-2 text-sm text-gray-500">{item[1]}</p>
                        </motion.div>
                      ))}
                    </div>
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
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Seu status atual
                      </h2>
                      <p className="text-sm text-gray-500">Resumo imediato</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 shadow-sm">
                      <p className="text-sm text-gray-500">Plano</p>
                      <h3 className="mt-2 text-3xl font-bold text-gray-900">
                        {planoAtual.nome}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 shadow-sm">
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
                        <CircleCheckBig className="h-4 w-4" />
                        Pronto para o próximo ciclo
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 shadow-sm">
                      <p className="text-sm text-gray-500">Renovação</p>
                      <h3 className="mt-2 text-3xl font-bold text-gray-900">
                        {planoAtual.renovacao}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </section>

              <section className="mb-8 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
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
                        Liberação do seu plano
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Quantidade disponível no ciclo atual
                      </p>
                    </div>

                    <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {planoAtual.nome}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-[#f8fbff] p-5 ring-1 ring-blue-100">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600">Uso do ciclo</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {planoAtual.cuponsUsados} de {planoAtual.cuponsPorSemana} utilizados
                      </p>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-blue-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentualUso}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#1450ff] to-[#4f7bff]"
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-blue-700">
                      <Clock3 className="h-4 w-4" />
                      {planoAtual.proximaAtualizacao}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {comparativoPlanos.map((plano) => (
                      <motion.div
                        key={plano.key}
                        whileHover={{ y: -3 }}
                        className={`rounded-2xl border p-4 transition ${
                          plano.destaque
                            ? 'border-blue-300 bg-blue-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-gray-900">{plano.nome}</p>
                          {plano.destaque && (
                            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-3xl font-bold text-gray-900">
                          {plano.cupons}
                        </p>
                        <p className="text-sm text-gray-500">por ciclo</p>
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
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                        <Layers3 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Benefícios ativos
                        </h2>
                        <p className="text-sm text-gray-500">
                          Disponíveis agora
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/beneficios"
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Ver todos
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {beneficiosPremium.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 transition hover:shadow-sm"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-bold text-gray-900">{item.titulo}</p>
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {item.descricao}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
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
                        Histórico recente
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Últimas movimentações relevantes da conta
                      </p>
                    </div>

                    <Link
                      href="/historico"
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Ver completo
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {historicoPremium.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-5 transition hover:shadow-sm"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-bold text-gray-900">{item.titulo}</p>
                            <p className="mt-1 text-sm text-gray-600">
                              {item.descricao}
                            </p>
                          </div>

                          <div
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              item.tipo === 'success'
                                ? 'bg-green-100 text-green-700'
                                : item.tipo === 'info'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {item.data}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
                  >
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                      Próximos passos
                    </h2>

                    <div className="space-y-3">
                      {[
                        ['/assinatura', 'Ver detalhes da assinatura'],
                        ['/resultados', 'Consultar resultados publicados'],
                        ['/historico', 'Acompanhar histórico completo'],
                        ['/perfil', 'Atualizar perfil'],
                      ].map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 2 }}>
                          <Link
                            href={item[0]}
                            className="block rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:text-blue-600 hover:shadow-sm"
                          >
                            {item[1]}
                          </Link>
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
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                      Leitura rápida do produto
                    </h2>

                    <div className="space-y-3">
                      {[
                        [
                          'Assinatura ativa',
                          'Seu plano mantém a conta pronta para os próximos ciclos.',
                        ],
                        [
                          'Plano define acesso',
                          'A quantidade de recursos e a profundidade da experiência variam conforme o plano.',
                        ],
                        [
                          'Tudo aparece no painel',
                          'Tudo o que estiver ativo para a sua conta fica visível nesta área.',
                        ],
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-gray-900">
                            {item[0]}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">{item[1]}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="mb-8 grid gap-6 xl:grid-cols-[1.5fr_0.95fr]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.02 }}
                  whileHover={{ y: -3 }}
                  className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
                >
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Conta pronta para ativação
                  </div>

                  <h2 className="max-w-3xl text-4xl font-bold leading-tight">
                    Sua conta já foi criada. Agora falta ativar um plano para liberar a experiência completa.
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                    Você já está dentro da estrutura do produto, mas sua experiência
                    ainda está em modo inicial. Ao ativar um plano, você libera
                    resultados, histórico, carteira, assinatura e acesso completo
                    à jornada do membro.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/planos"
                      className="inline-flex items-center rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                    >
                      Ativar assinatura agora
                    </Link>

                    <Link
                      href="/assinatura"
                      className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                    >
                      Ver assinatura
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      ['Conta', 'Criada'],
                      ['Status', 'Sem assinatura'],
                      ['Próximo passo', 'Escolher plano'],
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                      >
                        <p className="text-sm text-white/70">{item[0]}</p>
                        <p className="mt-2 text-2xl font-bold text-white">{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 }}
                  {...cardHover}
                  className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                      <Lock className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status atual</p>
                      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                        Sem assinatura
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-600">
                    Sua conta existe, mas o acesso completo só será liberado após a ativação do plano.
                  </p>

                  <div className="mt-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Aguardando ativação
                  </div>

                  <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Você ainda está vendo apenas a camada inicial
                        </p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Resultados, histórico, carteira, benefícios e experiência premium só aparecem após a ativação.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

              <section className="mb-8 grid gap-5 md:grid-cols-4">
                {[
                  {
                    icon: LayoutDashboard,
                    title: 'Painel premium',
                    text: 'Liberado após assinatura',
                    bg: 'bg-blue-100',
                    color: 'text-blue-600',
                  },
                  {
                    icon: Gift,
                    title: 'Benefícios ativos',
                    text: 'Dependem do plano escolhido',
                    bg: 'bg-green-100',
                    color: 'text-green-600',
                  },
                  {
                    icon: Wallet,
                    title: 'Carteira e extrato',
                    text: 'Disponíveis no modo completo',
                    bg: 'bg-purple-100',
                    color: 'text-purple-600',
                  },
                  {
                    icon: Ticket,
                    title: 'Recursos do ciclo',
                    text: 'Variam conforme o plano',
                    bg: 'bg-yellow-100',
                    color: 'text-yellow-600',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.14 + idx * 0.04 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <p className="text-sm text-gray-500">Camada bloqueada</p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
                  </motion.div>
                ))}
              </section>

              <section className="mb-8 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                      <Layers3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Leitura rápida do produto
                      </h2>
                      <p className="text-sm text-gray-500">
                        Como funciona a lógica da conta
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      [
                        'Conta criada',
                        'Seu acesso inicial já existe e sua identidade na plataforma foi criada.',
                      ],
                      [
                        'Assinatura separada da conta',
                        'Criar conta não ativa automaticamente o plano premium.',
                      ],
                      [
                        'Upgrade dentro do produto',
                        'A assinatura é ativada depois, dentro da jornada do usuário.',
                      ],
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5"
                      >
                        <p className="font-bold text-gray-900">{item[0]}</p>
                        <p className="mt-2 text-sm leading-7 text-gray-600">{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="space-y-6"
                >
                  <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                        <Star className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          O que você está perdendo agora
                        </h2>
                        <p className="text-sm text-gray-500">
                          A experiência premium ainda não foi liberada
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        'Resultados completos publicados no painel',
                        'Histórico e movimentações da conta',
                        'Carteira, extrato e visão ampliada do produto',
                        'Benefícios e recursos do plano ativo',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                          <Lock className="mt-0.5 h-4 w-4 text-gray-500" />
                          <p className="text-sm leading-7 text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-green-200 bg-green-50 p-7 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Recomendação
                        </h2>
                        <p className="text-sm text-gray-500">
                          Próximo passo de conversão
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900">
                      Escolher um plano
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      Assim que a assinatura for ativada, sua conta muda automaticamente para o modo completo.
                    </p>

                    <div className="mt-5 space-y-3">
                      <Link
                        href="/planos"
                        className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-4 font-bold text-white transition hover:from-green-600 hover:to-green-700"
                      >
                        Ativar assinatura
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>

                      <Link
                        href="/assinatura"
                        className="flex w-full items-center justify-center rounded-2xl border border-gray-300 py-4 font-bold text-gray-700 transition hover:bg-gray-50"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100">
                      <FileText className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        O que acontece depois da ativação
                      </h2>
                      <p className="text-sm text-gray-500">
                        Sua jornada muda automaticamente
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ['1. Escolha o plano', 'Você define o nível de acesso da conta.'],
                      ['2. Ative a assinatura', 'O checkout conclui a entrada no fluxo premium.'],
                      ['3. Painel muda sozinho', 'Seu dashboard passa a exibir a experiência completa.'],
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5"
                      >
                        <p className="font-bold text-gray-900">{item[0]}</p>
                        <p className="mt-2 text-sm leading-7 text-gray-600">{item[1]}</p>
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
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Confiança da conta
                      </h2>
                      <p className="text-sm text-gray-500">Base institucional</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      'Sua conta já está criada e registrada na plataforma.',
                      'A assinatura depende de contratação separada.',
                      'Os recursos variam conforme plano, regras e disponibilidade.',
                    ].map((item, idx) => (
                      <div key={idx} className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-sm leading-7 text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-5 w-5 text-blue-600" />
                      <p className="text-sm leading-6 text-gray-700">
                        O painel foi pensado para separar claramente conta criada e assinatura ativa, deixando o fluxo mais profissional e pronto para backend real.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
