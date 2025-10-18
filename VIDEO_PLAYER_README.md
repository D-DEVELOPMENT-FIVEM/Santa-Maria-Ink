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

## Déploiement sur GitHub Pages

### Problèmes courants avec GitHub Pages

**GitHub Pages a des restrictions strictes sur l'autoplay vidéo :**
- ❌ **Autoplay bloqué** par défaut pour des raisons de sécurité
- ❌ **Politiques CORS** peuvent bloquer le contenu local
- ✅ **Solution recommandée** : Démarrage manuel de la vidéo

### Configuration pour GitHub Pages

**1. Version actuelle (démarrage manuel) :**
```html
<video controls muted> <!-- Pas d'autoplay -->
```
- ✅ **Fonctionne parfaitement** sur GitHub Pages
- ✅ **L'utilisateur clique** pour démarrer la vidéo
- ✅ **Volume activé automatiquement** à 10% après le lancement

**2. Version alternative avec iframe YouTube :**
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=0&mute=1&controls=1">
```
- ✅ **Support natif** par GitHub Pages
- ✅ **Remplacez VIDEO_ID** par l'ID de votre vidéo YouTube
- ✅ **Autoplay possible** avec `autoplay=1` après interaction

### Étapes pour déployer :

1. **Pushez vos modifications** sur GitHub
2. **Activez GitHub Pages** dans les paramètres du repository
3. **Testez le lecteur** - il devrait fonctionner en mode manuel
4. **Si besoin**, décommentez la section iframe YouTube dans le HTML

### Résolution de problèmes GitHub Pages :

- **Si la vidéo ne charge pas** : Vérifiez que le fichier vidéo existe dans le dossier `videos/`
- **Si GitHub Pages ne sert pas la vidéo** : Utilisez une iframe YouTube à la place
- **Pour l'autoplay** : Il est généralement bloqué sur GitHub Pages

## Code JavaScript
```javascript
// Gestion du lecteur vidéo
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.mini-video-player');

    if (video) {
        // Précharger la vidéo pour améliorer l'autoplay
        video.preload = 'auto';

        // Fonction pour activer le son dès le lancement
        function enableVolume() {
            // Enlever l'attribut muted si présent
            if (video.muted) {
                video.muted = false;
            }
            // Régler le volume à 10%
            video.volume = 0.1;
            console.log('Volume activé à 10%');
        }

        // Activer le volume dès que la vidéo commence à jouer
        video.addEventListener('play', function() {
            setTimeout(enableVolume, 100);
        });

        // Méthode robuste pour démarrer la vidéo
        function startVideo() {
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(function() {
                    console.log('Vidéo démarrée automatiquement');
                    video.classList.remove('video-waiting');
                }).catch(function(error) {
                    console.log('Autoplay bloqué:', error);
                    // Afficher l'indicateur d'attente
                    video.classList.add('video-waiting');
                    video.style.cursor = 'pointer';
                    video.title = 'Cliquez pour démarrer la vidéo';

                    // Forcer le démarrage après interaction
                    const forcePlay = function() {
                        video.play().then(function() {
                            console.log('Vidéo démarrée après interaction');
                            video.classList.remove('video-waiting');
                            video.style.cursor = '';
                            video.title = '';
                        });
                    };

                    video.addEventListener('click', forcePlay);
                });
            }
        }

        // Fallbacks pour les navigateurs stricts
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && video.paused) {
                startVideo();
            }
        });

        window.addEventListener('focus', function() {
            if (video.paused) {
                startVideo();
            }
        });

        // Démarrer la vidéo automatiquement
        startVideo();
    }
});
