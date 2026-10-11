import { useState } from 'react';
import { 
  Truck, 
  Clock, 
  CheckCircle2, 
  Search, 
  RefreshCw, 
  Plus, 
  MapPin, 
  Navigation 
} from 'lucide-react';

interface Shipment {
  id: string;
  cliente: string;
  direccion: string;
  estado: 'En ruta' | 'Pendiente' | 'Entregado';
  horaEstimada: string;
}

const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'PED-1842',
    cliente: 'Distribuidora San Martín',
    direccion: 'Av. Arequipa 1240, Lince',
    estado: 'En ruta',
    horaEstimada: 'Entrega estimada: 11:30'
  },
  {
    id: 'PED-1841',
    cliente: 'Comercial Los Olivos',
    direccion: 'Jr. Huandoy 482, Los Olivos',
    estado: 'Pendiente',
    horaEstimada: 'Programado para hoy'
  },
  {
    id: 'PED-1839',
    cliente: 'Market Sol',
    direccion: 'Av. La Marina 2080, San Miguel',
    estado: 'En ruta',
    horaEstimada: 'Entrega estimada: 13:15'
  },
  {
    id: 'PED-1838',
    cliente: 'Bodega Santa Rosa',
    direccion: 'Calle Las Flores 145, Surco',
    estado: 'Entregado',
    horaEstimada: 'Entregado a las 09:42'
  },
  {
    id: 'PED-1836',
    cliente: 'Inversiones Prado',
    direccion: 'Av. Canadá 980, La Victoria',
    estado: 'Entregado',
    horaEstimada: 'Entregado a las 08:55'
  }
];

export default function Shipping() {
  const [shipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = shipments.filter(
    (s) =>
      s.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadge = (estado: Shipment['estado']) => {
    switch (estado) {
      case 'En ruta':
        return <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">En ruta</span>;
      case 'Pendiente':
        return <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">Pendiente</span>;
      case 'Entregado':
        return <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">Entregado</span>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">LOGÍSTICA</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Envíos y trazabilidad</h1>
          <p className="text-sm text-slate-500 mt-1">Monitorea el estado y recorrido de todos tus despachos.</p>
        </div>

        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Programar envío</span>
        </button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">5</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pendientes</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Truck className="w-6 h-6" /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">12</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">En ruta</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">28</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Entregados hoy</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">94%</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">A tiempo</p>
          </div>
        </div>
      </div>

      {/* Seccion Principal: Lista y Mapa */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Pedidos */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pedidos de hoy</h2>
              <p className="text-xs text-slate-400">45 envíos programados</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 space-y-3">
            {filteredShipments.map((s) => (
              <div key={s.id} className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl mt-1">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600">{s.id}</span>
                      {getBadge(s.estado)}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mt-1">{s.cliente}</h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {s.direccion}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <span className="text-[11px] text-slate-400">{s.horaEstimada}</span>
                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 cursor-pointer">
                    <RefreshCw className="w-3 h-3" />
                    <span>Actualizar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulación del Mapa */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="relative h-80 bg-slate-100 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
            <div className="absolute w-full h-2 bg-slate-200 rotate-12"></div>
            <div className="absolute w-2 h-full bg-slate-200 -rotate-45"></div>

            <div className="absolute top-1/4 left-1/3 bg-blue-600 text-white p-2 rounded-full shadow-lg animate-bounce">
              <Truck className="w-4 h-4" />
            </div>
            <div className="absolute top-1/2 right-1/4 bg-amber-600 text-white p-2 rounded-full shadow-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="absolute bottom-1/3 left-1/2 bg-emerald-600 text-white p-2 rounded-full shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-xs">
                JR
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Repartidor asignado</p>
                <p className="text-xs font-bold text-slate-900">José Ramírez</p>
                <p className="text-[10px] text-slate-400">Unidad A7 · 8 entregas restantes</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              <span>Ver ruta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}