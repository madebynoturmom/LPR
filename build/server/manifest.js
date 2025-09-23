const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["admin/dashboard/subpage.css","default-profile.png","icons/add-resident.svg","icons/bolt-icon.svg","icons/food-delivery.svg","icons/guest-passes.svg","icons/house-icon.svg","icons/issue-guest.svg","icons/register-vehicle.svg","icons/system-admins.svg","icons/system-events.svg","icons/system-guards.svg","icons/system-guests.svg","icons/system-residents.svg","icons/system-vehicles.svg","icons/users-icon.svg","icons/vehicles.svg","icons/view-reports.svg","robots.txt","uploads/admin_1758427067860.png","uploads/admin_2712dcbc-c1e2-4455-8631-be4f53277cf9_1758353036293_Screenshot 2025-09-14 001345.png","uploads/admin_A001_1758129885580_monitor.png","uploads/user_R001_1758338084444_Screenshot 2025-09-12 095649.png","uploads/user_R001_1758352367990_Screenshot 2025-09-12 095649.png"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BTlSMATd.js",app:"_app/immutable/entry/app.LmqKMDZG.js",imports:["_app/immutable/entry/start.BTlSMATd.js","_app/immutable/chunks/CK-fib3O.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/tN8zdOQx.js","_app/immutable/chunks/BzyUH8j5.js","_app/immutable/entry/app.LmqKMDZG.js","_app/immutable/chunks/MgvKJ5Oe.js","_app/immutable/chunks/tNEdk8z3.js","_app/immutable/chunks/DANlTl3y.js","_app/immutable/chunks/TZ4K4ZOd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BQQlMUYl.js","_app/immutable/chunks/D5ruwRzR.js","_app/immutable/chunks/uYRH7WDe.js","_app/immutable/chunks/BVWhRRat.js","_app/immutable/chunks/BTrwRH8r.js","_app/immutable/chunks/BifvwZtI.js","_app/immutable/chunks/BIazggEA.js","_app/immutable/chunks/BzyUH8j5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D4JyX70p.js')),
			__memo(() => import('./chunks/1-BnjEHtuw.js')),
			__memo(() => import('./chunks/2-BDjBjN4L.js')),
			__memo(() => import('./chunks/3-B9BWEfuG.js')),
			__memo(() => import('./chunks/4-Pi2RAG7D.js')),
			__memo(() => import('./chunks/5-B2QL17tl.js')),
			__memo(() => import('./chunks/6-CfY0TCOb.js')),
			__memo(() => import('./chunks/7-DcxWC-zv.js')),
			__memo(() => import('./chunks/8-huknJ3Mx.js')),
			__memo(() => import('./chunks/9-BMCqDKcz.js')),
			__memo(() => import('./chunks/10-Bfw2necl.js')),
			__memo(() => import('./chunks/11-CZz25gW2.js')),
			__memo(() => import('./chunks/12-N-XWsmko.js')),
			__memo(() => import('./chunks/13-DjdPfa3b.js')),
			__memo(() => import('./chunks/14-F_3y_QHz.js')),
			__memo(() => import('./chunks/15-B4wylcJX.js')),
			__memo(() => import('./chunks/16-BGxC-7Bp.js')),
			__memo(() => import('./chunks/17-fzRz5dh2.js')),
			__memo(() => import('./chunks/18-BqIXU2-j.js')),
			__memo(() => import('./chunks/19-Bn3HglWT.js')),
			__memo(() => import('./chunks/20-PRrhraSi.js')),
			__memo(() => import('./chunks/21-0KSebZtb.js')),
			__memo(() => import('./chunks/22-BIYujeE5.js')),
			__memo(() => import('./chunks/23-010psnQ4.js')),
			__memo(() => import('./chunks/24-CWy3S691.js')),
			__memo(() => import('./chunks/25-ncBSSXXq.js')),
			__memo(() => import('./chunks/26-BlVOTS12.js')),
			__memo(() => import('./chunks/27-AVI-e7Ja.js')),
			__memo(() => import('./chunks/28-4uQ5gool.js')),
			__memo(() => import('./chunks/29-g6V78RRB.js')),
			__memo(() => import('./chunks/30-lvi4iIHE.js')),
			__memo(() => import('./chunks/31-B27wl8jO.js')),
			__memo(() => import('./chunks/32-CzYfqwsr.js')),
			__memo(() => import('./chunks/33-B8H8LXgF.js')),
			__memo(() => import('./chunks/34-C6bR_CFX.js')),
			__memo(() => import('./chunks/35-wTTdvsry.js')),
			__memo(() => import('./chunks/36-CvbZMhVb.js')),
			__memo(() => import('./chunks/37-BjxSxpi0.js')),
			__memo(() => import('./chunks/38-BL7OAbRU.js')),
			__memo(() => import('./chunks/39-ChM-BBCS.js'))
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
				endpoint: __memo(() => import('./chunks/_server.ts-DE6SMAPz.js'))
			},
			{
				id: "/admin/dashboard/manage",
				pattern: /^\/admin\/dashboard\/manage\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/manage/system-overview",
				pattern: /^\/admin\/dashboard\/manage\/system-overview\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents",
				pattern: /^\/admin\/dashboard\/residents\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/create",
				pattern: /^\/admin\/dashboard\/residents\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/[id]",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/residents/[id]/delete",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CfaI_kIg.js'))
			},
			{
				id: "/admin/dashboard/residents/[id]/edit",
				pattern: /^\/admin\/dashboard\/residents\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/settings",
				pattern: /^\/admin\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/vehicles",
				pattern: /^\/admin\/dashboard\/vehicles\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/admin/dashboard/vehicles/create",
				pattern: /^\/admin\/dashboard\/vehicles\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/api/food-delivery/create",
				pattern: /^\/api\/food-delivery\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CPpjTXI5.js'))
			},
			{
				id: "/api/recent-activity",
				pattern: /^\/api\/recent-activity\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C5QdzrxI.js'))
			},
			{
				id: "/guard/dashboard",
				pattern: /^\/guard\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/guard/dashboard/settings",
				pattern: /^\/guard\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/login/identify",
				pattern: /^\/login\/identify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DdN5xj7R.js'))
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/theme-test",
				pattern: /^\/theme-test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/user/dashboard",
				pattern: /^\/user\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/user/dashboard/food-delivery",
				pattern: /^\/user\/dashboard\/food-delivery\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/user/dashboard/food-delivery/create",
				pattern: /^\/user\/dashboard\/food-delivery\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/user/dashboard/guests",
				pattern: /^\/user\/dashboard\/guests\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/user/dashboard/guests/create",
				pattern: /^\/user\/dashboard\/guests\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/user/dashboard/history",
				pattern: /^\/user\/dashboard\/history\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/user/dashboard/manage",
				pattern: /^\/user\/dashboard\/manage\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/user/dashboard/manage/system-overview",
				pattern: /^\/user\/dashboard\/manage\/system-overview\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/user/dashboard/profile",
				pattern: /^\/user\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles",
				pattern: /^\/user\/dashboard\/vehicles\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/create",
				pattern: /^\/user\/dashboard\/vehicles\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/[id]/delete",
				pattern: /^\/user\/dashboard\/vehicles\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/user/dashboard/vehicles/[id]/edit",
				pattern: /^\/user\/dashboard\/vehicles\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 38 },
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
