'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  Shield,
  KeyRound,
  RefreshCw,
  CheckCircle2,
  Mail,
  Clock3,
} from 'lucide-react';

export default function VerificarCodigoPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email') || 'seu email';

  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [tempo, setTempo] = useState(30);
  const [erro, setErro] = useState('');
  const [reenviado, setReenviado] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (tempo <= 0) return;

    const interval = setInterval(() => {
      setTempo((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [tempo]);

  const codigoCompleto = codigo.join('');
  const podeVerificar = codigoCompleto.length === 6 && /^\d{6}$/.test(codigoCompleto);

  const verificarCodigo = async () => {
    // Aqui depois entra backend real
    // await fetch('/api/verify-code', { ... })
    return true;
  };

  const reenviarCodigo = async () => {
    // Aqui depois entra backend real
    // await fetch('/api/resend-code', { ... })
    return true;
  };

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const novo = [...codigo];
    novo[index] = value;
    setCodigo(novo);
    setErro('');
    setReenviado(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      const novo = [...codigo];

      if (codigo[index]) {
        novo[index] = '';
      } else if (index > 0) {
        novo[index - 1] = '';
        inputsRef.current[index - 1]?.focus();
      }

      setCodigo(novo);
      setErro('');
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!paste) return;

    const novo = ['', '', '', '', '', ''];
    paste.split('').forEach((char, i) => {
      novo[i] = char;
    });

    setCodigo(novo);
    setErro('');
    setReenviado(false);

    const nextIndex = Math.min(paste.length - 1, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  const handleVerificar = async () => {
    if (!podeVerificar) {
      setErro('Digite o código completo de 6 dígitos.');
      return;
    }

    setErro('');
    setLoading(true);

    try {
      await verificarCodigo();

      setTimeout(() => {
        router.push('/nova-senha');
      }, 700);
    } catch (e) {
      setErro('Não foi possível validar o código agora. Tente novamente.');
      setLoading(false);
      return;
    }
  };

  const handleReenviar = async () => {
    try {
      await reenviarCodigo();
      setTempo(30);
      setCodigo(['', '', '', '', '', '']);
      setErro('');
      setReenviado(true);
      inputsRef.current[0]?.focus();
    } catch (e) {
      setErro('Não foi possível reenviar o código agora.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-white px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_430px]">
          {/* LADO ESQUERDO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <Link
              href="/esqueci-senha"
              className="mb-8 inline-flex items-center text-sm text-gray-500 transition hover:text-blue-600"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar
            </Link>

            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                <Mail className="h-4 w-4" />
                Verificação por código
              </div>

              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Confirme sua identidade antes de continuar
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Enviamos um código de verificação para o email informado. Essa etapa
                reforça a segurança da conta antes de permitir a redefinição da senha.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Código individual enviado para o email vinculado à conta
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Fluxo rápido, seguro e pensado para proteger seu acesso
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                    <Clock3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Verificação em poucos segundos para seguir para a nova senha
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
                href="/esqueci-senha"
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
                  <KeyRound className="h-8 w-8 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  Verificação
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Digite o código enviado para <b>{email}</b>
                </p>
              </div>

              {/* INPUTS */}
              <div
                className="mb-4 flex justify-between gap-3"
                onPaste={handlePaste}
              >
                {codigo.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    inputMode="numeric"
                    className={`h-14 w-12 rounded-2xl border text-center text-xl font-bold outline-none transition ${
                      digit
                        ? 'border-blue-600 bg-white text-gray-900'
                        : 'border-gray-300 bg-gray-50 text-gray-900'
                    }`}
                    whileFocus={{ scale: 1.05 }}
                  />
                ))}
              </div>

              {/* STATUS */}
              <AnimatePresence>
                {erro && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mb-4 text-center text-sm text-red-500"
                  >
                    {erro}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {reenviado && !erro && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mb-4 text-center text-sm text-green-600"
                  >
                    Novo código enviado com sucesso.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BOTÃO */}
              <button
                onClick={handleVerificar}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-4 font-bold text-white transition hover:from-green-600 hover:to-green-700 disabled:opacity-70"
              >
                {loading ? 'Verificando...' : 'Verificar código'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              {/* REENVIAR */}
              <div className="mt-6 text-center text-sm text-gray-500">
                {tempo > 0 ? (
                  <span>Reenviar código em {tempo}s</span>
                ) : (
                  <button
                    onClick={handleReenviar}
                    className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reenviar código
                  </button>
                )}
              </div>

              {/* INFO */}
              <div className="mt-8 flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                <Shield className="mt-1 h-5 w-5 text-blue-600" />
                <p>
                  Esse código garante que apenas você consiga redefinir a senha
                  da sua conta com segurança.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}