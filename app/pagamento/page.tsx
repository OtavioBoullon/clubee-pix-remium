'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Wallet,
  FileText,
  RefreshCcw,
  ChevronRight,
  Lock,
  AlertCircle,
  Download,
  HelpCircle,
  Clock3,
  Crown,
} from 'lucide-react';

type BillingStatus = 'paid' | 'pending' | 'failed';

type HistoricoPagamento = {
  data: string;
  titulo: string;
  descricao: string;
  valor: string;
  status: string;
  tipo: 'success' | 'info' | 'neutral';
};

const historicoPagamentoBase: HistoricoPagamento[] = [
  {
    data: '12/03/2026',
    titulo: 'Cobrança confirmada',
    descricao: 'Pagamento mensal aprovado com sucesso.',
    valor: 'R$ 99,90',
    status: 'Pago',
    tipo: 'success',
  },
  {
    data: '12/02/2026',
    titulo: 'Cobrança confirmada',
    descricao: 'Pagamento do ciclo anterior processado normalmente.',
    valor: 'R$ 99,90',
    status: 'Pago',
    tipo: 'success',
  },
  {
    data: '12/01/2026',
    titulo: 'Método revisado',
    descricao: 'Os dados do cartão cadastrado foram atualizados.',
    valor: '—',
    status: 'Atualizado',
    tipo: 'info',
  },
];

const planoValores: Record<string, string> = {
  essencial: 'R$ 29,90',
  pro: 'R$ 59,90',
  premium: 'R$ 99,90',
};

