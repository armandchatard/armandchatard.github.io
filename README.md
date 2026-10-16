# Site personnel — Armand Chatard (prototype)

Site statique HTML/CSS/JS prêt pour un hébergement GitHub Pages. Aucun abonnement, aucune dépendance et aucune installation nécessaire.

## Tester

Ouvrir `index.html` dans un navigateur, ou exécuter `python3 -m http.server 8000` dans ce dossier puis visiter http://localhost:8000.

## Contenus

- `index.html` : accueil
- `publications.html` : bibliothèque avec recherche et filtre
- `preprints.html` : préprints
- `actualites.html` : actualités
- `articles/` : billets individuels
- `projets.html` : projets
- `apropos.html` : présentation
- `assets/style.css` : design responsive

Les contenus sont des **exemples à valider** : références, auteurs, titres, DOI et fichiers PDF doivent être vérifiés et complétés avant la mise en ligne publique.

## Héberger gratuitement

Créer un dépôt public GitHub puis y déposer le contenu du dossier. Dans Settings > Pages > Build and deployment > Deploy from a branch, sélectionner `main` et `/ (root)`. Le site sera publié à l'adresse fournie par GitHub. Pour ajouter le domaine personnalisé, suivre les instructions DNS de GitHub Pages.

## À venir

Nous pourrons passer à une gestion structurée du contenu (Astro + Markdown) dès que la première maquette visuelle est validée ; cela évitera de modifier directement les pages HTML pour chaque nouvelle publication.

- `encadrement.html` : encadrement doctoral, thèses en cours et soutenues (liste à compléter).


## Actualités dynamiques
Modifier uniquement `assets/actualites-data.js` pour ajouter une actualité bilingue (titre, résumé, date YYYY-MM-DD, chemin de l’article, style graphique). `status` accepte `featured`, `archive` ou `deleted`. Seules les six plus récentes actualités marquées `featured` participent au carrousel ; les suivantes deviennent des archives. `archive` laisse une carte visible dans les archives. `deleted` masque la carte (sans effacer les pages sources). Les pages d’articles HTML peuvent être conservées même après retrait du carrousel.

Le carrousel avance toutes les 7 secondes lorsqu’il contient plus de cartes qu’il n’en affiche ; pause au survol et au focus, contrôle manuel, prise en charge de `prefers-reduced-motion`. Lorsque seulement trois cartes sont présentes sur écran large, aucune rotation n’est nécessaire.


### Rotation des cartes
Le carrousel tourne toutes les 7 secondes dès qu’il y a au moins deux actualités. Un mouvement de souris **dans les cartes** le met en pause, comme prévu, et les flèches permettent d'avancer manuellement. Si l’aperçu de fichiers de ChatGPT bloque l'exécution de JavaScript, télécharger et ouvrir le site localement dans un navigateur ou le publier sur GitHub Pages.
