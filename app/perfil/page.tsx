'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  User,
  Mail,
  Shield,
  CreditCard,
  Settings,
  CheckCircle2,
  BadgeCheck,
  CalendarClock,
  Crown,
  Save,
  Bell,
  Lock,
  Sparkles,
  AlertTriangle,
  Trash2,
  X,
  Ban,
  TriangleAlert,
  Phone,
  FileText,
  Wallet,
  History,
  ChevronRight,
} from 'lucide-react';

const planosInfo = {
  essencial: {
    nome: 'Essencial',
    renovacao: '12 de abril',
    cobranca: 'Mensal',
    valor: 'R$ 29,90',
    cor: 'bg-slate-100 text-slate-700',
  },
  pro: {
    nome: 'Pro',
    renovacao: '12 de abril',
    cobranca: 'Mensal',
    valor: 'R$ 59,90',
    cor: 'bg-green-100 text-green-700',
  },
  premium: {
    nome: 'Premium',
    renovacao: '12 de abril',
    cobranca: 'Mensal',
    valor: 'R$ 99,90',
    cor: 'bg-blue-100 text-blue-700',
  },
} as const;

type PlanoKey = keyof typeof planosInfo;

export default function PerfilPage() {
  const [mounted, setMounted] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);
  const [planoAtivo, setPlanoAtivo] = useState<PlanoKey | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteChecked, setDeleteChecked] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const [form, setForm] = useState({
    nome: 'Otavio Lopes',
    email: 'otavio@email.com',
    telefone: '',
    cpf: '',
  });

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

    if (storedName || storedEmail) {
      setForm((prev) => ({
        ...prev,
        nome: storedName || prev.nome,
        email: storedEmail || prev.email,
      }));
    }

    setAssinaturaAtiva(ativa);

    if (ativa && plano && planosInfo[plano]) {
      setPlanoAtivo(plano);
    } else {
      setPlanoAtivo(null);
    }
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_name', form.nome);
      localStorage.setItem('user_email', form.email);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3200);
  };

  const resetDeleteFlow = () => {
    setDeleteStep(1);
    setDeleteConfirmText('');
    setDeleteChecked(false);
    setShowDeleteModal(false);
    setDeleting(false);
  };

  const handleDeleteAccount = () => {
    if (typeof window === 'undefined') return;

    setDeleting(true);

    setTimeout(() => {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('assinatura_ativa');
      localStorage.removeItem('plano_ativo');
      localStorage.removeItem('plano_escolhido');
      localStorage.removeItem('fluxo_pagamento');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      localStorage.removeItem('billing_status');

      setDeleting(false);
      window.location.href = '/';
    }, 1400);
  };

  const handleCancelSubscription = () => {
    if (typeof window === 'undefined') return;

    setCanceling(true);

    setTimeout(() => {
      localStorage.setItem('assinatura_ativa', 'false');
      localStorage.removeItem('plano_ativo');

      setAssinaturaAtiva(false);
      setPlanoAtivo(null);
      setCanceling(false);
      setShowCancelModal(false);
      setCancelSuccess(true);

      setTimeout(() => setCancelSuccess(false), 3500);
    }, 1100);
  };

  const planoLabel = useMemo(() => {
    if (!assinaturaAtiva || !planoAtivo) return 'Sem assinatura';
    return planosInfo[planoAtivo].nome;
  }, [assinaturaAtiva, planoAtivo]);

  const statusConta = assinaturaAtiva ? 'Ativa' : 'Conta criada';
  const statusPlano = assinaturaAtiva ? `${planoLabel} ativo` : 'Sem assinatura';
  const proximaRenovacao =
    assinaturaAtiva && planoAtivo ? planosInfo[planoAtivo].renovacao : '—';
  const tipoCobranca =
    assinaturaAtiva && planoAtivo ? planosInfo[planoAtivo].cobranca : 'Não ativa';
  const valorPlano =
    assinaturaAtiva && planoAtivo ? planosInfo[planoAtivo].valor : '—';

  const podeExcluir =
    deleteStep === 2 &&
    deleteConfirmText.trim().toUpperCase() === 'EXCLUIR' &&
    deleteChecked;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando perfil...
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
        >
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para o dashboard
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 rounded-[32px] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.20)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <User className="h-12 w-12 text-white" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-wide text-blue-100">
                  Central do membro
                </p>
                <h1 className="mt-1 text-4xl font-bold">{form.nome.split(' ')[0] || 'Membro'}</h1>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-blue-100">
                  Gerencie seus dados, acompanhe o plano atual, revise o status da
                  conta e acesse rapidamente as áreas mais importantes da plataforma.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                {assinaturaAtiva ? `Plano ${planoLabel}` : 'Sem assinatura'}
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                {assinaturaAtiva ? 'Conta ativa' : 'Conta criada'}
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                {assinaturaAtiva ? 'Perfil verificado' : 'Perfil em andamento'}
              </span>
            </div>
          </div>
        </motion.section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Crown className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Plano atual',
              value: assinaturaAtiva ? planoLabel : 'Nenhum',
              className: 'text-3xl',
            },
            {
              icon: assinaturaAtiva ? (
                <Shield className="h-6 w-6 text-green-600" />
              ) : (
                <Lock className="h-6 w-6 text-gray-600" />
              ),
              bg: assinaturaAtiva ? 'bg-green-100' : 'bg-gray-100',
              label: 'Status da conta',
              value: assinaturaAtiva ? 'Ativa' : 'Sem assinatura',
              className: assinaturaAtiva ? 'text-3xl text-green-700' : 'text-3xl',
            },
            {
              icon: <BadgeCheck className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Perfil',
              value: 'Completo',
              className: 'text-3xl',
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-yellow-600" />,
              bg: 'bg-yellow-100',
              label: 'Próxima renovação',
              value: proximaRenovacao,
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

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Informações da conta
                  </h2>
                  <p className="text-sm text-gray-500">
                    Dados principais do membro
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.div whileHover={{ y: -2 }} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                    <input
                      type="text"
                      value={form.nome}
                      onChange={(e) => handleChange('nome', e.target.value)}
                      className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                        placeholder="Adicionar telefone"
                        className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CPF</label>
                  <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                    <input
                      type="text"
                      value={form.cpf}
                      onChange={(e) => handleChange('cpf', e.target.value)}
                      placeholder="Adicionar CPF"
                      className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
                >
                  Salvar alterações
                  <Save className="h-4 w-4" />
                </motion.button>

                <Link
                  href="/assinatura"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Ver assinatura
                </Link>
              </div>

              <AnimatePresence>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-5 rounded-2xl bg-green-50 p-4"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Alterações salvas
                    </div>
                    <p className="mt-3 text-sm text-gray-700">
                      Os dados do perfil foram atualizados nesta versão visual da
                      plataforma e depois poderão ser conectados ao backend real.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {cancelSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-5 rounded-2xl bg-yellow-50 p-4"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      <TriangleAlert className="h-4 w-4" />
                      Assinatura cancelada
                    </div>
                    <p className="mt-3 text-sm text-gray-700">
                      A assinatura foi desativada nesta versão visual do produto.
                      Sua conta continua existindo, mas agora está sem plano ativo.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Plano e assinatura
                  </h2>
                  <p className="text-sm text-gray-500">
                    Visão rápida do plano atual
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ['Plano atual', assinaturaAtiva ? planoLabel : 'Nenhum'],
                  ['Cobrança', tipoCobranca],
                  ['Valor', valorPlano],
                  ['Próxima renovação', proximaRenovacao],
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                  >
                    <p className="text-sm text-gray-500">{item[0]}</p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">
                      {item[1]}
                    </h3>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/assinatura"
                  className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 font-bold text-blue-700 transition hover:border-blue-600 hover:bg-blue-100"
                >
                  Gerenciar assinatura
                </Link>

                {assinaturaAtiva ? (
                  <>
                    <Link
                      href="/pagamento"
                      className="rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                    >
                      Ver pagamento
                    </Link>

                    <motion.button
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setShowCancelModal(true)}
                      className="rounded-xl border border-yellow-300 bg-yellow-50 px-6 py-3 font-bold text-yellow-700 transition hover:bg-yellow-100"
                    >
                      Cancelar assinatura
                    </motion.button>
                  </>
                ) : (
                  <Link
                    href="/planos"
                    className="rounded-xl border border-green-300 bg-green-50 px-6 py-3 font-bold text-green-700 transition hover:bg-green-100"
                  >
                    Ativar plano
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-red-200 bg-red-50 p-7 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-700">
                    Zona de risco
                  </h2>
                  <p className="text-sm text-red-500">
                    Ações permanentes e sensíveis da conta
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-red-200 bg-white/70 p-5">
                <p className="text-sm leading-7 text-gray-700">
                  A exclusão da conta remove o acesso à plataforma e encerra a
                  sessão atual desta versão do produto. Em integração real com
                  backend, esse fluxo exigiria confirmação reforçada, trilha de
                  auditoria e tratamento definitivo dos dados vinculados ao usuário.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    setDeleteStep(1);
                    setDeleteConfirmText('');
                    setDeleteChecked(false);
                    setShowDeleteModal(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white transition hover:bg-red-700"
                >
                  Excluir minha conta
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Resumo da conta
                  </h2>
                  <p className="text-sm text-gray-500">
                    Leitura rápida do perfil
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {[
                  ['Email principal', form.email],
                  ['Verificação', statusConta],
                  ['Nível do perfil', assinaturaAtiva ? 'Completo' : 'Inicial'],
                  ['Status do plano', statusPlano],
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <p className="text-gray-500">{item[0]}</p>
                    <p
                      className={`mt-1 font-semibold ${
                        item[1] === 'Ativa' || item[1] === 'Conta criada'
                          ? 'text-green-700'
                          : 'text-gray-900'
                      }`}
                    >
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
              transition={{ duration: 0.35, delay: 0.08 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Ações rápidas
                  </h2>
                  <p className="text-sm text-gray-500">
                    Caminhos úteis da conta
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {assinaturaAtiva
                  ? [
                      ['/resultados', 'Ver resultados'],
                      ['/carteira', 'Ver carteira'],
                      ['/historico', 'Ver histórico'],
                      ['/suporte', 'Falar com suporte'],
                    ].map((item, idx) => (
                      <motion.div key={idx} whileHover={{ x: 2 }}>
                        <Link
                          href={item[0]}
                          className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                        >
                          <span>{item[1]}</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    ))
                  : [
                      ['/planos', 'Ativar assinatura'],
                      ['/assinatura', 'Ver detalhes da assinatura'],
                      ['/dashboard', 'Voltar ao dashboard'],
                      ['/suporte', 'Falar com suporte'],
                    ].map((item, idx) => (
                      <motion.div key={idx} whileHover={{ x: 2 }}>
                        <Link
                          href={item[0]}
                          className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                        >
                          <span>{item[1]}</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.12 }}
              whileHover={{ y: -3 }}
              className={`rounded-[28px] border p-6 ${
                assinaturaAtiva
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    assinaturaAtiva ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}
                >
                  {assinaturaAtiva ? (
                    <Bell className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {assinaturaAtiva ? 'Perfil da conta' : 'Conta pronta para ativação'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {assinaturaAtiva
                      ? 'Visão central da experiência do membro'
                      : 'Sua estrutura já existe, falta ativar o plano'}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-700">
                {assinaturaAtiva
                  ? 'Esta área reúne informações essenciais da conta, facilitando o acesso à assinatura, pagamento, carteira e histórico do usuário em um só lugar.'
                  : 'Sua conta já foi criada com sucesso. Assim que um plano for ativado, esta área passará a mostrar a experiência completa do membro.'}
              </p>

              {!assinaturaAtiva && (
                <Link
                  href="/planos"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
                >
                  Ativar plano agora
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.16 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100">
                  <FileText className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Leitura institucional
                  </h2>
                  <p className="text-sm text-gray-500">
                    Regras e transparência da conta
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  [
                    'Conta e assinatura são diferentes',
                    'Sua conta pode continuar existindo mesmo sem um plano ativo.',
                  ],
                  [
                    'Assinatura define a experiência',
                    'O plano atual determina acesso, prioridade e recursos visíveis.',
                  ],
                  [
                    'Perfil pronto para backend',
                    'Os dados salvos aqui poderão depois ser conectados à lógica real da plataforma.',
                  ],
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-gray-50 p-4">
                    <p className="font-semibold text-gray-900">{item[0]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {item[1]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100">
                  <Ban className="h-6 w-6 text-yellow-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Cancelar assinatura
                  </h2>
                  <p className="text-sm text-gray-500">
                    Sua conta continuará existindo
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-4">
                <p className="text-sm leading-7 text-gray-700">
                  Ao cancelar a assinatura, sua conta deixa de ter um plano ativo,
                  mas seus dados de acesso continuam existindo. Você poderá voltar
                  e ativar um novo plano depois.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Voltar
                  <X className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {canceling ? 'Cancelando...' : 'Confirmar cancelamento'}
                  <Ban className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-[28px] bg-white p-7 shadow-2xl"
            >
              {deleteStep === 1 ? (
                <>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Excluir conta
                      </h2>
                      <p className="text-sm text-gray-500">
                        Etapa 1 de segurança
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-red-50 p-4">
                    <p className="text-sm leading-7 text-gray-700">
                      Esta ação é sensível e deve ser usada apenas quando você
                      quiser encerrar definitivamente sua conta nesta versão da
                      plataforma.
                    </p>
                  </div>

                  <div className="mt-5 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                    <p>• Sua sessão será encerrada.</p>
                    <p>• O acesso à conta será removido.</p>
                    <p>• O histórico local desta versão será apagado.</p>
                    <p>• Em backend real, isso exigiria exclusão definitiva dos dados.</p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={resetDeleteFlow}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Cancelar
                      <X className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteStep(2)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                      Continuar
                      <AlertTriangle className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                      <Trash2 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Confirmação final
                      </h2>
                      <p className="text-sm text-gray-500">
                        Etapa 2 de segurança
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-red-50 p-4">
                    <p className="text-sm leading-7 text-gray-700">
                      Para concluir, digite{' '}
                      <span className="font-bold text-red-700">EXCLUIR</span> no
                      campo abaixo e confirme que entendeu o impacto da ação.
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Digite EXCLUIR
                      </label>
                      <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                        <input
                          type="text"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder="EXCLUIR"
                          className="w-full bg-transparent text-base font-semibold uppercase text-gray-900 outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <input
                        type="checkbox"
                        checked={deleteChecked}
                        onChange={(e) => setDeleteChecked(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm leading-6 text-gray-700">
                        Confirmo que entendo que esta ação remove meu acesso e não
                        deve ser tratada como um simples cancelamento de assinatura.
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setDeleteStep(1)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Voltar
                      <X className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      disabled={!podeExcluir || deleting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deleting ? 'Excluindo...' : 'Excluir conta'}
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}