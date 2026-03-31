'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Wallet,
  Landmark,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Shield,
  Copy,
  CircleDollarSign,
  FileText,
  BadgeCheck,
  Banknote,
  History,
  ChevronRight,
  AlertCircle,
  Lock,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type HistoricoTipo = 'success' | 'neutral' | 'info';

type HistoricoRetirada = {
  data: string;
  titulo: string;
  descricao: string;
  valor: string;
  status: string;
  tipo: HistoricoTipo;
};

const historicoRetiradaBase: HistoricoRetirada[] = [
  {
    data: '28/03/2026',
    titulo: 'Valor liberado na carteira',
    descricao: 'Saldo referente à última apuração contemplada.',
    valor: 'R$ 8.500',
    status: 'Disponível',
    tipo: 'success',
  },
  {
    data: '12/03/2026',
    titulo: 'Retirada concluída',
    descricao: 'Transferência enviada para a conta cadastrada.',
    valor: 'R$ 3.200',
    status: 'Concluída',
    tipo: 'neutral',
  },
  {
    data: '03/03/2026',
    titulo: 'Atualização de conta bancária',
    descricao: 'Dados de destino alterados com sucesso.',
    valor: '—',
    status: 'Atualizado',
    tipo: 'info',
  },
];

export default function CarteiraPage() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);

  const [valorInput, setValorInput] = useState('8500');
  const [showSuccess, setShowSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [saldoDisponivel, setSaldoDisponivel] = useState(8500);
  const [ultimaLiberacao, setUltimaLiberacao] = useState('R$ 8.500');
  const [ultimaData, setUltimaData] = useState('28/03/2026');
  const [prazoEstimado, setPrazoEstimado] = useState('Até 1 dia útil');

  const [historicoRetirada, setHistoricoRetirada] = useState<HistoricoRetirada[]>(
    historicoRetiradaBase
  );

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
    // Depois você pode substituir por algo assim:
    // const response = await fetch('/api/carteira');
    // const data = await response.json();
    // setSaldoDisponivel(data.saldoDisponivel);
    // setUltimaLiberacao(data.ultimaLiberacao);
    // setUltimaData(data.ultimaData);
    // setPrazoEstimado(data.prazoEstimado);
    // setHistoricoRetirada(data.historico);
  }, []);

  const valorSolicitado = Number(valorInput || 0);
  const taxa = 0;
  const valorLiquido = Math.max(valorSolicitado - taxa, 0);

  const isValidValue =
    valorSolicitado > 0 && valorSolicitado <= saldoDisponivel;

  const resumoStatus = useMemo(() => {
    if (!valorSolicitado) return 'Digite um valor para simular a retirada';
    if (valorSolicitado > saldoDisponivel) return 'Valor acima do saldo disponível';
    return 'Valor pronto para solicitação';
  }, [valorSolicitado, saldoDisponivel]);

  const handleSolicitar = () => {
    if (!isValidValue) return;

    setShowSuccess(true);

    // PLACEHOLDER BACKEND
    // Aqui depois você troca por:
    // await fetch('/api/retirada', { method: 'POST', body: JSON.stringify({ valor: valorSolicitado }) })

    setTimeout(() => setShowSuccess(false), 3200);
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText('otavio@email.com');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2200);
    } catch {
      setCopySuccess(false);
    }
  };

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando carteira...
        </div>
      </div>
    );
  }

  if (!isLogged) return null;

  if (!assinaturaAtiva) {
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

            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
              <Lock className="h-4 w-4" />
              Carteira bloqueada
            </div>
          </motion.div>

          <section className="mb-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              
              {...cardHover}
              className="rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Lock className="h-4 w-4" />
                Área pronta para ativação
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Sua carteira será liberada assim que a assinatura estiver ativa
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                Esta área foi desenhada para mostrar saldo, retirada, conta de destino
                e histórico de movimentações. No momento, ela está bloqueada porque
                ainda falta ativar um plano.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ['Saldo disponível', '—'],
                  ['Retirada', 'Bloqueada'],
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
                    Carteira indisponível
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  <AlertCircle className="h-4 w-4" />
                  Aguardando assinatura
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  Assim que a assinatura for ativada, esta área passa a exibir saldo,
                  retirada, conta bancária vinculada e histórico de movimentações.
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
                Esta área vai mostrar a camada financeira da conta
              </p>

              <div className="mt-6 space-y-4">
                {[
                  'Saldo disponível',
                  'Simulação de retirada',
                  'Conta de destino cadastrada',
                  'Histórico completo da carteira',
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
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </section>
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
            href="/resultados"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos resultados
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            <Shield className="h-4 w-4" />
            Carteira e retirada
          </div>
        </motion.div>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            
            {...cardHover}
            className="rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Wallet className="h-4 w-4" />
              Carteira principal
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Seu valor já está disponível na carteira
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Consulte o saldo liberado, acompanhe o histórico de movimentações e
              solicite a retirada para a sua conta cadastrada com clareza e segurança.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Saldo disponível', `R$ ${saldoDisponivel.toLocaleString('pt-BR')}`],
                ['Última liberação', ultimaData],
                ['Status atual', 'Pronto para retirada'],
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

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4" />
                Estrutura pronta para backend
              </div>
              <p className="text-sm leading-relaxed text-blue-50">
                Esta página já pode receber depois saldo real, histórico real, conta
                vinculada e confirmação real da retirada via API.
              </p>
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
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resumo da carteira</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Valor confirmado
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-green-50 p-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Disponível para solicitação
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                O valor associado à sua última contemplação já aparece na carteira
                e está apto para seguir ao fluxo de retirada.
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Último valor liberado</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {ultimaLiberacao}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Prazo estimado</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {prazoEstimado}
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <CircleDollarSign className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Saldo disponível',
              value: `R$ ${saldoDisponivel.toLocaleString('pt-BR')}`,
              className: 'text-3xl',
            },
            {
              icon: <Banknote className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Última liberação',
              value: ultimaLiberacao,
              className: 'text-3xl',
            },
            {
              icon: <Clock3 className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Prazo estimado',
              value: prazoEstimado,
              className: 'text-2xl',
            },
            {
              icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Status',
              value: 'Disponível',
              className: 'text-3xl text-green-700',
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
                  Solicitar retirada
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Simule o valor e siga para a retirada vinculada à sua conta
                </p>
              </div>

              <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Retirada segura
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-gray-300 bg-gray-50 p-4"
                >
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Valor para retirada
                  </label>
                  <div className="flex items-center rounded-xl bg-white px-4 py-3 ring-1 ring-gray-200">
                    <span className="mr-2 font-semibold text-gray-500">R$</span>
                    <input
                      type="number"
                      value={valorInput}
                      onChange={(e) => setValorInput(e.target.value)}
                      className="w-full bg-transparent text-lg font-semibold text-gray-900 outline-none"
                      placeholder="0,00"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-4 ${
                    isValidValue
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <p className="text-sm text-gray-500">Status da simulação</p>
                  <p
                    className={`mt-2 text-base font-semibold ${
                      isValidValue ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {resumoStatus}
                  </p>
                </motion.div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSolicitar}
                    disabled={!isValidValue}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold text-white transition ${
                      isValidValue
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'cursor-not-allowed bg-gray-300'
                    }`}
                  >
                    Solicitar retirada
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>

                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      href="/extrato"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                    >
                      Ver extrato
                      <FileText className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-2xl bg-green-50 p-4"
                    >
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Solicitação iniciada
                      </div>
                      <p className="mt-3 text-sm text-gray-700">
                        Sua solicitação foi registrada e segue para a próxima etapa
                        de validação da retirada.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-5 text-white shadow-lg"
                >
                  <p className="text-sm text-green-100">Valor líquido</p>
                  <h3 className="mt-2 text-4xl font-bold">
                    R$ {valorLiquido.toLocaleString('pt-BR')}
                  </h3>
                  <p className="mt-2 text-sm text-green-50">
                    Valor pronto para seguir ao fluxo de retirada.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-500">Saldo disponível</p>
                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    R$ {saldoDisponivel.toLocaleString('pt-BR')}
                  </h3>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-500">Taxa estimada</p>
                  <h3 className="mt-1 text-xl font-bold text-gray-900">R$ 0</h3>
                </motion.div>
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                <Landmark className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Conta de destino</h2>
                <p className="text-sm text-gray-500">
                  Dados cadastrados para a retirada
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                ['Banco', 'Banco Premium S.A.'],
                ['Agência', '0001'],
                ['Conta', '45872-1'],
                ['Titular', 'Otavio Lopes'],
                ['Chave vinculada', 'otavio@email.com'],
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-500">{item[0]}</p>
                  <div className="mt-1 flex items-center justify-between gap-4">
                    <p className="text-base font-semibold text-gray-900">
                      {item[1]}
                    </p>
                    {idx === 4 && (
                      <button
                        onClick={copyKey}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        <Copy className="h-4 w-4" />
                        Copiar
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {copySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 rounded-2xl bg-blue-50 p-4"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Chave copiada
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5">
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="/atualizar-conta"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Atualizar conta
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
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
                  Histórico da carteira
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Últimas movimentações e eventos relacionados ao saldo
                </p>
              </div>

              <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                Atualizado hoje
              </div>
            </div>

            <div className="space-y-4">
              {historicoRetirada.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-5 ${
                    item.tipo === 'success'
                      ? 'border-green-200 bg-green-50/40'
                      : item.tipo === 'info'
                      ? 'border-blue-200 bg-blue-50/40'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="grid gap-4 lg:grid-cols-[0.9fr_1.4fr_0.6fr_0.7fr] lg:items-center">
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

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/resultados"
                className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Voltar aos resultados
              </Link>

              <Link
                href="/extrato"
                className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Ver extrato completo
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                <History className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Como funciona a retirada
                </h2>
                <p className="text-sm text-gray-500">
                  Etapas da movimentação do valor
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  '1. Valor entra na carteira',
                  'Quando a apuração for confirmada, o valor aparece como disponível.',
                ],
                [
                  '2. Solicitação é iniciada',
                  'Você define o valor e segue para a solicitação da retirada.',
                ],
                [
                  '3. Conta cadastrada recebe o valor',
                  'A movimentação é vinculada à conta informada na sua área.',
                ],
                [
                  '4. Histórico permanece visível',
                  'Tudo continua registrado para consulta posterior.',
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
                <FileText className="h-4 w-4" />
                Observação
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                O fluxo acima é uma representação visual da experiência de retirada
                e pode ser ajustado conforme a lógica final da plataforma.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}