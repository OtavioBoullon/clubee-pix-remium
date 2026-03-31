'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Trophy,
  Clock3,
  Layers3,
  Shield,
  Wallet,
  ArrowUpRight,
  BadgeCheck,
  FileText,
  AlertCircle,
  Lock,
} from 'lucide-react';

type TipoHistorico = 'positivo' | 'negativo' | 'resultado' | 'info';
type FiltroHistorico = 'todos' | 'liberacoes' | 'resultados' | 'plano' | 'status';

type EventoHistorico = {
  id: number;
  titulo: string;
  data: string;
  detalhe: string;
  impacto: string;
  status: string;
  tipo: TipoHistorico;
  categoria: FiltroHistorico | 'todos';
};

const historicoBase: EventoHistorico[] = [
  {
    id: 1,
    titulo: 'Liberação registrada no período',
    data: 'Hoje, 14:32',
    detalhe:
      'Sua conta recebeu uma atualização de acesso vinculada ao ciclo atual.',
    impacto: 'Nova liberação visível',
    status: 'Confirmado',
    tipo: 'positivo',
    categoria: 'liberacoes',
  },
  {
    id: 2,
    titulo: 'Atualização semanal da conta',
    data: 'Ontem, 18:10',
    detalhe:
      'O plano ativo ampliou os recursos disponíveis para este período.',
    impacto: 'Experiência ampliada',
    status: 'Confirmado',
    tipo: 'positivo',
    categoria: 'plano',
  },
  {
    id: 3,
    titulo: 'Plano ativo no ciclo atual',
    data: '2 dias atrás',
    detalhe:
      'Seu plano permaneceu válido e a conta continuou apta para o ciclo.',
    impacto: 'Conta em operação',
    status: 'Ativo',
    tipo: 'info',
    categoria: 'plano',
  },
  {
    id: 4,
    titulo: 'Apuração publicada',
    data: '3 dias atrás',
    detalhe: 'Resultado da apuração disponibilizado para consulta na plataforma.',
    impacto: 'Resultado disponível',
    status: 'Publicado',
    tipo: 'resultado',
    categoria: 'resultados',
  },
  {
    id: 5,
    titulo: 'Período sem nova liberação',
    data: '4 dias atrás',
    detalhe:
      'Nenhuma atualização adicional foi disponibilizada para a conta naquele momento.',
    impacto: 'Sem alteração no período',
    status: 'Sem atualização',
    tipo: 'negativo',
    categoria: 'status',
  },
];

const filtrosConfig: { key: FiltroHistorico; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'liberacoes', label: 'Liberações' },
  { key: 'resultados', label: 'Resultados' },
  { key: 'plano', label: 'Plano' },
  { key: 'status', label: 'Status da conta' },
];

