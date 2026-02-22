// ============================================
// PARTIE 13 - TP : Async / API Routes
// ============================================
// Documentation :
//   https://svelte.dev/docs/kit/routing#server
//   https://svelte.dev/docs/kit/$app-fetch

// TODO 1 : Créer un endpoint GET qui retourne les transactions en JSON
//
//   import { json } from '@sveltejs/kit';
//   import { transactions } from '$lib/data/mock.js';
//
//   export async function GET() {
//       // Simuler un délai réseau de 800ms
//       await new Promise((resolve) => setTimeout(resolve, 800));
//
//       return json(transactions);
//   }
