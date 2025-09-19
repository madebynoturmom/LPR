import * as universal_hooks from '../../../src/hooks.ts';

export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/admin/dashboard": [~4],
		"/admin/dashboard/admins": [~5],
		"/admin/dashboard/admins/create": [6],
		"/admin/dashboard/events": [~7],
		"/admin/dashboard/guards": [~8],
		"/admin/dashboard/guards/create": [9],
		"/admin/dashboard/guests": [~10],
		"/admin/dashboard/residents": [~11],
		"/admin/dashboard/residents/create": [14],
		"/admin/dashboard/residents/[id]": [~12],
		"/admin/dashboard/residents/[id]/edit": [~13],
		"/admin/dashboard/settings": [~15],
		"/admin/dashboard/vehicles": [~16],
		"/admin/dashboard/vehicles/create": [~17],
		"/login": [~18],
		"/logout": [19],
		"/user/dashboard": [20,[2]],
		"/user/dashboard/food-delivery": [~21,[2]],
		"/user/dashboard/food-delivery/create": [22,[2]],
		"/user/dashboard/guests": [~23,[2]],
		"/user/dashboard/guests/create": [24,[2]],
		"/user/dashboard/profile": [~25,[2]],
		"/user/dashboard/vehicles": [~26,[2]],
		"/user/dashboard/vehicles/create": [29,[2]],
		"/user/dashboard/vehicles/[id]/delete": [~27,[2]],
		"/user/dashboard/vehicles/[id]/edit": [~28,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: universal_hooks.reroute || (() => {}),
	transport: universal_hooks.transport || {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';