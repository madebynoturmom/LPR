// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async () => {
  throw redirect(307, '/login');
};
;null as any as PageServerLoad;