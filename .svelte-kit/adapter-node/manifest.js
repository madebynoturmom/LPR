export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["default-profile.png","icons/food-delivery.svg","icons/guest-passes.svg","icons/vehicles.svg","robots.txt","uploads/admin_1758427067860.png","uploads/admin_2712dcbc-c1e2-4455-8631-be4f53277cf9_1758353036293_Screenshot 2025-09-14 001345.png","uploads/admin_A001_1758129885580_monitor.png","uploads/user_R001_1758338084444_Screenshot 2025-09-12 095649.png","uploads/user_R001_1758352367990_Screenshot 2025-09-12 095649.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.d9nQnorQ.js",app:"_app/immutable/entry/app.CcXmlKr-.js",imports:["_app/immutable/entry/start.d9nQnorQ.js","_app/immutable/chunks/DC2OQAQI.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/CoKub1NI.js","_app/immutable/chunks/DDKRNP9O.js","_app/immutable/entry/app.CcXmlKr-.js","_app/immutable/chunks/D6_VZFDO.js","_app/immutable/chunks/BDSG5-H0.js","_app/immutable/chunks/DtrBNwtL.js","_app/immutable/chunks/BHQlukOt.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/G6y-YXti.js","_app/immutable/chunks/CYxAlzJ1.js","_app/immutable/chunks/BdvQLAZU.js","_app/immutable/chunks/BkOMJDxY.js","_app/immutable/chunks/BWorSmfV.js","_app/immutable/chunks/DPinqpzW.js","_app/immutable/chunks/DDKRNP9O.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/dashboard",
				pattern: /^\/admin\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/admins",
				pattern: /^\/admin\/dashboard\/admins\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/admins/create",
				pattern: /^\/admin\/dashboard\/admins\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/events",
				pattern: /^\/admin\/dashboard\/events\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guards",
				pattern: /^\/admin\/dashboard\/guards\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guards/create",
				pattern: /^\/admin\/dashboard\/guards\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guests",
				pattern: /^\/admin\/dashboard\/guests\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guests/[id]/extend",
				pattern: /^\/admin\/dashboard\/guests\/([^/]+?)\/extend\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/admin/dashboard/guests/_id_/extend/_server.ts.js'))
			},
			{
				id: "/admin/dashboard/residents",
				pattern: /^\/admin\/dashboard\/residents\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/create",
				pattern: /^\/admin\/dashboard\/residents\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/[id]",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/[id]/delete",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/admin/dashboard/residents/_id_/delete/_server.ts.js'))
			},
			{
				id: "/admin/dashboard/residents/[id]/edit",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/settings",
				pattern: /^\/admin\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/vehicles",
				pattern: /^\/admin\/dashboard\/vehicles\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/vehicles/create",
				pattern: /^\/admin\/dashboard\/vehicles\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/api/food-delivery/create",
				pattern: /^\/api\/food-delivery\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/food-delivery/create/_server.ts.js'))
			},
			{
				id: "/api/recent-activity",
				pattern: /^\/api\/recent-activity\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/recent-activity/_server.ts.js'))
			},
			{
				id: "/guard/dashboard",
				pattern: /^\/guard\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/guard/dashboard/settings",
				pattern: /^\/guard\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/login/identify",
				pattern: /^\/login\/identify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/login/identify/_server.ts.js'))
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/user/dashboard",
				pattern: /^\/user\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/user/dashboard/food-delivery",
				pattern: /^\/user\/dashboard\/food-delivery\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/user/dashboard/food-delivery/create",
				pattern: /^\/user\/dashboard\/food-delivery\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/user/dashboard/guests",
				pattern: /^\/user\/dashboard\/guests\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/user/dashboard/guests/create",
				pattern: /^\/user\/dashboard\/guests\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/user/dashboard/history",
				pattern: /^\/user\/dashboard\/history\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/user/dashboard/profile",
				pattern: /^\/user\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles",
				pattern: /^\/user\/dashboard\/vehicles\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/create",
				pattern: /^\/user\/dashboard\/vehicles\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/[id]/delete",
				pattern: /^\/user\/dashboard\/vehicles\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/[id]/edit",
				pattern: /^\/user\/dashboard\/vehicles\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 33 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";