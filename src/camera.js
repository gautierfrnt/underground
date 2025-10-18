import * as THREE from 'three';
import { gsap } from 'gsap';

export function setupCamera(camera, scene, controls, renderer) {
    /**
     * Variables d'état
     */
    let scrollEnabled = false;
    let scrollProgress = 0;
    let finalAnimationTriggered = false;
    let isMuted = false; // État du son (désactivé par défaut)

    /**
     * Points de la trajectoire
     */
    const camStart = new THREE.Vector3(0, 1, 8);  // départ
    const camEnd = new THREE.Vector3(0, 2, -39);   // arrivée

    /**
     * Gestion du scroll
     */
    function updateScrollProgress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0) {
            scrollProgress = Math.min(window.scrollY / max, 1);
        }
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    /**
     * Configuration audio avec filtre lowpass
     */
    let audioContext;
    let audioSource;
    let filter;
    let gainNode;

    /**
     * Bouton d'entrée et bouton de son
     */
    const overlay = document.querySelector('.overlay');
    const button = document.querySelector('#enter');
    const soundToggleButton = document.querySelector('#toggle-sound');
    const clickaudio = new Audio('./sounds/musique.mp3');

    // Fonction pour basculer le son
    function toggleSound() {
        if (!audioContext) return;

        isMuted = !isMuted;

        if (isMuted) {
            gainNode.gain.value = 0;
            soundToggleButton.classList.add('muted');

            // Animation smooth pour redescendre les barres
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                gsap.to(wave, {
                    height: '2px',
                    duration: 0.5,
                    delay: index * 0.1, // Décalage progressif pour chaque barre
                    ease: "power2.inOut"
                });
            });
        } else {
            gainNode.gain.value = 0.1 + (0.9 * scrollProgress);
            soundToggleButton.classList.remove('muted');

            // Animation pour faire remonter les barres en vague
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                gsap.to(wave, {
                    height: '100%',
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "elastic.out(1, 0.5)", // Effet "rebond" pour un retour dynamique
                    onComplete: () => {
                        // Redémarre l'animation sinusoïdale après la remontée
                        animateWaves();
                    }
                });
            });
        }
    }

    // Écouteur pour le bouton de son
    if (soundToggleButton) {
        soundToggleButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche le déclenchement d'autres événements
            toggleSound();
        });
    }

    function animateWaves() {
        if (isMuted) return; // Ne pas animer si le son est désactivé

        const waves = document.querySelectorAll('.wave');
        const now = Date.now();
        const frequency = 0.002; // Contrôle la vitesse de l'onde

        waves.forEach((wave, index) => {
            // Utilise sin() pour créer une courbe lisse
            const offset = index * 0.5; // Décale chaque barre
            const height = 5 + 15 * Math.sin(now * frequency + offset); // Hauteur entre 5% et 20%
            wave.style.height = `${height}px`;
            wave.style.transform = `scaleY(${height / 20})`; // Ajuste l'échelle
        });

        requestAnimationFrame(animateWaves); // Boucle d'animation
    }

    button.addEventListener('click', () => {
        // Place la caméra au départ
        camera.position.copy(camStart);
        camera.lookAt(0, 2, 0);
        scrollEnabled = true;
        controls.enabled = false;  // Désactive les contrôles pendant le scroll

        // Animation de l'overlay
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.display = 'none';

            // Afficher les éléments
            const soundToggleButton = document.querySelector('#toggle-sound');
            const musicCredit = document.querySelector('.music-credit');
            if (soundToggleButton) soundToggleButton.style.display = 'flex';
            if (musicCredit) musicCredit.style.display = 'block';

            // Animer l'apparition
            gsap.from([soundToggleButton, musicCredit], {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1, // Décalage entre les animations
                ease: "power2.out"
            });
        }, 600);

        // Initialisation de l'AudioContext et du filtre
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioSource = audioContext.createMediaElementSource(clickaudio);
        filter = audioContext.createBiquadFilter();
        gainNode = audioContext.createGain();

        // Configuration du filtre (lowpass fort au début)
        filter.type = "lowpass";
        filter.frequency.value = 200;
        filter.Q.value = 0.5;

        audioSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        clickaudio.currentTime = 0;
        clickaudio.play().catch(e => console.log("La lecture a échoué :", e));

        animateWaves();
    });

    /**
     * Fonction de mise à jour de la caméra et du filtre audio
     */
    function updateCamera() {
        if (scrollEnabled && !finalAnimationTriggered) {
            // Interpolation linéaire entre camStart et camEnd
            camera.position.lerpVectors(camStart, camEnd, scrollProgress);

            if (!isMuted) {
                gainNode.gain.value = 0.1 + (0.9 * scrollProgress);
            }

            if (filter) {
                const minFreq = 200;      // Fréquence minimale
                const maxFreq = 22050;    // Fréquence maximale
                filter.frequency.value = minFreq + (maxFreq - minFreq) * scrollProgress;
            }

            // Détecte si on atteint la fin du scroll
            if (scrollProgress >= 1 && !finalAnimationTriggered) {
                finalAnimationTriggered = true;
                scrollEnabled = false; // Désactive le scroll pendant l'animation

                // Animation de retour avec GSAP
                const timeline = gsap.timeline();

                // Animation de la caméra
                timeline.to(camera.position, {
                    x: camStart.x,
                    y: camStart.y,
                    z: camStart.z,
                    duration: 3,
                    ease: "power2.inOut"
                }, 0);

                // Animation du volume (gain)
                if (!isMuted) {
                    timeline.to(gainNode.gain, {
                        value: 0.1, // Retour au volume initial
                        duration: 3,
                        ease: "power2.inOut"
                    }, 0);
                }

                // Animation du filtre (lowpass)
                timeline.to(filter.frequency, {
                    value: 200, // Retour à la fréquence initiale
                    duration: 3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Réinitialise le scroll de la page à 0%
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        // Réinitialise les variables pour permettre un nouveau scroll
                        scrollProgress = 0;
                        finalAnimationTriggered = false;
                        scrollEnabled = true;
                        // Réactive les contrôles si nécessaire
                        controls.enabled = false;
                    }
                }, 0);
            }
        }
    }

    return {
        scrollEnabled: () => scrollEnabled,
        finalAnimationTriggered: () => finalAnimationTriggered,
        camStart,
        camEnd,
        updateCamera,
    };
}
