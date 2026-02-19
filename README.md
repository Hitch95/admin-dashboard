# Dashboard Svelte - Projet fil rouge

Bienvenue dans le dépôt du projet fil rouge de votre formation Svelte sur Moodle.
Ce projet contient l'ensemble des exercices pour construire, étape par étape, un tableau de bord complet.

## 🛠️ Stack Technique

- **Framework** : Svelte 5 (Runes)
- **Meta-framework** : SvelteKit 2
- **Style** : Tailwind CSS 4
- **Composants** : Shadcn UI (Bits UI)
- **Icônes** : Lucide Svelte

## 📋 Prérequis

- **Node.js** : Version 18 ou supérieure recommandée.
- **Package Manager** : [pnpm](https://pnpm.io/) (recommandé).

## 🚀 Installation et Utilisation

### 1. Installation

```sh
pnpm install # (ou "yarn" ou "npm" si vous le souhaitez, nous utiliserons le package manager "pnpm" ici)
```

### 2. Développement (Serveur local)

Lancez le serveur de développement avec rechargement à chaud (Hot Module Replacement) :

```sh
pnpm run dev
```

### 3. Build (Production)

Pour compiler l'application pour la production :

```sh
pnpm run build
```

### 4. Aperçu (Preview)

Pour tester le build de production localement :

```sh
pnpm run preview
```

## ✨ Qualité du Code

Gardez votre code propre et sans erreurs :

```sh
# Formater tout le projet (Prettier)
pnpm run format

# Vérifier les erreurs (Linting)
pnpm run lint
```

## 📚 Fonctionnement des exercices

Ce dépôt utilise un système de branches Git pour gérer la progression.
Pour chaque module de la formation, vous trouverez généralement deux branches :

1. **`...-tp`** : C'est votre point de départ. Elle contient le code initial de l'exercice.
2. **`...-solution`** : C'est la correction. Si vous êtes bloqué ou souhaitez vérifier votre résultat, vous pouvez consulter cette branche.

### Comment changer d'exercice

Utilisez la commande `git checkout` pour basculer d'une leçon à l'autre.

**Exemple pour l'exercice sur les conditions (Partie 03) :**

```sh
# 1. Se placer sur l'exercice (TP)
git checkout part-03-conditional-tp

# ... faites vos modifications ...

# 2. Voir la solution (si besoin)
git checkout part-03-conditional-solution
```

> **⚠️ Important :** Avant de changer de branche, assurez-vous de sauvegarder votre travail (commit ou stash), sinon vos modifications pourraient être perdues ou entrer en conflit avec la nouvelle branche.

## 🗂️ Liste des exercices

| Partie | Sujet                | Branche de départ (TP)             | Branche Solution                         |
| :----- | :------------------- | :--------------------------------- | :--------------------------------------- |
| 02     | Reactivity           | -                                  | `part-02-reactivity-solution`            |
| 03     | Conditionals         | `part-03-conditional-tp`           | `part-03-conditional-solution`           |
| 04     | Each Loop            | `part-04-each-loop-tp`             | `part-04-each-loop-solution`             |
| 05     | Props                | `part-05-props-tp`                 | `part-05-props-solution`                 |
| 06     | Slots                | `part-06-slots-tp`                 | `part-06-slots-solution`                 |
| 07     | Table Actions        | `part-07-table-actions-tp`         | `part-07-table-actions-solution`         |
| 08     | Store Writable       | `part-08-store-writable-tp`        | `part-08-store-writable-solution`        |
| 09     | Store Derived        | `part-09-store-derived-tp`         | `part-09-store-derived-solution`         |
| 10     | Custom Store         | `part-10-custom-store-tp`          | `part-10-custom-store-solution`          |
| 11     | Context API          | `part-11-context-api-tp`           | `part-11-context-api-solution`           |
| 12     | Lifecycle            | `part-12-lifecycle-tp`             | `part-12-lifecycle-solution`             |
| 13     | Async                | `part-13-async-tp`                 | `part-13-async-solution`                 |
| 14     | Forms Dialog         | `part-14-forms-dialog-tp`          | `part-14-forms-dialog-solution`          |
| 15     | Async (Suite)        | `part-15-async-tp`                 | `part-15-async-solution`                 |
| 16     | Forms Dialog (Suite) | `part-16-forms-dialog-tp`          | `part-16-forms-dialog-solution`          |
| 17     | Progress Card        | `part-17-exercise-progresscard-tp` | `part-17-exercise-progresscard-solution` |
| 18     | Theme                | `part-18-exercise-theme-tp`        | `part-18-exercise-theme-solution`        |

_(Utilisez `git branch -a` pour voir toutes les branches disponibles si certaines manquent ici)_

---

## 🔗 Ressources utiles

- 📖 [Documentation Svelte 5 (Runes)](https://svelte.dev/docs)
- 🚀 [Apprendre SvelteKit](https://kit.svelte.dev/docs)
- 🎨 [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- 🧩 [Shadcn Svelte Components](https://shadcn-svelte.com/)
- 🛠️ [Lucide Icons Guide](https://lucide.dev/guide/packages/lucide-svelte)
