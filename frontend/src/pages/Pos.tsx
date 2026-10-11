import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  ChevronRight, 
  User, 
  CheckCircle2 
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../services/productService';
import type { Product, CartItem } from '../types/pos';

export default function Pos() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [saleSuccess, setSaleSuccess] = useState<boolean>(false);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.categoria === selectedCategory;
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.producto.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.producto.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { producto: product, cantidad: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.producto.id === productId) {
            const newQty = item.cantidad + delta;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  // Cálculos financieros en Soles (S/)
  const total = cart.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  const subtotal = total / 1.18;
  const igv = total - subtotal;

  const handleProcessSale = () => {
    if (cart.length === 0) return;
    setSaleSuccess(true);
    setTimeout(() => {
      setSaleSuccess(false);
      clearCart();
    }, 2500);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Cabecera del Punto de Venta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            PUNTO DE VENTA
          </p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Nueva venta
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Selecciona los productos para agregarlos al carrito.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-medium self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Caja abierta · Turno mañana</span>
        </div>
      </div>

      {/* Notificación de Venta Procesada */}
      {saleSuccess && (
        <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-bold text-sm">¡Venta completada con éxito!</p>
              <p className="text-xs text-emerald-100">Comprobante generado y stock actualizado.</p>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor Principal POS: Productos (Izquierda) vs Carrito (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA DE PRODUCTOS (2 Columnas) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Barra de Búsqueda y Filtros de Categoría */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-xs"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {['Todos', 'Tecnología', 'Oficina', 'Accesorios'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de Tarjetas de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      product.stock <= 5
                        ? 'bg-red-100 text-red-600'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {product.stock <= 5 ? `Solo ${product.stock}` : `${product.stock} disponibles`}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {product.categoria}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 truncate">{product.nombre}</h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-extrabold text-slate-900">
                      S/ {product.precio.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                      title="Agregar al carrito"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DEL CARRITO DE VENTA (1 Columna) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between h-fit sticky top-20">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Carrito de venta</h2>
                <p className="text-xs text-slate-400">
                  {cart.reduce((acc, item) => acc + item.cantidad, 0)} productos seleccionados
                </p>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpiar
                </button>
              )}
            </div>

            {/* Lista de Items en Carrito */}
            <div className="py-4 space-y-4 max-h-80 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-slate-400 space-y-2">
                  <ShoppingCart className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-xs font-medium">El carrito está vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.producto.id} className="flex items-center justify-between gap-3">
                    <img
                      src={item.producto.imagen}
                      alt={item.producto.nombre}
                      className="w-11 h-11 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.producto.nombre}</p>
                      <p className="text-[11px] text-slate-400">S/ {item.producto.precio.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.producto.id, -1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.producto.id, 1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-900 min-w-[55px] text-right">
                        S/ {(item.producto.precio * item.cantidad).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selección de Cliente */}
            <div className="pt-3 border-t border-slate-100 mb-4">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Cliente
              </label>
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                    CG
                  </div>
                  <span className="text-xs font-bold text-slate-800">Cliente general</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Resumen de Pago y Botón Procesar */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700">S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IGV (18%)</span>
                <span className="font-semibold text-slate-700">S/ {igv.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
              <span className="text-sm font-bold text-slate-900">Total</span>
              <span className="text-2xl font-black text-blue-600">S/ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleProcessSale}
              disabled={cart.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Procesar venta</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400">🔒 Transacción segura y protegida</p>
          </div>
        </div>

      </div>
    </div>
  );
}