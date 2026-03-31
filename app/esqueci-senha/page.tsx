'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  ChevronLeft,
  Shield,
  CheckCircle2,
  Loader2,
  Lock,
} from 'lucide-react';

export default function EsqueciSenhaPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const enviarCodigo = async () => {
    // Aqui depois entra a chamada real do backend
    // await fetch('/api/forgot-password', {...})
    return true;
  };

  const handleEnviar = async () => {
    setErro('');

    if (!email.trim()) {
      setErro('Digite o email da sua conta.');
      return;
    }

    if (!emailValido) {
      setErro('Digite um email válido.');
      return;
    }

    setLoading(true);

    try {
      await enviarCodigo();

      setLoading(false);
      setEnviado(true);

      setTimeout(() => {
        router.push(`/verificar-codigo?email=${encodeURIComponent(email.trim())}`);
      }, 1200);
    } catch (e) {
      setLoading(false);
      setErro('Não foi possível enviar o código agora. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-white px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_420px]">
          {/* LADO ESQUERDO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <Link
              href="/login"
              className="mb-8 inline-flex items-center text-sm text-gray-500 transition hover:text-blue-600"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar para login
            </Link>

            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                <Lock className="h-4 w-4" />
                Recuperação de acesso
              </div>

              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Redefina o acesso da sua conta com segurança
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Para proteger sua conta, utilizamos um fluxo de verificação por código.
                Assim, garantimos que apenas você consiga redefinir sua senha com segurança.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Processo seguro com validação por email
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Recuperação organizada em poucos passos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD DIREITO */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* MOBILE BACK */}
            <div className="mb-6 text-center lg:hidden">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-gray-500 transition hover:text-blue-600"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Voltar
              </Link>
            </div>

            <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              {/* HEADER */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                  {enviado ? (
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  ) : (
                    <Mail className="h-8 w-8 text-white" />
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  {enviado ? 'Código enviado' : 'Recuperar acesso'}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {enviado
                    ? 'Redirecionando para a verificação...'
                    : 'Digite o email da sua conta para continuar'}
                </p>
              </div>

              {!enviado && (
                <div className="space-y-5">
                  {/* INPUT */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-700">
                      Email da conta
                    </label>

                    <div
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition ${
                        erro
                          ? 'border-red-400 bg-white'
                          : 'border-gray-300 bg-gray-50 focus-within:border-blue-600 focus-within:bg-white'
                      }`}
                    >
                      <Mail className="h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (erro) setErro('');
                        }}
                        className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                      />
                    </div>

                    <AnimatePresence>
                      {erro && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="mt-2 text-sm text-red-500"
                        >
                          {erro}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* BOTÃO */}
                  <button
                    onClick={handleEnviar}
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-4 font-bold text-white transition hover:from-green-600 hover:to-green-700 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar código
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {enviado && (
                <div className="text-center text-sm text-gray-500 animate-pulse">
                  Aguarde um instante...
                </div>
              )}

              {/* INFO BOX */}
              <div className="mt-8 flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                <Shield className="mt-0.5 h-5 w-5 text-blue-600" />
                <p>
                  Por segurança, um código de verificação será enviado para confirmar sua identidade antes de permitir alterações na conta.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}