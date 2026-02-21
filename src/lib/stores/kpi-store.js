// ============================================
// PARTIE 8 - TP : Store Writable
// ============================================
// Un store writable expose :
//   - subscribe() → rend le composant réactif (via $store)
//   - set(value)  → remplacer la valeur
//   - update(fn)  → modifier la valeur à partir de l'actuelle

import { writable } from 'svelte/store';
import initialKpiCards from '$lib/data/kpi-cards.json';

// TODO 1: Créer deux stores writable :
// - kpis : initialisé avec initialKpiCards
// - kpiLoading : initialisé à false

// TODO 2: Créer et exporter une fonction async refreshKpis() qui :
// 1. Met kpiLoading à true (avec .set())
// 2. Attend 1 seconde (simuler un appel API)
// 3. Met à jour chaque card (avec .update()) :
//    → previousValue = ancienne value
//    → value = value * (0.9 + Math.random() * 0.2)
// 4. Met kpiLoading à false
