import { gsap } from 'gsap';
import { EventEmitter } from 'events';

// Initialisation des audios (sans lecture automatique)
const hoveraudio = new Audio('./sounds/hoverbutton.mp3');
const clickaudio = new Audio('./sounds/clickbutton.mp3');
hoveraudio.preload = 'auto';
clickaudio.preload = 'auto';

// Flag pour l'interaction utilisateur
let userHasInteracted = false;
window.addEventListener('click', () => {
    userHasInteracted = true;
}, { once: true });

// Fonctions utilitaires
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getMousePos = (e) => ({ x: e.clientX, y: e.clientY });
const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

// Position de la souris
let mousepos = { x: 0, y: 0 };
window.addEventListener('mousemove', (ev) => {
    mousepos = getMousePos(ev);
});

// Classe ButtonCtrl
class ButtonCtrl extends EventEmitter {
    constructor(el) {
        super();
        this.DOM = { el: el };
        this.DOM.text = this.DOM.el.querySelector('.button__text');
        this.DOM.textinner = this.DOM.el.querySelector('.button__text-inner');
        this.DOM.decoTop = this.DOM.el.querySelector('.button__deco--1');
        this.DOM.decoBottom = this.DOM.el.querySelector('.button__deco--2');

        // Initialisation des styles animés
        this.renderedStyles = {
            tx: { previous: 0, current: 0, amt: 0.1 },
            ty: { previous: 0, current: 0, amt: 0.1 },
            tx2: { previous: 0, current: 0, amt: 0.05 },
            ty2: { previous: 0, current: 0, amt: 0.05 }
        };
        this.state = { hover: false };

        // Calcul initial de la taille et position
        this.calculateSizePosition();

        // Initialisation des événements
        this.initEvents();

        // Lancement de la boucle d'animation
        requestAnimationFrame(() => this.render());
    }

    // Calcule la taille et la position du bouton
    calculateSizePosition() {
        this.rect = this.DOM.el.getBoundingClientRect();
        this.distanceToTrigger = this.rect.width * 1.5;
    }

    // Initialise les écouteurs d'événements
    initEvents() {
        // Écouteur pour le redimensionnement de la fenêtre
        this.onResize = () => this.calculateSizePosition();
        window.addEventListener('resize', this.onResize);

        // Écouteurs pour les interactions avec le bouton
        this.DOM.el.addEventListener('mouseenter', () => {
            if (userHasInteracted) {
                hoveraudio.currentTime = 0;
                hoveraudio.play().catch(e => console.log("Hover audio error:", e));
            }
            this.enter();
        });

        this.DOM.el.addEventListener('mouseleave', () => {
            if (userHasInteracted) {
                hoveraudio.currentTime = 0;
                hoveraudio.play().catch(e => console.log("Hover audio error:", e));
            }
            this.leave();
        });

        this.DOM.el.addEventListener('click', () => {
            if (userHasInteracted) {
                clickaudio.currentTime = 0;
                clickaudio.play().catch(e => console.log("Click audio error:", e));
            }
        });
    }

    // Boucle d'animation
    render() {
        const distanceMouseButton = distance(
            mousepos.x + window.scrollX,
            mousepos.y + window.scrollY,
            this.rect.left + this.rect.width / 2,
            this.rect.top + this.rect.height / 2
        );

        let x = 0;
        let y = 0;

        if (distanceMouseButton < this.distanceToTrigger) {
            if (!this.state.hover) this.enter();
            x = (mousepos.x + window.scrollX - (this.rect.left + this.rect.width / 2)) * 0.3;
            y = (mousepos.y + window.scrollY - (this.rect.top + this.rect.height / 2)) * 0.3;
        } else if (this.state.hover) {
            this.leave();
        }

        this.renderedStyles['tx'].current = this.renderedStyles['tx2'].current = x;
        this.renderedStyles['ty'].current = this.renderedStyles['ty2'].current = y;

        for (const key in this.renderedStyles) {
            this.renderedStyles[key].previous = lerp(
                this.renderedStyles[key].previous,
                this.renderedStyles[key].current,
                this.renderedStyles[key].amt
            );
        }

        // Applique les transformations avec GSAP
        gsap.set(this.DOM.decoTop, {
            x: this.renderedStyles['tx'].previous,
            y: this.renderedStyles['ty'].previous
        });

        gsap.set(this.DOM.decoBottom, {
            x: this.renderedStyles['tx2'].previous,
            y: this.renderedStyles['ty2'].previous
        });

        gsap.set(this.DOM.text, {
            x: this.renderedStyles['tx'].previous * 0.5,
            y: this.renderedStyles['ty'].previous * 0.5
        });

        requestAnimationFrame(() => this.render());
    }

    // Méthode appelée au survol du bouton
    enter() {
        this.emit('enter');
        this.state.hover = true;
        this.DOM.el.classList.add('button--hover');
        document.body.classList.add('active');

        gsap.killTweensOf(document.body);
        gsap.killTweensOf(this.DOM.textinner);

        gsap.timeline()
            .to(document.body, 0.2, { backgroundColor: '#000' })
            .to(this.DOM.textinner, 0.1, {
                ease: 'Power3.easeOut',
                opacity: 0,
                y: '-10%'
            }, 0)
            .to(this.DOM.textinner, 0.2, {
                ease: 'Expo.easeOut',
                opacity: 1,
                startAt: { y: '20%' },
                y: '0%'
            });
    }

    // Méthode appelée quand la souris quitte le bouton
    leave() {
        this.emit('leave');
        this.state.hover = false;
        this.DOM.el.classList.remove('button--hover');
        document.body.classList.remove('active');

        gsap.killTweensOf(document.body);
        gsap.killTweensOf(this.DOM.textinner);

        gsap.timeline()
            .to(document.body, 0.2, { backgroundColor: '#000' })
            .to(this.DOM.textinner, 0.1, {
                ease: 'Power3.easeOut',
                opacity: 0,
                y: '10%'
            }, 0)
            .to(this.DOM.textinner, 0.2, {
                ease: 'Expo.easeOut',
                opacity: 1,
                startAt: { y: '-20%' },
                y: '0%'
            });
    }

    // Nettoyage des écouteurs (optionnel)
    destroy() {
        window.removeEventListener('resize', this.onResize);
    }
}

// Initialisation du bouton
const button = new ButtonCtrl(document.getElementById('enter'));
