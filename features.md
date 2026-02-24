<<<<<<< HEAD
# Parcours ATM de base (MVP)

## Sommaire

- [1) Parcours utilisateur](#1-parcours-utilisateur)
- [2) Gestion des billets](#2-gestion-des-billets)

---

## 1) Parcours utilisateur

### Écran d’accueil

- Écran d’accueil + choix de langue (FR/EN/NL par ex.)

### Insertion de carte

- Insertion de carte virtuelle (sélection d’un “profil carte”)

### Authentification

- Authentification par PIN
- 3 essais max, blocage temporaire
- Boutons :
  - **Effacer**
  - **Corriger**
  - **Annuler**

### Menu principal

- Retrait
- Dépôt
- Solde
- Historique

### Retrait

- Montants rapides (20/50/100…) + montant libre
- Contrôles :
  - Contrôle solde insuffisant
  - Contrôle “ATM n’a pas assez de billets”
- Sortie :
  - Affichage solde + mini-reçu (imprimable en PDF/HTML)

---

## 2) Gestion des billets

### Stock de billets côté ATM

- Gestion du stock de billets : 5 / 10 / 20 / 50 / 100

### Distribution / rendu monnaie

- Algorithme de rendu monnaie / distribution
- Exemple :
  - “Donne-moi **130€**” → 100 + 20 + 10 si dispo, sinon autre combinaison
- Cas d’échec :
  - Échec si combinaison impossible

### Modes spéciaux

- Mode “panne” :
  - Plus de billets de 20 → impact sur retraits
=======
# Énoncé — ATM virtuel (Angular / TypeScript)

## 1) Modèles de données à créer

### 1.1 Card

Créer un objet `Card` avec les propriétés suivantes :

- `cardnumber`
- `pin`
- `balance`
- `type` : `visa` | `mastercard` | `autre`
- `bank` : `belfius` | `ing` | `revolut`

---

### 1.2 Customer

Créer un objet `Customer` avec les propriétés suivantes :

- `firstname`
- `lastname`
- `gender`
- `birthdate`
- `address`
- `cards` : tableau de `Card`

---

## 2) Navigation ATM — système de steps

### Objectif

Implémenter un système de **steps** pour l’écran ATM :

- Créer une **enum** représentant les étapes (steps)
- Créer les **composants** correspondants
- Gérer la navigation entre étapes

### Steps attendus

1. **Accueil machine** (bouton : _Insérer carte_)
2. **Sélection carte**
   - Utilisateurs et cartes sont hardcodées pour l'instant
3. **Vérification code PIN**
4. **Sélection action**
   - Dépôt
   - Retrait
   - Solde
   - Changement code PIN
   - Quitter
5. **Action “Quitter”**
   - Retour à l’accueil (reset de la session)

---

## 3) Composants / actions à implémenter

- ✅ Composant **Solde**
- ✅ Composant **Dépôt**
- ✅ Composant **Retrait**
- ✅ Action **Changement de PIN**
>>>>>>> oldrepo/main
