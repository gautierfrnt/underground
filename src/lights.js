import * as THREE from 'three';

export function createLights(scene, house) {
    /**
     * Lumières statiques
     */
    const pointLight1 = new THREE.PointLight('#ffffff', 10);
    pointLight1.position.set(0, 6, 2);
    pointLight1.intensity = 20;
    scene.add(pointLight1);

    const pointLight1Rotation = {
        x: THREE.MathUtils.radToDeg(pointLight1.rotation.x),
        y: THREE.MathUtils.radToDeg(pointLight1.rotation.y),
        z: THREE.MathUtils.radToDeg(pointLight1.rotation.z),
    };

    // Update rotation de la lumière
    function updatepointLight1Rotation() {
        pointLight1.rotation.x = THREE.MathUtils.degToRad(pointLight1Rotation.x);
        pointLight1.rotation.y = THREE.MathUtils.degToRad(pointLight1Rotation.y);
        pointLight1.rotation.z = THREE.MathUtils.degToRad(pointLight1Rotation.z);
        helper.update(); // Met à jour l'helper pour refléter la nouvelle rotation
    }

    const ambientLight = new THREE.AmbientLight('#3f0c0c', 0.2);
    scene.add(ambientLight);

    const doorLight = new THREE.PointLight('#ff0000', 10);
    doorLight.position.set(0, 2.2, 2.5);
    scene.add(doorLight);

    /**
     * Lumières fantômes animées
     */
    const config = {
        nextFlicker: 0,
        baseIntensity: 10,
        hauteur: 1.5,
        amplitude: 1.5,
        speed: 1.2
    };

    const light1 = new THREE.PointLight('#ff0033', 6, 20, 2);
    light1.position.set(-3.5, config.hauteur, 3.5);
    light1.castShadow = true;

    const light2 = new THREE.PointLight('#660033', 6, 20, 2);
    light2.position.set(3.5, config.hauteur, 3.5);
    light2.castShadow = true;

    scene.add(light1, light2);

    // Ajoute une lumière dédiée pour l'intérieur
    const indoorLight = new THREE.PointLight('#ff0000', 100, 100);
    indoorLight.position.set(-0.3, 4.3, -38.7);
    indoorLight.castShadow = true;
    scene.add(indoorLight);

    /**
     * Animation des lumières
     */
    function animateLights(elapsedTime) {
        // Animation verticale
        light1.position.y = config.hauteur + Math.sin(elapsedTime * config.speed + 3.0) * config.amplitude;
        light2.position.y = config.hauteur + Math.sin(elapsedTime * config.speed + 3.0) * config.amplitude;

        // Clignotement "bug" de la doorLight
        if (elapsedTime > config.nextFlicker) {
            // Effet de clignotement rapide
            doorLight.intensity = Math.random() < 0.3 ? 0.2 : config.baseIntensity * (0.3 + Math.random() * 0.7);

            // Prochain clignotement dans 0.05 à 3 secondes
            config.nextFlicker = elapsedTime + 0.05 + Math.random() * 1;
        }
    }

    return {
        indoorLight,
        pointLight1,
        doorLight,
        lights: [light1, light2],
        animateLights,
        config
    };
}
