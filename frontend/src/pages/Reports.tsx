import { BarChart3, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">ANÁLISIS</p>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reportes del negocio</h1>
        <p className="text-sm text-slate-500 mt-1">Indicadores para tomar mejores decisiones.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
          <BarChart3 className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Centro de reportes</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Selecciona un periodo para visualizar ventas, inventario y rentabilidad.
          </p>
        </div>

        <button className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer">
          <FileSpreadsheet className="w-4 h-4" />
          <span>Generar reporte</span>
        </button>
      </div>
    </div>
  );
}