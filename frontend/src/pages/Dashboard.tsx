import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Truck, 
  BarChart3, 
  Search, 
  Bell, 
  LogOut, 
  TrendingUp,   
  Plus, 
  ChevronRight,
  MessageCircleQuestion,
} from 'lucide-react';
import { authService } from '../services/authService';
import type { User } from '../types/auth';
import Pos from './Pos';
interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pos' | 'inventory' | 'shipping' | 'reports'>('dashboard');

  useEffect(() => {
   
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  
  const getGreeting = () => {
    if (!user) return 'Bienvenido a Aisell';
    const primerNombre = user.nombre.split(' ')[0]; 
    
    if (user.rol === 'ADMIN') {
      return `Bienvenido Administrador ${primerNombre}`;
    } else {
      return `Bienvenido Vendedor ${primerNombre}`;
    }
  };

 
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* BARRA LATERAL / SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 sticky top-0 h-screen">
        <div>
          {/* Logo del Sistema */}
          <div className="flex items-center gap-2.5 px-3 py-4 mb-6">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20 font-bold text-lg">
              AI
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Aisell</span>
          </div>

          {/* Menú de Navegación */}
          <div className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Menú Principal
          </div>

          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Panel de control</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pos')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
                activeTab === 'pos'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Ventas (POS)</span>
            </button>

            <a
              href="#inventory"
              className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Inventario</span>
            </a>

            <a
              href="#shipping"
              className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors justify-between"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5" />
                <span>Envíos</span>
              </div>
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                3
              </span>
            </a>

            <a
              href="#reports"
              className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl font-medium text-sm transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Reportes</span>
            </a>
          </nav>
        </div>

        {/* Sección Inferior del Sidebar */}
        <div className="space-y-4">
          {/* Tarjeta de Soporte */}
          <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl">
            <div className="bg-blue-600/10 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">¿Necesitas ayuda?</h4>
            <p className="text-xs text-slate-500 mb-2">Nuestro equipo está listo para ayudarte.</p>
            <a href="#help" className="text-xs font-bold text-blue-600 hover:underline">
              Centro de ayuda
            </a>
          </div>

          {/* Perfil del Usuario en el Sidebar */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 text-blue-700 font-semibold rounded-full flex items-center justify-center text-xs">
                {user ? getInitials(user.nombre) : 'US'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {user ? user.nombre : 'Cargando...'}
                </p>
                <p className="text-[11px] text-slate-400 capitalize">
                  {user ? (user.rol === 'ADMIN' ? 'Administrador' : 'Vendedor') : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Cerrar sesión"
              className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* BARRA SUPERIOR / HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="text-xs text-slate-400">
            Aisell / <span className="text-slate-700 font-medium">
              {activeTab === 'dashboard' ? 'Panel de control' : 'Ventas (POS)'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></span>
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 text-blue-700 font-semibold rounded-full flex items-center justify-center text-xs">
                {user ? getInitials(user.nombre) : 'US'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user?.nombre}</p>
                <p className="text-[11px] text-slate-400">
                  {user?.rol === 'ADMIN' ? 'Administrador' : 'Vendedor'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO (SWAP SEGÚN PESTAÑA) */}
        {activeTab === 'pos' ? (
          <Pos />
        ) : (
          <div className="p-8 space-y-6">
            {/* Cabecera del Panel con Saludo Personalizado */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                  SÁBADO, 11 DE OCTUBRE DE 2026
                </p>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {getGreeting()}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Aquí tienes el resumen de tu negocio hoy.
                </p>
              </div>

              <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs hover:bg-slate-50 transition-colors cursor-pointer self-start md:self-auto">
                <span>Descargar reporte</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* TARJETAS DE MÉTRICAS / KPIS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* KPI 1: Ventas del Día */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    ↗ 12.5%
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Ventas totales del día
                </p>
                <h3 className="text-2xl font-bold text-slate-900">S/ 8,420.50</h3>
                <p className="text-xs text-slate-400 mt-2">vs. S/ 7,485 ayer</p>
              </div>

              {/* KPI 2: Stock Crítico */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    Requiere atención
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Productos bajo stock
                </p>
                <h3 className="text-2xl font-bold text-slate-900">8 productos</h3>
                <p className="text-xs text-slate-400 mt-2">3 en stock crítico</p>
              </div>

              {/* KPI 3: Pedidos en ruta */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    Hoy
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Pedidos en ruta
                </p>
                <h3 className="text-2xl font-bold text-slate-900">12 pedidos</h3>
                <p className="text-xs text-slate-400 mt-2">5 próximos a entregar</p>
              </div>
            </div>

            {/* SECCIÓN INFERIOR: RESUMEN DE VENTAS Y ACCESOS RÁPIDOS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Gráfico / Resumen de Ventas (2 Columnas) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Resumen de ventas</h3>
                    <p className="text-xs text-slate-400">Rendimiento de los últimos 7 días</p>
                  </div>
                  <button className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                    Últimos 7 días ▾
                  </button>
                </div>

                <div className="mb-6">
                  <span className="text-2xl font-bold text-slate-900">S/ 42,580</span>
                  <span className="ml-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +8.2% vs. semana anterior
                  </span>
                </div>

                {/* Simulación visual del gráfico de barras */}
                <div className="h-44 flex items-end justify-between gap-3 pt-6 border-t border-slate-100">
                  {[
                    { day: 'Lun', height: '40%' },
                    { day: 'Mar', height: '60%' },
                    { day: 'Mié', height: '50%' },
                    { day: 'Jue', height: '75%' },
                    { day: 'Vie', height: '65%' },
                    { day: 'Sáb', height: '90%' },
                    { day: 'Dom', height: '80%' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div
                        style={{ height: item.height }}
                        className="w-full bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700"
                      ></div>
                      <span className="text-xs text-slate-400 font-medium">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accesos Rápidos (1 Columna) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Accesos rápidos</h3>
                  <p className="text-xs text-slate-400 mb-5">Operaciones frecuentes</p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('pos')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 rounded-xl transition-all group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <ShoppingCart className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Nueva venta</p>
                          <p className="text-[11px] text-slate-400">Ir al punto de venta</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href="#inventory"
                      className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                          <Plus className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Agregar producto</p>
                          <p className="text-[11px] text-slate-400">Registrar en inventario</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="#shipping"
                      className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                          <Truck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Gestionar envíos</p>
                          <p className="text-[11px] text-slate-400">Ver pedidos pendientes</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}