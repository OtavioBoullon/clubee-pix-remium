'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  ChevronLeft,
  BadgeCheck,
  Shield,
  Lock,
  AlertCircle,
  CheckCircle2,
  Scale,
  Mail,
  ArrowUpRight,
} from 'lucide-react';

const COMPANY_NAME = 'Clube Pix Premium';
const TERMS_VERSION = '1.0';
const LAST_UPDATED = 'Atual';
const SUPPORT_EMAIL = 'suporte@clubepixpremium.com';
const PRIVACY_ROUTE = '/privacidade';
const CONTACT_ROUTE = '/contato';

const secoes = [
  {
    id: 'apresentacao',
    titulo: '1. Apresentação e aceitação',
    conteudo: [
      'Estes Termos de Uso regulam o acesso e a utilização da plataforma Clube Pix Premium, ambiente digital operado em modelo de assinatura, com funcionalidades, áreas, recursos e experiências disponibilizados conforme regras internas, condições vigentes e nível de acesso associado à conta do usuário.',
      'Ao acessar, se cadastrar, contratar plano, navegar ou utilizar qualquer funcionalidade da plataforma, o usuário declara ter lido, compreendido e aceitado integralmente estes Termos, bem como a Política de Privacidade e demais documentos complementares eventualmente aplicáveis.',
      'Caso o usuário não concorde com qualquer disposição aqui prevista, deverá interromper a utilização da plataforma e não prosseguir com cadastro, contratação ou uso dos serviços.',
    ],
  },
  {
    id: 'natureza',
    titulo: '2. Natureza da plataforma',
    conteudo: [
      'O Clube Pix Premium consiste em plataforma digital privada, organizada sob modelo de assinatura, destinada a disponibilizar experiência de conta, painel do membro, visualização de resultados, histórico, carteira, extrato, gestão de assinatura, pagamentos e demais recursos internos definidos pela operadora da plataforma.',
      'A plataforma não se caracteriza, não se anuncia e não deve ser interpretada como instituição financeira, intermediadora de investimentos, casa de apostas, loteria estatal, bolsa de valores, corretora, plataforma de promessa de rendimento, consultoria financeira ou modalidade de jogo de azar.',
      'Os recursos exibidos, acessos, ciclos, liberações, benefícios, campanhas, experiências ou funcionalidades internas possuem natureza operacional e promocional própria da plataforma, dentro dos parâmetros definidos pela sua operadora e pelas regras vigentes a cada período.',
    ],
  },
  {
    id: 'cadastro',
    titulo: '3. Cadastro, conta e elegibilidade',
    conteudo: [
      'O uso de determinadas áreas da plataforma poderá depender de cadastro prévio, criação de conta, validação de dados, contratação de plano e cumprimento de critérios mínimos de elegibilidade definidos internamente.',
      'O usuário declara ser maior de 18 (dezoito) anos e possuir capacidade civil para contratar e utilizar os serviços, responsabilizando-se pela veracidade, atualização e integridade das informações fornecidas.',
      'A conta é pessoal, individual e intransferível. O usuário é responsável pela guarda de credenciais, senhas, acessos e dispositivos utilizados, devendo comunicar imediatamente qualquer suspeita de uso indevido, acesso não autorizado ou violação de segurança.',
      'A operadora da plataforma poderá solicitar documentos, confirmações ou validações complementares sempre que entender necessário para prevenção de fraude, cumprimento regulatório, segurança operacional e integridade da conta.',
    ],
  },
  {
    id: 'planos',
    titulo: '4. Planos, assinatura e cobrança',
    conteudo: [
      'O acesso a determinadas funcionalidades poderá depender da contratação de plano de assinatura, observadas as características, limites, periodicidade, escopo de acesso, prioridade, experiência, valor e condições apresentadas no momento da contratação ou em área própria da plataforma.',
      'A cobrança poderá ocorrer em regime recorrente, na periodicidade informada ao usuário, por meio do método de pagamento cadastrado. O usuário é responsável por manter dados de pagamento válidos, completos e atualizados.',
      'A inadimplência, falha de autorização, expiração de cartão, inconsistência cadastral, suspeita de fraude ou problema técnico no meio de pagamento poderá afetar a renovação da assinatura, a continuidade de acesso ou a disponibilidade de determinadas áreas da conta.',
      'Os valores, planos, recursos, benefícios e condições comerciais poderão ser modificados pela operadora da plataforma, respeitados os deveres de informação e as regras aplicáveis à relação de consumo.',
    ],
  },
  {
    id: 'cancelamento',
    titulo: '5. Cancelamento, suspensão e encerramento',
    conteudo: [
      'O usuário poderá solicitar cancelamento da assinatura pelos meios disponibilizados na plataforma, observadas as condições vigentes do plano contratado, incluindo eventual manutenção de acesso até o encerramento do ciclo já pago, quando aplicável.',
      'O cancelamento da assinatura não implica, por si só, exclusão automática e imediata de todos os dados da conta, podendo determinadas informações permanecer armazenadas pelo prazo necessário ao cumprimento de obrigações legais, regulatórias, contratuais, de segurança, prevenção a fraude, auditoria e exercício regular de direitos.',
      'A operadora da plataforma poderá suspender, limitar, bloquear ou encerrar contas, com ou sem aviso prévio, em caso de indícios de fraude, uso indevido, violação destes Termos, comportamento abusivo, tentativa de manipulação do sistema, inconsistência cadastral relevante, determinação legal ou risco operacional.',
    ],
  },
  {
    id: 'beneficios',
    titulo: '6. Benefícios, resultados, liberações e ausência de garantia',
    conteudo: [
      'O usuário reconhece expressamente que a utilização da plataforma, a contratação de assinatura e o acesso às suas funcionalidades não garantem ganho, lucro, rendimento, retorno financeiro certo, contemplação, benefício específico, resultado determinado, vantagem econômica obrigatória ou frequência mínima de liberação.',
      'Toda e qualquer experiência, benefício, liberação, atualização, campanha, acesso, prioridade, resultado ou funcionalidade visualizada na plataforma poderá depender de critérios internos, regras do período, elegibilidade da conta, disponibilidade operacional, validade do plano, status cadastral e demais condições definidas pela operadora.',
      'Nenhuma comunicação institucional, publicitária, visual, explicativa ou exemplificativa da plataforma deverá ser interpretada como promessa de ganho, compromisso de rentabilidade, recomendação de investimento ou obrigação de entrega de resultado individual ao usuário.',
      'A existência de histórico anterior, demonstrações visuais, exemplos ilustrativos, números de tela ou situações exibidas em ambiente de teste não cria direito adquirido a resultado futuro, recorrência de benefício ou manutenção obrigatória de qualquer condição operacional.',
    ],
  },
  {
    id: 'regras-operacionais',
    titulo: '7. Regras operacionais da plataforma',
    conteudo: [
      'A plataforma poderá funcionar por ciclos, períodos, apurações, atualizações, janelas de disponibilidade, regras internas e fluxos operacionais definidos pela operadora, os quais poderão ser ajustados, interrompidos, reconfigurados, expandidos ou descontinuados a qualquer momento.',
      'Os ambientes de dashboard, assinatura, carteira, extrato, pagamento, resultados, histórico, perfil, suporte e demais páginas possuem natureza funcional e informativa, podendo apresentar recursos em evolução, elementos demonstrativos, estados visuais de teste e fluxos sujeitos a futura integração tecnológica.',
      'A operadora da plataforma poderá promover manutenção, atualização, correção, migração, revisão, auditoria, melhoria de performance, mudança de interface ou indisponibilidade temporária sem que isso gere direito automático a indenização, desde que observadas as normas aplicáveis.',
    ],
  },
  {
    id: 'conduta',
    titulo: '8. Conduta do usuário e usos proibidos',
    conteudo: [
      'O usuário compromete-se a utilizar a plataforma de forma lícita, ética, compatível com a boa-fé objetiva e em conformidade com a legislação brasileira, abstendo-se de qualquer conduta que comprometa a segurança, integridade, reputação, estabilidade ou regular funcionamento do sistema.',
      'É proibido, entre outros comportamentos: utilizar dados falsos; criar conta em nome de terceiros sem autorização; tentar burlar regras da plataforma; automatizar acessos; explorar falhas; manipular resultados; praticar engenharia reversa indevida; disseminar malware; violar segurança; realizar scraping não autorizado; comercializar acesso; ou utilizar a plataforma para fraude, lavagem de dinheiro, dissimulação patrimonial ou qualquer finalidade ilícita.',
      'A constatação, indício relevante ou tentativa de prática abusiva poderá ensejar bloqueio cautelar, suspensão, encerramento de conta, retenção operacional para análise e adoção das medidas administrativas, cíveis e criminais cabíveis.',
    ],
  },
  {
    id: 'propriedade-intelectual',
    titulo: '9. Propriedade intelectual',
    conteudo: [
      'Todos os elementos da plataforma, inclusive marca, nome comercial, layout, interface, identidade visual, bases estruturais, fluxos, textos, ícones, ilustrações, códigos, componentes, telas, banco de dados, documentos, materiais institucionais e demais ativos relacionados ao serviço são protegidos pela legislação aplicável de propriedade intelectual.',
      'É vedada a reprodução, cópia, distribuição, adaptação, engenharia reversa, republicação, extração substancial de conteúdo, comercialização ou exploração não autorizada de qualquer elemento da plataforma, salvo autorização expressa e formal da titular dos direitos.',
    ],
  },
  {
    id: 'comunicacoes',
    titulo: '10. Comunicações e notificações',
    conteudo: [
      'O usuário autoriza o envio de comunicações operacionais, cadastrais, contratuais, de segurança, cobrança, suporte e atualização de conta por meio de email, notificações internas, telefone, SMS, WhatsApp ou outros canais informados no cadastro, quando aplicável.',
      'Mensagens de natureza operacional, incluindo alertas de acesso, confirmação de ações, atualização de termos, comunicação de cobrança, indisponibilidade ou segurança, integram a própria prestação do serviço.',
    ],
  },
  {
    id: 'privacidade',
    titulo: '11. Privacidade e proteção de dados',
    conteudo: [
      'O tratamento de dados pessoais realizado no contexto da plataforma observará a legislação aplicável, em especial a Lei Geral de Proteção de Dados Pessoais (LGPD), além das regras internas de segurança, governança e controle adotadas pela operadora.',
      'Os dados poderão ser tratados para finalidades relacionadas à criação e gestão da conta, autenticação, segurança, prevenção a fraudes, execução contratual, cobrança, atendimento, melhoria do serviço, auditoria, registro de eventos, cumprimento de obrigações legais e exercício regular de direitos.',
      'A Política de Privacidade complementa estes Termos e deverá ser interpretada em conjunto com este documento.',
    ],
  },
  {
    id: 'limitacao-responsabilidade',
    titulo: '12. Indisponibilidade, falhas e limitação de responsabilidade',
    conteudo: [
      'A operadora não garante disponibilidade ininterrupta, ausência absoluta de falhas, compatibilidade universal com todos os dispositivos, inexistência de erros materiais ou funcionamento permanente e contínuo de todos os recursos da plataforma.',
      'Sem prejuízo dos direitos legalmente assegurados ao consumidor, a responsabilidade da operadora será analisada conforme a natureza do serviço, as circunstâncias concretas do caso, a extensão do dano comprovado e o nexo causal efetivamente demonstrado.',
      'A operadora não responde por danos decorrentes de culpa exclusiva do usuário ou de terceiros, uso indevido da conta, fornecimento incorreto de dados, falha do próprio dispositivo do usuário, perda de credenciais, indisponibilidade de internet, falha de provedor externo ou evento fora de seu controle razoável.',
    ],
  },
  {
    id: 'alteracoes',
    titulo: '13. Alterações destes Termos',
    conteudo: [
      'Estes Termos poderão ser alterados, atualizados, reestruturados ou substituídos a qualquer tempo, para refletir evolução do produto, mudanças regulatórias, operacionais, tecnológicas ou comerciais.',
      'A versão vigente será aquela disponibilizada na plataforma na data de acesso. Recomenda-se leitura periódica deste documento.',
    ],
  },
  {
    id: 'foro',
    titulo: '14. Lei aplicável e foro',
    conteudo: [
      'Estes Termos serão interpretados de acordo com a legislação brasileira.',
      'Sem prejuízo das regras legais aplicáveis às relações de consumo, fica eleito o foro do domicílio do consumidor, quando cabível, para dirimir controvérsias decorrentes da utilização da plataforma.',
    ],
  },
];

