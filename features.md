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
