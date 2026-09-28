# Dossier Icons - First Agent IA

Ce dossier contient les icônes blanches 2D utilisées dans le site.

## Style des icônes
- **Couleur** : Blanc (#ffffff) ou bleu clair (#60a5fa, #93c5fd)
- **Style** : Minimaliste, épuré, moderne
- **Format** : SVG (recommandé), PNG
- **Taille** : 24x24px, 48x48px (standard)

## Icônes nécessaires

### Navigation
- [x] Logo (déjà intégré en SVG)
- [ ] Menu hamburger (mobile)
- [ ] Recherche

### Fonctionnalités
- [x] Complétion intelligente
- [x] Analyse en temps réel
- [x] Génération de code
- [x] Collaboration intelligente
- [ ] Debugging
- [ ] Version control
- [ ] Déploiement

### Technologie
- [x] Python
- [x] JavaScript
- [x] TypeScript
- [x] Rust
- [x] Go
- [ ] Java
- [ ] C++
- [ ] PHP

### Social
- [x] Twitter
- [x] GitHub
- [x] LinkedIn
- [x] Discord
- [ ] Reddit
- [ ] Medium

### Actions
- [x] Play (vidéo)
- [ ] Pause
- [ ] Stop
- [ ] Next
- [ ] Previous
- [x] Send (formulaire)
- [x] Check (succès)

## Ressources recommandées

### Gratuites
- **Feather Icons** : https://feathericons.com/ (SVG, open source)
- **Heroicons** : https://heroicons.com/ (SVG, par Tailwind)
- **Tabler Icons** : https://tabler-icons.io/ (SVG, MIT)
- **Lucide** : https://lucide.dev/ (SVG, open source)

### Premium
- **IconJar** : https://geticonjar.com/
- **Icons8** : https://icons8.com/
- **Flaticon** : https://www.flaticon.com/

## Intégration SVG

### Exemple d'icône SVG
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
</svg>
```

### Utilisation dans le HTML
```html
<svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
</svg>
```

### Style CSS
```css
.feature-icon {
    width: 24px;
    height: 24px;
    color: var(--color-light-blue); /* #60a5fa */
}

.feature-icon:hover {
    color: var(--color-white);
}
```

## Génération d'icônes personnalisées

### Avec Figma
1. Créez un nouveau fichier
2. Utilisez la grille 24x24
3. Dessinez avec des traits de 2px
4. Exportez en SVG

### Avec Illustrator
1. Nouveau document 24x24px
2. Utilisez l'outil Plume
3. Stroke: 2px, couleur: blanc
4. Fichier > Exporter > SVG

### Optimisation SVG
- Supprimez les métadonnées inutiles
- Simplifiez les paths
- Utilisez `stroke="currentColor"` pour la flexibilité

## Icônes déjà intégrées

Le site utilise actuellement des icônes SVG directement dans le HTML/CSS :
- Logo (cercle + flèche)
- Boutons (flèche, play, check)
- Fonctionnalités (code, analyse, génération, collaboration)
- Technos (Python, JS, TS, Rust, Go)
- Social (Twitter, GitHub, LinkedIn, Discord)

## Ajout de nouvelles icônes

1. Créez ou téléchargez l'icône en SVG
2. Placez-la dans ce dossier
3. Optimisez le fichier SVG
4. Intégrez-la via `<img>` ou inline SVG
5. Appliquez les styles CSS appropriés
