// ============================================
// PARTIE 13 - SOLUTION : Async / Custom Store
// ============================================

import { writable, derived } from 'svelte/store';
import { transactions as initialTransactions } from '$lib/data/mock.js';

function createTransactionsStore() {
	const { subscribe, set, update } = writable([...initialTransactions]);

	return {
		subscribe,

		init(data) {
			set([...data]);
		},

		add(payload) {
			const newTx = {
				id: Date.now(),
				date: new Date().toISOString().slice(0, 10),
				...payload
			};
			update((list) => [newTx, ...list]);
		},

		remove(id) {
			update((list) => list.filter((t) => t.id !== id));
		},

		reset() {
			set([...initialTransactions]);
		}
	};
}

export const transactions = createTransactionsStore();

export const searchQuery = writable('');
export const statusFilter = writable('all');

export const filteredTransactions = derived(
	[transactions, searchQuery, statusFilter],
	([$transactions, $searchQuery, $statusFilter]) => {
		const q = $searchQuery.trim().toLowerCase();

		return $transactions.filter((t) => {
			const matchesSearch =
				!q || t.customer.toLowerCase().includes(q) || t.email.toLowerCase().includes(q);

			const matchesStatus = $statusFilter === 'all' || t.status === $statusFilter;

			return matchesSearch && matchesStatus;
		});
	}
);
