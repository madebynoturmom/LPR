const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["default-profile.png","icons/food-delivery.svg","icons/guest-passes.svg","icons/vehicles.svg","robots.txt","uploads/admin_A001_1758129885580_monitor.png","uploads/user_R001_1758338084444_Screenshot 2025-09-12 095649.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.B02hA6XT.js",app:"_app/immutable/entry/app.CAd1uUbG.js",imports:["_app/immutable/entry/start.B02hA6XT.js","_app/immutable/chunks/DioV78hU.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/DC2F6t9P.js","_app/immutable/chunks/BduCYZtS.js","_app/immutable/entry/app.CAd1uUbG.js","_app/immutable/chunks/VJxR2mP4.js","_app/immutable/chunks/Ci8WC3vH.js","_app/immutable/chunks/Ce3f-6Km.js","_app/immutable/chunks/c4-in-zz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/-kgmExda.js","_app/immutable/chunks/Cdivgpra.js","_app/immutable/chunks/tQRZQKdW.js","_app/immutable/chunks/DQqwweIW.js","_app/immutable/chunks/CeacdKOn.js","_app/immutable/chunks/CaHHrb2w.js","_app/immutable/chunks/BduCYZtS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-rIIeMFhx.js')),
			__memo(() => import('./chunks/1-DZiZ5j6T.js')),
			__memo(() => import('./chunks/2-zJ-34NWY.js')),
			__memo(() => import('./chunks/3-Cm376toH.js')),
			__memo(() => import('./chunks/4-CYKfGIjc.js')),
			__memo(() => import('./chunks/5-BRdI_B0c.js')),
			__memo(() => import('./chunks/6-CvXvfgt9.js')),
			__memo(() => import('./chunks/7-K11FOWOv.js')),
			__memo(() => import('./chunks/8-Blx0qeq9.js')),
			__memo(() => import('./chunks/9-D7YnItL4.js')),
			__memo(() => import('./chunks/10-DqgS-_C7.js')),
			__memo(() => import('./chunks/11-CKtt994K.js')),
			__memo(() => import('./chunks/12-CplDezUD.js')),
			__memo(() => import('./chunks/13-C4hURlff.js')),
			__memo(() => import('./chunks/14-DY2QkulB.js')),
			__memo(() => import('./chunks/15-9-WMcDeI.js')),
			__memo(() => import('./chunks/16-DhTqPrOk.js')),
			__memo(() => import('./chunks/17-DpiwoQRN.js')),
			__memo(() => import('./chunks/18-BbfbHvsV.js')),
			__memo(() => import('./chunks/19-DUKN58v4.js')),
			__memo(() => import('./chunks/20-odyU0mX4.js')),
			__memo(() => import('./chunks/21-D_3tHNqN.js')),
			__memo(() => import('./chunks/22-Cu0oMSWk.js')),
			__memo(() => import('./chunks/23-3tgerU6f.js')),
			__memo(() => import('./chunks/24-CgCNKQ_8.js')),
			__memo(() => import('./chunks/25-CnjO4Lhz.js')),
			__memo(() => import('./chunks/26-e8ULmGL0.js')),
			__memo(() => import('./chunks/27-CYerPyzZ.js')),
			__memo(() => import('./chunks/28-B344v2rx.js')),
			__memo(() => import('./chunks/29-4lKcogtn.js')),
			__memo(() => import('./chunks/30-BJEb1BeV.js')),
			__memo(() => import('./chunks/31-Bf3NdJXS.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/dashboard",
				pattern: /^\/admin\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/admins",
				pattern: /^\/admin\/dashboard\/admins\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/admins/create",
				pattern: /^\/admin\/dashboard\/admins\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/events",
				pattern: /^\/admin\/dashboard\/events\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guards",
				pattern: /^\/admin\/dashboard\/guards\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guards/create",
				pattern: /^\/admin\/dashboard\/guards\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/guests",
				pattern: /^\/admin\/dashboard\/guests\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents",
				pattern: /^\/admin\/dashboard\/residents\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/create",
				pattern: /^\/admin\/dashboard\/residents\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/[id]",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/[id]/delete",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C7OO2lJw.js'))
			},
			{
				id: "/admin/dashboard/residents/[id]/edit",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/settings",
				pattern: /^\/admin\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/vehicles",
				pattern: /^\/admin\/dashboard\/vehicles\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/vehicles/create",
				pattern: /^\/admin\/dashboard\/vehicles\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/api/food-delivery/create",
				pattern: /^\/api\/food-delivery\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-I230rFdd.js'))
			},
			{
				id: "/api/recent-activity",
				pattern: /^\/api\/recent-activity\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BxdaFdve.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/user/dashboard",
				pattern: /^\/user\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/user/dashboard/food-delivery",
				pattern: /^\/user\/dashboard\/food-delivery\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/user/dashboard/food-delivery/create",
				pattern: /^\/user\/dashboard\/food-delivery\/create\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/user/dashboard/guests",
				pattern: /^\/user\/dashboard\/guests\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/user/dashboard/guests/create",
				pattern: /^\/user\/dashboard\/guests\/create\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/user/dashboard/history",
				pattern: /^\/user\/dashboard\/history\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/user/dashboard/profile",
				pattern: /^\/user\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles",
				pattern: /^\/user\/dashboard\/vehicles\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/create",
				pattern: /^\/user\/dashboard\/vehicles\/create\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/[id]/delete",
				pattern: /^\/user\/dashboard\/vehicles\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/[id]/edit",
				pattern: /^\/user\/dashboard\/vehicles\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 30 },
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

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
