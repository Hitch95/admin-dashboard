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
| 06     | Shadcn               | `part-06-shadcn-tp`                | `part-06-shadcn-solution`                |
| 07     | Slots                | `part-07-slots-tp`                 | -                                        |
| 08     | Table Actions        | -                                  | `part-08-table-actions-solution`         |
| 09     | Store Writable       | `part-09-store-writable-tp`        | `part-09-store-writable-solution`        |
| 10     | Store Derived        | `part-10-store-derived-tp`         | `part-10-store-derived-solution`         |
| 11     | Custom Store         | `part-11-custom-store-tp`          | `part-11-custom-store-solution`          |
| 12     | Context API          | `part-12-context-api-tp`           | `part-12-context-api-solution`           |
| 13     | Lifecycle            | `part-13-lifecycle-tp`             | `part-13-lifecycle-solution`             |
| 14     | Async                | `part-14-async-tp`                 | `part-14-async-solution`                 |
| 15     | Forms Dialog         | `part-15-forms-dialog-tp`          | `part-15-forms-dialog-solution`          |
| 16     | Async (Suite)        | `part-16-async-tp`                 | `part-16-async-solution`                 |
| 17     | Forms Dialog (Suite) | `part-17-forms-dialog-tp`          | `part-17-forms-dialog-solution`          |
| 18     | Progress Card        | `part-18-exercise-progresscard-tp` | `part-18-exercise-progresscard-solution` |
| 19     | Theme                | `part-19-exercise-theme-tp`        | `part-19-exercise-theme-solution`        |

_(Utilisez `git branch -a` pour voir toutes les branches disponibles si certaines manquent ici)_

---

## 🔗 Ressources utiles

- 📖 [Documentation Svelte 5 (Runes)](https://svelte.dev/docs)
- 🚀 [Apprendre SvelteKit](https://kit.svelte.dev/docs)
- 🎨 [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- 🧩 [Shadcn Svelte Components](https://shadcn-svelte.com/)
- 🛠️ [Lucide Icons Guide](https://lucide.dev/guide/packages/lucide-svelte)
