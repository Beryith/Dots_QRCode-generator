//
// Script principal pour la landing page glasmorphique.
// Ce fichier gère :
// - le scroll fluide vers les sections via les liens de la barre de navigation,
// - l'interaction du bouton d'appel à l'action (CTA) dans la section hero,
// - la génération et le téléchargement d'un QR Code dans la section dédiée.
//

// ---------------------------------------------------------------------------
// Logique d'interaction pour la section hero (CTA + scroll fluide vers features)
// ---------------------------------------------------------------------------

// Sélection du bouton CTA dans la section hero.
const ctaButton = document.getElementById('cta-button');

// Sélection de la section « features » vers laquelle on va scroller après le clic.
const featuresSection = document.getElementById('features');

// Gestion du clic sur le bouton CTA.
if (ctaButton && featuresSection) {
	ctaButton.addEventListener('click', () => {
		// Message simple pour informer l'utilisateur.
		alert('Découvrons ensemble les sections glasmorphiques plus bas sur la page.');

		// Scroll fluide vers la section des fonctionnalités.
		featuresSection.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	});
}

// -----------------------------------------------------
// Scroll fluide pour les liens de navigation internes.
// -----------------------------------------------------

// On cible tous les liens du menu dont l'attribut href commence par « # »,
// ce qui indique un lien vers une ancre dans la page.
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		// On empêche le saut instantané par défaut du navigateur.
		event.preventDefault();

		// Récupération de l'identifiant de la section cible (sans le caractère #).
		const targetId = link.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);

		// Si la section existe, on effectue un scroll fluide jusqu'à celle-ci.
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	});
});

// -----------------------------------------------------------------
// Logique du générateur de QR Code (section "qrcode-section").
// -----------------------------------------------------------------

// Sélection des éléments du DOM liés au générateur de QR Code.
const input = document.getElementById('text');
const generateButton = document.getElementById('generate');
const resultSection = document.getElementById('result');
const qrcodeCanvas = document.getElementById('qrcode');
const downloadLink = document.getElementById('download');

// Vérification que les éléments existent bien avant d'attacher les événements.
if (input && generateButton && resultSection && qrcodeCanvas && downloadLink) {
	//
	// Gestion du clic sur le bouton "Générer le QR Code".
	// Au clic :
	// 1) On récupère le texte saisi.
	// 2) On utilise la bibliothèque QRCode (chargée via CDN) pour dessiner
	//    le code dans le canvas.
	// 3) On affiche la zone de résultat et prépare le lien de téléchargement.
	//
	generateButton.addEventListener('click', () => {
		const text = input.value.trim();

		if (text) {
			// Appel à la librairie QRCode pour générer le code dans le canvas.
			QRCode.toCanvas(
				qrcodeCanvas,
				text,
				{ width: 400 },
				(error) => {
					if (error) {
						// En cas d'erreur de génération, on la log dans la console.
						console.error(error);
						return;
					}

					// Ajout de la classe active pour afficher la zone de résultat.
					resultSection.classList.add('active');

					// Conversion du contenu du canvas en URL de données image.
					const imageDataURL = qrcodeCanvas.toDataURL('image/png');
					// Configuration du lien de téléchargement avec le contenu généré.
					downloadLink.href = imageDataURL;
					downloadLink.download = 'qrcode.png';
					// On s'assure que le lien est visible.
					downloadLink.style.display = 'inline-block';
				}
			);
		} else {
			// Si aucun texte n'est saisi, on informe l'utilisateur.
			alert('Veuillez entrer un texte ou un lien pour générer le QR Code.');
		}
	});
}