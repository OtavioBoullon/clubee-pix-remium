'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  ChevronLeft,
  Shield,
  Search,
  ChevronRight,
  User,
  Crown,
  Wallet,
  Trophy,
  CheckCircle2,
  RefreshCcw,
  Ban,
  AlertTriangle,
} from 'lucide-react';

const categorias = [
  {
    id: 'cadastro',
    icon: <User className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-100',
    title: 'Cadastro e acesso',
    description:
      'Ajuda com criação de conta, login, atualização de perfil, recuperação de acesso e reentrada na plataforma.',
  },
  {
    id: 'assinatura',
    icon: <Crown className="h-5 w-5 text-green-600" />,
    bg: 'bg-green-100',
    title: 'Planos e assinatura',
    description:
      'Informações sobre planos, renovação, cancelamento, reativação e gestão da assinatura.',
  },
  {
    id: 'carteira',
    icon: <Wallet className="h-5 w-5 text-purple-600" />,
    bg: 'bg-purple-100',
    title: 'Carteira e extrato',
    description:
      'Entenda saldo, retirada, conta vinculada, extrato e movimentações da conta.',
  },
  {
    id: 'resultados',
    icon: <Trophy className="h-5 w-5 text-yellow-600" />,
    bg: 'bg-yellow-100',
    title: 'Resultados e histórico',
    description:
      'Consulte orientações sobre leitura de resultados, histórico e eventos da conta.',
  },
  {
    id: 'privacidade',
    icon: <Shield className="h-5 w-5 text-red-600" />,
    bg: 'bg-red-100',
    title: 'Conta, privacidade e segurança',
    description:
      'Veja diferenças entre cancelar assinatura, excluir conta, manter acesso e tratamento da conta.',
  },
];

const secoes = [
  {
    id: 'cadastro',
    icon: <User className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-100',
    title: 'Cadastro e acesso',
    subtitle: 'Orientações sobre conta, login e reentrada',
    itens: [
      {
        pergunta: 'Como criar minha conta?',
        resposta:
          'A criação da conta acontece pelo fluxo principal da plataforma, com preenchimento dos dados cadastrais solicitados e confirmação das informações mínimas exigidas.',
      },
      {
        pergunta: 'Esqueci meu acesso. O que fazer?',
        resposta:
          'Você pode recuperar o acesso seguindo o fluxo de login da plataforma, com validação de identidade e redefinição segura.',
      },
      {
        pergunta: 'Posso atualizar meus dados depois?',
        resposta:
          'Sim. O perfil do membro concentra a atualização de nome, email, telefone e demais informações principais da conta.',
      },
      {
        pergunta: 'Existe recuperação de conta?',
        resposta:
          'Sim. A conta do usuário foi pensada para permitir continuidade da experiência, com recuperação segura e reentrada quando necessário.',
      },
    ],
  },
  {
    id: 'assinatura',
    icon: <Crown className="h-5 w-5 text-green-600" />,
    bg: 'bg-green-100',
    title: 'Planos e assinatura',
    subtitle: 'Como funciona a assinatura do produto',
    itens: [
      {
        pergunta: 'Onde vejo meu plano atual?',
        resposta:
          'A página de assinatura centraliza plano contratado, valor mensal, renovação, comparação de opções e ações relacionadas à conta.',
      },
      {
        pergunta: 'Posso trocar de plano?',
        resposta:
          'Sim. Você pode revisar as opções disponíveis e escolher o plano que melhor acompanha seu momento dentro da plataforma.',
      },
      {
        pergunta: 'Como funciona o cancelamento?',
        resposta:
          'O cancelamento da assinatura encerra apenas o plano ativo. A conta do usuário continua existindo, mas passa a operar sem assinatura.',
      },
      {
        pergunta: 'Posso reativar minha assinatura depois?',
        resposta:
          'Sim. Se a conta continuar ativa, a assinatura pode ser reativada posteriormente pela jornada de planos.',
      },
      {
        pergunta: 'Cancelar assinatura é a mesma coisa que excluir conta?',
        resposta:
          'Não. Cancelar assinatura remove o plano ativo, mas mantém a conta. Excluir conta é uma ação mais sensível e envolve encerramento do acesso do usuário.',
      },
    ],
  },
  {
    id: 'carteira',
    icon: <Wallet className="h-5 w-5 text-purple-600" />,
    bg: 'bg-purple-100',
    title: 'Carteira e extrato',
    subtitle: 'Dúvidas sobre saldo, retirada e movimentações',
    itens: [
      {
        pergunta: 'Onde vejo saldo e retirada?',
        resposta:
          'A carteira é a área da plataforma que reúne saldo disponível, conta vinculada, solicitação de retirada e histórico da movimentação financeira da conta.',
      },
      {
        pergunta: 'Como atualizo a conta de destino?',
        resposta:
          'A conta vinculada pode ser revisada e atualizada em fluxo próprio, com campos para banco, agência, conta, titular e chave relacionada.',
      },
      {
        pergunta: 'Qual a diferença entre carteira e extrato?',
        resposta:
          'A carteira concentra o saldo e a retirada. O extrato organiza as entradas, saídas e eventos financeiros relacionados à conta.',
      },
    ],
  },
  {
    id: 'resultados',
    icon: <Trophy className="h-5 w-5 text-yellow-600" />,
    bg: 'bg-yellow-100',
    title: 'Resultados e histórico',
    subtitle: 'Leitura da área de resultados',
    itens: [
      {
        pergunta: 'Onde vejo o resultado principal?',
        resposta:
          'A página de resultados destaca primeiro o resultado principal do período, com leitura clara do status e dos registros mais recentes.',
      },
      {
        pergunta: 'Como interpretar o histórico?',
        resposta:
          'O histórico mostra eventos relevantes da conta em ordem cronológica, como liberações, apurações publicadas, status do plano e situações sem alteração no período.',
      },
      {
        pergunta: 'Resultado significa valor liberado automaticamente?',
        resposta:
          'A leitura do resultado deve sempre ser acompanhada da carteira e do extrato, que são as áreas responsáveis por exibir a situação financeira da conta.',
      },
    ],
  },
  {
    id: 'privacidade',
    icon: <Shield className="h-5 w-5 text-red-600" />,
    bg: 'bg-red-100',
    title: 'Conta, privacidade e segurança',
    subtitle: 'Diferença entre reativar, cancelar e excluir',
    itens: [
      {
        pergunta: 'O que acontece quando eu cancelo a assinatura?',
        resposta:
          'Ao cancelar a assinatura, sua conta continua existindo, mas sem plano ativo. Você perde os recursos vinculados ao plano, porém pode voltar e contratar novamente depois.',
      },
      {
        pergunta: 'O que acontece quando eu excluo a conta?',
        resposta:
          'A exclusão da conta é uma ação mais sensível. Ela representa o encerramento do acesso do usuário à plataforma e o encerramento definitivo da conta.',
      },
      {
        pergunta: 'Existe confirmação extra para excluir a conta?',
        resposta:
          'Sim. O fluxo de exclusão envolve confirmação reforçada, ciência do impacto da ação e etapa adicional de segurança para evitar remoção indevida.',
      },
      {
        pergunta: 'Posso recuperar a conta depois de excluir?',
        resposta:
          'A exclusão da conta é uma ação definitiva. Por isso, recomendamos revisar com atenção antes de concluir esse processo.',
      },
    ],
  },
];

