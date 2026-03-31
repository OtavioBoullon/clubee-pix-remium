'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Ticket,
  CalendarClock,
  Shield,
  Crown,
  Sparkles,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Gift,
  BarChart3,
  BadgeCheck,
} from 'lucide-react';

const ultimaApuracao = {
  data: '28/03/2026',
  horario: '20:00',
  campanha: 'Apuração principal de março',
  cupom: '#928374',
  premiacao: 'R$ 8.500',
  vencedor: 'Mariana S. — São Paulo/SP',
};

const historico = [
  {
    data: '28/03/2026',
    campanha: 'Apuração principal de março',
    cupom: '#928374',
    premiacao: 'R$ 8.500',
    vencedor: 'Mariana S. — São Paulo/SP',
    destaque: true,
  },
  {
    data: '25/03/2026',
    campanha: 'Apuração semanal',
    cupom: '#837221',
    premiacao: 'R$ 5.000',
    vencedor: 'Rafael A. — Campinas/SP',
    destaque: false,
  },
  {
    data: '22/03/2026',
    campanha: 'Apuração especial',
    cupom: '#712938',
    premiacao: 'R$ 6.200',
    vencedor: 'Camila D. — Belo Horizonte/MG',
    destaque: false,
  },
  {
    data: '18/03/2026',
    campanha: 'Apuração extraordinária',
    cupom: '#541220',
    premiacao: 'R$ 4.000',
    vencedor: 'Lucas P. — Curitiba/PR',
    destaque: false,
  },
  {
    data: '15/03/2026',
    campanha: 'Apuração do período',
    cupom: '#482117',
    premiacao: 'R$ 3.500',
    vencedor: 'Fernanda M. — Rio de Janeiro/RJ',
    destaque: false,
  },
];

export default function ApuracoesPage() {
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
            href="/"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o site
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Shield className="h-4 w-4" />
            Página pública de apurações
          </div>
        </motion.div>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            {...cardHover}
            className="rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Transparência e histórico do clube
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Última apuração já publicada
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-blue-100">
              Consulte o cupom sorteado, o valor da apuração, a data do evento e
              o registro do contemplado. Esta página organiza de forma pública os
              principais resultados do clube.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Cupom sorteado', ultimaApuracao.cupom],
                ['Valor da apuração', ultimaApuracao.premiacao],
                ['Contemplado', ultimaApuracao.vencedor],
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

            <div className="mt-6 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <Link
                  href="/planos"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                >
                  Quero participar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Entrar na minha conta
                  <BadgeCheck className="h-4 w-4" />
                </Link>
              </motion.div>
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
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Último registro</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Resultado confirmado
                </h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-green-50 p-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Publicado e validado
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                A última apuração do período já está disponível nesta página, com
                visibilidade do cupom sorteado, valor associado e contemplado
                registrado.
              </p>
            </motion.div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Data</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {ultimaApuracao.data}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">Horário</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {ultimaApuracao.horario}
                </h3>
              </motion.div>
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Campanha</p>
              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {ultimaApuracao.campanha}
              </h3>
            </div>
          </motion.div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Ticket className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Cupom sorteado',
              value: ultimaApuracao.cupom,
              valueClass: 'text-3xl',
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Próxima apuração',
              value: 'Hoje, 20h',
              valueClass: 'text-3xl',
            },
            {
              icon: <Gift className="h-6 w-6 text-yellow-500" />,
              bg: 'bg-yellow-100',
              label: 'Valor atual',
              value: ultimaApuracao.premiacao,
              valueClass: 'text-3xl',
            },
            {
              icon: <Crown className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Status',
              value: 'Publicado',
              valueClass: 'text-3xl text-green-700',
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
              <h3 className={`mt-2 font-bold text-gray-900 ${item.valueClass}`}>
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
                  Como funciona esta página
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Transparência pública das últimas apurações
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Transparência pública
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              {[
                [
                  '1. Veja o cupom sorteado',
                  'O número principal da apuração aparece em destaque logo no topo da página.',
                ],
                [
                  '2. Confira o valor',
                  'Cada resultado mostra o valor associado àquela apuração publicada.',
                ],
                [
                  '3. Veja quem foi contemplado',
                  'A página exibe o registro do contemplado do período de forma organizada.',
                ],
                [
                  '4. Acompanhe o histórico',
                  'As últimas apurações ficam registradas para facilitar transparência e consulta.',
                ],
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="font-semibold text-gray-900">{item[0]}</p>
                  <p className="mt-1 text-gray-600">{item[1]}</p>
                </motion.div>
              ))}
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
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Leitura rápida
                </h2>
                <p className="text-sm text-gray-500">
                  O que o visitante entende aqui
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Último cupom sorteado do clube',
                'Valor associado à apuração',
                'Data e horário da publicação',
                'Histórico recente para reforço de confiança',
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-gray-50 p-4"
                >
                  <p className="text-sm font-semibold text-gray-900">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">
                Quer participar dos próximos ciclos?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Entre no clube e acompanhe tudo também dentro da sua área de
                membro, com painel, histórico e visão individual da sua conta.
              </p>

              <div className="mt-4">
                <Link
                  href="/planos"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                  Ver planos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-2">
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
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Transparência</h2>
                <p className="text-sm text-gray-500">
                  Organização pública das apurações
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Esta área foi pensada para dar clareza visual ao histórico das
              apurações, reforçando confiança, transparência e entendimento da
              dinâmica do clube.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Página pública informativa
            </div>
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
                <Clock3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Próximo ciclo</h2>
                <p className="text-sm text-gray-500">
                  Continuidade da jornada
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              A próxima apuração segue programada para hoje às 20h, mantendo a
              consistência visual e o histórico público dos registros mais
              recentes da plataforma.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <CalendarClock className="h-4 w-4" />
              Hoje, 20h
            </div>
          </motion.div>
        </section>

        <section className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Histórico recente de apurações
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Cupons, valores e contemplados mais recentes
              </p>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Atualizado hoje
            </div>
          </div>

          <div className="space-y-4">
            {historico.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className={`rounded-2xl border p-5 ${
                  item.destaque
                    ? 'border-green-200 bg-green-50/40'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.7fr_0.8fr_1fr_1fr] xl:items-center">
                  <div>
                    <p className="text-sm text-gray-500">{item.data}</p>
                    <h3 className="mt-1 font-bold text-gray-900">{item.campanha}</h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Cupom sorteado</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {item.cupom}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Premiação</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {item.premiacao}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Contemplado</p>
                    <p className="mt-1 text-base font-bold text-gray-900">
                      {item.vencedor}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Publicado
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Voltar ao site
            </Link>

            <Link
              href="/planos"
              className="rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white transition hover:bg-green-700"
            >
              Quero participar
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Entrar na conta
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}