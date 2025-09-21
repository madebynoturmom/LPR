
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/dashboard" | "/admin/dashboard/admins" | "/admin/dashboard/admins/create" | "/admin/dashboard/events" | "/admin/dashboard/food-delivery" | "/admin/dashboard/guards" | "/admin/dashboard/guards/create" | "/admin/dashboard/guests" | "/admin/dashboard/guests/[id]" | "/admin/dashboard/guests/[id]/extend" | "/admin/dashboard/profile" | "/admin/dashboard/residents" | "/admin/dashboard/residents/create" | "/admin/dashboard/residents/[id]" | "/admin/dashboard/residents/[id]/delete" | "/admin/dashboard/residents/[id]/edit" | "/admin/dashboard/settings" | "/admin/dashboard/vehicles" | "/admin/dashboard/vehicles/create" | "/api" | "/api/food-delivery" | "/api/food-delivery/create" | "/api/recent-activity" | "/guard" | "/guard/dashboard" | "/guard/dashboard/settings" | "/login" | "/login/identify" | "/logout" | "/user" | "/user/dashboard" | "/user/dashboard/food-delivery" | "/user/dashboard/food-delivery/create" | "/user/dashboard/guests" | "/user/dashboard/guests/create" | "/user/dashboard/history" | "/user/dashboard/profile" | "/user/dashboard/vehicles" | "/user/dashboard/vehicles/create" | "/user/dashboard/vehicles/[id]" | "/user/dashboard/vehicles/[id]/delete" | "/user/dashboard/vehicles/[id]/edit";
		RouteParams(): {
			"/admin/dashboard/guests/[id]": { id: string };
			"/admin/dashboard/guests/[id]/extend": { id: string };
			"/admin/dashboard/residents/[id]": { id: string };
			"/admin/dashboard/residents/[id]/delete": { id: string };
			"/admin/dashboard/residents/[id]/edit": { id: string };
			"/user/dashboard/vehicles/[id]": { id: string };
			"/user/dashboard/vehicles/[id]/delete": { id: string };
			"/user/dashboard/vehicles/[id]/edit": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/admin": { id?: string };
			"/admin/dashboard": { id?: string };
			"/admin/dashboard/admins": Record<string, never>;
			"/admin/dashboard/admins/create": Record<string, never>;
			"/admin/dashboard/events": Record<string, never>;
			"/admin/dashboard/food-delivery": Record<string, never>;
			"/admin/dashboard/guards": Record<string, never>;
			"/admin/dashboard/guards/create": Record<string, never>;
			"/admin/dashboard/guests": { id?: string };
			"/admin/dashboard/guests/[id]": { id: string };
			"/admin/dashboard/guests/[id]/extend": { id: string };
			"/admin/dashboard/profile": Record<string, never>;
			"/admin/dashboard/residents": { id?: string };
			"/admin/dashboard/residents/create": Record<string, never>;
			"/admin/dashboard/residents/[id]": { id: string };
			"/admin/dashboard/residents/[id]/delete": { id: string };
			"/admin/dashboard/residents/[id]/edit": { id: string };
			"/admin/dashboard/settings": Record<string, never>;
			"/admin/dashboard/vehicles": Record<string, never>;
			"/admin/dashboard/vehicles/create": Record<string, never>;
			"/api": Record<string, never>;
			"/api/food-delivery": Record<string, never>;
			"/api/food-delivery/create": Record<string, never>;
			"/api/recent-activity": Record<string, never>;
			"/guard": Record<string, never>;
			"/guard/dashboard": Record<string, never>;
			"/guard/dashboard/settings": Record<string, never>;
			"/login": Record<string, never>;
			"/login/identify": Record<string, never>;
			"/logout": Record<string, never>;
			"/user": { id?: string };
			"/user/dashboard": { id?: string };
			"/user/dashboard/food-delivery": Record<string, never>;
			"/user/dashboard/food-delivery/create": Record<string, never>;
			"/user/dashboard/guests": Record<string, never>;
			"/user/dashboard/guests/create": Record<string, never>;
			"/user/dashboard/history": Record<string, never>;
			"/user/dashboard/profile": Record<string, never>;
			"/user/dashboard/vehicles": { id?: string };
			"/user/dashboard/vehicles/create": Record<string, never>;
			"/user/dashboard/vehicles/[id]": { id: string };
			"/user/dashboard/vehicles/[id]/delete": { id: string };
			"/user/dashboard/vehicles/[id]/edit": { id: string }
		};
		Pathname(): "/" | "/admin" | "/admin/" | "/admin/dashboard" | "/admin/dashboard/" | "/admin/dashboard/admins" | "/admin/dashboard/admins/" | "/admin/dashboard/admins/create" | "/admin/dashboard/admins/create/" | "/admin/dashboard/events" | "/admin/dashboard/events/" | "/admin/dashboard/food-delivery" | "/admin/dashboard/food-delivery/" | "/admin/dashboard/guards" | "/admin/dashboard/guards/" | "/admin/dashboard/guards/create" | "/admin/dashboard/guards/create/" | "/admin/dashboard/guests" | "/admin/dashboard/guests/" | `/admin/dashboard/guests/${string}` & {} | `/admin/dashboard/guests/${string}/` & {} | `/admin/dashboard/guests/${string}/extend` & {} | `/admin/dashboard/guests/${string}/extend/` & {} | "/admin/dashboard/profile" | "/admin/dashboard/profile/" | "/admin/dashboard/residents" | "/admin/dashboard/residents/" | "/admin/dashboard/residents/create" | "/admin/dashboard/residents/create/" | `/admin/dashboard/residents/${string}` & {} | `/admin/dashboard/residents/${string}/` & {} | `/admin/dashboard/residents/${string}/delete` & {} | `/admin/dashboard/residents/${string}/delete/` & {} | `/admin/dashboard/residents/${string}/edit` & {} | `/admin/dashboard/residents/${string}/edit/` & {} | "/admin/dashboard/settings" | "/admin/dashboard/settings/" | "/admin/dashboard/vehicles" | "/admin/dashboard/vehicles/" | "/admin/dashboard/vehicles/create" | "/admin/dashboard/vehicles/create/" | "/api" | "/api/" | "/api/food-delivery" | "/api/food-delivery/" | "/api/food-delivery/create" | "/api/food-delivery/create/" | "/api/recent-activity" | "/api/recent-activity/" | "/guard" | "/guard/" | "/guard/dashboard" | "/guard/dashboard/" | "/guard/dashboard/settings" | "/guard/dashboard/settings/" | "/login" | "/login/" | "/login/identify" | "/login/identify/" | "/logout" | "/logout/" | "/user" | "/user/" | "/user/dashboard" | "/user/dashboard/" | "/user/dashboard/food-delivery" | "/user/dashboard/food-delivery/" | "/user/dashboard/food-delivery/create" | "/user/dashboard/food-delivery/create/" | "/user/dashboard/guests" | "/user/dashboard/guests/" | "/user/dashboard/guests/create" | "/user/dashboard/guests/create/" | "/user/dashboard/history" | "/user/dashboard/history/" | "/user/dashboard/profile" | "/user/dashboard/profile/" | "/user/dashboard/vehicles" | "/user/dashboard/vehicles/" | "/user/dashboard/vehicles/create" | "/user/dashboard/vehicles/create/" | `/user/dashboard/vehicles/${string}` & {} | `/user/dashboard/vehicles/${string}/` & {} | `/user/dashboard/vehicles/${string}/delete` & {} | `/user/dashboard/vehicles/${string}/delete/` & {} | `/user/dashboard/vehicles/${string}/edit` & {} | `/user/dashboard/vehicles/${string}/edit/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/default-profile.png" | "/icons/food-delivery.svg" | "/icons/guest-passes.svg" | "/icons/vehicles.svg" | "/robots.txt" | "/uploads/admin_2712dcbc-c1e2-4455-8631-be4f53277cf9_1758353036293_Screenshot 2025-09-14 001345.png" | "/uploads/admin_A001_1758129885580_monitor.png" | "/uploads/user_R001_1758338084444_Screenshot 2025-09-12 095649.png" | "/uploads/user_R001_1758352367990_Screenshot 2025-09-12 095649.png" | string & {};
	}
}