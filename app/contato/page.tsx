'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Phone,
  ChevronLeft,
  Shield,
  Send,
  Clock3,
  BadgeCheck,
  HelpCircle,
  FileText,
  CheckCircle2,
  User,
} from 'lucide-react';

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    assunto: 'Dúvida geral',
    mensagem: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3500);
  };

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
            <MessageSquare className="h-4 w-4" />
            Canal de contato
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Fale com o time do Clube Pix Premium
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-100">
            Use este canal para dúvidas, solicitações, apoio operacional e assuntos
            gerais relacionados à sua conta, assinatura, pagamento, carteira,
            resultados e uso da plataforma.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Canal principal', 'Contato'],
              ['Resposta estimada', 'Até 1 dia útil'],
              ['Atendimento', 'Seg. a sex., 9h às 18h'],
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
        </motion.section>

        <section className="mb-8 grid gap-5 md:grid-cols-4">
          {[
            {
              icon: <Mail className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              label: 'Email',
              value: 'Contato',
              className: 'text-3xl',
            },
            {
              icon: <Clock3 className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Prazo médio',
              value: '1 dia útil',
              className: 'text-3xl',
            },
            {
              icon: <BadgeCheck className="h-6 w-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Atendimento',
              value: 'Ativo',
              className: 'text-3xl text-green-700',
            },
            {
              icon: <HelpCircle className="h-6 w-6 text-yellow-600" />,
              bg: 'bg-yellow-100',
              label: 'Tipo',
              value: 'Suporte geral',
              className: 'text-2xl',
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

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Envie sua mensagem
                </h2>
                <p className="text-sm text-gray-500">
                  Preencha os dados e descreva sua solicitação
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Assunto</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <select
                    value={form.assunto}
                    onChange={(e) => handleChange('assunto', e.target.value)}
                    className="w-full bg-transparent text-base text-gray-900 outline-none"
                  >
                    <option>Dúvida geral</option>
                    <option>Conta e acesso</option>
                    <option>Planos e assinatura</option>
                    <option>Pagamento</option>
                    <option>Carteira e extrato</option>
                    <option>Resultados e histórico</option>
                    <option>Outro assunto</option>
                  </select>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mensagem</label>
                <div className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
                  <textarea
                    rows={7}
                    value={form.mensagem}
                    onChange={(e) => handleChange('mensagem', e.target.value)}
                    placeholder="Descreva sua dúvida ou solicitação com o máximo de clareza possível."
                    className="w-full resize-none bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700"
                >
                  Enviar mensagem
                  <Send className="h-4 w-4" />
                </motion.button>

                <Link
                  href="/suporte"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-8 py-4 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Voltar ao suporte
                </Link>
              </div>

              <AnimatePresence>
                {enviado && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="rounded-2xl bg-green-50 p-4"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Mensagem registrada
                    </div>
                    <p className="mt-3 text-sm text-gray-700">
                      Sua solicitação foi enviada com sucesso. Em breve, o time
                      poderá analisar sua mensagem e seguir com o atendimento.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.04 }}
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">Canal principal</p>
                </div>
              </div>
              <p className="text-base font-medium text-gray-800">
                contato@clubepixpremium.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 }}
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Atendimento</h3>
                  <p className="text-sm text-gray-500">Janela operacional</p>
                </div>
              </div>
              <p className="text-base text-gray-700">
                Segunda a sexta, das 9h às 18h
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.08 }}
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Quando usar este canal</h3>
                  <p className="text-sm text-gray-500">Escopo do suporte</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Dúvidas sobre conta e acesso',
                  'Solicitações sobre assinatura e pagamento',
                  'Orientações sobre carteira, extrato e resultados',
                  'Assuntos gerais relacionados à plataforma',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                    <p className="text-sm leading-7 text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.10 }}
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-blue-200 bg-blue-50 p-6"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                  <Shield className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Atendimento organizado
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    Este canal foi estruturado para facilitar o envio de mensagens,
                    organizar melhor as solicitações e deixar o contato mais claro
                    para quem precisa de ajuda.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <User className="h-5 w-5 text-blue-600" />,
              bg: 'bg-blue-100',
              title: 'Suporte mais claro',
              text:
                'A página foi reorganizada para deixar mais evidente como o usuário deve pedir ajuda.',
            },
            {
              icon: <FileText className="h-5 w-5 text-green-600" />,
              bg: 'bg-green-100',
              title: 'Mais estrutura',
              text:
                'Agora existe melhor separação entre formulário, canais, escopo de atendimento e orientação geral.',
            },
            {
              icon: <BadgeCheck className="h-5 w-5 text-purple-600" />,
              bg: 'bg-purple-100',
              title: 'Mais confiança',
              text:
                'A experiência foi pensada para transmitir segurança, clareza e organização no contato com o time.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${item.bg}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}