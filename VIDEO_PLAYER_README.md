# Lecteur Vidéo - Guide d'utilisation

## Emplacement
Le lecteur vidéo est positionné en haut à droite de la page `index.html`.

## Structure
- **Logo** : Utilise le logo principal du site (logo.png) avec indicateur de volume
- **Lecteur** : Lecteur vidéo HTML5 avec contrôles
- **Animation** : Apparaît avec un effet de glissement depuis la droite

## Configuration

### Ajouter votre vidéo
1. Placez votre fichier vidéo dans le dossier `videos/`
2. Nommez-le `tattoo-demo.mp4` ou modifiez le nom dans le HTML
3. Formats supportés : MP4, WebM, OGV

### Personnalisation
Dans `styles.css`, vous pouvez modifier :
- **Taille** : Ajustez `width` et `height` du `.mini-video-player`
- **Position** : Modifiez `top` et `right` du `.video-player-container`
- **Apparence** : Changez les couleurs et effets du lecteur

## Fonctionnalités

### Autoplay automatique
- ✅ **Démarrage automatique** dès le chargement de la page
- ✅ **Gestion avancée des politiques de navigateur** (Chrome, Firefox, Safari)
- ✅ **Préchargement automatique** de la vidéo (`preload="auto"`)
- ✅ **Fallback multi-événements** : visibilité, focus, clic utilisateur
- ✅ **Activation du son** dès le lancement effectif de la vidéo
- ✅ **Indicateur visuel d'attente** si autoplay bloqué

### Volume à 10%
- ✅ **Volume réglé automatiquement** à 10% (0.1) dès le départ
- ✅ **Gestion du muting initial** pour contourner les restrictions d'autoplay
- ✅ **Activation du son** après le démarrage de la vidéo
- ✅ **Indicateur visuel** avec un point bleu animé sur le logo

### Interface utilisateur
- ✅ **Contrôles de lecture intégrés**
- ✅ **Indicateur de volume animé** (point bleu qui pulse)
- ✅ **Design cohérent** avec le style du site
- ✅ **Animation d'apparition** synchronisée

## Responsive
- **Desktop** : Lecteur 250x140px en haut à droite
- **Tablette** : Lecteur 200x110px ajusté
- **Mobile** : Lecteur centré en relatif (pas fixe)

## Déploiement sur GitHub Pages - SOLUTION

### ✅ Solution recommandée : Iframe YouTube

**GitHub Pages bloque les vidéos locales mais supporte parfaitement YouTube :**

**Configuration actuelle :**
```html
<iframe class="mini-video-player"
        src="https://www.youtube.com/embed/VIDEO_ID?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
        title="Présentation Santa Maria Ink"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>
```

**Avantages de YouTube :**
- ✅ **Fonctionne parfaitement** sur GitHub Pages
- ✅ **Pas de limite de taille** de fichier
- ✅ **Streaming optimisé** par Google
- ✅ **Support mobile** excellent
- ✅ **Référencement SEO** automatique

### Comment utiliser :

1. **Remplacez `VIDEO_ID`** par l'ID de votre vidéo YouTube
2. **Obtenez l'ID** depuis l'URL YouTube : `https://www.youtube.com/watch?v=VIDEO_ID`
3. **Personnalisez les paramètres** :
   - `autoplay=0` : Pas de lecture automatique
   - `mute=1` : Démarre muet (nécessaire pour certains navigateurs)
   - `controls=1` : Affiche les contrôles
   - `modestbranding=1` : Logo YouTube discret
   - `rel=0` : Pas de vidéos suggérées à la fin

### Étapes pour déployer :

1. **Pushez vos modifications** sur GitHub
2. **Le lecteur YouTube fonctionne immédiatement** sur GitHub Pages
3. **Testez l'intégration** - elle devrait être parfaite
4. **Personnalisez la vidéo** en changeant l'ID YouTube

### Résolution de problèmes :

- **Si l'iframe ne s'affiche pas** : Vérifiez que l'ID YouTube est correct
- **Pour changer de vidéo** : Modifiez seulement l'ID dans l'URL src
- **Pour l'autoplay** : Il est généralement bloqué sur GitHub Pages même avec YouTube

## Code JavaScript
```javascript
// Gestion du lecteur vidéo (YouTube)
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.mini-video-player');

    if (video) {
        console.log('Lecteur vidéo trouvé:', video);
        console.log('Source de la vidéo:', video.src);

        // Pour iframe YouTube, pas besoin de preload
        console.log('Iframe YouTube détectée');

        // Simuler les événements pour iframe YouTube
        document.getElementById('videoStatus').textContent = 'Lecteur YouTube - Prêt';

        // Écouter les clics sur l'iframe (approximation)
        video.addEventListener('load', function() {
            console.log('Iframe YouTube chargée');
            document.getElementById('videoStatus').textContent = 'YouTube - Prêt à jouer';
        });
    }
});
