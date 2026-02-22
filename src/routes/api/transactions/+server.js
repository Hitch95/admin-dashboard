// ============================================
// PARTIE 15 - SOLUTION : Async (Suite) / POST API
// ============================================

import { json, error } from '@sveltejs/kit';
import { transactions } from '$lib/data/mock.js';

export const GET = async () => {
	await new Promise((resolve) => setTimeout(resolve, 800));
	return json(transactions);
};

export const POST = async ({ request }) => {
	const body = await request.json();
	await new Promise((resolve) => setTimeout(resolve, 300));

	if (Math.random() < 0.2) {
		throw error(500, 'Erreur serveur simulée');
	}

	const newTx = {
		id: Date.now(),
		date: new Date().toISOString().slice(0, 10),
		...body
	};

	return json(newTx, { status: 201 });
}

