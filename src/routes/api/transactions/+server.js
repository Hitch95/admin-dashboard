// ============================================
// PARTIE 13 - SOLUTION : Async / API Routes
// ============================================

import { json } from '@sveltejs/kit';
import { transactions } from '$lib/data/mock.js';

export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, 800));
	return json(transactions);
}
