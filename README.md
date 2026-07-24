#  ⚠️ Security Alerts Manager (SAM)
Interface logicielle qui permet de qualifier une menace et de prendre des décisions rapidement.

## ⬇️ Installation & lancement
```bash
git clone https://github.com/LisaMrc/security-alert-manager
cd security-alert-manager
npm install
npm run dev
```

## 🛠️ Outils
### Code :
- HTML
- CSS
- JS
- React + Vite
- shadcn/ui

### Outils :
- Figma (maquettes)
- Gitmoji (pour les commits) : https://gitmoji.dev/

## ✨ Features
- [x] Génération d'alertes en continu (15s, via useAlertStream)
- [x] Simulation d'échecs 4xx/5xx (15% de chance par tick)
- [x] Cache TTL sur les appels IPinfo (5 min)
- [x] Gérer l'arrivée visuelle des alertes en continu sans perturber la lecture
- [x] Animations et compteurs d'alertes
- [x] Panneau de détails au clic (géoloc + ISP)
- [x] Actions Ban/Ignore avec loading + toast de succès
- [x] Filtres (sévérité, type, IP, statut) et tri par colonne
- [x] Afficher les erreurs remontées par l’API sans gêner l’analyste
- [ ] Pause du flux Live (bonus, non fait)
- [ ] Dark mode (bonus, non fait)

*Pour aller plus loin (non implémenté) :*
- Une pastille "vous avez x nouvelles alertes" lorsque de nouvelles alertes apparaissent en bas du tableau, hors de l'écran
- Switch en dark / light mode
- Checkbox dans les filtres

##  🚂 Mon Processus
1. Mise en place du repo et ses dépendances
2. Liste de toutes les features à implémenter, tri par difficulté et impact
3. Maquettage Figma
4. Travail sur le code (implémentation des features et l'UI)
6. Nettoyage et relecture du code

##  🧱 Structure
### 📂 Components
- Composants shadcn/ui modifiés pour s'adapter au brief
  
### 📂 Hooks
- useAlertStream qui génère et mock la data
  
### 📂 Lib
- alertStyles : style des badges centralisés
- ipinfo : Il contient une fonction `fetchIpInfo(ip)` qui appelle l'API externe IPinfo pour récupérer la géolocalisation et le fournisseur d'accès à Internet (FAI) d'une adresse IP donnée

## 💭 Choix techniques
- Stack 100% frontend pour correspondre au brief qui évalue le front et la durée limitée (1 semaine)
- tri manuel plutôt que TanStack Table pour éviter l'over-engineering
- les alertes s'ajoutent en bas plutôt qu'en haut pour éviter de perturber la lecture
- Utilisation d'un toast (sonner) pour un retour visuel de l'action (ban ui)
- Cache TTL sur IPinfo (éviter les appels redondants, comme demandé)