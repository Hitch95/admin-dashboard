// ============================================
// PARTIE 15 - TP : Async (Suite) / POST API
// ============================================

import { json } from '@sveltejs/kit';
import { transactions } from '$lib/data/mock.js';

export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, 800));
	return json(transactions);
}

// TODO 1 : Ajouter un handler POST à côté du GET existant
//   Penser à ajouter "error" à l'import : import { json, error } from '@sveltejs/kit';
//   - Lit le body avec await request.json()
//   - Simule un délai réseau (300ms)
//   - Simule un taux d'échec aléatoire (20%) → throw error(500, "Erreur serveur")
//   - Retourne la transaction créée avec json(newTx, { status: 201 })
//
//   export async function POST({ request }) {
//       const body = await request.json();
//       await new Promise((resolve) => setTimeout(resolve, 300));
//
//       if (Math.random() < 0.2) {
//           throw error(500, "Erreur serveur simulée");
//       }
//
//       const newTx = {
//           id: Date.now(),
//           date: new Date().toISOString().slice(0, 10),
//           ...body
//       };
//
//       return json(newTx, { status: 201 });
//   }

