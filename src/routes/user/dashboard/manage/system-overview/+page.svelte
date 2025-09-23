<script lang="ts">
  import type { GuestPass } from '$lib/server/db/schema';
  export let data: {
    recentActivity: {
      activeGuestPasses: number;
      activeFoodDeliveryPasses: number;
      recentCarAccess: string;
    };
    activeGuestPasses: GuestPass[];
    activeFoodDeliveryPasses: GuestPass[];
  };

  export let recentActivity = data.recentActivity;
  export let activeGuestPasses = data.activeGuestPasses;
  export let activeFoodDeliveryPasses = data.activeFoodDeliveryPasses;

  import { slide } from 'svelte/transition';
  let expandedPasses: Set<number | string> = new Set();
  function togglePass(id: number | string) {
    if (expandedPasses.has(id)) {
      expandedPasses.delete(id);
      expandedPasses = new Set(expandedPasses);
    } else {
      expandedPasses.add(id);
      expandedPasses = new Set(expandedPasses);
    }
  }
  const isExpanded = (id: number | string) => expandedPasses.has(id);
</script>

<div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
  <a href="/user/dashboard/manage" style="text-decoration:none; color:#175cd3;">← Manage</a>
  <h2 style="margin:0;">System Overview</h2>
</div>

<div class="recent-activity-card">
  <h3>Recent Activity</h3>
  <ul>
    <li><strong>Active Guest Passes:</strong> {recentActivity.activeGuestPasses}</li>
    <li><strong>Active Food Delivery Passes:</strong> {recentActivity.activeFoodDeliveryPasses}</li>
    <li><strong>Recent Car Access:</strong> {recentActivity.recentCarAccess}</li>
  </ul>
</div>

{#if activeGuestPasses.length > 0}
  <div class="active-passes-card">
    <h3>Your Active Guest Passes</h3>
    <div class="passes-list">
      {#each activeGuestPasses as pass}
        <div class="pass-item" on:click={() => togglePass(pass.id)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && togglePass(pass.id)} aria-expanded={isExpanded(pass.id)}>
          <div class="pass-summary">
            <div class="pass-plate"><strong>{pass.plateNumber}</strong></div>
            <div class="pass-meta">{pass.name ? pass.name : ''}</div>
          </div>
          {#if isExpanded(pass.id)}
            <div class="pass-details" transition:slide={{ duration: 180 }}>
              {#if pass.name}
                <div class="pass-detail">Name: {pass.name}</div>
              {/if}
              {#if pass.phone}
                <div class="pass-detail">Phone: {pass.phone}</div>
              {/if}
              <div class="pass-detail">Visit: {new Date(pass.visitTime).toLocaleString()}</div>
              <div class="pass-detail">Duration: {pass.durationMinutes} minutes</div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

{#if activeFoodDeliveryPasses.length > 0}
  <div class="active-passes-card">
    <h3>Your Active Food Delivery Passes</h3>
    <div class="passes-list">
      {#each activeFoodDeliveryPasses as pass}
        <div class="pass-item" on:click={() => togglePass(pass.id)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && togglePass(pass.id)} aria-expanded={isExpanded(pass.id)}>
          <div class="pass-summary">
            <div class="pass-plate"><strong>{pass.plateNumber}</strong></div>
            <div class="pass-meta">{pass.name ? pass.name : ''}</div>
          </div>
          {#if isExpanded(pass.id)}
            <div class="pass-details" transition:slide={{ duration: 180 }}>
              {#if pass.name}
                <div class="pass-detail">Name: {pass.name}</div>
              {/if}
              {#if pass.phone}
                <div class="pass-detail">Phone: {pass.phone}</div>
              {/if}
              <div class="pass-detail">Visit: {new Date(pass.visitTime).toLocaleString()}</div>
              <div class="pass-detail">Duration: {pass.durationMinutes} minutes</div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  h2 { font-size:1.25rem; margin: 0 0 0.75rem 0; }
  .recent-activity-card { margin-bottom:1rem; }
  /* reuse pass styles from dashboard page: they will be scoped here too */
  .active-passes-card { background: #fff; border-radius: 12px; padding: 1rem; margin-bottom: 1rem; }
  .passes-list { display:flex; flex-direction:column; gap:0.5rem; }
  .pass-item { background:#f8f9fa; padding:0.75rem; border-radius:8px; }
  .pass-details { margin-top:0.5rem; }
</style>
