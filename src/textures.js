import * as THREE from 'three'

export function loadTextures() {
    const textureLoader = new THREE.TextureLoader()
    
    /**
     * Floor
     */
    const floorColorTexture = textureLoader.load('./textures/floor/forest_ground_04_diff_4k.jpg')
    const floorDisplacementTexture = textureLoader.load('./textures/floor/forest_ground_04_disp_4k.png')
    const floorNormalTexture = textureLoader.load('./textures/floor/forest_ground_04_nor_dx_4k.jpg')
    const floorRoughnessTexture = textureLoader.load('./textures/floor/forest_ground_04_rough_4k.jpg')
    
    // Configuration des textures
    floorColorTexture.colorSpace = THREE.SRGBColorSpace
    
    // Répétition
    floorColorTexture.repeat.set(8, 8)
    floorNormalTexture.repeat.set(8, 8)
    floorDisplacementTexture.repeat.set(8, 8)
    floorRoughnessTexture.repeat.set(8, 8)
    
    // Wrap mode
    floorColorTexture.wrapS = floorColorTexture.wrapT = THREE.RepeatWrapping
    floorNormalTexture.wrapS = floorNormalTexture.wrapT = THREE.RepeatWrapping
    floorDisplacementTexture.wrapS = floorDisplacementTexture.wrapT = THREE.RepeatWrapping
    floorRoughnessTexture.wrapS = floorRoughnessTexture.wrapT = THREE.RepeatWrapping

    /**
     * Walls
     */
    const wallsColorTexture = textureLoader.load('./textures/walls/stone_brick_wall_001_diff_4k.jpg')
    const wallsDisplacementTexture = textureLoader.load('./textures/walls/stone_brick_wall_001_disp_4k.png')
    const wallsNormalTexture = textureLoader.load('./textures/walls/stone_brick_wall_001_nor_dx_4k.jpg')
    const wallsAOTexture = textureLoader.load('./textures/walls/stone_brick_wall_001_ao_4k.jpg')
    const wallsRoughnessTexture = textureLoader.load('./textures/walls/stone_brick_wall_001_rough_4k.jpg')

    // Configuration des textures
    wallsColorTexture.colorSpace = THREE.SRGBColorSpace
    
    // Répétition
    wallsColorTexture.repeat.set(8, 8)
    wallsNormalTexture.repeat.set(8, 8)
    wallsDisplacementTexture.repeat.set(8, 8)
    wallsRoughnessTexture.repeat.set(8, 8)
    wallsAOTexture.repeat.set(8, 8)
    
    // Wrap mode
    wallsColorTexture.wrapS = wallsColorTexture.wrapT = THREE.RepeatWrapping;
    wallsNormalTexture.wrapS = wallsNormalTexture.wrapT = THREE.RepeatWrapping;
    wallsDisplacementTexture.wrapS = wallsDisplacementTexture.wrapT = THREE.RepeatWrapping;
    wallsRoughnessTexture.wrapS = wallsRoughnessTexture.wrapT = THREE.RepeatWrapping;
    wallsAOTexture.wrapS = wallsAOTexture.wrapT = THREE.RepeatWrapping;
    
    /**
     * Floor Indoor
     */
    const floorIndoorColorTexture = textureLoader.load('./textures/indoorfloor/floor_tiles_06_diff_4k.jpg')
    const floorIndoorDisplacementTexture = textureLoader.load('./textures/indoorfloor/floor_tiles_06_disp_4k.jpg')
    const floorIndoorNormalTexture = textureLoader.load('./textures/indoorfloor/floor_tiles_06_nor_dx_4k.jpg')
    const floorIndoorAOTexture = textureLoader.load('./textures/indoorfloor/floor_tiles_06_ao_4k.jpg')
    const floorIndoorRoughnessTexture = textureLoader.load('./textures/indoorfloor/floor_tiles_06_rough_4k.jpg')

    // Configuration des textures
    wallsColorTexture.colorSpace = THREE.SRGBColorSpace
    
    // Répétition
    floorIndoorColorTexture.repeat.set(32, 32)
    floorIndoorNormalTexture.repeat.set(32, 32)
    floorIndoorDisplacementTexture.repeat.set(32, 32)
    floorIndoorRoughnessTexture.repeat.set(32, 32)
    floorIndoorAOTexture.repeat.set(32, 32)
    
    // Wrap mode
    floorIndoorColorTexture.wrapS = floorIndoorColorTexture.wrapT = THREE.RepeatWrapping;
    floorIndoorNormalTexture.wrapS = floorIndoorNormalTexture.wrapT = THREE.RepeatWrapping;
    floorIndoorDisplacementTexture.wrapS = floorIndoorDisplacementTexture.wrapT = THREE.RepeatWrapping;
    floorIndoorRoughnessTexture.wrapS = floorIndoorRoughnessTexture.wrapT = THREE.RepeatWrapping;
    floorIndoorAOTexture.wrapS = floorIndoorAOTexture.wrapT = THREE.RepeatWrapping;

    return {
        floorColorTexture,
        floorDisplacementTexture,
        floorNormalTexture,
        floorRoughnessTexture,
        wallsColorTexture,
        wallsNormalTexture,
        wallsDisplacementTexture,
        wallsRoughnessTexture,
        wallsAOTexture,
        floorIndoorColorTexture,
        floorIndoorNormalTexture,
        floorIndoorDisplacementTexture,
        floorIndoorRoughnessTexture,
        floorIndoorAOTexture,
    }
}