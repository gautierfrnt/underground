import { Vector3, PerspectiveCamera, AudioListener } from 'three';
import { gsap } from 'gsap';

// Fonction setupCamera
export function setupCamera(camera, scene, controls, renderer) {
    // Variables d'état
    let scrollEnabled = false;
    let scrollProgress = 0;
    let finalAnimationTriggered = false;
    let isMuted = false;

    // Points de la trajectoire
    const camStart = new Vector3(0, 1, 8);
    const camEnd = new Vector3(0, 2, -39);

    // Gestion du scroll
    function updateScrollProgress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0) {
            scrollProgress = Math.min(window.scrollY / max, 1);
        }
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: false });
    window.addEventListener('touchmove', updateScrollProgress, { passive: false });

    // Configuration audio avec filtre lowpass
    let audioContext; // Utilise l'API native AudioContext
    let audioSource;
    let filter;
    let gainNode;

    // Bouton d'entrée et bouton de son
    const overlay = document.querySelector('.overlay');
    const button = document.querySelector('#enter');
    const soundToggleButton = document.querySelector('#toggle-sound');
    const clickaudio = new Audio('./sounds/musique.mp3'); // Utilise l'API native Audio

    // Fonction pour basculer le son
    function toggleSound() {
        if (!audioContext) return;
        isMuted = !isMuted;
        if (isMuted) {
            gainNode.gain.value = 0;
            soundToggleButton.classList.add('muted');
            // Animation GSAP pour les barres
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                gsap.to(wave, {
                    height: '2px',
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "power2.inOut"
                });
            });
        } else {
            gainNode.gain.value = 0.1 + (0.9 * scrollProgress);
            soundToggleButton.classList.remove('muted');
            // Animation GSAP pour les barres
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                gsap.to(wave, {
                    height: '100%',
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "elastic.out(1, 0.5)",
                    onComplete: () => animateWaves(),
                });
            });
        }
    }

    // Écouteur pour le bouton de son
    if (soundToggleButton) {
        soundToggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSound();
        });
    }

    // Animation des vagues
    function animateWaves() {
        if (isMuted) return;
        const waves = document.querySelectorAll('.wave');
        const now = Date.now();
        const frequency = 0.002;
        waves.forEach((wave, index) => {
            const offset = index * 0.5;
            const height = 5 + 15 * Math.sin(now * frequency + offset);
            wave.style.height = `${height}px`;
            wave.style.transform = `scaleY(${height / 20})`;
        });
        requestAnimationFrame(animateWaves);
    }

    // Écouteur pour le bouton d'entrée
    button.addEventListener('click', () => {
        camera.position.copy(camStart);
        camera.lookAt(0, 2, 0);
        scrollEnabled = true;
        controls.enabled = false;

        // Animation de l'overlay
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.display = 'none';
            const soundToggleButton = document.querySelector('#toggle-sound');
            const musicCredit = document.querySelector('.music-credit');
            if (soundToggleButton) soundToggleButton.style.display = 'flex';
            if (musicCredit) musicCredit.style.display = 'block';
            gsap.from([soundToggleButton, musicCredit], {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, 600);

        // Initialisation de l'AudioContext et du filtre
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioSource = audioContext.createMediaElementSource(clickaudio);
        filter = audioContext.createBiquadFilter();
        gainNode = audioContext.createGain();

        // Configuration du filtre
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

    // Mise à jour de la caméra et du filtre audio
    function updateCamera() {
        if (scrollEnabled && !finalAnimationTriggered) {
            camera.position.lerpVectors(camStart, camEnd, scrollProgress);
            if (!isMuted) {
                gainNode.gain.value = 0.1 + (0.9 * scrollProgress);
            }
            if (filter) {
                const minFreq = 200;
                const maxFreq = 22050;
                filter.frequency.value = minFreq + (maxFreq - minFreq) * scrollProgress;
            }
            if (scrollProgress >= 1 && !finalAnimationTriggered) {
                finalAnimationTriggered = true;
                scrollEnabled = false;
                const timeline = gsap.timeline();
                timeline.to(camera.position, {
                    x: camStart.x,
                    y: camStart.y,
                    z: camStart.z,
                    duration: 3,
                    ease: "power2.inOut"
                }, 0);
                if (!isMuted) {
                    timeline.to(gainNode.gain, {
                        value: 0.1,
                        duration: 3,
                        ease: "power2.inOut"
                    }, 0);
                }
                timeline.to(filter.frequency, {
                    value: 200,
                    duration: 3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        scrollProgress = 0;
                        finalAnimationTriggered = false;
                        scrollEnabled = true;
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
