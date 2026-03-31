'use client';

import {
  Check,
  Shield,
  Users,
  Zap,
  Target,
  Gift,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Plus,
  Minus,
  Mail,
  FileText,
  Lock,
  HelpCircle,
  Globe,
  Crown,
  BarChart3,
  CalendarClock,
  Layers3,
  BadgeCheck,
  ArrowRight,
  LayoutDashboard,
  Star,
  MessageCircle,
  Clock3,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type PlanKey = 'essencial' | 'pro' | 'premium';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('pro');

  // Backend-ready placeholders
  const user = null;
  const subscription = null;
  const isLogged = Boolean(user);
  const hasActiveSubscription = Boolean(subscription);

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 38,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          return { hours: 2, minutes: 14, seconds: 38 };
        }

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: Target,
      title: 'Acesso a ativações exclusivas',
      description:
        'Entre em uma área reservada para membros com ativações e experiências disponíveis conforme o seu plano.',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      shadow: 'hover:shadow-blue-100/70',
    },
    {
      icon: Gift,
      title: 'Benefícios liberados',
      description:
        'Sua assinatura pode liberar vantagens exclusivas conforme regras, plano contratado e disponibilidade vigente.',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      shadow: 'hover:shadow-green-100/70',
    },
    {
      icon: Crown,
      title: 'Planos com acesso ampliado',
      description:
        'Planos superiores destravam uma experiência mais completa, com mais recursos, prioridade e visibilidade dentro da plataforma.',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      shadow: 'hover:shadow-purple-100/70',
    },
    {
      icon: Layers3,
      title: 'Painel premium do membro',
      description:
        'Acompanhe assinatura, benefícios, histórico, atualizações e tudo o que estiver disponível na sua área.',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      shadow: 'hover:shadow-orange-100/70',
    },
    {
      icon: CalendarClock,
      title: 'Atualizações do período',
      description:
        'Visualize períodos ativos, novidades, liberações recentes e informações relevantes para o seu plano.',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      shadow: 'hover:shadow-pink-100/70',
    },
    {
      icon: Shield,
      title: 'Regras claras',
      description:
        'A plataforma funciona com critérios objetivos, condições definidas e informações apresentadas com clareza ao membro.',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      shadow: 'hover:shadow-yellow-100/70',
    },
  ];

  const includedItems = [
    {
      title: 'Acesso às ativações do clube',
      description:
        'Participe das ativações e experiências disponíveis para membros de acordo com o seu plano.',
      featured: false,
    },
    {
      title: 'Painel completo do assinante',
      description:
        'Área exclusiva para acompanhar assinatura, benefícios ativos, histórico e status da sua conta.',
      featured: true,
    },
    {
      title: 'Benefícios conforme o plano',
      description:
        'Os benefícios são disponibilizados conforme o plano contratado, regras vigentes e disponibilidade da plataforma.',
      featured: false,
    },
    {
      title: 'Atualizações por período',
      description:
        'Novidades, liberações e mudanças da conta podem aparecer em períodos específicos dentro da plataforma.',
      featured: true,
    },
    {
      title: 'Histórico e acompanhamento',
      description:
        'Tenha visibilidade das movimentações, recursos liberados e informações importantes da sua assinatura.',
      featured: false,
    },
    {
      title: 'Suporte ao assinante',
      description:
        'Canal de suporte voltado ao acompanhamento da conta, assinatura e experiência do membro.',
      featured: false,
    },
    {
      title: 'Experiência progressiva por plano',
      description:
        'Cada plano amplia o acesso, o nível da experiência e a quantidade de recursos disponíveis.',
      featured: false,
    },
    {
      title: 'Transparência operacional',
      description:
        'Condições, critérios e disponibilidade dos benefícios são apresentados com clareza dentro da plataforma.',
      featured: false,
    },
  ];

  const plans = [
    {
      key: 'essencial' as PlanKey,
      name: 'Essencial',
      price: '29,90',
      popular: false,
      description: 'Entrada ideal para começar no clube',
      features: [
        'Acesso inicial ao ecossistema do clube',
        'Ativações elegíveis para membros',
        'Painel do assinante',
        'Benefícios de entrada conforme disponibilidade',
        'Histórico básico de movimentações',
        'Suporte por email',
      ],
      buttonText: 'Começar com Essencial',
      buttonStyle: 'bg-slate-800 hover:bg-slate-900 text-white',
      ring: 'border-gray-200',
    },
    {
      key: 'pro' as PlanKey,
      name: 'Pro',
      price: '59,90',
      popular: true,
      description: 'Mais equilíbrio entre acesso e benefícios',
      features: [
        'Tudo do plano Essencial',
        'Acesso ampliado às ativações',
        'Maior volume de benefícios disponíveis',
        'Benefícios intermediários conforme regras vigentes',
        'Prioridade em ativações selecionadas',
        'Painel com acompanhamento ampliado',
        'Suporte prioritário',
        'Melhor custo-benefício da plataforma',
      ],
      buttonText: 'Começar com Pro',
      buttonStyle:
        'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg',
      ring: 'border-green-500',
    },
    {
      key: 'premium' as PlanKey,
      name: 'Premium',
      price: '99,90',
      popular: false,
      description: 'Experiência completa para membros avançados',
      features: [
        'Tudo do plano Pro',
        'Acesso premium a ativações selecionadas',
        'Maior prioridade nas liberações elegíveis',
        'Benefícios avançados conforme disponibilidade',
        'Visualização ampliada de ciclos e novidades',
        'Acesso antecipado a novas ativações',
        'Suporte VIP',
        'Experiência mais completa do clube',
      ],
      buttonText: 'Começar com Premium',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      ring: 'border-blue-500',
    },
  ];

  const simulatorData: Record<
    PlanKey,
    {
      name: string;
      benefitsActive: number;
      highlightsVisible: number;
      accessLevel: string;
      priority: string;
      experience: string;
      helper: string;
      color: string;
      badge: string;
      list: string[];
    }
  > = {
    essencial: {
      name: 'Essencial',
      benefitsActive: 2,
      highlightsVisible: 3,
      accessLevel: 'Inicial',
      priority: 'Padrão',
      experience: 'Entrada no clube',
      helper:
        'Ideal para conhecer a plataforma e acessar a experiência base do membro.',
      color: 'from-slate-700 to-slate-800',
      badge: 'Plano inicial',
      list: [
        'Painel do assinante',
        'Ativações elegíveis',
        'Benefícios de entrada',
        'Histórico básico',
      ],
    },
    pro: {
      name: 'Pro',
      benefitsActive: 4,
      highlightsVisible: 6,
      accessLevel: 'Ampliado',
      priority: 'Intermediária',
      experience: 'Melhor equilíbrio',
      helper:
        'Mais acesso, mais visibilidade e uma experiência mais completa dentro da plataforma.',
      color: 'from-green-500 to-green-600',
      badge: 'Mais escolhido',
      list: [
        'Tudo do Essencial',
        'Mais benefícios ativos',
        'Prioridade em ativações selecionadas',
        'Painel ampliado',
      ],
    },
    premium: {
      name: 'Premium',
      benefitsActive: 6,
      highlightsVisible: 9,
      accessLevel: 'Máximo',
      priority: 'Alta',
      experience: 'Experiência completa',
      helper:
        'Para quem quer a versão mais completa do clube, com prioridade e acesso premium.',
      color: 'from-blue-600 to-blue-700',
      badge: 'Experiência avançada',
      list: [
        'Tudo do Pro',
        'Acesso premium a ativações',
        'Mais recursos liberados',
        'Suporte VIP',
      ],
    },
  };

  const faqs = [
    {
      question: 'O que é o Clube Pix Premium?',
      answer:
        'O Clube Pix Premium é uma plataforma de assinatura digital que oferece acesso a ativações, benefícios e experiências exclusivas para membros. O funcionamento depende do plano contratado, das regras da plataforma e da disponibilidade vigente.',
    },
    {
      question: 'Como funciona na prática?',
      answer:
        'Você escolhe um plano, ativa sua assinatura e passa a acessar a área exclusiva do membro. Dentro dela, pode consultar ativações disponíveis, acompanhar benefícios liberados e verificar o que está acessível conforme o seu plano.',
    },
    {
      question: 'Como funcionam os benefícios?',
      answer:
        'Os benefícios podem ser liberados conforme o plano contratado, regras vigentes, ativações disponíveis e disponibilidade do período. Cada benefício possui condições próprias descritas na plataforma.',
    },
    {
      question: 'Existe benefício em Pix?',
      answer:
        'A plataforma pode disponibilizar benefícios vinculados a transferências via Pix em condições específicas. Essas liberações não são automáticas, não são garantidas e sempre seguem regras e disponibilidade informadas ao membro.',
    },
    {
      question: 'É aposta, sorteio ou jogo?',
      answer:
        'Não. O Clube Pix Premium é um clube de assinatura com ativações, experiências e benefícios para membros. A plataforma não se apresenta como casa de apostas, jogo de azar ou promessa de retorno financeiro.',
    },
    {
      question: 'Existe garantia de retorno?',
      answer:
        'Não. O Clube Pix Premium não garante retorno financeiro, lucro ou resultado específico. A experiência do membro envolve acesso, ativações e benefícios sujeitos às regras e à disponibilidade vigente.',
    },
    {
      question: 'Preciso pagar mensalidade?',
      answer:
        'Sim. O acesso funciona por assinatura mensal. Cada plano possui preço, nível de acesso e volume de benefícios próprios.',
    },
    {
      question: 'Posso cancelar quando quiser?',
      answer:
        'Sim. A assinatura pode ser cancelada a qualquer momento, sem fidelidade e sem multa, conforme as condições da plataforma.',
    },
    {
      question: 'Os benefícios são garantidos?',
      answer:
        'Não. Os benefícios dependem das regras do produto, do plano contratado e da disponibilidade vigente em cada período.',
    },
  ];

  const testimonials = [
    {
      name: 'Mariana S.',
      age: 27,
      initial: 'M',
      text: 'Achei a interface muito clara. Em poucos minutos eu já tinha entendido como acessar tudo dentro da área do membro.',
      accent: 'bg-pink-100 text-pink-700',
    },
    {
      name: 'Rafael A.',
      age: 31,
      initial: 'R',
      text: 'O que mais gostei foi a organização. O painel passa confiança e deixa tudo muito mais simples de acompanhar.',
      accent: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Camila D.',
      age: 24,
      initial: 'C',
      text: 'Visual premium, fácil de usar e com informações bem separadas. Dá para entender rápido o que está disponível.',
      accent: 'bg-green-100 text-green-700',
    },
  ];

  const activeSimulator = useMemo(
    () => simulatorData[selectedPlan],
    [selectedPlan]
  );

  const sectionMotion = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  };

  const cardMotion = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed left-0 right-0 top-0 z-[60] border-b border-blue-500/20 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-sm font-semibold sm:text-base">
          <Clock3 className="h-4 w-4" />
          <span>Próxima atualização de benefícios em</span>
          <span className="rounded-full bg-white/15 px-3 py-1 font-bold tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      <nav className="fixed top-10 z-50 w-full border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-md shadow-blue-200"
              >
                <Zap className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Clube Pix Premium
              </span>
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="#como-funciona"
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Como Funciona
              </a>
              <a
                href="#preview"
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Painel
              </a>
              <a
                href="#vantagens"
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Vantagens
              </a>
              <a
                href="#planos"
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Planos
              </a>
              <a
                href="#faq"
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Dúvidas
              </a>
              <Link
                href="/apuracoes"
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                Resultados
              </Link>
            </div>

            <div className="hidden items-center space-x-4 md:flex">
              <Link
                href="/login"
                className="px-5 py-2 font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Entrar
              </Link>
              <motion.div whileHover={{ y: -1, scale: 1.01 }}>
                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-7 py-3 font-semibold text-white shadow-md transition-all hover:from-green-600 hover:to-green-700 hover:shadow-lg"
                >
                  Começar Agora
                </Link>
              </motion.div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 md:hidden"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
            >
              <div className="space-y-4 px-6 py-6">
                <a
                  href="#como-funciona"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  Como Funciona
                </a>
                <a
                  href="#preview"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  Painel
                </a>
                <a
                  href="#vantagens"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  Vantagens
                </a>
                <a
                  href="#planos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  Planos
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  Dúvidas
                </a>
                <Link
                  href="/apuracoes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  Resultados
                </Link>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <Link
                    href="/login"
                    className="block rounded-lg border border-gray-300 py-3 text-center font-medium text-gray-700 transition-colors hover:text-blue-600"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    className="block rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-3 text-center font-semibold text-white"
                  >
                    Começar Agora
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.section
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-6 pb-24 pt-44"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute right-10 top-32 h-52 w-52 rounded-full bg-green-200/20 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-48 w-48 rounded-full bg-purple-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <motion.div
                whileHover={{ y: -1 }}
                className="mb-7 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-100/80 px-5 py-2.5 font-medium text-blue-700 shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">
                  Clube fechado com benefícios e acesso exclusivo
                </span>
              </motion.div>

              <h1 className="mb-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Desbloqueie benefícios exclusivos todos os meses dentro de um clube fechado
              </h1>

              <p className="mb-5 max-w-2xl text-xl leading-relaxed text-gray-600 md:text-2xl">
                Acesse ativações, vantagens e experiências disponíveis conforme
                seu plano — tudo em um painel simples, premium e transparente.
              </p>

              <p className="mb-10 max-w-3xl text-lg leading-relaxed text-gray-600">
                Uma plataforma de assinatura com regras claras, acesso progressivo
                por plano e benefícios liberados conforme critérios, período
                vigente e disponibilidade operacional.
              </p>

              <div className="mb-10 flex flex-col items-center justify-start gap-4 sm:flex-row sm:items-stretch sm:justify-start">
                <motion.div whileHover={{ y: -2, scale: 1.01 }}>
                  <Link
                    href="/register"
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-10 py-5 text-lg font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 hover:shadow-xl sm:w-auto"
                  >
                    Quero desbloquear acesso agora
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>

                <motion.a
                  whileHover={{ y: -2 }}
                  href="#como-funciona"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-10 py-5 text-center text-lg font-semibold text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 sm:w-auto"
                >
                  Ver Como Funciona
                </motion.a>

                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    href="/apuracoes"
                    className="flex w-full items-center justify-center rounded-xl border-2 border-blue-200 bg-blue-50 px-10 py-5 text-lg font-semibold text-blue-700 transition-all hover:border-blue-600 hover:bg-blue-100 sm:w-auto"
                  >
                    Ver Resultados
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>

              <div className="mb-10 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>+3.200 membros ativos</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>
                    <strong>4.8/5 avaliação média</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-green-600" />
                  <span>Plataforma ativa e em crescimento</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {[
                  {
                    icon: <Check className="h-3.5 w-3.5 text-green-600" />,
                    bg: 'bg-green-100',
                    text: 'Clube de assinatura',
                  },
                  {
                    icon: <Shield className="h-3.5 w-3.5 text-blue-600" />,
                    bg: 'bg-blue-100',
                    text: 'Critérios claros e transparentes',
                  },
                  {
                    icon: <Lock className="h-3.5 w-3.5 text-purple-600" />,
                    bg: 'bg-purple-100',
                    text: 'Sem promessa de ganho',
                  },
                  {
                    icon: <FileText className="h-3.5 w-3.5 text-gray-600" />,
                    bg: 'bg-gray-100',
                    text: 'Regras e termos disponíveis',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${item.bg}`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium text-gray-700">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="text-lg font-semibold text-red-700">
                  Você pode estar deixando benefícios disponíveis sem acessar a plataforma
                </p>
                <p className="mt-2 text-gray-600">
                  Membros ativos já acompanham ativações, vantagens e liberações
                  diretamente pelo painel. Quanto mais você demora, mais tempo fica
                  fora da experiência completa do clube.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative"
            >
              <div className="relative rounded-[32px] border border-blue-100 bg-white/90 p-5 shadow-[0_30px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700"
                    >
                      <Zap className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Área do Membro
                      </p>
                      <p className="text-xs text-gray-500">
                        Visão geral da assinatura
                      </p>
                    </div>
                  </div>
                  {hasActiveSubscription ? (
                    <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Assinatura ativa
                    </div>
                  ) : isLogged ? (
                    <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      Conta criada
                    </div>
                  ) : (
                    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      Visitante
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-lg"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-blue-100">Plano atual</p>
                      <BadgeCheck className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      {hasActiveSubscription ? 'Plano Pro' : 'Plano disponível após ativação'}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100">
                      {hasActiveSubscription
                        ? 'Acesso ampliado, benefícios elegíveis e experiência mais completa dentro da plataforma.'
                        : 'Ative sua assinatura para liberar benefícios, visualizar mais recursos e acompanhar tudo pelo painel.'}
                    </p>
                  </motion.div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ['Benefícios ativos', hasActiveSubscription ? '04' : '00'],
                      ['Atualizações visíveis', hasActiveSubscription ? '02' : '00'],
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -2 }}
                        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <p className="text-sm text-gray-500">{item[0]}</p>
                        <p className="mt-2 text-2xl font-bold text-gray-900">
                          {item[1]}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        Status da assinatura
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          hasActiveSubscription
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {hasActiveSubscription ? 'Regular' : 'Pendente'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {hasActiveSubscription
                        ? 'Sua assinatura está ativa e sua conta já pode acessar os benefícios disponíveis no seu plano.'
                        : 'Ative sua assinatura para desbloquear a experiência completa, visualizar benefícios elegíveis e acompanhar liberações no painel.'}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <p className="mb-3 font-semibold text-gray-900">
                      Visão rápida
                    </p>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                        <span>Assinatura confirmada</span>
                        <span className={`font-medium ${hasActiveSubscription ? 'text-green-600' : 'text-amber-600'}`}>
                          {hasActiveSubscription ? 'Ativa' : 'Aguardando ativação'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                        <span>Benefício ativo</span>
                        <span className={`font-medium ${hasActiveSubscription ? 'text-blue-600' : 'text-gray-500'}`}>
                          {hasActiveSubscription ? 'Disponível' : 'Bloqueado'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                        <span>Próxima atualização</span>
                        <span className="font-medium text-gray-700">
                          Hoje, 20h
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-6 top-10 hidden rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-lg lg:block"
              >
                <p className="text-xs font-medium text-gray-500">
                  Benefício ativo
                </p>
                <p className="mt-1 text-sm font-bold text-gray-900">
                  Acesso liberado no painel
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute -right-5 bottom-12 hidden rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg lg:block"
              >
                <p className="text-xs font-medium text-gray-500">
                  Status do plano
                </p>
                <p className="mt-1 text-sm font-bold text-green-700">
                  Upgrade disponível
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="como-funciona"
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              PROCESSO SIMPLES
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Como Funciona na Prática?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Um fluxo claro, premium e fácil de entender
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-0 right-0 top-[72px] hidden h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent lg:block" />

            <div className="grid gap-8 lg:grid-cols-4">
              {[
                {
                  step: '1',
                  title: 'Escolha Seu Plano',
                  description:
                    'Selecione o plano que melhor combina com o seu perfil e ative sua assinatura.',
                  icon: Users,
                  color: 'bg-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200',
                },
                {
                  step: '2',
                  title: 'Acesse a Plataforma',
                  description:
                    'Entre na área do membro e visualize ativações, status da conta e benefícios disponíveis.',
                  icon: Target,
                  color: 'bg-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-200',
                },
                {
                  step: '3',
                  title: 'Entenda seu plano',
                  description:
                    'Seu plano define o nível de acesso, prioridade e recursos visíveis em cada período.',
                  icon: Shield,
                  color: 'bg-purple-600',
                  bgColor: 'bg-purple-50',
                  borderColor: 'border-purple-200',
                },
                {
                  step: '4',
                  title: 'Aproveite os Benefícios',
                  description:
                    'Acompanhe o que foi liberado no seu painel conforme regras, disponibilidade e condições vigentes.',
                  icon: Gift,
                  color: 'bg-orange-600',
                  bgColor: 'bg-orange-50',
                  borderColor: 'border-orange-200',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardMotion}
                  whileHover={{ y: -6 }}
                  className="relative"
                >
                  <div
                    className={`group relative h-full rounded-[28px] border-2 ${item.borderColor} bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} shadow-lg`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <div
                      className={`mb-4 inline-flex rounded-full ${item.bgColor} px-3 py-1.5 text-xs font-bold ${item.color.replace(
                        'bg-',
                        'text-'
                      )}`}
                    >
                      PASSO {item.step}
                    </div>

                    <h3 className="mb-4 text-[30px] font-bold leading-tight text-gray-900 lg:text-[32px]">
                      {item.title}
                    </h3>

                    <p className="text-lg leading-8 text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  {index < 3 && (
                    <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="preview"
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              PREVIEW DO PAINEL
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Veja como é a área do membro
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Uma visão clara do que você encontra por dentro da plataforma
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <LayoutDashboard className="h-4 w-4" />
                Visão do usuário
              </div>

              <h3 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                Organização, clareza e sensação de controle
              </h3>

              <p className="mb-8 text-lg leading-8 text-gray-600">
                O objetivo da área do membro é mostrar tudo de forma simples:
                assinatura ativa, benefícios disponíveis, atualizações da conta,
                histórico e informações importantes.
              </p>

              <div className="space-y-4">
                {[
                  'Status da assinatura em destaque',
                  'Benefícios ativos visíveis com rapidez',
                  'Atualizações organizadas em um só lugar',
                  'Histórico da conta com visual limpo e claro',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 2 }}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
                  >
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-base leading-7 text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-blue-100 bg-white p-5 shadow-[0_30px_80px_rgba(37,99,235,0.10)] transition-shadow hover:shadow-[0_36px_90px_rgba(37,99,235,0.14)]"
            >
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700"
                  >
                    <Zap className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Dashboard do membro
                    </p>
                    <p className="text-xs text-gray-500">Preview ilustrativo</p>
                  </div>
                </div>
                <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Conta ativa
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                <div className="rounded-2xl bg-[#0f172a] p-4 text-white">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Painel</p>
                      <p className="text-xs text-slate-300">Área do membro</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-200">
                    <div className="rounded-xl bg-white/10 px-3 py-2.5">
                      Visão geral
                    </div>
                    <div className="rounded-xl px-3 py-2.5 text-slate-300">
                      Benefícios
                    </div>
                    <div className="rounded-xl px-3 py-2.5 text-slate-300">
                      Histórico
                    </div>
                    <div className="rounded-xl px-3 py-2.5 text-slate-300">
                      Atualizações
                    </div>
                    <div className="rounded-xl px-3 py-2.5 text-slate-300">
                      Conta
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-lg"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-blue-100">
                        Assinatura atual
                      </p>
                      <BadgeCheck className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Plano Pro</h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100">
                      Acesso ampliado, benefícios ativos e mais visibilidade
                      dentro da plataforma.
                    </p>
                  </motion.div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      ['Benefícios ativos', '04'],
                      ['Atualizações visíveis', '02'],
                      ['Status', 'Regular'],
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -2 }}
                        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <p className="text-sm text-gray-500">{item[0]}</p>
                        <p className="mt-2 text-2xl font-bold text-gray-900">
                          {item[1]}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md"
                    >
                      <p className="mb-3 font-semibold text-gray-900">
                        Atualizações
                      </p>
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="rounded-xl bg-white px-3 py-2.5 shadow-sm">
                          Novo benefício disponível
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2.5 shadow-sm">
                          Atualização da assinatura concluída
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2.5 shadow-sm">
                          Período atual em andamento
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                    >
                      <p className="mb-3 font-semibold text-gray-900">
                        Resumo da conta
                      </p>
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                          <span>Assinatura ativa</span>
                          <span className="font-medium text-green-600">Sim</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                          <span>Acesso liberado</span>
                          <span className="font-medium text-blue-600">
                            Ampliado
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">
                          <span>Próxima atualização</span>
                          <span className="font-medium text-gray-700">
                            Hoje
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="vantagens"
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              EXPERIÊNCIA DO MEMBRO
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Por Que Entrar no Clube?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Uma experiência digital mais premium, organizada e transparente
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardMotion}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group rounded-[28px] border ${benefit.borderColor} bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl ${benefit.shadow}`}
              >
                <motion.div
                  whileHover={{ scale: 1.06, rotate: -2 }}
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${benefit.iconBg} shadow-sm`}
                >
                  <benefit.icon className={`h-8 w-8 ${benefit.iconColor}`} />
                </motion.div>

                <h3 className="mb-4 text-[30px] font-bold leading-tight text-gray-900 lg:text-[32px]">
                  {benefit.title}
                </h3>

                <p className="text-lg leading-8 text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              SIMULADOR DE PLANO
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Veja o que o seu plano libera
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Compare de forma simples o nível de experiência disponível em cada
              assinatura
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Escolha um plano
              </p>

              <div className="space-y-3">
                {plans.map((plan) => {
                  const isActive = selectedPlan === plan.key;
                  return (
                    <motion.button
                      key={plan.key}
                      onClick={() => setSelectedPlan(plan.key)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.995 }}
                      className={`w-full rounded-2xl border px-5 py-4 text-left transition-all ${
                        isActive
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {plan.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {plan.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            R$ {plan.price}
                          </p>
                          <p className="text-xs text-gray-500">por mês</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlan}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div
                    className={`rounded-[28px] bg-gradient-to-br ${activeSimulator.color} p-6 text-white shadow-lg`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-white/80">
                        Plano selecionado
                      </p>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                        {activeSimulator.badge}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold">
                      {activeSimulator.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-white/85">
                      {activeSimulator.helper}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-4">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <p className="text-sm text-gray-500">
                        Benefícios ativos
                      </p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        {activeSimulator.benefitsActive}
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <p className="text-sm text-gray-500">
                        Itens em destaque
                      </p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        {activeSimulator.highlightsVisible}
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <p className="text-sm text-gray-500">
                        Nível de acesso
                      </p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        {activeSimulator.accessLevel}
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <p className="text-sm text-gray-500">Prioridade</p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        {activeSimulator.priority}
                      </p>
                    </motion.div>
                  </div>

                  <div className="mt-5 rounded-[28px] border border-gray-200 bg-white p-5">
                    <p className="mb-4 text-lg font-bold text-gray-900">
                      O que este plano destaca
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {activeSimulator.list.map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 2 }}
                          className="flex items-start gap-3 rounded-2xl bg-gray-50 px-4 py-3"
                        >
                          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-600" />
                          </div>
                          <p className="text-base leading-7 text-gray-700">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              COMPARADOR DE PLANOS
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Compare os níveis de acesso
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Uma visão rápida para entender o que muda de um plano para outro
            </p>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
              <div className="p-5 text-sm font-semibold text-gray-500">
                Recursos
              </div>
              <div className="p-5 text-center text-lg font-bold text-gray-900">
                Essencial
              </div>
              <div className="bg-green-50 p-5 text-center text-lg font-bold text-green-700">
                Pro
              </div>
              <div className="p-5 text-center text-lg font-bold text-blue-700">
                Premium
              </div>
            </div>

            {[
              ['Acesso ao painel', 'Sim', 'Sim', 'Sim'],
              ['Benefícios ativos', 'Base', 'Ampliado', 'Avançado'],
              ['Prioridade em ativações', 'Padrão', 'Intermediária', 'Alta'],
              ['Visualização da experiência', 'Essencial', 'Mais completa', 'Completa'],
              ['Suporte', 'Email', 'Prioritário', 'VIP'],
              ['Novidades e acesso antecipado', 'Limitado', 'Parcial', 'Ampliado'],
            ].map((row, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: 'rgba(248,250,252,0.8)' }}
                className="grid grid-cols-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="p-5 text-base font-medium text-gray-700">
                  {row[0]}
                </div>
                <div className="p-5 text-center text-base text-gray-700">
                  {row[1]}
                </div>
                <div className="bg-green-50/50 p-5 text-center text-base font-medium text-gray-800">
                  {row[2]}
                </div>
                <div className="p-5 text-center text-base text-gray-700">
                  {row[3]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-gradient-to-b from-gray-50 to-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              O QUE ESTÁ INCLUÍDO
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              O Que Você Recebe ao Entrar?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Tudo que está incluído na experiência do assinante
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {includedItems.map((item, index) => (
              <motion.div
                key={index}
                variants={cardMotion}
                whileHover={{ y: -5 }}
                className={`rounded-[24px] border p-7 transition-all duration-300 hover:shadow-lg ${
                  item.featured
                    ? 'border-blue-300 bg-white shadow-sm'
                    : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-green-500 shadow-sm"
                  >
                    <Check className="h-5 w-5 text-white" />
                  </motion.div>

                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-lg leading-8 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="mx-auto mt-12 max-w-4xl rounded-[32px] bg-gradient-to-br from-blue-600 to-blue-700 p-10 text-center text-white shadow-xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-3xl font-bold">Comece Hoje Mesmo</h3>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Escolha seu plano, ative sua assinatura e acesse uma experiência
              exclusiva para membros do clube.
            </p>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                href="/register"
                className="inline-flex items-center rounded-xl bg-white px-10 py-4 text-lg font-bold text-blue-600 shadow-lg transition-all hover:bg-blue-50"
              >
                Ver Planos Disponíveis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              EXPERIÊNCIAS ILUSTRATIVAS
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Como essa experiência pode ser percebida
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Exemplos visuais de feedback para demonstrar a proposta de uso da
              plataforma
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                variants={cardMotion}
                whileHover={{ y: -6 }}
                className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-5 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${item.accent}`}
                  >
                    {item.initial}
                  </motion.div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.age} anos</p>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <MessageCircle className="mb-3 h-5 w-5 text-gray-400" />
                  <p className="text-lg leading-8 text-gray-700">
                    “{item.text}”
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Esses depoimentos estão como exemplos visuais de prova social e
            podem ser substituídos por avaliações reais depois.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="planos"
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              ESCOLHA SEU PLANO
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Planos para Diferentes Perfis
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Agora você já viu o painel, entendeu a experiência e consegue
              comparar qual plano faz mais sentido para você
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: plan.popular ? -4 : -6, scale: plan.popular ? 1.02 : 1.01 }}
                className={`relative rounded-[32px] border bg-white p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'scale-[1.02] border-green-500 shadow-[0_30px_80px_rgba(34,197,94,0.15)]'
                    : `${plan.ring} shadow-sm hover:shadow-xl`
                }`}
              >
                {plan.popular && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-[32px] bg-gradient-to-r from-green-500 to-green-600" />
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-sm font-bold text-white shadow-lg">
                        MAIS ESCOLHIDO
                      </div>
                    </div>
                  </>
                )}

                <div className={`mb-8 text-center ${plan.popular ? 'pt-4' : ''}`}>
                  <h3 className="mb-2 text-[34px] font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mx-auto mb-7 max-w-xs text-lg leading-8 text-gray-600">
                    {plan.description}
                  </p>

                  <div className="rounded-2xl bg-gray-50 px-6 py-6">
                    <div className="mb-2 flex items-end justify-center gap-2">
                      <span className="pb-1 text-xl text-gray-500">R$</span>
                      <span className="text-6xl font-bold tracking-tight text-gray-900">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-base text-gray-500">por mês</span>
                  </div>
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 2 }}
                      className="flex items-start gap-3 rounded-xl bg-white/80"
                    >
                      <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-lg leading-8 text-gray-700">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <Link
                    href="/register"
                    className={`block w-full rounded-xl px-6 py-4 text-center text-lg font-bold transition-all ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-lg text-gray-600">
              Todos os planos podem ser cancelados a qualquer momento • Sem
              multa ou fidelidade
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="faq"
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-gray-50 px-6 py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-20 text-center">
            <div className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              DÚVIDAS FREQUENTES
            </div>
            <h2 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa saber sobre o Clube Pix Premium
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white transition-all hover:border-blue-600 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="pr-8 text-lg font-bold text-gray-900">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isOpen ? (
                        <Minus className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      ) : (
                        <Plus className="h-6 w-6 flex-shrink-0 text-gray-400" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6">
                          <p className="leading-relaxed text-gray-700">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-6 py-24"
      >
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -3 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20"
          >
            <Zap className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Pronto para desbloquear sua experiência no clube?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-blue-100 md:text-2xl">
            Ative sua assinatura agora e entre em uma área exclusiva com
            benefícios, ativações e recursos liberados conforme seu plano.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                href="/register"
                className="flex w-full items-center justify-center rounded-xl bg-white px-12 py-5 text-lg font-bold text-blue-600 shadow-xl transition-all hover:bg-blue-50 sm:w-auto"
              >
                Quero entrar no clube agora
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="#planos"
              className="w-full rounded-xl border-2 border-white/30 bg-blue-500 px-12 py-5 text-lg font-bold text-white transition-all hover:bg-blue-400 sm:w-auto"
            >
              Ver Planos e Preços
            </motion.a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-blue-100">
            {['Sem fidelidade', 'Cancele quando quiser', 'Acesso imediato após ativação'].map(
              (item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  <span>{item}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      <footer className="bg-gray-900 px-6 py-16 text-gray-300">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center space-x-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Clube Pix Premium
                </span>
              </div>

              <p className="mb-6 max-w-xl leading-relaxed text-gray-400">
                Plataforma de assinatura com ativações, acesso exclusivo e
                benefícios para membros, sempre com regras claras, experiência
                premium e acompanhamento completo no painel.
              </p>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-blue-600"
                >
                  <Globe className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-blue-600"
                >
                  <HelpCircle className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-blue-600"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-bold text-white">Links Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#como-funciona"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#preview"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Preview do Painel
                  </a>
                </li>
                <li>
                  <a
                    href="#vantagens"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Vantagens
                  </a>
                </li>
                <li>
                  <a
                    href="#planos"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Planos
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Dúvidas
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-bold text-white">Institucional</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/termos"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <FileText className="h-4 w-4" />
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacidade"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <Lock className="h-4 w-4" />
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/suporte"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Suporte
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-800 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-500">
              © 2026 Clube Pix Premium. Todos os direitos reservados.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
              Plataforma de assinatura com ativações e benefícios para membros.
              As liberações dependem das regras, do plano contratado e da
              disponibilidade vigente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}