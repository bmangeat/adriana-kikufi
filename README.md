# Portfolio — Adriana Kikufi

Portfolio en ligne (HTML / CSS / JS vanilla, sans dépendance), inspiré du portfolio PDF 2026.
Univers doux & illustratif : crème, bleu, jaune moutarde, typo manuscrite et étoiles.

## Lancer en local
Le site est 100 % statique. Ouvre `index.html` directement, ou sers le dossier :

```bash
cd portfolio-adriana
python3 -m http.server 4321
# puis http://localhost:4321
```

## Structure
```
index.html              Contenu + sections (hero, à propos, parcours, projets, contact)
assets/css/style.css    Styles, animations, responsive
assets/js/main.js       Données projets, filtres, lightbox, reveals au scroll
assets/img/             Visuels découpés depuis le PDF
```

## Personnaliser
- **Projets** : édite le tableau `PROJECTS` en haut de `assets/js/main.js`
  (titre, catégorie, description, image de couverture `thumb`, galerie `images`).
- **Réseaux sociaux** : remplace les `href="#"` de la section contact dans `index.html`
  (LinkedIn, Instagram, Behance).
- **Outils / logiciels** : liste `.skills` dans `index.html` (à ajuster selon tes vrais outils).
- **Couleurs & polices** : variables CSS `:root` en haut de `assets/css/style.css`.

## Mettre en ligne (gratuit)
Glisse le dossier sur **Netlify Drop**, ou pousse sur GitHub et active **GitHub Pages**,
ou déploie via **Vercel** (projet statique, aucune config nécessaire).
```
