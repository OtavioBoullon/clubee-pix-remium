'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Shield,
  Lock,
  CreditCard,
  BadgeCheck,
  CheckCircle2,
  Crown,
  Sparkles,
  CalendarClock,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Star,
  Wallet,
  LayoutDashboard,
  BarChart3,
  Gem,
  FileText,
  CircleCheck,
  AlertCircle,
  Check,
} from 'lucide-react';

const planosMap = {
  essencial: {
    nome: 'Essencial',
    preco: '29,90',
    cor: 'from-slate-700 via-slate-800 to-slate-900',
    badge: 'Entrada inteligente',
    resumo:
      'Ideal para começar no clube com acesso inicial, painel do assinante e experiência base.',
    itens: [
      'Acesso inicial à plataforma',
      'Painel do assinante',
      'Consulta de resultados',
      'Experiência essencial',
      'Suporte por email',
    ],
    destaqueCard: 'bg-slate-50 border-slate-200',
  },
  pro: {
    nome: 'Pro',
    preco: '59,90',
    cor: 'from-green-500 via-green-600 to-emerald-700',
    badge: 'Mais escolhido',
    resumo:
      'Mais equilíbrio entre valor, prioridade e profundidade da experiência dentro da plataforma.',
    itens: [
      'Tudo do plano Essencial',
      'Acesso ampliado ao painel',
      'Mais recursos por período',
      'Prioridade intermediária',
      'Suporte prioritário',
    ],
    destaqueCard: 'bg-green-50 border-green-200',
  },
  premium: {
    nome: 'Premium',
    preco: '99,90',
    cor: 'from-blue-600 via-blue-700 to-indigo-800',
    badge: 'Experiência completa',
    resumo:
      'Para quem busca a camada mais completa de acesso, prioridade e visibilidade dentro do produto.',
    itens: [
      'Tudo do plano Pro',
      'Acesso premium a recursos selecionados',
      'Mais prioridade na experiência',
      'Visualização ampliada de carteira e extrato',
      'Suporte VIP',
    ],
    destaqueCard: 'bg-blue-50 border-blue-200',
  },
} as const;

