// Recherche et filtrage des tatouages
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tattooCards = document.querySelectorAll('.tattoo-card');
    const tattooGrid = document.querySelector('.tattoo-grid');

    // Création du modal
    createTattooModal();

    // Recherche en temps réel
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterTattoos(searchTerm, getActiveFilter());
    });

    // Gestion des filtres par catégorie
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            // Filtrer les tatouages
            const filter = this.getAttribute('data-filter');
            filterTattoos(searchInput.value.toLowerCase(), filter);
        });
    });

    // Gestion du clic sur les cartes de tatouage
    tattooCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openTattooModal(img.src, img.alt);
            }
        });
    });

    function createTattooModal() {
        // Créer le modal s'il n'existe pas déjà
        if (document.querySelector('.tattoo-modal')) return;

        const modal = document.createElement('div');
        modal.className = 'tattoo-modal';
        modal.innerHTML = `
            <div class="tattoo-modal-content">
                <span class="tattoo-modal-close">&times;</span>
                <img src="" alt="" />
            </div>
        `;

        // Gestion de la fermeture
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target === modal.querySelector('.tattoo-modal-close')) {
                closeTattooModal();
            }
        });

        // Fermeture avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeTattooModal();
            }
        });

        document.body.appendChild(modal);
    }

    function openTattooModal(src, alt) {
        const modal = document.querySelector('.tattoo-modal');
        const modalImg = modal.querySelector('img');

        modalImg.src = src;
        modalImg.alt = alt;
        modal.classList.add('show');

        // Empêcher le scroll du body quand le modal est ouvert
        document.body.style.overflow = 'hidden';
    }

    function closeTattooModal() {
        const modal = document.querySelector('.tattoo-modal');
        modal.classList.remove('show');

        // Réactiver le scroll du body
        document.body.style.overflow = '';
    }

    function filterTattoos(searchTerm, filter) {
        let visibleCount = 0;

        tattooCards.forEach((card, index) => {
            // Chercher dans le nom du tatouage (dans la div .fivem-code)
            const fivemCodeDiv = card.querySelector('.fivem-code');
            const textContent = fivemCodeDiv ? fivemCodeDiv.textContent.toLowerCase() : '';

            // Chercher dans le nom (après "Nom:") et le prix (après "Prix:")
            const nameMatch = textContent.includes(searchTerm);

            // Vérifier la catégorie
            const cardFilter = card.getAttribute('data-filter');
            const matchesFilter = filter === 'all' || cardFilter === filter;

            if (nameMatch && matchesFilter) {
                card.style.display = 'block';
                card.classList.add('show');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        });

        // Afficher ou masquer le message "aucun résultat"
        const noResultsMsg = document.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'no-results';
                messageDiv.textContent = 'Aucun tatouage trouvé';
                tattooGrid.appendChild(messageDiv);
            } else {
                noResultsMsg.style.display = 'block';
            }
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }

    function getActiveFilter() {
        const activeButton = document.querySelector('.filter-btn.active');
        return activeButton ? activeButton.getAttribute('data-filter') : 'all';
    }
});
