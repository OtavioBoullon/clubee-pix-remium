'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  XCircle,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  BadgeCheck,
  FileText,
  HelpCircle,
  CalendarClock,
  Crown,
  Wallet,
  MessageSquareText,
} from 'lucide-react';

const motivos = [
  'Preço não faz sentido para mim agora',
  'Vou pausar por um tempo',
  'Não estou usando com frequência',
  'Esperava uma experiência diferente',
  'Quero trocar de plano antes de decidir',
  'Outro motivo',
];

export default function CancelarAssinaturaPage() {
  const [motivoSelecionado, setMotivoSelecionado] = useState('');
  const [detalhe, setDetalhe] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const podeEnviar = useMemo(() => {
    return motivoSelecionado.trim().length > 0;
  }, [motivoSelecionado]);

  const handleConfirmar = () => {
    if (!podeEnviar) return;
    setConfirmado(true);
    setTimeout(() => setConfirmado(false), 3500);
  };

  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <Link
            href="/assinatura"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à assinatura
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
            <XCircle className="h-4 w-4" />
            Cancelamento da assinatura
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
              <BadgeCheck className="h-4 w-4" />
              Gestão da assinatura
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Antes de cancelar, queremos entender o motivo
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Esta etapa ajuda a organizar melhor a experiência da assinatura e
              entender o que motivou sua decisão. Você pode selecionar uma opção
              rápida e, se quiser, complementar com um comentário.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Plano atual', 'Premium'],
                ['Valor mensal', 'R$ 99,90'],
                ['Próxima renovação', '12 de abril'],
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
                href="/planos"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                Ver outros planos
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/suporte"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Falar com suporte
                <HelpCircle className="h-4 w-4" />
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
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Antes de confirmar</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  O que acontece depois
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-yellow-50 p-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                <Shield className="h-4 w-4" />
                Revisão importante
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Depois da confirmação, a assinatura pode seguir válida até o fim do
                ciclo atual, de acordo com as regras aplicadas ao seu plano.
              </p>
            </motion.div>

            <div className="mt-5 space-y-4">
              {[
                [
                  'Acesso até o fim do ciclo',
                  'A assinatura pode continuar válida até a data final do período atual.',
                ],
                [
                  'Cobrança futura',
                  'A renovação seguinte pode deixar de acontecer após o cancelamento.',
                ],
                [
                  'Histórico preservado',
                  'As informações da conta podem continuar visíveis para consulta posterior.',
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
          </motion.div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Crown className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Plano atual',
              value: 'Premium',
              className: 'text-3xl',
            },
            {
              icon: <Wallet className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Valor mensal',
              value: 'R$ 99,90',
              className: 'text-3xl',
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Renovação',
              value: '12 de abril',
              className: 'text-2xl',
            },
            {
              icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Status atual',
              value: 'Ativa',
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
                  Motivo do cancelamento
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Escolha uma opção rápida e, se quiser, detalhe melhor
                </p>
              </div>

              <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                Etapa de confirmação
              </div>
            </div>

            <div className="grid gap-3">
              {motivos.map((motivo, idx) => {
                const ativo = motivoSelecionado === motivo;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setMotivoSelecionado(motivo)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      ativo
                        ? 'border-red-300 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">{motivo}</span>
                      {ativo && <CheckCircle2 className="h-5 w-5" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Quer explicar melhor? (opcional)
              </label>
              <motion.div whileHover={{ y: -2 }}>
                <textarea
                  value={detalhe}
                  onChange={(e) => setDetalhe(e.target.value)}
                  rows={5}
                  placeholder="Escreva aqui o motivo com mais detalhes, se quiser."
                  className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-300 focus:bg-white"
                />
              </motion.div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleConfirmar}
                disabled={!podeEnviar}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold text-white transition ${
                  podeEnviar
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                Confirmar cancelamento
                <XCircle className="h-4 w-4" />
              </motion.button>

              <Link
                href="/assinatura"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Voltar para assinatura
              </Link>
            </div>

            <AnimatePresence>
              {confirmado && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-5 rounded-2xl bg-red-50 p-4"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Solicitação registrada
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    Sua solicitação de cancelamento foi registrada com sucesso.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
                <MessageSquareText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Antes de sair
                </h2>
                <p className="text-sm text-gray-500">
                  Algumas opções podem ajudar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'Ver outros planos',
                  'Você pode revisar opções diferentes antes de concluir o cancelamento.',
                  '/planos',
                ],
                [
                  'Falar com suporte',
                  'Caso queira ajuda com cobrança, acesso ou experiência, o suporte pode receber sua demanda.',
                  '/suporte',
                ],
                [
                  'Revisar assinatura',
                  'Volte para a página da assinatura para consultar benefícios, renovação e comparativo.',
                  '/assinatura',
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
                  <div className="mt-3">
                    <Link
                      href={item[2]}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Acessar opção
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
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
                Antes de concluir, revise com atenção as regras do seu plano e o
                impacto do cancelamento sobre a sua experiência na plataforma.
              </p>
            </motion.div>
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
                <Crown className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Voltar para assinatura
                </h2>
                <p className="text-sm text-gray-500">
                  Continue a gestão do seu plano
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Você pode retornar à assinatura para revisar plano, pagamento,
              comparação e visão geral da conta antes de decidir.
            </p>

            <Link
              href="/assinatura"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
            >
              Ir para assinatura
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
                <h2 className="text-xl font-bold text-gray-900">
                  Falar com suporte
                </h2>
                <p className="text-sm text-gray-500">
                  Se preferir uma ajuda antes de cancelar
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Caso exista qualquer dúvida sobre renovação, cobrança ou uso da
              plataforma, o suporte pode ser o melhor próximo passo antes da decisão final.
            </p>

            <Link
              href="/suporte"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Ir para suporte
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}