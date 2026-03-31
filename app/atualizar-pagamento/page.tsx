'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Shield,
  BadgeCheck,
  CheckCircle2,
  Lock,
  AlertCircle,
  RefreshCcw,
  ChevronRight,
  CalendarClock,
  Wallet,
  FileText,
  Save,
} from 'lucide-react';

export default function AtualizarPagamentoPage() {
  const [form, setForm] = useState({
    nomeCartao: 'Otavio Lopes',
    numeroCartao: '4111 1111 1111 4587',
    validade: '12/29',
    cvv: '123',
    bandeira: 'Visa',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3200);
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
            href="/pagamento"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao pagamento
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <CreditCard className="h-4 w-4" />
            Atualizar pagamento
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
              <RefreshCcw className="h-4 w-4" />
              Gestão do método de pagamento
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Atualize o método de pagamento da sua assinatura
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Revise os dados do cartão, mantenha a cobrança regular e garanta a
              continuidade da assinatura com mais segurança e clareza.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Plano atual', 'Premium'],
                ['Cobrança mensal', 'R$ 99,90'],
                ['Próxima cobrança', '12 de abril'],
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
                href="/pagamento"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                Ver pagamento atual
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/assinatura"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Voltar à assinatura
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
                <p className="text-sm text-gray-500">Segurança do pagamento</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Atualização protegida
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-green-50 p-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <Lock className="h-4 w-4" />
                Dados sensíveis protegidos
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Revise atentamente os dados antes de salvar. O método atualizado
                será usado como referência para a próxima cobrança da assinatura.
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Método atual</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  Cartão de crédito
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Bandeira</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {form.bandeira}
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
              value: 'R$ 99,90',
              className: 'text-3xl',
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Próxima cobrança',
              value: '12 de abril',
              className: 'text-2xl',
            },
            {
              icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Status',
              value: 'Em dia',
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
                  Dados do cartão
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Atualize o método usado para a cobrança da assinatura
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Método cadastrado
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <motion.div whileHover={{ y: -2 }} className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Nome no cartão
                </label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.nomeCartao}
                    onChange={(e) => setForm((prev) => ({ ...prev, nomeCartao: e.target.value }))}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Número do cartão
                </label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.numeroCartao}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, numeroCartao: e.target.value }))
                    }
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Validade</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.validade}
                    onChange={(e) => setForm((prev) => ({ ...prev, validade: e.target.value }))}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CVV</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="password"
                    value={form.cvv}
                    onChange={(e) => setForm((prev) => ({ ...prev, cvv: e.target.value }))}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Bandeira</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <select
                    value={form.bandeira}
                    onChange={(e) => setForm((prev) => ({ ...prev, bandeira: e.target.value }))}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  >
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>Elo</option>
                    <option>Amex</option>
                  </select>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
              >
                Salvar pagamento
                <Save className="h-4 w-4" />
              </motion.button>

              <Link
                href="/pagamento"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Voltar ao pagamento
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
                    Método atualizado
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    Os dados do pagamento foram atualizados com sucesso e já estão
                    prontos para a próxima cobrança.
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recomendações
                </h2>
                <p className="text-sm text-gray-500">
                  Revisão rápida antes de salvar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'Verifique o nome do titular',
                  'O nome do cartão deve corresponder ao método utilizado na cobrança.',
                ],
                [
                  'Confira número e validade',
                  'Esses dados precisam estar corretos para manter a renovação regular.',
                ],
                [
                  'Atualize antes da próxima cobrança',
                  'Quanto antes o método estiver revisado, mais estável fica o fluxo.',
                ],
                [
                  'Guarde o histórico da cobrança',
                  'Depois da atualização, você pode acompanhar tudo pela página de pagamento.',
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
                Revise os dados do cartão com atenção antes de salvar para manter
                a cobrança regular e evitar inconsistências na renovação.
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
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Voltar ao pagamento
                </h2>
                <p className="text-sm text-gray-500">
                  Continue acompanhando a cobrança
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Depois da revisão do cartão, você pode retornar à página de pagamento
              para acompanhar método, histórico e status da cobrança.
            </p>

            <Link
              href="/pagamento"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
            >
              Ir para pagamento
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
                <BadgeCheck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Assinatura
                </h2>
                <p className="text-sm text-gray-500">
                  Retorne à gestão do plano
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              A página de assinatura continua sendo o ponto principal para consultar
              plano, renovação, comparação e visão geral da sua conta.
            </p>

            <Link
              href="/assinatura"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Voltar à assinatura
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}