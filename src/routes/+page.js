// ============================================
// PARTIE 13 - TP : Async / Data Loading
// ============================================
// Documentation :
//   https://svelte.dev/docs/kit/load
//   https://svelte.dev/docs/kit/load#Using-URL-data-fetch

// TODO 2 : Exporter une fonction load({ fetch }) qui :
//   - Fait un fetch vers '/api/transactions'
//   - Vérifie que la réponse est OK (sinon throw error)
//   - Parse le JSON et retourne { transactions }
//
//   export const load = async ({ fetch }) => {
//       const response = await fetch('/api/transactions');
//
//       if (!response.ok) {
//           throw new Error('Impossible de charger les transactions');
//       }
//
//       const transactions = await response.json();
//       return { transactions };
//   };
