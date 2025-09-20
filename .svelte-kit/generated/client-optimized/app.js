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
	() => import('./nodes/31')
];

export const server_loads = [3];

export const dictionary = {
		"/": [~4],
		"/admin/dashboard": [~5,[2]],
		"/admin/dashboard/admins": [~6,[2]],
		"/admin/dashboard/admins/create": [7,[2]],
		"/admin/dashboard/events": [~8,[2]],
		"/admin/dashboard/guards": [~9,[2]],
		"/admin/dashboard/guards/create": [10,[2]],
		"/admin/dashboard/guests": [~11,[2]],
		"/admin/dashboard/residents": [~12,[2]],
		"/admin/dashboard/residents/create": [15,[2]],
		"/admin/dashboard/residents/[id]": [~13,[2]],
		"/admin/dashboard/residents/[id]/edit": [~14,[2]],
		"/admin/dashboard/settings": [~16,[2]],
		"/admin/dashboard/vehicles": [~17,[2]],
		"/admin/dashboard/vehicles/create": [~18,[2]],
		"/login": [~19],
		"/logout": [20],
		"/user/dashboard": [~21,[3]],
		"/user/dashboard/food-delivery": [~22,[3]],
		"/user/dashboard/food-delivery/create": [23,[3]],
		"/user/dashboard/guests": [~24,[3]],
		"/user/dashboard/guests/create": [25,[3]],
		"/user/dashboard/history": [~26,[3]],
		"/user/dashboard/profile": [~27,[3]],
		"/user/dashboard/vehicles": [~28,[3]],
		"/user/dashboard/vehicles/create": [31,[3]],
		"/user/dashboard/vehicles/[id]/delete": [~29,[3]],
		"/user/dashboard/vehicles/[id]/edit": [~30,[3]]
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