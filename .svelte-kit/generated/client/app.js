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
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34')
];

export const server_loads = [2,4];

export const dictionary = {
		"/": [~5],
		"/admin/dashboard": [~6,[2]],
		"/admin/dashboard/admins": [~7,[2]],
		"/admin/dashboard/admins/create": [~8,[2]],
		"/admin/dashboard/events": [~9,[2]],
		"/admin/dashboard/guards": [~10,[2]],
		"/admin/dashboard/guards/create": [~11,[2]],
		"/admin/dashboard/guests": [~12,[2]],
		"/admin/dashboard/residents": [~13,[2]],
		"/admin/dashboard/residents/create": [~16,[2]],
		"/admin/dashboard/residents/[id]": [~14,[2]],
		"/admin/dashboard/residents/[id]/edit": [~15,[2]],
		"/admin/dashboard/settings": [~17,[2]],
		"/admin/dashboard/vehicles": [~18,[2]],
		"/admin/dashboard/vehicles/create": [~19,[2]],
		"/guard/dashboard": [~20,[3]],
		"/guard/dashboard/settings": [~21,[3]],
		"/login": [~22],
		"/logout": [~23],
		"/user/dashboard": [~24,[4]],
		"/user/dashboard/food-delivery": [~25,[4]],
		"/user/dashboard/food-delivery/create": [~26,[4]],
		"/user/dashboard/guests": [~27,[4]],
		"/user/dashboard/guests/create": [~28,[4]],
		"/user/dashboard/history": [~29,[4]],
		"/user/dashboard/profile": [~30,[4]],
		"/user/dashboard/vehicles": [~31,[4]],
		"/user/dashboard/vehicles/create": [~34,[4]],
		"/user/dashboard/vehicles/[id]/delete": [~32,[4]],
		"/user/dashboard/vehicles/[id]/edit": [~33,[4]]
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