const highlights = [
  {
    icon: Shield,
    title: 'Uso com regras claras',
    description:
      'A utilização da plataforma está condicionada às regras operacionais, elegibilidade da conta e condições vigentes.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: AlertCircle,
    title: 'Sem promessa de retorno',
    description:
      'A assinatura não garante ganho, lucro, benefício fixo ou resultado financeiro individual.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Lock,
    title: 'Conta pessoal e protegida',
    description:
      'O usuário responde pela veracidade dos dados e pela segurança de seus acessos e credenciais.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Scale,
    title: 'Documento institucional',
    description:
      'Este documento deve ser lido em conjunto com a Política de Privacidade e demais regras da plataforma.',
    color: 'bg-green-100 text-green-700',
  },
];

export default function TermosPage() {
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
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Termos de Uso
                  </h1>

                  <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                    Condições gerais de utilização da plataforma {COMPANY_NAME},
                    incluindo regras de acesso, assinatura, uso da conta,
                    limitações operacionais e disposições aplicáveis ao
                    relacionamento com o usuário.
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                    <BadgeCheck className="h-4 w-4" />
                    Documento institucional
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Versão', TERMS_VERSION],
                  ['Aplicação', 'Uso da plataforma'],
                  ['Última revisão', LAST_UPDATED],
                  ['Conta mínima', '18+'],
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
                      Leitura recomendada antes do uso
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Ao utilizar a plataforma, o usuário concorda com as regras
                      de cadastro, assinatura, elegibilidade, uso da conta,
                      funcionamento operacional, privacidade e limitações aqui
                      previstas.
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

              <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Disposições complementares
                </h3>

                <p className="mt-3 text-base leading-7 text-gray-600">
                  Estes Termos devem ser interpretados em conjunto com a Política
                  de Privacidade, com as regras específicas exibidas em áreas
                  internas da plataforma e com as condições apresentadas no fluxo
                  de contratação do plano.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={PRIVACY_ROUTE}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                  >
                    Ver Política de Privacidade
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
                Acesse os principais tópicos deste documento de forma mais rápida.
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
                  Suporte institucional
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