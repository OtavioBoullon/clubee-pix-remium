'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  Crown,
  Sparkles,
  Shield,
  Zap,
  Star,
  BadgeCheck,
  HelpCircle,
  CheckCircle2,
  CreditCard,
  FileText,
  Clock3,
} from 'lucide-react';

const planos = [
  {
    id: 'essencial',
    nome: 'Essencial',
    preco: '29,90',
    destaque: false,
    descricao:
      'Entrada ideal para começar no clube com acesso ao painel, recursos básicos e experiência inicial.',
    beneficios: [
      'Acesso inicial à plataforma',
      'Painel do assinante',
      'Consulta de resultados',
      'Visualização básica da experiência',
      'Benefícios de entrada conforme disponibilidade',
      'Suporte por email',
    ],
    cor: 'from-slate-700 to-slate-800',
    badge: 'Entrada',
    accent: 'bg-slate-100 text-slate-700',
  },
  {
    id: 'pro',
    nome: 'Pro',
    preco: '59,90',
    destaque: true,
    descricao:
      'Mais equilíbrio entre custo, acesso e amplitude da experiência dentro da plataforma.',
    beneficios: [
      'Tudo do plano Essencial',
      'Acesso ampliado ao painel',
      'Mais recursos disponíveis por período',
      'Prioridade intermediária',
      'Benefícios ampliados conforme regras vigentes',
      'Suporte prioritário',
    ],
    cor: 'from-green-500 to-green-600',
    badge: 'Mais escolhido',
    accent: 'bg-green-100 text-green-700',
  },
  {
    id: 'premium',
    nome: 'Premium',
    preco: '99,90',
    destaque: false,
    descricao:
      'Experiência mais completa para membros que buscam maior acesso, prioridade e visibilidade.',
    beneficios: [
      'Tudo do plano Pro',
      'Acesso premium a recursos selecionados',
      'Mais prioridade na experiência',
      'Visualização ampliada de carteira e extrato',
      'Benefícios avançados conforme disponibilidade',
      'Suporte VIP',
    ],
    cor: 'from-blue-600 to-blue-700',
    badge: 'Avançado',
    accent: 'bg-blue-100 text-blue-700',
  },
];

const comparativo = [
  ['Acesso ao painel', 'Sim', 'Sim', 'Sim'],
  ['Consulta de resultados', 'Sim', 'Sim', 'Sim'],
  ['Benefícios ativos', 'Base', 'Ampliado', 'Avançado'],
  ['Prioridade na experiência', 'Padrão', 'Intermediária', 'Alta'],
  ['Visualização da conta', 'Essencial', 'Ampliada', 'Completa'],
  ['Suporte', 'Email', 'Prioritário', 'VIP'],
];

const faq = [
  {
    pergunta: 'Posso trocar de plano depois?',
    resposta:
      'Sim. A estrutura do produto já considera evolução futura entre planos dentro da sua conta.',
  },
  {
    pergunta: 'Os planos garantem benefícios?',
    resposta:
      'Não. O plano amplia acesso, prioridade e experiência, mas os benefícios continuam sujeitos às regras e à disponibilidade vigente.',
  },
  {
    pergunta: 'Essa página já faz cobrança real?',
    resposta:
      'Ainda não. Nesta fase, a página é visual e prepara o fluxo para integração posterior com pagamento.',
  },
];