export default function HistoricoPage() {
  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState(false);

  const [planoAtual, setPlanoAtual] = useState('Premium');
  const [statusConta, setStatusConta] = useState('Ativa');
  const [ultimoEvento, setUltimoEvento] = useState('Hoje, 14:32');

  const [filtroAtivo, setFiltroAtivo] = useState<FiltroHistorico>('todos');
  const [historico, setHistorico] = useState<EventoHistorico[]>(historicoBase);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const logged = localStorage.getItem('isLogged') === 'true';
    const ativa = localStorage.getItem('assinatura_ativa') === 'true';
    const plano = localStorage.getItem('plano_ativo');

    if (!logged) {
      window.location.href = '/login';
      return;
    }

    setIsLogged(logged);
    setAssinaturaAtiva(ativa);

    if (plano === 'essencial') setPlanoAtual('Essencial');
    else if (plano === 'pro') setPlanoAtual('Pro');
    else if (plano === 'premium') setPlanoAtual('Premium');
    else setPlanoAtual('Premium');

    setStatusConta(ativa ? 'Ativa' : 'Sem assinatura');
  }, []);

  const historicoFiltrado = useMemo(() => {
    if (filtroAtivo === 'todos') return historico;
    return historico.filter((item) => item.categoria === filtroAtivo);
  }, [filtroAtivo, historico]);

  const totalResultados = historico.filter((item) => item.tipo === 'resultado').length;
  const totalEventos = historico.length;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-6 text-sm text-gray-500 shadow-sm">
          Carregando histórico...
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
          >
            <Link
              href="/dashboard"
              className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar ao dashboard
            </Link>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Lock className="h-4 w-4" />
              Área disponível para membros ativos
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              O histórico completo da conta ficará disponível após ativar a assinatura
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-100">
              Esta área reúne a linha do tempo da sua experiência, com liberações,
              resultados, status do plano e eventos importantes da conta.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Último evento', '—'],
                ['Plano atual', 'Sem assinatura'],
                ['Status da conta', 'Bloqueado'],
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
                className="rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Ativar assinatura
              </Link>
            </div>
          </motion.section>

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
                Esta área vai mostrar a timeline da sua conta
              </p>

              <div className="mt-6 space-y-4">
                {[
                  'Liberações importantes',
                  'Resultados publicados',
                  'Status do plano no ciclo',
                  'Eventos e alterações da conta',
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
        >
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar ao dashboard
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 rounded-[28px] bg-gradient-to-br from-[#1450ff] via-[#2158f5] to-[#173ec9] p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.25)]"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Clock3 className="h-4 w-4" />
            Histórico da conta
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Acompanhe os registros mais importantes da sua conta
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-100">
            Aqui você visualiza as atualizações mais relevantes da sua jornada
            dentro da plataforma, incluindo liberações, status do plano,
            resultados publicados e eventos ligados à sua experiência.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Último evento', ultimoEvento],
              ['Plano atual', planoAtual],
              ['Status da conta', statusConta],
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
        </motion.section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Layers3 className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Eventos recentes',
              value: String(totalEventos).padStart(2, '0'),
              className: 'text-3xl',
            },
            {
              icon: <BadgeCheck className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Conta',
              value: statusConta,
              className: 'text-3xl text-green-700',
            },
            {
              icon: <Trophy className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Resultados publicados',
              value: String(totalResultados).padStart(2, '0'),
              className: 'text-3xl',
            },
            {
              icon: <Shield className="h-6 w-6 text-yellow-600" />,
              bg: 'bg-yellow-100',
              label: 'Plano no ciclo',
              value: planoAtual,
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

        <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Linha do tempo da conta
            </h2>
            <p className="mt-1 text-base text-gray-600">
              Veja em ordem os eventos mais importantes da sua experiência.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {filtrosConfig.map((filtro) => {
              const ativo = filtroAtivo === filtro.key;
              return (
                <motion.button
                  key={filtro.key}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setFiltroAtivo(filtro.key)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    ativo
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filtro.key === 'todos' ? (
                    <span className="inline-flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {filtro.label}
                    </span>
                  ) : (
                    filtro.label
                  )}
                </motion.button>
              );
            })}

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Datas
            </motion.button>
          </div>
        </section>

        <section className="space-y-4">
          {historicoFiltrado.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -3 }}
              className={`rounded-[24px] border bg-white p-6 shadow-sm transition ${
                item.tipo === 'positivo'
                  ? 'border-green-200'
                  : item.tipo === 'negativo'
                    ? 'border-red-200'
                    : item.tipo === 'resultado'
                      ? 'border-purple-200'
                      : 'border-blue-200'
              }`}
            >
              <div className="grid gap-5 xl:grid-cols-[1.25fr_0.8fr_0.6fr] xl:items-center">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      item.tipo === 'positivo'
                        ? 'bg-green-100'
                        : item.tipo === 'negativo'
                          ? 'bg-red-100'
                          : item.tipo === 'resultado'
                            ? 'bg-purple-100'
                            : 'bg-blue-100'
                    }`}
                  >
                    {item.tipo === 'positivo' && (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    )}
                    {item.tipo === 'negativo' && (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                    {item.tipo === 'resultado' && (
                      <Trophy className="h-6 w-6 text-purple-600" />
                    )}
                    {item.tipo === 'info' && (
                      <Shield className="h-6 w-6 text-blue-600" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.data}</p>
                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      {item.titulo}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-600">
                      {item.detalhe}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Impacto no histórico</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {item.impacto}
                  </p>
                </div>

                <div>
                  {item.tipo === 'negativo' ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                      <XCircle className="h-4 w-4" />
                      {item.status}
                    </span>
                  ) : item.tipo === 'resultado' ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                      <Trophy className="h-4 w-4" />
                      {item.status}
                    </span>
                  ) : item.tipo === 'info' ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      <Shield className="h-4 w-4" />
                      {item.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {historicoFiltrado.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center"
            >
              <p className="text-base font-semibold text-gray-800">
                Nenhum evento encontrado neste filtro
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Tente voltar para “Todos” para visualizar a timeline completa.
              </p>
            </motion.div>
          )}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-10 rounded-[28px] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.20)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Sua conta segue em acompanhamento</h2>
              <p className="mt-2 max-w-2xl text-blue-100">
                Continue acompanhando resultados, carteira e movimentações mais
                importantes da sua experiência dentro da plataforma.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/resultados"
                className="rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Ver resultados
              </Link>

              <Link
                href="/carteira"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Ver carteira
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Carteira</h2>
                <p className="text-sm text-gray-500">
                  Consulte saldo, retirada e extrato
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Se quiser acompanhar a parte financeira da sua experiência, a carteira
              reúne saldo disponível, retirada e histórico vinculado à conta.
            </p>

            <Link
              href="/carteira"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-700"
            >
              Ir para carteira
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Assinatura</h2>
                <p className="text-sm text-gray-500">
                  Veja plano, renovação e pagamento
                </p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              A página de assinatura reúne visão do plano atual, renovação,
              comparação entre planos e ações ligadas à sua conta.
            </p>

            <Link
              href="/assinatura"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Ver assinatura
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}