type PlanoKey = keyof typeof planosMap;

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const [planoId, setPlanoId] = useState<PlanoKey | null>(null);
  const [erro, setErro] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const isLogged = localStorage.getItem('isLogged') === 'true';
    const fluxo = localStorage.getItem('fluxo_pagamento');
    const plano = localStorage.getItem('plano_escolhido') as PlanoKey | null;

    if (!isLogged) {
      window.location.href = '/login';
      return;
    }

    if (!fluxo || fluxo !== 'true' || !plano || !planosMap[plano]) {
      window.location.href = '/planos';
      return;
    }

    setPlanoId(plano);
    setInfoMessage(
      `Você está finalizando a ativação do plano ${planosMap[plano].nome}.`
    );
  }, []);

  const plano = useMemo(() => {
    if (!planoId) return null;
    return planosMap[planoId];
  }, [planoId]);

  const numeroFormatado = useMemo(() => {
    const digits = numeroCartao.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }, [numeroCartao]);

  const validadeFormatada = useMemo(() => {
    const digits = validade.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }, [validade]);

  const nomeCartaoPreview = nomeCartao.trim() || 'NOME NO CARTÃO';
  const numeroPreview = numeroFormatado || '0000 0000 0000 0000';
  const validadePreview = validadeFormatada || '00/00';

  const numeroDigits = numeroCartao.replace(/\D/g, '');
  const validadeDigits = validade.replace(/\D/g, '');
  const cvvDigits = cvv.replace(/\D/g, '');

  const numeroValido = numeroDigits.length === 16;
  const validadeValida = validadeDigits.length === 4;
  const cvvValido = cvvDigits.length >= 3 && cvvDigits.length <= 4;
  const nomeValido = nomeCartao.trim().length >= 3;

  const podePagar =
    nomeValido &&
    numeroValido &&
    validadeValida &&
    cvvValido &&
    !!plano &&
    aceitouTermos;

  const handleNumeroCartao = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    setNumeroCartao(digits);
  };

  const handleValidade = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setValidade(digits);
  };

  const handleCvv = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setCvv(digits);
  };

  const handlePagar = async () => {
    if (!plano || !planoId) return;

    setErro('');

    if (!nomeValido) {
      setErro('Informe o nome como está no cartão.');
      return;
    }

    if (!numeroValido) {
      setErro('Informe um número de cartão válido com 16 dígitos.');
      return;
    }

    if (!validadeValida) {
      setErro('Informe a validade do cartão no formato MM/AA.');
      return;
    }

    if (!cvvValido) {
      setErro('Informe um CVV válido.');
      return;
    }

    if (!aceitouTermos) {
      setErro('Para concluir, confirme o aceite dos documentos da plataforma.');
      return;
    }

    setLoading(true);

    try {
      // PLACEHOLDER BACKEND:
      // Aqui depois você troca por uma chamada real de pagamento/assinatura
      // Ex:
      // await createSubscription({
      //   plano: planoId,
      //   paymentMethod: {
      //     nomeCartao,
      //     numeroCartao,
      //     validade,
      //     cvv,
      //   },
      // });

      await new Promise((resolve) => setTimeout(resolve, 1300));

      if (typeof window !== 'undefined') {
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('assinatura_ativa', 'true');
        localStorage.setItem('plano_ativo', planoId);
        localStorage.setItem('plano_escolhido', planoId);
        localStorage.setItem('assinatura_status', 'active');
        localStorage.setItem('billing_status', 'paid');
        localStorage.removeItem('fluxo_pagamento');
      }

      setLoading(false);
      setSucesso(true);

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1800);
    } catch {
      setLoading(false);
      setErro(
        'Não foi possível concluir a ativação agora. Revise os dados e tente novamente.'
      );
    }
  };

  if (!mounted || !plano) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando checkout...
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
            href="/planos"
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para planos
          </Link>
        </motion.div>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-[0_24px_70px_rgba(23,62,201,0.24)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%)]" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Lock className="h-4 w-4" />
                Ativação segura da assinatura
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                Finalize sua assinatura e desbloqueie sua área premium agora
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100">
                Você já escolheu seu plano. Agora conclua a ativação para liberar o
                acesso completo à área do membro com uma jornada mais segura, clara
                e profissional.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ['Plano selecionado', plano.nome],
                  ['Cobrança mensal', `R$ ${plano.preco}`],
                  ['Liberação', 'Imediata'],
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-white p-5 text-gray-900 shadow-lg"
                  >
                    <p className="text-sm text-gray-500">{item[0]}</p>
                    <h3 className="mt-2 text-2xl font-bold">{item[1]}</h3>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-blue-100">
                <div className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Ambiente protegido
                </div>
                <div className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Plano confirmado
                </div>
                <div className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Ativação da assinatura
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[34px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <Crown className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Seu plano</p>
                <h2 className="text-2xl font-bold text-gray-900">{plano.nome}</h2>
              </div>
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-4 w-4" />
              {plano.badge}
            </div>

            <p className="text-sm leading-7 text-gray-600">{plano.resumo}</p>

            <div className="mt-6 space-y-3">
              {plano.itens.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                  <p className="text-sm leading-7 text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Valor mensal</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                R$ {plano.preco}
                <span className="ml-1 text-base font-medium text-gray-500">/mês</span>
              </p>
            </div>

            <div className={`mt-5 rounded-2xl border p-4 ${plano.destaqueCard}`}>
              <div className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Resumo da ativação
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Ao concluir esta etapa, sua conta passa a operar com o plano
                    escolhido dentro da experiência principal do membro.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Você está muito perto de concluir
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Falta apenas confirmar o pagamento para liberar sua jornada no
                    plano {plano.nome}.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="rounded-[34px] border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Dados de pagamento
                  </h2>
                  <p className="text-sm text-gray-500">
                    Preencha as informações para ativar sua assinatura
                  </p>
                </div>
              </div>

              {infoMessage && (
                <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                    <p className="text-sm leading-6 text-gray-700">{infoMessage}</p>
                  </div>
                </div>
              )}

              {erro && (
                <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                    <p className="text-sm leading-6 text-gray-700">{erro}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nome no cartão
                  </label>
                  <div
                    className={`rounded-2xl border px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm ${
                      nomeCartao.length > 0
                        ? nomeValido
                          ? 'border-green-200 bg-white'
                          : 'border-red-200 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Como está impresso no cartão"
                      value={nomeCartao}
                      onChange={(e) => setNomeCartao(e.target.value)}
                      autoComplete="cc-name"
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Número do cartão
                  </label>
                  <div
                    className={`rounded-2xl border px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm ${
                      numeroCartao.length > 0
                        ? numeroValido
                          ? 'border-green-200 bg-white'
                          : 'border-red-200 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      value={numeroFormatado}
                      onChange={(e) => handleNumeroCartao(e.target.value)}
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Validade
                    </label>
                    <div
                      className={`rounded-2xl border px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm ${
                        validade.length > 0
                          ? validadeValida
                            ? 'border-green-200 bg-white'
                            : 'border-red-200 bg-white'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/AA"
                        value={validadeFormatada}
                        onChange={(e) => handleValidade(e.target.value)}
                        className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <div
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm ${
                        cvv.length > 0
                          ? cvvValido
                            ? 'border-green-200 bg-white'
                            : 'border-red-200 bg-white'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <input
                        type={showCvv ? 'text' : 'password'}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="000"
                        value={cvv}
                        onChange={(e) => handleCvv(e.target.value)}
                        className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCvv((prev) => !prev)}
                        className="text-gray-400 transition hover:text-gray-600"
                        aria-label={showCvv ? 'Ocultar CVV' : 'Mostrar CVV'}
                      >
                        {showCvv ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Ambiente protegido
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Esta etapa foi desenhada para transmitir clareza, confiança
                        e mais segurança durante a ativação da assinatura.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={aceitouTermos}
                      onChange={(e) => setAceitouTermos(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="text-sm leading-6 text-gray-600">
                      Confirmo a ativação do plano selecionado e declaro estar de
                      acordo com os{' '}
                      <Link
                        href="/termos"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Termos de Uso
                      </Link>{' '}
                      e com a{' '}
                      <Link
                        href="/privacidade"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Política de Privacidade
                      </Link>{' '}
                      da plataforma.
                    </div>
                  </label>
                </div>

                {!aceitouTermos && (
                  <p className="text-sm text-amber-600">
                    Para concluir, confirme o aceite dos documentos da plataforma.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handlePagar}
                  disabled={!podePagar || loading}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-4 text-lg font-bold text-white transition-all hover:from-green-600 hover:to-green-700 hover:shadow-[0_18px_40px_rgba(34,197,94,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Ativando assinatura...' : `Ativar plano ${plano.nome}`}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>

                <div className="rounded-2xl bg-gray-50 px-4 py-4 text-center">
                  <p className="text-xs leading-6 text-gray-500">
                    Ao prosseguir, você confirma a ativação do plano selecionado
                    dentro do fluxo atual da plataforma.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Dúvidas rápidas
                  </h2>
                  <p className="text-sm text-gray-500">
                    O essencial antes de concluir
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    pergunta: 'O plano é mensal?',
                    resposta:
                      'Sim. A ativação está estruturada para cobrança recorrente mensal do plano selecionado.',
                  },
                  {
                    pergunta: 'Posso revisar ou trocar o plano depois?',
                    resposta:
                      'Sim. A área de assinatura foi pensada para revisão, comparação e evolução futura da experiência.',
                  },
                  {
                    pergunta: 'O que muda depois da ativação?',
                    resposta:
                      'Após a ativação, sua conta passa a operar com o plano escolhido dentro da área principal do membro.',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-5"
                  >
                    <h3 className="text-base font-bold text-gray-900">
                      {item.pergunta}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {item.resposta}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="space-y-6"
          >
            <div className="rounded-[34px] border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    O que você libera hoje
                  </h2>
                  <p className="text-sm text-gray-500">
                    Uma prévia estratégica da experiência
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-200 bg-[#f8fbff] p-4">
                <div className="rounded-[24px] bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                        Área do membro
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-gray-900">
                        Painel principal
                      </h3>
                    </div>

                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Plano {plano.nome}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                        <LayoutDashboard className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        Painel do assinante
                      </p>
                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Acesso organizado ao centro da experiência.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-green-50 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        Resultados e histórico
                      </p>
                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Visão central dos eventos e da jornada.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-purple-50 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                        <Wallet className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        Carteira e extrato
                      </p>
                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Visualização financeira da experiência.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-yellow-50 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                        <Gem className="h-5 w-5 text-yellow-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        Camada {plano.nome}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-gray-500">
                        Acesso, prioridade e experiência conforme o plano.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <motion.div whileHover={{ y: -2 }} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Plano escolhido</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{plano.nome}</p>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Cobrança</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    R$ {plano.preco}/mês
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="rounded-[34px] border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Visualização do cartão
                  </h2>
                  <p className="text-sm text-gray-500">
                    Prévia elegante da ativação
                  </p>
                </div>
              </div>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className={`rounded-[28px] bg-gradient-to-br ${plano.cor} p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]`}
              >
                <div className="mb-12 flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                      Clube Pix Premium
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{plano.nome}</h3>
                  </div>

                  <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    Assinatura ativa
                  </div>
                </div>

                <div className="mb-6 text-2xl font-semibold tracking-[0.2em]">
                  {numeroPreview}
                </div>

                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">
                      Nome
                    </p>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wide">
                      {nomeCartaoPreview}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">
                      Validade
                    </p>
                    <p className="mt-1 text-sm font-medium">{validadePreview}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="rounded-[34px] border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Garantias desta etapa
                  </h2>
                  <p className="text-sm text-gray-500">
                    Mais confiança para concluir agora
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Você já escolheu o plano ideal para o seu momento atual.',
                  'A ativação conecta sua conta à área principal do produto.',
                  'A estrutura foi desenhada para transmitir clareza e segurança.',
                  'O fechamento desta etapa deixa a jornada mais coerente, premium e profissional.',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 2 }}
                    className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4"
                  >
                    <Star className="mt-0.5 h-4 w-4 text-yellow-500" />
                    <p className="text-sm leading-7 text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-[34px] border border-blue-200 bg-blue-50 p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <CalendarClock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Assinatura organizada
                  </h3>
                  <p className="text-sm text-gray-500">
                    Continuidade da experiência
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-gray-700">
                Esta etapa fecha a jornada com identidade visual forte, confiança
                reforçada e percepção real de valor. Depois da ativação, o usuário
                segue para a área principal com o fluxo completo e coerente.
              </p>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-white/80 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-blue-600" />
                  <p className="text-sm leading-6 text-gray-600">
                    O checkout foi desenhado para representar uma etapa madura de
                    ativação da assinatura, com clareza, leitura profissional e
                    percepção elevada de confiança.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <AnimatePresence>
        {sucesso && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Assinatura ativada!
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                Seu plano foi ativado com sucesso. Agora você será direcionado para
                a área principal da experiência.
              </p>

              <p className="mt-4 text-xs text-gray-400">Redirecionando...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}