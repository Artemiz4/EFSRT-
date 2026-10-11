import { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Search, 
  Plus, 
  RefreshCw, 
  MoreHorizontal,
  Clock
} from 'lucide-react';

interface InventoryItem {
  codigo: string;
  nombre: string;
  categoria: string;
  existencias: number;
  precio: number;
  estado: 'Disponible' | 'Stock bajo' | 'Crítico';
  imagen: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    codigo: 'PRO-001',
    nombre: 'Audífonos Nova',
    categoria: 'Tecnología',
    existencias: 18,
    precio: 129.90,
    estado: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    codigo: 'PRO-002',
    nombre: 'Agenda Ejecutiva',
    categoria: 'Oficina',
    existencias: 24,
    precio: 45.50,
    estado: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80'
  },
  {
    codigo: 'PRO-003',
    nombre: 'Mug Térmico',
    categoria: 'Accesorios',
    existencias: 8,
    precio: 58.90,
    estado: 'Stock bajo',
    imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80'
  },
  {
    codigo: 'PRO-004',
    nombre: 'Audífonos Air',
    categoria: 'Tecnología',
    existencias: 4,
    precio: 99.90,
    estado: 'Crítico',
    imagen: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80'
  },
  {
    codigo: 'PRO-005',
    nombre: 'Teclado Compact',
    categoria: 'Tecnología',
    existencias: 2,
    precio: 149.00,
    estado: 'Crítico',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80'
  }
];

export default function Inventory() {
  const [items] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedState, setSelectedState] = useState('Todos');

  // Filtrado de tabla
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.categoria === selectedCategory;
    const matchesState = selectedState === 'Todos' || item.estado === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  const getStatusBadge = (estado: InventoryItem['estado']) => {
    switch (estado) {
      case 'Disponible':
        return <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">Disponible</span>;
      case 'Stock bajo':
        return <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">Stock bajo</span>;
      case 'Crítico':
        return <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">Crítico</span>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Cabecera de Almacén e Inventario */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            ALMACÉN E INVENTARIO
          </p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Control de inventario
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Administra tus productos, existencias y movimientos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs hover:bg-slate-50 transition-colors cursor-pointer">
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Realizar Kardex</span>
          </button>
          
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Añadir nuevo producto</span>
          </button>
        </div>
      </div>

      {/* METRICAS DE INVENTARIO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total de productos</p>
            <h3 className="text-2xl font-black text-slate-900">248</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock bajo</p>
            <h3 className="text-2xl font-black text-slate-900">8</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock crítico</p>
            <h3 className="text-2xl font-black text-slate-900">3</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Valor de inventario</p>
            <h3 className="text-2xl font-black text-slate-900">S/ 64,820</h3>
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE TABLA Y FILTROS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* Barra de Filtros */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar producto o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Todas">Categoría: Todas</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Oficina">Oficina</option>
              <option value="Accesorios">Accesorios</option>
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Todos">Estado: Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Stock bajo">Stock bajo</option>
              <option value="Crítico">Crítico</option>
            </select>

            <button className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-100 transition-colors cursor-pointer">
              Más filtros
            </button>
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6">Código</th>
                <th className="py-3.5 px-6">Producto</th>
                <th className="py-3.5 px-6">Categoría</th>
                <th className="py-3.5 px-6">Existencias</th>
                <th className="py-3.5 px-6">Precio</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredItems.map((item) => (
                <tr key={item.codigo} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-lg text-[11px]">
                      {item.codigo}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                      />
                      <span className="font-bold text-slate-900">{item.nombre}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">{item.categoria}</td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${item.existencias <= 5 ? 'text-red-600' : 'text-slate-800'}`}>
                      {item.existencias} und.
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">S/ {item.precio.toFixed(2)}</td>
                  <td className="py-4 px-6">{getStatusBadge(item.estado)}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}