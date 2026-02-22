// ============================================
// PARTIE 13 - SOLUTION : Async / Data Loading
// ============================================

export const load = async ({ fetch }) => {
	const response = await fetch('/api/transactions');

	if (!response.ok) {
		throw new Error('Impossible de charger les transactions');
	}

	const transactions = await response.json();
	return { transactions };
};
