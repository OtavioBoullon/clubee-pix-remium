'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Lock,
  ChevronLeft,
  BadgeCheck,
  Database,
  Eye,
  UserCheck,
  Shield,
  Server,
  FileText,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Fingerprint,
} from 'lucide-react';

const COMPANY_NAME = 'Clube Pix Premium';
const POLICY_VERSION = '1.0';
const LAST_UPDATED = 'Atual';
const SUPPORT_EMAIL = 'privacidade@clubepixpremium.com';
const TERMS_ROUTE = '/termos';
const CONTACT_ROUTE = '/contato';

const secoes = [
  {
    id: 'apresentacao',
    titulo: '1. Apresentação e escopo',
    conteudo: [
      'Esta Política de Privacidade descreve como o Clube Pix Premium coleta, utiliza, armazena, compartilha, protege e trata dados pessoais no contexto de acesso, navegação, cadastro, contratação e utilização da plataforma.',
      'O documento aplica-se às interações realizadas em áreas públicas e privadas da plataforma, incluindo páginas de cadastro, assinatura, pagamento, histórico, carteira, extrato, perfil, suporte e demais fluxos operacionais eventualmente disponibilizados ao usuário.',
      'Ao utilizar a plataforma, o usuário declara ciência de que seus dados pessoais poderão ser tratados conforme esta Política, os Termos de Uso e a legislação aplicável.',
    ],
  },
  {
    id: 'dados-coletados',
    titulo: '2. Quais dados podem ser coletados',
    conteudo: [
      'Poderão ser coletados dados cadastrais e de identificação, como nome, email, telefone, CPF, informações de autenticação e dados fornecidos diretamente pelo usuário durante a criação ou atualização da conta.',
      'Também poderão ser coletados dados de navegação, registros de acesso, endereço IP, data e hora de uso, interações com páginas, histórico de eventos da conta, registros operacionais, preferências de uso, dispositivo, navegador e informações técnicas relacionadas à segurança da sessão.',
      'No contexto de assinatura e cobrança, poderão existir dados vinculados ao fluxo de pagamento, status de cobrança, histórico de renovação, método cadastrado e registros operacionais associados ao processamento do serviço.',
      'A plataforma poderá ainda tratar dados derivados da própria utilização do produto, como status da conta, plano contratado, histórico de interações, atualizações de perfil, registros de suporte e demais informações necessárias ao funcionamento do ambiente digital.',
    ],
  },
  {
    id: 'finalidades',
    titulo: '3. Finalidades do tratamento',
    conteudo: [
      'Os dados pessoais poderão ser utilizados para viabilizar o cadastro e a autenticação do usuário, permitir o acesso à conta, manter a segurança do ambiente, executar funcionalidades contratadas, operar a assinatura, processar comunicações operacionais e manter o regular funcionamento da plataforma.',
      'Os dados também poderão ser tratados para prevenção a fraude, verificação de elegibilidade, gestão de conta, resolução de incidentes, atendimento de solicitações, melhoria da experiência do usuário, aperfeiçoamento técnico do produto, monitoramento de performance, análise de uso e desenvolvimento de novos recursos.',
      'Em hipóteses aplicáveis, o tratamento poderá ocorrer para cumprimento de obrigações legais e regulatórias, exercício regular de direitos, resposta a autoridades competentes, gestão de litígios, preservação de registros e proteção do titular, da plataforma e de terceiros.',
    ],
  },
  {
    id: 'bases-legais',
    titulo: '4. Bases legais aplicáveis',
    conteudo: [
      'O tratamento de dados pessoais poderá ser realizado com fundamento em bases legais previstas na legislação aplicável, incluindo, conforme o caso, execução de contrato ou de procedimentos preliminares relacionados ao contrato, cumprimento de obrigação legal ou regulatória, exercício regular de direitos, legítimo interesse e consentimento, quando necessário.',
      'A base legal utilizada dependerá da finalidade específica do tratamento, da natureza do dado e do contexto da relação entre o usuário e a plataforma.',
    ],
  },
  {
    id: 'compartilhamento',
    titulo: '5. Compartilhamento de dados',
    conteudo: [
      'Os dados poderão ser compartilhados com operadores, fornecedores, parceiros tecnológicos, provedores de infraestrutura, ferramentas de segurança, meios de pagamento, prestadores de suporte, serviços de comunicação, escritórios especializados e demais terceiros necessários à operação regular da plataforma.',
      'O compartilhamento ocorrerá apenas quando necessário para execução das finalidades legítimas da plataforma, prestação do serviço, proteção da conta, processamento de cobrança, atendimento ao usuário, prevenção a fraude, auditoria, suporte técnico ou cumprimento de obrigações legais.',
      'A plataforma poderá ainda compartilhar dados mediante ordem judicial, requisição de autoridade competente, dever legal, investigação de fraude, defesa em processo administrativo ou judicial, ou para exercício regular de direitos.',
    ],
  },
  {
    id: 'cookies',
    titulo: '6. Cookies e tecnologias semelhantes',
    conteudo: [
      'A plataforma poderá utilizar cookies, pixels, logs, identificadores técnicos e tecnologias semelhantes para autenticação de sessão, segurança, personalização de experiência, análise de tráfego, medição de desempenho, prevenção a fraude e estabilidade operacional.',
      'Determinados cookies podem ser essenciais para o funcionamento da plataforma e, por isso, sua desativação pode comprometer partes da experiência do usuário.',
      'Sempre que aplicável, o usuário poderá revisar preferências relacionadas a cookies conforme os mecanismos técnicos disponíveis no ambiente ou em seu próprio navegador.',
    ],
  },
  {
    id: 'retencao',
    titulo: '7. Armazenamento, retenção e descarte',
    conteudo: [
      'Os dados pessoais serão armazenados pelo período necessário ao cumprimento das finalidades descritas nesta Política, considerando a natureza do serviço, obrigações legais, prazos prescricionais, segurança da informação, prevenção a fraudes, auditoria e exercício regular de direitos.',
      'Mesmo após o encerramento da conta ou cancelamento da assinatura, determinados dados poderão ser mantidos pelo prazo necessário ao atendimento de deveres legais, regulatórios, contratuais, probatórios, fiscais, de segurança e integridade do ambiente.',
      'Quando cabível e tecnicamente possível, os dados poderão ser eliminados, anonimizados ou submetidos a procedimentos de descarte seguro após o término de sua necessidade legítima de retenção.',
    ],
  },
  {
    id: 'seguranca',
    titulo: '8. Segurança da informação',
    conteudo: [
      'A plataforma adota medidas técnicas, administrativas e organizacionais destinadas à proteção dos dados pessoais contra acessos não autorizados, destruição, perda, alteração, vazamento, divulgação indevida, tratamento ilícito ou qualquer forma inadequada de uso.',
      'Tais medidas podem incluir controles de acesso, segmentação de ambientes, monitoramento de eventos, trilhas de auditoria, proteção de credenciais, mecanismos de autenticação, revisão de logs, políticas internas e gestão de incidentes.',
      'Embora sejam empregados esforços razoáveis de segurança, nenhum sistema é absolutamente imune a riscos, razão pela qual o usuário também deve adotar boas práticas de proteção de senha, dispositivo e credenciais de acesso.',
    ],
  },
  {
    id: 'direitos',
    titulo: '9. Direitos do titular',
    conteudo: [
      'Nos termos da legislação aplicável, o titular poderá solicitar confirmação da existência de tratamento, acesso aos dados, correção de informações incompletas, inexatas ou desatualizadas, anonimização, bloqueio ou eliminação quando cabível, portabilidade, informação sobre compartilhamento e revisão de consentimento, nas hipóteses legais pertinentes.',
      'As solicitações do titular poderão ser submetidas pelos canais disponibilizados pela plataforma, observadas as limitações legais, os requisitos de autenticação, a proteção de terceiros, o sigilo empresarial, a segurança do ambiente e a viabilidade técnica da medida solicitada.',
    ],
  },
  {
    id: 'comunicacoes',
    titulo: '10. Comunicações e atendimento',
    conteudo: [
      'A plataforma poderá utilizar dados de contato para envio de comunicações operacionais, avisos de segurança, atualização de cadastro, confirmação de ações, informações contratuais, notificações de cobrança, mensagens de suporte e demais comunicações necessárias à execução do serviço.',
      'Mensagens de natureza estritamente operacional integram o funcionamento do produto e poderão ser enviadas independentemente de preferência promocional, quando necessárias à segurança ou à continuidade da conta.',
    ],
  },
  {
    id: 'infraestrutura',
    titulo: '11. Transferência e infraestrutura tecnológica',
    conteudo: [
      'Conforme a arquitetura tecnológica adotada, os dados poderão ser tratados em ambientes próprios ou de terceiros, inclusive em serviços de nuvem, provedores de infraestrutura, ferramentas operacionais e plataformas de suporte contratadas para viabilizar o funcionamento do serviço.',
      'Sempre que aplicável, a plataforma buscará empregar medidas contratuais e operacionais compatíveis com a proteção dos dados no relacionamento com fornecedores e operadores.',
    ],
  },
  {
    id: 'alteracoes',
    titulo: '12. Alterações desta Política',
    conteudo: [
      'Esta Política de Privacidade poderá ser alterada, atualizada ou substituída a qualquer tempo, para refletir mudanças legais, operacionais, técnicas, regulatórias ou evoluções do produto.',
      'A versão vigente será aquela disponibilizada no ambiente da plataforma no momento do acesso. Recomenda-se leitura periódica deste documento.',
    ],
  },
];

