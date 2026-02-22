// ============================================
// PARTIE 10 - TP : Custom Store
// ============================================
// Un custom store = une fonction factory qui retourne { subscribe, ...methods }
// On encapsule writable() pour exposer uniquement ce qu'on veut.
//
// Pattern :
//   function createMyStore() {
//     const { subscribe, set, update } = writable(initialValue);
//     return { subscribe, myAction: () => update(...) };
//   }
//
// Avantage : l'extérieur ne peut PAS appeler .set() directement.
// L'API est claire et intentionnelle.
//
// Documentation : https://svelte.dev/docs/svelte/stores#Custom-stores

import { writable, derived } from 'svelte/store';
import { transactions as initialTransactions } from '$lib/data/mock.js';

// TODO 1 : Créer une fonction createTransactionsStore() qui :
//   - Crée un writable(initialTransactions) en interne
//   - Retourne un objet avec :
//
//     subscribe   → obligatoire pour que $store fonctionne
//
//     add(payload) → ajoute une transaction en tête de liste :
//       id: Date.now(), date: new Date().toISOString().slice(0, 10), ...payload
//       Utiliser update()
//
//     remove(id) → filtre la transaction dont l'id correspond
//       Utiliser update()
//
//     reset() → remet la liste à initialTransactions
//       Utiliser set()

// Version temporaire (à remplacer par le custom store) :
export const transactions = writable(initialTransactions);

// TODO 2 : Créer deux stores writable :
// - searchQuery (défaut '')
// - statusFilter (défaut 'all')

// TODO 3 : Créer un store derived "filteredTransactions"
// à partir de [transactions, searchQuery, statusFilter]
// Règles :
//   - searchQuery : customer OU email inclut la query (insensible à la casse)
//   - statusFilter : si 'all' → tout garder, sinon filtrer par t.status
