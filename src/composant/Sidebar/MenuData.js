import { Home, Utensils, Settings, LayoutDashboard } from 'lucide-react';

export const MenuData = [
  {
    title: 'Painel',
    url: '/admin',
    icon: <LayoutDashboard size={18} />
  },
  {
    title: 'Cardápio',
    url: '/admin/cardapio',
    icon: <Utensils size={18} />
  },
  {
    title: 'Configurações',
    url: '/admin/configuracoes',
    icon: <Settings size={18} />
  }
];
