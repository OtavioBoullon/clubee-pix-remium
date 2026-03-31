'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Zap,
  ChevronLeft,
  Shield,
  BadgeCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const [showSenha, setShowSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [lembrarAcesso, setLembrarAcesso] = useState(true);

  const [isCheckoutFlow, setIsCheckoutFlow] = useState(false);
  const [selectedPlanLabel, setSelectedPlanLabel] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const referrer = document.referrer || '';
    const veioDoRegister = referrer.includes('/register');
    const veioDosPlanos =
      referrer.includes('/planos') ||
      referrer.includes('/checkout') ||
      localStorage.getItem('fluxo_pagamento') === 'true';

    const planoEscolhido = localStorage.getItem('plano_escolhido') || '';

    // Se entrou no login fora do fluxo comercial, limpa apenas o fluxo de compra
    if (!veioDoRegister && !veioDosPlanos) {
      localStorage.removeItem('fluxo_pagamento');
      localStorage.removeItem('plano_escolhido');
    }

    // Se entrou no login sem vir do fluxo de planos,
    // garante que a assinatura não fique marcada como ativa por lixo anterior
    if (!veioDosPlanos) {
      localStorage.setItem('assinatura_ativa', 'false');
    }

    setIsCheckoutFlow(veioDosPlanos);

    if (planoEscolhido === 'essencial') setSelectedPlanLabel('Essencial');
    if (planoEscolhido === 'pro') setSelectedPlanLabel('Pro');
    if (planoEscolhido === 'premium') setSelectedPlanLabel('Premium');

    if (veioDoRegister) {
      setInfoMessage('Conta criada com sucesso. Agora entre para continuar.');
    } else if (veioDosPlanos && planoEscolhido) {
      setInfoMessage(
        `Faça login para continuar a contratação do plano ${planoEscolhido.charAt(0).toUpperCase() + planoEscolhido.slice(1)}.`
      );
    }
  }, []);

  const buttonText = useMemo(() => {
    if (isLoading) return 'Entrando...';
    if (isCheckoutFlow) return 'Entrar e continuar assinatura';
    return 'Entrar no Clube';
  }, [isLoading, isCheckoutFlow]);

  const helperTitle = useMemo(() => {
    if (isCheckoutFlow) return 'Continue de onde parou';
    return 'Entre na sua conta e continue sua experiência no clube';
  }, [isCheckoutFlow]);

  const helperDescription = useMemo(() => {
    if (isCheckoutFlow) {
      return 'Seu acesso está quase pronto. Faça login para seguir com a contratação e liberar sua área de membro.';
    }
    return 'Acesse sua área para acompanhar assinatura, resultados, carteira, histórico e demais informações da sua conta.';
  }, [isCheckoutFlow]);

  const handleEntrar = async (e?: FormEvent) => {
    e?.preventDefault();

    if (typeof window === 'undefined') return;

    setErro('');

    if (!email.trim()) {
      setErro('Informe seu email para continuar.');
      return;
    }

    if (!senha.trim()) {
      setErro('Informe sua senha para acessar sua conta.');
      return;
    }

    setIsLoading(true);

    try {
      const fluxoPagamento = localStorage.getItem('fluxo_pagamento');
      const planoEscolhido = localStorage.getItem('plano_escolhido');

      // PLACEHOLDER BACKEND:
      // Aqui depois você vai trocar pela chamada real de autenticação
      // Ex:
      // const response = await login({ email, senha });

      await new Promise((resolve) => setTimeout(resolve, 900));

      // A partir do login, o usuário passa a estar autenticado
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('user_email', email);
      localStorage.setItem(
        'remember_login',
        lembrarAcesso ? 'true' : 'false'
      );

      // Entrou, mas ainda não assinou
      if (localStorage.getItem('assinatura_ativa') !== 'true') {
        localStorage.setItem('assinatura_ativa', 'false');
      }

      // Se veio do fluxo de escolha de plano, segue para checkout
      if (fluxoPagamento === 'true' && planoEscolhido) {
        window.location.href = '/checkout';
        return;
      }

      // Login normal = dashboard sem assinatura
      window.location.href = '/dashboard';
    } catch {
      setErro(
        'Não foi possível entrar agora. Verifique seus dados e tente novamente.'
      );
    } finally {
      setIsLoading(false);
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
                {isCheckoutFlow ? 'Continuação da assinatura' : 'Área do membro'}
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
                        Seu acesso está quase liberado
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Entre com sua conta para seguir com a contratação
                        {selectedPlanLabel ? ` do plano ${selectedPlanLabel}` : ''}{' '}
                        e finalizar sua jornada no clube.
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
                    Acesso seguro
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Sua conta centraliza o acesso ao clube e à sua jornada dentro
                    da plataforma.
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
                    Conta centralizada
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Consulte assinatura, recursos liberados, histórico e status da
                    sua conta em um único lugar.
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
                    Painel do membro
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Continue exatamente de onde parou, com acesso rápido à sua área.
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
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Mais clareza, mais controle e uma navegação pensada para conversão.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Clube Pix Premium
              </h2>
              <p className="mt-2 text-gray-600">
                {isCheckoutFlow
                  ? 'Entre para continuar sua assinatura'
                  : 'Acesse sua conta e continue no clube'}
              </p>
            </div>

            <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl">
              {isCheckoutFlow && (
                <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Fluxo de contratação em andamento
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Faça login para continuar sua assinatura
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
                <h3 className="text-2xl font-bold text-gray-900">Entrar</h3>
                <p className="text-sm text-gray-500">
                  Informe seus dados para acessar sua conta
                </p>
              </div>

              <form onSubmit={handleEntrar} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      autoComplete="email"
                      className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 transition focus-within:border-blue-500 focus-within:bg-white">
                    <Lock className="h-5 w-5 text-gray-400" />
                    <input
                      type={showSenha ? 'text' : 'password'}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
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
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-3 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={lembrarAcesso}
                      onChange={(e) => setLembrarAcesso(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Manter meu acesso neste dispositivo
                  </label>

                  <Link
                    href="/esqueci-senha"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-2xl bg-green-500 py-4 font-bold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {buttonText}
                  {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </form>

              <div className="my-6 text-center text-sm text-gray-400">ou</div>

              <div className="text-center text-sm text-gray-600">
                Ainda não tem conta?{' '}
                <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                  Criar conta
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-center text-xs leading-6 text-gray-500">
                  Ao acessar sua conta, você continua sua experiência dentro da
                  plataforma conforme os recursos disponíveis, regras vigentes e
                  status da sua assinatura.
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
    </div>
  );
}