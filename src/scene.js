import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createScene(scene, textures) {
    const {
        floorColorTexture,
        floorDisplacementTexture,
        floorNormalTexture,
        floorRoughnessTexture,
        wallsColorTexture,
        wallsNormalTexture,
        wallsAOTexture,
        wallsRoughnessTexture,
        wallsDisplacementTexture,
        floorIndoorColorTexture,
        floorIndoorNormalTexture,
        floorIndoorDisplacementTexture,
        floorIndoorRoughnessTexture,
    } = textures;

    /**
     * Sol
     */
    // Paramètres initiaux pour le sol
    const floorParams = {
        width: 50,
        height: 104,
        positionX: 0,
        positionY: 0,
        positionZ: 50,
        displacementScale: 0.3,
        displacementBias: -0.2
    };

    // Sol
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(
            floorParams.width,
            floorParams.height,
        ),
        new THREE.MeshStandardMaterial({
            alphaMap: floorRoughnessTexture,
            map: floorColorTexture,
            aoMap: floorRoughnessTexture,
            roughnessMap: floorRoughnessTexture,
            metalnessMap: floorRoughnessTexture,
            normalMap: floorNormalTexture,
            displacementMap: floorDisplacementTexture,
            displacementScale: floorParams.displacementScale,
            displacementBias: floorParams.displacementBias
        })
    );
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    /**
     * Maison
     */
    let house;

    /**
     * Charger le modèle wall.glb
     */
    const loader = new GLTFLoader();
    loader.load(
        './models/wall.glb',
        (gltf) => {
            const wallModel = gltf.scene;
            wallModel.position.set(0, 0, 0);
            wallModel.scale.set(1, 1, 1);

            wallModel.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: wallsColorTexture,
                        normalMap: wallsNormalTexture,
                        aoMap: wallsAOTexture,
                        roughnessMap: wallsRoughnessTexture,
                        displacementMap: wallsDisplacementTexture,
                        displacementScale: 0.1,
                        roughness: 1,
                        metalness: 0.2
                    });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(wallModel);
            house = wallModel; // Stocker le modèle pour le retourner
        },
    );

    const floorIndoorParams = {
        width: 50,
        height: 50,
        positionX: 0,
        positionY: -0.59, // Valeur initiale dans ton code
        positionZ: -43.1,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    };

    const floorIndoor = new THREE.Mesh(
        new THREE.PlaneGeometry(
            floorIndoorParams.width,
            floorIndoorParams.height,
        ),
        new THREE.MeshStandardMaterial({
            alphaMap: floorIndoorRoughnessTexture,
            map: floorIndoorColorTexture,
            aoMap: floorRoughnessTexture,
            roughnessMap: floorIndoorRoughnessTexture,
            metalnessMap: floorIndoorRoughnessTexture,
            normalMap: floorIndoorNormalTexture,
            displacementMap: floorIndoorDisplacementTexture,
            roughness: 0.5,
            metalness: 0.1,
        })
    );
    floorIndoor.rotation.x = -Math.PI * 0.5;
    floorIndoor.position.set(floorIndoorParams.positionX, floorIndoorParams.positionY, floorIndoorParams.positionZ);
    floorIndoor.scale.set(floorIndoorParams.scaleX, floorIndoorParams.scaleY, floorIndoorParams.scaleZ);
    floorIndoor.receiveShadow = true;
    scene.add(floorIndoor);

    const ceilingIndoorParams = {
        width: 10,
        height: 10,
        positionX: 0,
        positionY: 3, // Valeur initiale dans ton code
        positionZ: -43.1,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    };

    const ceilingIndoor = new THREE.Mesh(
        new THREE.PlaneGeometry(
            ceilingIndoorParams.width,
            ceilingIndoorParams.height,
        ),
        new THREE.MeshBasicMaterial({color: '#ffffff'})
    );
    ceilingIndoor.position.set(ceilingIndoorParams.positionX, ceilingIndoorParams.positionY, ceilingIndoorParams.positionZ);
    
    /**
     * Porte
     */
    return { floor, house, floorIndoor, ceilingIndoor };
}