export default function PlanosPage() {
  const [planoAtivo, setPlanoAtivo] = useState<string | null>(null);
  const [temAssinatura, setTemAssinatura] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 14 * 60 + 38);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const logged = localStorage.getItem('isLogged') === 'true';
    const ativa = localStorage.getItem('assinatura_ativa') === 'true';
    const plano = localStorage.getItem('plano_ativo');

    setIsLogged(logged);
    setTemAssinatura(ativa);

    if (ativa && plano) {
      setPlanoAtivo(plano);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 2 * 60 * 60 + 14 * 60 + 38;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo(() => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, [timeLeft]);

  const cardHover = {
    whileHover: { y: -5, scale: 1.01 },
    transition: { duration: 0.18, ease: 'easeOut' as const },
  };

  const irParaCriacaoOuCheckout = () => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('fluxo_pagamento', 'true');

    if (isLogged) {
      window.location.href = '/checkout';
    } else {
      window.location.href = '/register';
    }
  };

  const escolherPlano = (planoId: string) => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('plano_escolhido', planoId);
    localStorage.setItem('fluxo_pagamento', 'true');

    if (isLogged) {
      window.location.href = '/checkout';
    } else {
      window.location.href = '/register';
    }
  };

  const isPlanoAtual = (id: string) => temAssinatura && planoAtivo === id;

  const getTextoBotao = (planoId: string) => {
    const plano = planos.find((p) => p.id === planoId);

    if (!temAssinatura) return `Escolher ${plano?.nome ?? ''}`;

    if (planoId === planoAtivo) {
      return 'Plano atual';
    }

    if (
      (planoAtivo === 'essencial' && (planoId === 'pro' || planoId === 'premium')) ||
      (planoAtivo === 'pro' && planoId === 'premium')
    ) {
      return 'Fazer upgrade';
    }

    return 'Trocar plano';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link
            href="/assinatura"
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para assinatura
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-12 overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.20)] md:p-12"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Escolha o plano ideal
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Planos pensados para cada momento da sua jornada
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-blue-100">
              Compare os níveis de acesso do Clube Pix Premium e escolha a assinatura
              que faz mais sentido para a sua experiência dentro da plataforma.
            </p>

            <div className="mx-auto mt-6 flex max-w-7xl items-center justify-center gap-3 text-sm font-semibold">
              <Clock3 className="h-4 w-4" />
              <span>Próxima atualização do ciclo em</span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-bold tracking-wide">
                {formattedTime}
              </span>
            </div>

            {temAssinatura && planoAtivo && (
              <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                <BadgeCheck className="h-4 w-4" />
                Seu plano atual é {planos.find((p) => p.id === planoAtivo)?.nome ?? 'Ativo'}
              </div>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={irParaCriacaoOuCheckout}
                className="rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50"
              >
                {isLogged ? 'Ir para checkout' : 'Criar conta agora'}
              </button>

              <Link
                href="/suporte"
                className="rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Falar com o time
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="mb-14 grid gap-8 lg:grid-cols-3">
          {planos.map((plano, index) => {
            const planoAtual = isPlanoAtual(plano.id);

            return (
              <motion.div
                key={plano.nome}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                
                {...cardHover}
                className={`relative rounded-[32px] border bg-white p-8 shadow-sm transition ${
                  planoAtual
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : plano.destaque
                      ? 'border-green-500 ring-2 ring-green-100'
                      : 'border-gray-200'
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${plano.accent}`}>
                    {planoAtual ? 'Seu plano' : plano.badge}
                  </span>

                  {planoAtual ? (
                    <div className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                      <BadgeCheck className="h-4 w-4" />
                      Ativo
                    </div>
                  ) : (
                    plano.destaque && (
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                        <Star className="h-4 w-4 fill-current" />
                        Destaque
                      </div>
                    )
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-900">{plano.nome}</h2>

                <p className="mt-3 min-h-[82px] text-lg leading-8 text-gray-600">
                  {plano.descricao}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="pb-2 text-lg text-gray-500">R$</span>
                  <span className="text-6xl font-bold tracking-tight text-gray-900">
                    {plano.preco}
                  </span>
                  <span className="pb-2 text-sm text-gray-500">/mês</span>
                </div>

                <div className="mt-8 space-y-4">
                  {plano.beneficios.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-base leading-7 text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => !planoAtual && escolherPlano(plano.id)}
                    disabled={planoAtual}
                    className={`inline-flex w-full items-center justify-center rounded-xl px-6 py-4 font-bold transition ${
                      planoAtual
                        ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                        : `bg-gradient-to-r ${plano.cor} text-white hover:opacity-95`
                    }`}
                  >
                    {getTextoBotao(plano.id)}
                    {!planoAtual && <Zap className="ml-2 h-5 w-5" />}
                  </button>

                  <Link
                    href="/assinatura"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 px-6 py-4 font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    Ver detalhes da assinatura
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-14 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Comparativo rápido
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Veja de forma simples o que muda entre os planos.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">
                    Recurso
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">
                    Essencial
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">
                    Pro
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparativo.map((linha) => (
                  <motion.tr
                    key={linha[0]}
                    whileHover={{ scale: 1.002 }}
                    className="bg-gray-50"
                  >
                    <td className="rounded-l-xl px-4 py-4 font-medium text-gray-900">
                      {linha[0]}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{linha[1]}</td>
                    <td className="px-4 py-4 text-gray-700">{linha[2]}</td>
                    <td className="rounded-r-xl px-4 py-4 text-gray-700">{linha[3]}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Shield className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              titulo: 'Sem fidelidade',
              texto:
                'Você pode revisar seu plano e ajustar sua assinatura conforme o momento.',
            },
            {
              icon: <Crown className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              titulo: 'Mais acesso, mais recursos',
              texto:
                'Planos superiores ampliam acesso, prioridade e profundidade da experiência.',
            },
            {
              icon: <Sparkles className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              titulo: 'Pronto para evoluir depois',
              texto:
                'Esta página já está pronta para, no futuro, conectar checkout e pagamento real.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{item.titulo}</h3>
              <p className="mt-3 text-lg leading-8 text-gray-600">{item.texto}</p>
            </motion.div>
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-14 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <HelpCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Dúvidas rápidas
              </h2>
              <p className="mt-1 text-lg text-gray-600">
                O essencial para entender essa página
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {faq.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-gray-50 p-5"
              >
                <h3 className="text-xl font-bold text-gray-900">{item.pergunta}</h3>
                <p className="mt-2 text-lg leading-8 text-gray-600">{item.resposta}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-[32px] bg-gradient-to-r from-blue-600 to-blue-700 p-10 text-center text-white shadow-[0_20px_60px_rgba(23,62,201,0.20)]"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Escolha seu plano e entre para o clube
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-blue-100">
            Compare as opções, selecione o melhor nível para você e avance para a
            próxima etapa.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={irParaCriacaoOuCheckout}
              className="rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              {isLogged ? 'Ir para checkout' : 'Criar conta agora'}
            </button>

            <Link
              href="/suporte"
              className="rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Falar com o time
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Sem fidelidade
            </div>
            <div className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Acesso conforme plano
            </div>
            <div className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Fluxo pronto para evolução futura
            </div>
            <div className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Regras claras da plataforma
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}