export default function PagamentoPage() {
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('Otavio Lopes');
  const [planoAtual, setPlanoAtual] = useState('Premium');
  const [valorMensal, setValorMensal] = useState('R$ 99,90');
  const [billingStatus, setBillingStatus] = useState<BillingStatus>('paid');
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(true);
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
    const plano = localStorage.getItem('plano_ativo') || 'premium';
    const storedName = localStorage.getItem('user_name');
    const storedBilling = localStorage.getItem('billing_status');

    setAssinaturaAtiva(ativa);

    if (storedName) setUserName(storedName);

    const planoNormalizado =
      plano === 'essencial' || plano === 'pro' || plano === 'premium'
        ? plano
        : 'premium';

    setPlanoAtual(
      planoNormalizado.charAt(0).toUpperCase() + planoNormalizado.slice(1)
    );
    setValorMensal(planoValores[planoNormalizado]);

    if (
      storedBilling === 'paid' ||
      storedBilling === 'pending' ||
      storedBilling === 'failed'
    ) {
      setBillingStatus(storedBilling);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 2 * 60 * 60 + 14 * 60 + 38;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pagamentoAtual = useMemo(() => {
    const statusTexto =
      billingStatus === 'paid'
        ? 'Em dia'
        : billingStatus === 'pending'
          ? 'Em análise'
          : 'Revisar';

    return {
      plano: planoAtual,
      valorMensal,
      status: statusTexto,
      proximaCobranca: assinaturaAtiva ? '12 de abril' : '—',
      metodo: 'Cartão de crédito',
      bandeira: 'Visa',
      final: '4587',
      titular: userName,
    };
  }, [billingStatus, assinaturaAtiva, planoAtual, userName, valorMensal]);

  const historicoPagamento = useMemo(() => {
    if (valorMensal === 'R$ 29,90') {
      return historicoPagamentoBase.map((item, idx) =>
        idx < 2 ? { ...item, valor: 'R$ 29,90' } : item
      );
    }

    if (valorMensal === 'R$ 59,90') {
      return historicoPagamentoBase.map((item, idx) =>
        idx < 2 ? { ...item, valor: 'R$ 59,90' } : item
      );
    }

    return historicoPagamentoBase;
  }, [valorMensal]);

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

  const statusClass =
    billingStatus === 'paid'
      ? 'bg-green-100 text-green-700'
      : billingStatus === 'pending'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700';

  const statusDescricao =
    billingStatus === 'paid'
      ? 'O método de pagamento atual segue válido e a próxima cobrança está programada normalmente para o próximo ciclo.'
      : billingStatus === 'pending'
        ? 'Existe uma atualização em andamento no fluxo de cobrança. A conta segue em revisão até a confirmação final.'
        : 'Foi identificado um ponto de atenção no pagamento. Revise o método cadastrado para evitar impacto na continuidade da assinatura.';

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando pagamento...
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
            href="/assinatura"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à assinatura
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <CreditCard className="h-4 w-4" />
            Pagamento da assinatura
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
              <BadgeCheck className="h-4 w-4" />
              Gestão de cobrança
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              {billingStatus === 'paid'
                ? 'Seu pagamento está em dia e sua assinatura segue ativa'
                : billingStatus === 'pending'
                  ? 'Seu pagamento está em análise e a cobrança segue em revisão'
                  : 'Seu pagamento precisa de revisão para manter a assinatura regular'}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Consulte o valor mensal, acompanhe a próxima cobrança, revise o método
              de pagamento e visualize o histórico financeiro da assinatura.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/95">
              <Clock3 className="h-4 w-4" />
              Próxima janela operacional em
              <span className="rounded-full bg-white/15 px-3 py-1 font-bold">
                {formattedTime}
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Plano atual', pagamentoAtual.plano],
                ['Valor mensal', pagamentoAtual.valorMensal],
                ['Próxima cobrança', pagamentoAtual.proximaCobranca],
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
                href="/atualizar-pagamento"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                Atualizar pagamento
                <RefreshCcw className="h-4 w-4" />
              </Link>

              <Link
                href="/assinatura"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Ver assinatura
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Status da cobrança</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  {billingStatus === 'paid'
                    ? 'Pagamento em dia'
                    : billingStatus === 'pending'
                      ? 'Pagamento em análise'
                      : 'Pagamento com alerta'}
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className={`rounded-2xl p-5 ${
                billingStatus === 'paid'
                  ? 'bg-green-50'
                  : billingStatus === 'pending'
                    ? 'bg-yellow-50'
                    : 'bg-red-50'
              }`}
            >
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}>
                {billingStatus === 'failed' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {pagamentoAtual.status}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                {statusDescricao}
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Próxima cobrança</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {pagamentoAtual.proximaCobranca}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Método atual</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {pagamentoAtual.metodo}
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <CreditCard className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Método',
              value: 'Cartão',
              className: 'text-3xl',
            },
            {
              icon: <Wallet className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Valor mensal',
              value: pagamentoAtual.valorMensal,
              className: 'text-3xl',
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Próxima cobrança',
              value: pagamentoAtual.proximaCobranca,
              className: 'text-2xl',
            },
            {
              icon: <Crown className="h-6 w-6 text-yellow-500" />,
              bg: 'bg-yellow-100',
              label: 'Plano',
              value: pagamentoAtual.plano,
              className: 'text-3xl',
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
                  Método de pagamento
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Dados atuais da cobrança da assinatura
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Método cadastrado
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Forma de pagamento', pagamentoAtual.metodo],
                ['Bandeira', pagamentoAtual.bandeira],
                ['Final do cartão', `**** ${pagamentoAtual.final}`],
                ['Titular', pagamentoAtual.titular],
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-5"
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
                href="/atualizar-pagamento"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
              >
                Atualizar pagamento
                <RefreshCcw className="h-4 w-4" />
              </Link>

              <Link
                href="/comprovante"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Baixar comprovante
                <Download className="h-4 w-4" />
              </Link>
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
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Regras rápidas
                </h2>
                <p className="text-sm text-gray-500">
                  Leitura institucional da cobrança
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'Cobrança mensal recorrente',
                  'A assinatura opera por ciclo mensal com renovação automática.',
                ],
                [
                  'Método precisa estar válido',
                  'A continuidade da assinatura depende do meio de pagamento atualizado.',
                ],
                [
                  'Mudança pode ser revisada',
                  'Se necessário, os dados do pagamento podem ser ajustados depois.',
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
                <Lock className="h-4 w-4" />
                Segurança
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                Esta página representa a visão de cobrança da assinatura e pode ser
                conectada futuramente à lógica real de pagamento da plataforma.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="mb-8 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Histórico de cobranças
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Registros recentes da assinatura
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Atualizado hoje
            </div>
          </div>

          <div className="space-y-4">
            {historicoPagamento.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className={`rounded-2xl border p-5 ${
                  item.tipo === 'success'
                    ? 'border-green-200 bg-green-50/40'
                    : item.tipo === 'info'
                      ? 'border-blue-200 bg-blue-50/40'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="grid gap-4 lg:grid-cols-[0.85fr_1.35fr_0.65fr_0.6fr] lg:items-center">
                  <div>
                    <p className="text-sm text-gray-500">{item.data}</p>
                    <p className="mt-1 font-bold text-gray-900">{item.titulo}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">{item.descricao}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Valor</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {item.valor}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                          item.tipo === 'success'
                            ? 'bg-green-100 text-green-700'
                            : item.tipo === 'info'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Assinatura</h2>
                <p className="text-sm text-gray-500">
                  Voltar para a visão do plano
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              A página de assinatura continua sendo o ponto principal para consultar
              plano, renovação, comparação e benefícios associados.
            </p>

            <Link
              href="/assinatura"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
            >
              Voltar para assinatura
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                <HelpCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Suporte</h2>
                <p className="text-sm text-gray-500">
                  Precisa revisar algo na cobrança?
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Se houver qualquer dúvida sobre cobrança, pagamento ou renovação, o
              suporte pode receber essa demanda no próximo fluxo do produto.
            </p>

            <Link
              href="/suporte"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Falar com suporte
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}