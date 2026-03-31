'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Landmark,
  Shield,
  BadgeCheck,
  User,
  Save,
  CheckCircle2,
  Copy,
  ChevronRight,
  FileText,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AtualizarContaPage() {
  const [form, setForm] = useState({
    banco: 'Banco Premium S.A.',
    agencia: '0001',
    conta: '45872-1',
    titular: 'Otavio Lopes',
    chave: 'otavio@email.com',
    tipoChave: 'Email',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3200);
  };

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(form.chave);
    } catch {}
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
            href="/carteira"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à carteira
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Shield className="h-4 w-4" />
            Atualização de conta
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
              Conta de destino
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Atualize os dados da conta vinculada
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Revise banco, agência, conta, titular e chave vinculada para manter
              a retirada associada aos dados corretos da sua conta.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Banco atual', form.banco],
                ['Agência', form.agencia],
                ['Conta', form.conta],
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resumo da atualização</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Dados protegidos
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-green-50 p-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <Lock className="h-4 w-4" />
                Atualização segura
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Revise as informações antes de salvar. Os dados da conta de
                destino impactam diretamente o fluxo de retirada associado à sua
                carteira.
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Titular</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {form.titular}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Tipo de chave</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {form.tipoChave}
                </h3>
              </motion.div>
            </div>
          </motion.div>
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
                  Formulário da conta
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Atualize os dados vinculados à retirada
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Dados bancários
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Banco</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.banco}
                    onChange={(e) => handleChange('banco', e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Agência</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.agencia}
                    onChange={(e) => handleChange('agencia', e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Conta</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.conta}
                    onChange={(e) => handleChange('conta', e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Titular</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.titular}
                    onChange={(e) => handleChange('titular', e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tipo de chave
                </label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <select
                    value={form.tipoChave}
                    onChange={(e) => handleChange('tipoChave', e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  >
                    <option>Email</option>
                    <option>CPF</option>
                    <option>Telefone</option>
                    <option>Chave aleatória</option>
                  </select>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Chave vinculada
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.chave}
                    onChange={(e) => handleChange('chave', e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                  />
                  <button
                    onClick={copyKey}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar
                  </button>
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
                Salvar atualização
                <Save className="h-4 w-4" />
              </motion.button>

              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="/carteira"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Voltar à carteira
                </Link>
              </motion.div>
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
                    Atualização salva
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    Os dados da conta foram atualizados com sucesso e já estão
                    prontos para uso no fluxo de retirada.
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
                  Revisão importante antes de salvar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'Confirme o titular',
                  'O nome precisa corresponder à conta que receberá a retirada.',
                ],
                [
                  'Revise agência e conta',
                  'Qualquer divergência pode impactar a movimentação associada.',
                ],
                [
                  'Verifique a chave vinculada',
                  'Garanta que a informação está correta antes de salvar.',
                ],
                [
                  'Mantenha a conta atualizada',
                  'Os dados desta página são usados como referência no fluxo da carteira.',
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
                Revise cuidadosamente os dados antes de salvar. Essas informações
                serão utilizadas como referência para o direcionamento correto da retirada.
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                <Landmark className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Voltar à carteira
                </h2>
                <p className="text-sm text-gray-500">
                  Continue o fluxo de retirada
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Depois de revisar os dados da conta, você pode retornar à carteira
              para seguir com a solicitação de retirada.
            </p>

            <Link
              href="/carteira"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Dados atuais
                </h2>
                <p className="text-sm text-gray-500">
                  Resumo da conta vinculada
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                ['Banco', form.banco],
                ['Agência', form.agencia],
                ['Conta', form.conta],
                ['Titular', form.titular],
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
      </div>
    </div>
  );
}