const highlights = [
  {
    icon: Database,
    title: 'Coleta necessária',
    description:
      'Os dados tratados buscam viabilizar cadastro, autenticação, conta, segurança e funcionamento regular da plataforma.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description:
      'A política explica como os dados podem ser coletados, utilizados, armazenados e compartilhados.',
    color: 'bg-green-100 text-green-700',
  },
  {
    icon: UserCheck,
    title: 'Direitos do titular',
    description:
      'O usuário pode exercer direitos previstos na legislação aplicável, observadas as hipóteses legais e técnicas.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Shield,
    title: 'Proteção operacional',
    description:
      'São adotadas medidas técnicas e administrativas para reforçar a segurança das informações.',
    color: 'bg-yellow-100 text-yellow-700',
  },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para o site
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_0.22fr]">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
          >
            <div className="border-b border-gray-100 bg-gradient-to-br from-blue-50 via-white to-white px-6 py-8 sm:px-8 sm:py-10">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Política de Privacidade
                  </h1>

                  <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                    Regras sobre coleta, uso, armazenamento, compartilhamento e
                    proteção de dados pessoais no contexto da plataforma{' '}
                    {COMPANY_NAME}.
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                    <BadgeCheck className="h-4 w-4" />
                    Documento institucional
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Versão', POLICY_VERSION],
                  ['Aplicação', 'Conta e plataforma'],
                  ['Base principal', 'Privacidade e proteção'],
                  ['Última revisão', LAST_UPDATED],
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">{item[0]}</p>
                    <h3 className="mt-2 text-lg font-bold text-gray-900 sm:text-xl">
                      {item[1]}
                    </h3>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Compromisso com tratamento responsável
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Esta política foi estruturada para explicar, de forma
                      clara, quais informações podem ser tratadas, por quais
                      motivos, em quais contextos e com quais cuidados
                      operacionais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 text-gray-700">
                {secoes.map((secao, idx) => (
                  <motion.section
                    id={secao.id}
                    key={secao.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.28, delay: idx * 0.01 }}
                    className="scroll-mt-28 rounded-2xl border border-gray-100 bg-white"
                  >
                    <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                      <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        {secao.titulo}
                      </h2>
                    </div>

                    <div className="space-y-4 px-5 py-5 sm:px-6">
                      {secao.conteudo.map((paragrafo, pidx) => (
                        <p
                          key={pidx}
                          className="text-base leading-8 text-gray-700 sm:text-lg"
                        >
                          {paragrafo}
                        </p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-6"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                      <Server className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Infraestrutura e operação
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        O tratamento de dados pode envolver serviços próprios ou
                        de terceiros necessários ao funcionamento regular do produto.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-purple-100 bg-purple-50 p-6"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                      <Fingerprint className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Segurança da conta
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        O usuário também deve proteger senha, dispositivo e
                        credenciais para reduzir riscos de acesso indevido.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                      <Globe className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Leitura complementar
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        Esta política deve ser interpretada em conjunto com os
                        Termos de Uso e demais documentos aplicáveis.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Canais institucionais
                </h3>

                <p className="mt-3 text-base leading-7 text-gray-600">
                  Dúvidas sobre privacidade, tratamento de dados e solicitações
                  relacionadas ao titular podem ser direcionadas pelos canais
                  disponibilizados pela plataforma.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={TERMS_ROUTE}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                  >
                    Ver Termos de Uso
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href={CONTACT_ROUTE}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Entrar em contato
                    <Mail className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-4">
                  <p className="text-sm font-semibold text-blue-700">
                    Contato de privacidade
                  </p>
                  <p className="mt-2 break-all text-sm text-gray-700">
                    {SUPPORT_EMAIL}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="h-fit lg:sticky lg:top-8"
          >
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <h3 className="text-lg font-bold text-gray-900">
                Navegação rápida
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Acesse os principais tópicos desta política de forma mais rápida.
              </p>

              <div className="mt-5 space-y-2">
                {secoes.map((secao) => (
                  <a
                    key={secao.id}
                    href={`#${secao.id}`}
                    className="block rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {secao.titulo}
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-700">
                  Contato institucional
                </p>
                <p className="mt-2 break-all text-sm text-gray-700">
                  {SUPPORT_EMAIL}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}