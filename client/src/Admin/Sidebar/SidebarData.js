import React from 'react';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
	{
		title: 'Estadísticas',
		path: '/admin/dashboard',
		icon: <AiIcons.AiFillDashboard />,
		cName: 'nav-text',
		visible: true
	},
	{
		title: 'Usuarios',
		path: '/admin/users',
		icon: <AiIcons.AiOutlineUserSwitch />,
		cName: 'nav-text',
		visible: true
	},
	{
		title: 'Categorías',
		path: '/admin/categories',
		icon: <AiIcons.AiOutlineProfile />,
		cName: 'nav-text',
		visible: false
	},
	{
		title: 'Productos',
		path: '/admin/products',
		icon: <AiIcons.AiFillDatabase />,
		cName: 'nav-text',
		visible: true
	},
	{
		title: 'Órdenes',
		path: '/admin/orders',
		icon: <AiIcons.AiFillBank />,
		cName: 'nav-text',
		visible: true
	},
	{
		title: 'Configuración',
		path: '/admin/settings',
		icon: <AiIcons.AiFillSetting />,
		cName: 'nav-text-strong',
		visible: false
	}
];
