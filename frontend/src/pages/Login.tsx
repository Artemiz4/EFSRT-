import { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle, Loader2, UserCheck } from 'lucide-react';
import { authService } from '../services/authService';

interface LoginProps {
  onLoginSuccess?: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El formato del correo electrónico no es válido.');
      return false;
    }
    if (!password) {
      setError('Por favor, ingresa tu contraseña.');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await authService.login({ email, clave: password });
      // Redirige automáticamente al Dashboard
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (type: 'ADMIN' | 'VENDEDOR') => {
    if (type === 'ADMIN') {
      setEmail('admin@aisell.pe');
      setPassword('admin123');
    } else {
      setEmail('vendedor@aisell.pe');
      setPassword('vendedor123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-8">
      {/* Logo Superior */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center font-bold text-xl">
          AI
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900">Aisell</span>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Gestión Comercial
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-3">Bienvenido de nuevo</h1>
          <p className="text-sm text-slate-500 mt-1">Ingresa tus credenciales para acceder al sistema.</p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aisell.pe"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
                Contraseña
              </label>
              <a href="#forgot" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-600 cursor-pointer">
              Recuérdame en este dispositivo
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Validando accesos...</span>
              </>
            ) : (
              <>
                <span>Iniciar sesión</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Accesos Rápidos para Desarrollo */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
            Prueba rápida de perfiles (Modo Dev)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('ADMIN')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              Admin
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('VENDEDOR')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              Vendedor
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          ¿Necesitas ayuda?{' '}
          <a href="#support" className="font-medium text-blue-600 hover:underline">
            Contactar a soporte
          </a>
        </div>
      </div>

      <footer className="mt-6 text-center text-xs text-slate-400 flex items-center gap-1">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>© 2026 Aisell · Gestión Inteligente para MYPES</span>
      </footer>
    </div>
  );
}