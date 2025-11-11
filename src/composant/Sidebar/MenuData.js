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
    title: 'Pratos Populares',
    url: '/admin/pratos-populares',
    icon: <Utensils size={18} />
  },
  {
    title: 'Eventos',
    url: '/admin/eventos',
    icon: <Utensils size={18} />
  },
  {
    title: 'Receitas Json',
    url: '/admin/receitas-json',
    icon: <Utensils size={18} />
  },
  {
    title: 'Recitas Autorais',
    url: '/admin/painel-receitas-autorais',
    icon: <Utensils size={18} />
  },
 
  {
    title: 'Configurações',
    url: '/admin/configuracoes',
    icon: <Settings size={18} />
  }
];
