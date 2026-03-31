'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
  Shield,
  ChevronLeft,
} from 'lucide-react';

export default function NovaSenhaPage() {
  const router = useRouter();

  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // 🔥 REGRAS
  const regras = {
    length: senha.length >= 8,
    upper: /[A-Z]/.test(senha),
    lower: /[a-z]/.test(senha),
    number: /[0-9]/.test(senha),
  };

  const regrasOk = Object.values(regras).filter(Boolean).length;

  const senhaValida = regrasOk === 4;
  const confirmaOk = confirmar.length > 0 && senha === confirmar;

  const podeEnviar = senhaValida && confirmaOk;

  // 🔥 PRONTO PRA BACK
  const salvarNovaSenha = async () => {
    // 👉 aqui depois você pluga API
    // await fetch('/api/reset-password', { ... })

    return true;
  };

  const handleSubmit = async () => {
    if (!podeEnviar) return;

    setLoading(true);

    try {
      await salvarNovaSenha();

      setSucesso(true);

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const Regra = ({ ok, text }: any) => (
    <motion.div
      className="flex items-center gap-2 text-sm"
      animate={{ opacity: ok ? 1 : 0.4 }}
    >
      {ok ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={ok ? 'text-green-600' : 'text-gray-400'}>
        {text}
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-white px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >

          {/* VOLTAR */}
          <Link
            href="/login"
            className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-blue-600"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para login
          </Link>

          {/* CARD */}
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Criar nova senha
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                Defina uma senha forte para manter sua conta segura
              </p>
            </div>

            {/* SENHA */}
            <div className="mb-5">
              <div
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                  senha
                    ? 'border-blue-600 bg-white'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <input
                  type={showSenha ? 'text' : 'password'}
                  placeholder="Nova senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-900"
                />

                <button onClick={() => setShowSenha(!showSenha)}>
                  {showSenha ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* FORÇA */}
              <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className={`h-full ${
                    regrasOk <= 1
                      ? 'bg-red-500'
                      : regrasOk === 2
                      ? 'bg-yellow-500'
                      : regrasOk === 3
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                  }`}
                  animate={{ width: `${(regrasOk / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* CONFIRMAR */}
            <div className="mb-4">
              <div
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                  confirmar
                    ? confirmaOk
                      ? 'border-green-500 bg-white'
                      : 'border-red-500 bg-white'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <input
                  type={showConfirmar ? 'text' : 'password'}
                  placeholder="Confirmar senha"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />

                <button onClick={() => setShowConfirmar(!showConfirmar)}>
                  {showConfirmar ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {confirmar && !confirmaOk && (
                <p className="mt-2 text-sm text-red-500">
                  As senhas precisam ser iguais
                </p>
              )}
            </div>

            {/* REGRAS */}
            <div className="mb-6 space-y-2">
              <Regra ok={regras.length} text="Mínimo de 8 caracteres" />
              <Regra ok={regras.upper} text="Letra maiúscula" />
              <Regra ok={regras.lower} text="Letra minúscula" />
              <Regra ok={regras.number} text="Número" />
            </div>

            {/* BOTÃO */}
            <button
              onClick={handleSubmit}
              disabled={!podeEnviar || loading}
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 py-4 font-bold text-white transition hover:from-green-600 hover:to-green-700 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Atualizar senha'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            {/* INFO */}
            <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600 flex gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-1" />
              <p>
                Use uma senha única. Isso aumenta significativamente a segurança da sua conta.
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      {/* SUCESSO */}
      <AnimatePresence>
        {sucesso && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
              >
                <Check className="h-8 w-8 text-green-600" />
              </motion.div>

              <h2 className="text-xl font-bold text-gray-900">
                Senha atualizada com sucesso
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Agora você já pode acessar sua conta normalmente
              </p>

              <p className="mt-4 text-xs text-gray-400">
                Redirecionando...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}