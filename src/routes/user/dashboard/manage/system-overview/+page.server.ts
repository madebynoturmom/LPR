// Re-export or proxy the existing load logic from the parent dashboard route
import { load as dashboardLoad } from '../../+page.server';

export const load = async (event) => {
  // call the dashboard load to get recentActivity and passes
  const data = await dashboardLoad(event as any);
  return data;
};
