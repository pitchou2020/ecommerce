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
    title: 'Congelados',
    url: '/admin/painel-admin-cop30',
    icon: <Utensils size={18} />
  },
    {
    title: 'Hortifruti',
    url: '/admin/painel-admin-hortifruti',
    icon: <Utensils size={18} />
  },
  {
    title: "Hero Home",
    url : "/admin/painel-hero-admin",
    icon: <Utensils size={18} />
  },
  {
    title: "Frete",
    url : "/admin/frete",
    icon: <Utensils size={18} />
  },
  {
    title: "Popup",
    url : "/admin/popup",
    icon: <Utensils size={18} />
  },
  {
    title: 'Configurações',
    url: '/admin/configuracoes',
    icon: <Settings size={18} />
  }
];
