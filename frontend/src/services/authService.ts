import type { LoginRequest, LoginResponse, User } from '../types/auth';

// Perfiles en duro preconfigurados
const USERS_MOCK: (User & { clave: string })[] = [
  {
    id: 1,
    nombre: 'Allison Ortiz',
    email: 'admin@aisell.pe',
    clave: 'admin123',
    rol: 'ADMIN'
  },
  {
    id: 2,
    nombre: 'Patricia Román',
    email: 'vendedor@aisell.pe',
    clave: 'vendedor123',
    rol: 'VENDEDOR'
  }
];

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Simula latencia de red (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = USERS_MOCK.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.clave === credentials.clave
    );

    if (!user) {
      throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
    }

    const response: LoginResponse = {
      token: `mock-jwt-token-aisell-${user.id}-${Date.now()}`,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    };

    // Guardar sesión localmente
    localStorage.setItem('aisell_token', response.token);
    localStorage.setItem('aisell_user', JSON.stringify(response.usuario));

    return response;
  },

  logout: () => {
    localStorage.removeItem('aisell_token');
    localStorage.removeItem('aisell_user');
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('aisell_user');
    return userJson ? JSON.parse(userJson) : null;
  }
};