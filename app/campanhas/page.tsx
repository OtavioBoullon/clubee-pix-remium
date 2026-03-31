'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Ticket,
  Coins,
  CalendarClock,
  Crown,
  TrendingUp,
  Shield,
  ChevronRight,
  CheckCircle2,
  Zap,
  BarChart3,
} from 'lucide-react';

export default function CampanhasPage() {
  const cardHover = {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao painel
          </Link>
        </div>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            {...cardHover}
            className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Participação do seu plano
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight">
              Seu plano atual libera cupons todos os dias para a próxima apuração
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
              Aqui você entende com clareza quantos cupons seu plano libera, qual é o
              seu potencial de participação nesta semana e como um upgrade pode ampliar
              sua presença nas próximas apurações.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Seu plano atual', 'Pro'],
                ['Próxima apuração', 'Hoje, 20h'],
                ['Premiação atual', 'R$ 8.500'],
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
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                  <Ticket className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cupons liberados hoje</p>
                  <h3 className="text-3xl font-bold text-gray-900">+5</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                Seu plano Pro libera participação diária no ciclo atual.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                  <CalendarClock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cupons liberados na semana</p>
                  <h3 className="text-3xl font-bold text-gray-900">+35</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                Considerando o uso completo do seu plano ao longo da semana.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Ticket className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Seus cupons ativos',
              value: '12',
            },
            {
              icon: <Coins className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Valor da apuração',
              value: 'R$ 8.500',
            },
            {
              icon: <TrendingUp className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Potencial semanal',
              value: '+35 cupons',
            },
            {
              icon: <Crown className="h-6 w-6 text-orange-500" />,
              bg: 'bg-orange-100',
              label: 'Próximo nível',
              value: 'Premium',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 + idx * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}>
                {item.icon}
              </div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">{item.value}</h3>
            </motion.div>
          ))}
        </section>

        <section className="mb-8 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                O que seu plano realmente entrega
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sem confusão: aqui está o impacto prático do seu acesso atual
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Plano Pro
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <motion.div whileHover={{ y: -2 }} className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Por dia</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">+5 cupons</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Seu plano libera geração diária de participação no ciclo atual.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Por semana</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">+35 cupons</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Mantendo o uso completo do plano, esse é o seu potencial semanal estimado.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="rounded-2xl border bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Impacto real</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">Mais presença</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Quanto mais cupons ativos, maior sua participação nas próximas apurações.
              </p>
            </motion.div>
          </div>
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
                <h2 className="text-2xl font-bold text-gray-900">Comparação de planos</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Veja o que mudaria no seu potencial de cupons com upgrade
                </p>
              </div>

              <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Oportunidade comercial
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-3xl border-2 border-blue-200 bg-blue-50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Seu plano atual</p>
                    <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-gray-500">Cupons por dia</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">+5</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-gray-500">Cupons por semana</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">+35</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-gray-500">Leitura</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      Bom equilíbrio entre custo e participação
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-3xl border-2 border-green-300 bg-green-50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600">
                    <Crown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-700">Upgrade sugerido</p>
                    <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-gray-500">Cupons por dia</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">+10</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-gray-500">Cupons por semana</p>
                    <p className="mt-1 text-xl font-bold text-gray-900">+70</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-gray-500">Leitura</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      Participação mais forte e maior presença nas apurações
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="flex items-start gap-3">
                <Zap className="mt-0.5 h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-semibold text-gray-900">Leitura comercial direta</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">
                    No Premium, seu potencial semanal praticamente dobra. Isso significa
                    mais cupons ativos e maior volume de participação nas apurações em aberto.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <h2 className="mb-4 text-xl font-bold text-gray-900">Resumo rápido</h2>

              <div className="space-y-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Hoje seu plano libera</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">+5 cupons</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Na semana seu plano libera</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">+35 cupons</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Se fosse Premium</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">+70 cupons</p>
                </div>
              </div>

              <Link
                href="/planos"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 font-bold text-white transition hover:from-green-600 hover:to-green-700"
              >
                Ver upgrade de plano
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Como pensar essa área</h2>
                  <p className="text-sm text-gray-500">
                    Leitura objetiva do seu potencial
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                Esta página não existe para mostrar “tarefas”. Ela existe para deixar
                claro, de forma comercial e objetiva, quanto de participação o plano
                do usuário libera no ciclo atual e como um upgrade pode ampliar seu
                volume de cupons.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="rounded-[28px] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Seu plano já libera participação diária</h2>
              <p className="mt-2 max-w-2xl text-blue-100">
                Continue acompanhando suas apurações ou veja como ampliar sua
                participação com um plano superior.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/resultados"
                className="rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Ver resultados
              </Link>

              <Link
                href="/planos"
                className="rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/15"
              >
                Comparar planos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}