const destaques = [
  {
    icon: <RefreshCcw className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-100',
    title: 'Reativação disponível',
    text:
      'Se sua conta continuar ativa, você pode retornar e contratar novamente quando fizer sentido para você.',
  },
  {
    icon: <Ban className="h-5 w-5 text-yellow-600" />,
    bg: 'bg-yellow-100',
    title: 'Cancelamento não é exclusão',
    text:
      'Cancelar assinatura remove o plano. Excluir conta encerra o acesso do usuário. Essa diferença é importante em toda a jornada.',
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    bg: 'bg-red-100',
    title: 'Ações sensíveis',
    text:
      'Fluxos como cancelamento e exclusão exigem mais atenção, clareza e confirmação do que ações comuns da plataforma.',
  },
];

export default function SuportePage() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para o site
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 rounded-[32px] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.20)]"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <HelpCircle className="h-4 w-4" />
            Central de suporte
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Suporte e orientações da plataforma
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100">
            Encontre orientações sobre conta, assinatura, carteira, resultados,
            privacidade e demais áreas do Clube Pix Premium em uma central clara,
            organizada e pensada para te dar segurança em cada etapa.
          </p>

          <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar ajuda, dúvidas ou orientações"
                className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </motion.section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {categorias.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}
              >
                {item.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">
                {item.description}
              </p>

              <div className="mt-5">
                <a
                  href={`#${item.id}`}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Ver orientações
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="space-y-8">
          {secoes.map((secao, index) => (
            <motion.section
              key={secao.id}
              id={secao.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="scroll-mt-24 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${secao.bg}`}
                >
                  {secao.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{secao.title}</h2>
                  <p className="text-sm text-gray-500">{secao.subtitle}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {secao.itens.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gray-50 p-5"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{item.pergunta}</h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      {item.resposta}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {destaques.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${item.bg}`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-10 rounded-[32px] bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-[0_20px_60px_rgba(23,62,201,0.20)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Ainda precisa de ajuda?</h2>
              <p className="mt-2 max-w-2xl text-blue-100">
                Se a sua dúvida não estiver respondida nesta central, você pode seguir
                para o contato e enviar uma mensagem para o time.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contato"
                className="rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Falar com o suporte
              </Link>

              <Link
                href="/perfil"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Ver perfil
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Orientações por tema
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Linguagem clara e objetiva
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Mais segurança em cada etapa
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}