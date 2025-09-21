<script lang="ts">
  export let form;
  let plateNumber = '';
  let name = '';
  let phone = '';
  let visitTime = '';
  let durationMinutes = 60;
</script>

<a href="/user/dashboard" class="back-btn outside-back" aria-label="Back to dashboard">← Back to Dashboard</a>

<div class="page-container">
  <div class="page-header center-heading">
    <h2>Create Guest Pass</h2>
  </div>

  <div class="form-wrap">
    <form method="POST" class="guest-form">
  <label>
    Plate Number:
    <input name="plateNumber" bind:value={plateNumber} required />
  </label>
  <label>
    Name:
    <input name="name" bind:value={name} required />
  </label>
  <label>
    Phone:
    <input name="phone" bind:value={phone} required />
  </label>
  <label>
    Visit Time:
    <input name="visitTime" type="datetime-local" bind:value={visitTime} required />
  </label>
  <label>
    Duration (minutes):
    <input name="durationMinutes" type="number" bind:value={durationMinutes} min="10" max="480" required />
  </label>
  <button type="submit" class="btn">Create Guest Pass</button>
    </form>
  </div>
</div>

{#if form?.error}
  <div class="error">{form.error}</div>
{/if}

<style>
/* form container (card) centered on the page */
.form-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
  display: flex;
  justify-content: center;
}
.guest-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(16,24,40,0.06);
  padding: 1.25rem;
  box-sizing: border-box;
}
/* center on narrow screens and add padding so the form doesn't hug the edges */
.page-header { max-width: 760px; margin: 0 auto 1rem auto; padding: 0 1rem; display:flex; align-items:center; gap:1rem; }
.page-header h2 { margin: 0; font-size: 1.5rem; }
.page-header.center-heading { display:flex; justify-content:center; }
.back-btn { text-decoration: none; color: #111827; background:#fff; padding:0.28rem 0.6rem; border-radius:8px; border:1px solid rgba(0,0,0,0.06); box-shadow:0 1px 3px rgba(0,0,0,0.06); font-size:0.95rem; }
.back-btn:hover { background:#f8fafc; }
.back-btn.outside-back { display:inline-block; margin: 0 0 0 0.5rem; }

/* push content down so header and card are not flush with top of viewport */
.page-container {
  padding-top: 7rem; /* ~52px */
}

@media (min-width: 900px) {
  .page-container { padding-top: 4.5rem; }
}
label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #111827;
}
input[type="text"], input[type="number"], input[type="datetime-local"], input[name="phone"], input[name="name"], input[name="plateNumber"] {
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
  font-size: 1rem;
}
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59,130,246,0.08);
}
.btn {
  background: linear-gradient(180deg,#1976d2,#155fb8);
  color: #fff;
  border: 1rem;
  padding: 0.9rem 1.2rem;
  border-radius: 10px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.12s ease;
  box-shadow: 0 6px 6px rgba(21,93,184,0.12);
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(21,93,184,0.14);
}

@media (max-width: 720px) {
  .form-wrap { padding-bottom: 3rem; }
  .guest-form { max-width: 100%; padding: 1rem; }
  .btn { width: 100%; padding: 0.95rem 1rem; font-size: 1.15rem; }
}

.error {
  color: #b00;
  margin-top: 1rem;
}
</style>
