# Tattoo Shop FiveM

Un site web moderne pour votre serveur FiveM avec un thème sombre et une interface intuitive pour choisir des tatouages.

## Fonctionnalités

- **Thème sombre** : Design moderne qui ne pique pas aux yeux
- **6 catégories** : Tête, Torse, Jambe Gauche, Jambe Droite, Bras Gauche, Bras Droit
- **Navigation intuitive** : Clic sur une catégorie pour voir tous les tatouages disponibles
- **Numérotation** : Chaque tatouage est numéroté en haut à droite
- **Design responsive** : Fonctionne sur tous les appareils

## Structure du projet

```
Tattoo/
├── index.html                 # Page d'accueil avec les catégories
├── styles.css                 # Styles CSS avec thème sombre
├── categories/                # Dossier des catégories
│   ├── tete.html             # Tatouages pour la tête
│   ├── torse.html            # Tatouages pour le torse
│   ├── jambe-gauche.html     # Tatouages jambe gauche
│   ├── jambe-droite.html     # Tatouages jambe droite
│   ├── bras-gauche.html      # Tatouages bras gauche
│   └── bras-droit.html       # Tatouages bras droit
├── images/                   # Dossier pour les vraies images
└── README.md                 # Ce fichier
```

## Comment ajouter vos propres images

1. **Préparez vos images** :
   - Sauvegardez vos images de tatouage dans le dossier `images/`
   - Nommez-les de manière cohérente (ex: `tete-1.jpg`, `torse-5.png`)
   - Préférez les formats JPG ou PNG
   - Taille recommandée : 300x200 pixels minimum

2. **Remplacez les images placeholder** :
   Dans chaque fichier HTML de catégorie, remplacez les URLs des images placeholder :
   ```html
   <!-- Remplacer cette ligne -->
   <img src="https://via.placeholder.com/300x200/333/fff?text=Tatouage+Tete+1" alt="Tatouage tête 1">

   <!-- Par votre image -->
   <img src="../images/tete-1.jpg" alt="Tatouage tête 1">
   ```

3. **Ajoutez plus de tatouages** :
   - Copiez une structure `.tattoo-card` existante
   - Incrémentez le numéro
   - Ajoutez votre nouvelle image et description

## Intégration avec FiveM

Pour intégrer ce site avec votre serveur FiveM :

1. **Hébergez le site** sur un serveur web
2. **Utilisez les numéros** des tatouages dans vos scripts Lua
3. **Exemple d'utilisation** :
   ```lua
   -- Quand un joueur choisit le tatouage #3 pour la tête
   SetPedHeadOverlay(playerPed, 1, 3, 1.0) -- Overlay ID, variation, opacity
   ```

## Personnalisation

- **Couleurs** : Modifiez les variables CSS dans `styles.css`
- **Polices** : Changez la police dans la section `font-family`
- **Layout** : Ajustez la grille responsive selon vos besoins

## Support

Le site est entièrement fonctionnel avec des images placeholder. Remplacez simplement les images par les vôtres pour l'utiliser avec votre serveur FiveM.
