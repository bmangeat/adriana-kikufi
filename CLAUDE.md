# Portfolio — Adriana Kikufi

Site statique one-page (HTML / CSS / JS vanilla, zéro dépendance).

## Structure

```
index.html              Contenu & structure (sections : hero, à propos, parcours, projets, contact)
assets/css/style.css    Styles, animations, responsive (mobile-first breakpoints à 820px et 560px)
assets/js/main.js       Logique : données projets, filtres, lightbox, reveals au scroll, nav mobile
assets/img/             Visuels des projets (JPG, découpés depuis le PDF source)
```

## Lancer en local

```bash
cd ~/Desktop/portfolio-adriana
python3 -m http.server 4321
# puis http://localhost:4321
```

## Ajouter ou modifier un projet

Tout se passe dans le tableau `PROJECTS` en haut de `assets/js/main.js`.

```js
{
  title:  "Nom du projet",
  cat:    "Libellé affiché sur la carte (ex: UI / UX)",
  cats:   ["uiux"],           // valeurs de filtre : "uiux" | "branding" | "illustration" | "typo" | "infographie"
  desc:   "Description affichée dans la lightbox.",
  thumb:  "nom-image",        // sans extension — pointe vers assets/img/nom-image.jpg
  images: ["img1", "img2"]    // galerie lightbox, au moins 1 élément
}
```

Ajoute ensuite le fichier image correspondant dans `assets/img/` (JPG, largeur max 1500px).

Pour ajouter une catégorie de filtre, ajoute un bouton dans `index.html` :

```html
<button class="filter" data-filter="ma-categorie">Ma catégorie</button>
```

## Personnaliser l'apparence

Toutes les couleurs et polices sont dans les variables CSS `:root` en haut de `style.css` :

```css
:root {
  --cream:     #F6EFDE;   /* fond principal */
  --ink:       #1B2A4A;   /* texte principal */
  --blue:      #5C9FD6;   /* rubans, accents */
  --mustard:   #EFAE45;   /* étoiles, boutons primaires */
  --f-display: "Fraunces";  /* titres */
  --f-hand:    "Caveat";    /* éléments manuscrits (rubans, dates) */
  --f-body:    "Nunito";    /* corps de texte */
}
```

## Sections à compléter

- **Liens réseaux** : dans `index.html`, cherche les trois `href="#"` de la section contact (LinkedIn, Instagram, Behance) et remplace-les par tes vraies URLs.
- **Outils** : la liste `.skills` dans la section "À propos" est à ajuster selon tes logiciels.

## Comportements notables

- **Menu mobile** : `body.menu-open` bloque `overflow: hidden` tant que le panneau est ouvert — la page ne défile plus derrière. Fermeture via le bouton burger, un lien du menu, ou la touche Échap.
- **Lightbox** : navigation clavier ← / → / Échap. Clic sur le fond ou le ✕ pour fermer.
- **Reveals au scroll** : les éléments `.reveal` et `.card` utilisent `IntersectionObserver` — ils apparaissent en fondu/montée au passage dans le viewport.
- **Animations désactivées** : si l'utilisateur a activé `prefers-reduced-motion`, toutes les animations et transitions sont coupées.

## Déploiement (Vercel)

- Framework Preset : **Other**
- Build Command : *(vide)*
- Output Directory : *(vide — racine du repo)*

Chaque `git push` sur `main` déclenche un redéploiement automatique.
