'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Zap,
  ChevronLeft,
  Shield,
  BadgeCheck,
  Eye,
  EyeOff,
  Check,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

export default function RegisterPage() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [aceitouComunicacoes, setAceitouComunicacoes] = useState(true);

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const [isCheckoutFlow, setIsCheckoutFlow] = useState(false);
  const [selectedPlanLabel, setSelectedPlanLabel] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const referrer = document.referrer || '';
    const veioDoLogin = referrer.includes('/login');
    const veioDosPlanos =
      referrer.includes('/planos') ||
      referrer.includes('/checkout') ||
      localStorage.getItem('fluxo_pagamento') === 'true';

    const planoEscolhido = localStorage.getItem('plano_escolhido') || '';

    if (!veioDoLogin && !veioDosPlanos) {
      localStorage.removeItem('fluxo_pagamento');
      localStorage.removeItem('plano_escolhido');
    }

    if (!veioDosPlanos) {
      localStorage.setItem('assinatura_ativa', 'false');
    }

    setIsCheckoutFlow(veioDosPlanos);

    if (planoEscolhido === 'essencial') setSelectedPlanLabel('Essencial');
    if (planoEscolhido === 'pro') setSelectedPlanLabel('Pro');
    if (planoEscolhido === 'premium') setSelectedPlanLabel('Premium');

    if (veioDosPlanos && planoEscolhido) {
      setInfoMessage(
        `Crie sua conta para continuar a contratação do plano ${planoEscolhido.charAt(0).toUpperCase() + planoEscolhido.slice(1)}.`
      );
    }
  }, []);

  const regras = {
    length: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
  };

  const forca = Object.values(regras).filter(Boolean).length;
  const senhasIguais = confirmar.length > 0 && senha === confirmar;
  const emailValido = /\S+@\S+\.\S+/.test(email);

  const podeEnviar =
    nome.trim().length >= 3 &&
    email.trim().length > 0 &&
    emailValido &&
    senha.trim().length > 0 &&
    confirmar.trim().length > 0 &&
    senhasIguais &&
    Object.values(regras).every(Boolean) &&
    aceitouTermos;

  const helperTitle = useMemo(() => {
    if (isCheckoutFlow) return 'Crie sua conta e continue sua assinatura';
    return 'Crie sua conta e entre no ecossistema do membro';
  }, [isCheckoutFlow]);

  const helperDescription = useMemo(() => {
    if (isCheckoutFlow) {
      return 'Seu acesso está quase pronto. Cadastre sua conta para seguir com a contratação e liberar sua jornada dentro da plataforma.';
    }

    return 'Cadastre sua conta para acessar assinatura, resultados, carteira, histórico, perfil e demais áreas da plataforma em uma experiência organizada e premium.';
  }, [isCheckoutFlow]);

  const buttonText = useMemo(() => {
    if (loading) return 'Criando conta...';
    if (isCheckoutFlow) return 'Criar conta e continuar assinatura';
    return 'Criar minha conta';
  }, [loading, isCheckoutFlow]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setErro('');

    if (nome.trim().length < 3) {
      setErro('Informe seu nome completo para continuar.');
      return;
    }

    if (!email.trim()) {
      setErro('Informe seu email para criar a conta.');
      return;
    }

    if (!emailValido) {
      setErro('Informe um email válido.');
      return;
    }

    if (!senha.trim()) {
      setErro('Crie uma senha para continuar.');
      return;
    }

    if (!Object.values(regras).every(Boolean)) {
      setErro('Sua senha ainda não atende aos critérios mínimos de segurança.');
      return;
    }

    if (!confirmar.trim()) {
      setErro('Confirme sua senha para continuar.');
      return;
    }

    if (!senhasIguais) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (!aceitouTermos) {
      setErro('É necessário concordar com os documentos da plataforma.');
      return;
    }

    setLoading(true);

    try {
      // PLACEHOLDER BACKEND:
      // Aqui depois você substitui pela chamada real de cadastro:
      // await register({ nome, email, senha, aceitouTermos, aceitouComunicacoes })

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (typeof window !== 'undefined') {
        const fluxoPagamento = localStorage.getItem('fluxo_pagamento');
        const planoEscolhido = localStorage.getItem('plano_escolhido');

        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('assinatura_ativa', 'false');
        localStorage.setItem('user_name', nome);
        localStorage.setItem('user_email', email);
        localStorage.setItem(
          'aceitou_comunicacoes',
          aceitouComunicacoes ? 'true' : 'false'
        );

        setLoading(false);
        setSucesso(true);

        setTimeout(() => {
          if (fluxoPagamento === 'true' && planoEscolhido) {
            window.location.href = '/checkout';
            return;
          }

          window.location.href = '/dashboard';
        }, 1400);
      }
    } catch {
      setLoading(false);
      setErro(
        'Não foi possível criar sua conta agora. Tente novamente em instantes.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_480px]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:block"
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar para o site
            </Link>

            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                <Zap className="h-4 w-4" />
                {isCheckoutFlow ? 'Continuação da assinatura' : 'Entrada no clube'}
              </div>

              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                {helperTitle}
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {helperDescription}
              </p>

              {isCheckoutFlow && (
                <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Você está a poucos passos de finalizar
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Crie sua conta para continuar a contratação
                        {selectedPlanLabel ? ` do plano ${selectedPlanLabel}` : ''}{' '}
                        e liberar sua área de membro.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Cadastro seguro
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Estrutura pronta para acesso seguro, continuidade da conta e
                    evolução da sua jornada na plataforma.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                    <BadgeCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Fluxo profissional
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Uma jornada simples, forte visualmente e já pronta para encaixe
                    com backend depois.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                    <LayoutDashboard className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Área centralizada
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Depois do cadastro, sua conta concentra acesso ao painel,
                    assinatura, histórico e recursos da plataforma.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Experiência premium
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    Mais clareza, mais confiança e uma entrada mais persuasiva no
                    produto.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="mt-6 rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Consentimento e transparência
                    </h3>
                    <p className="text-sm text-gray-500">
                      Base institucional da jornada
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-7 text-gray-600">
                  Ao criar a conta, o usuário formaliza seu ingresso na plataforma
                  e concorda com os documentos que regulam uso, privacidade,
                  tratamento de dados e regras gerais da experiência.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="mb-6 text-center lg:hidden">
              <Link
                href="/"
                className="mb-6 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Voltar para o site
              </Link>
            </div>

            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_14px_30px_rgba(37,99,235,0.28)]">
                <Zap className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-gray-900">Criar conta</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">
                {isCheckoutFlow
                  ? 'Cadastre-se para continuar sua assinatura'
                  : 'Entre para o Clube Pix Premium'}
              </p>
            </div>

            <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              {isCheckoutFlow && (
                <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Fluxo de contratação em andamento
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Crie sua conta para continuar sua assinatura
                        {selectedPlanLabel ? ` no plano ${selectedPlanLabel}` : ''}.
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Cadastro</h3>
                <p className="text-sm text-gray-500">
                  Preencha os dados para criar sua conta
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                    <User className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      autoComplete="name"
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                      email.length > 0
                        ? emailValido
                          ? 'border-green-200 bg-white'
                          : 'border-red-200 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <Mail className="h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {email.length > 0 && !emailValido && (
                    <p className="mt-2 text-sm text-red-500">
                      Informe um email válido.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                    <Lock className="h-5 w-5 text-gray-400" />
                    <input
                      type={showSenha ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      autoComplete="new-password"
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSenha((prev) => !prev)}
                      className="text-gray-400 transition hover:text-gray-600"
                      aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showSenha ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all ${
                        forca <= 1
                          ? 'w-1/4 bg-red-500'
                          : forca === 2
                            ? 'w-2/4 bg-yellow-500'
                            : forca === 3
                              ? 'w-3/4 bg-blue-500'
                              : 'w-full bg-green-500'
                      }`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Use uma senha forte para proteger sua conta.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirmar senha
                  </label>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                      confirmar
                        ? senhasIguais
                          ? 'border-green-500 bg-white'
                          : 'border-red-500 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <Lock className="h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmar ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmar}
                      onChange={(e) => setConfirmar(e.target.value)}
                      autoComplete="new-password"
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmar((prev) => !prev)}
                      className="text-gray-400 transition hover:text-gray-600"
                      aria-label={
                        showConfirmar
                          ? 'Ocultar confirmação de senha'
                          : 'Mostrar confirmação de senha'
                      }
                    >
                      {showConfirmar ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {confirmar && !senhasIguais && (
                    <p className="mt-2 text-sm text-red-500">
                      As senhas não coincidem.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Regra ok={regras.length} text="Mínimo de 8 caracteres" />
                  <Regra ok={regras.upper} text="Pelo menos 1 letra maiúscula" />
                  <Regra ok={regras.lower} text="Pelo menos 1 letra minúscula" />
                  <Regra ok={regras.number} text="Pelo menos 1 número" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className={`rounded-[22px] border p-4 transition ${
                    aceitouTermos
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={aceitouTermos}
                      onChange={(e) => setAceitouTermos(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="text-sm leading-6 text-gray-600">
                      <span className="font-medium text-gray-800">
                        Confirmo que li e concordo com os{' '}
                      </span>
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
                      </Link>
                      , incluindo as regras gerais da plataforma, condições de
                      uso da conta e tratamento de dados aplicável à jornada do
                      usuário.
                    </div>
                  </label>

                  <div className="mt-3 flex items-start gap-2 rounded-2xl bg-white/70 px-3 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                    <p className="text-xs leading-5 text-gray-500">
                      O cadastro cria sua conta na plataforma, mas não representa,
                      por si só, ativação automática de assinatura, benefício,
                      contemplação ou qualquer promessa de retorno.
                    </p>
                  </div>
                </motion.div>

                <div className="rounded-[22px] border border-gray-200 bg-gray-50 p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={aceitouComunicacoes}
                      onChange={(e) => setAceitouComunicacoes(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="text-sm leading-6 text-gray-600">
                      Aceito receber comunicações operacionais da conta e, quando
                      aplicável, atualizações relacionadas à minha jornada na
                      plataforma.
                    </div>
                  </label>
                </div>

                {!aceitouTermos && (
                  <p className="text-sm text-amber-600">
                    Para continuar, é necessário concordar com os documentos da plataforma.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!podeEnviar || loading}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-4 font-bold text-white transition-all hover:from-green-600 hover:to-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {buttonText}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </form>

              <div className="my-6 text-center text-sm text-gray-400">ou</div>

              <div className="text-center text-sm text-gray-600">
                Já tem conta?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Entrar
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-center text-xs leading-6 text-gray-500">
                  Ao criar sua conta, você inicia sua jornada na plataforma de
                  forma segura e organizada. A assinatura e os recursos liberados
                  dependem do fluxo contratado, do status da conta e das regras
                  vigentes.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:underline">
                ← Voltar para o site
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {sucesso && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Conta criada com sucesso
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Seu cadastro foi concluído e sua área já está sendo preparada.
              </p>

              <p className="mt-4 text-xs text-gray-400">Redirecionando...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Regra({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={ok ? 'text-green-600' : 'text-gray-400'}>{text}</span>
    </div>
  );
}