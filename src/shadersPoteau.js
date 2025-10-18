import * as THREE from 'three';
import VertexShader from './shaders/poteau/vertex.glsl';
import FragmentShader from './shaders/poteau/fragment.glsl';

export function createShaderPoteaux(scene) {

    const postsGroupParams = {
        baseX: -2.7,
        baseZ: -25.6,
        spacing: 6.2,
        width: 0.7,
        height: 20,
        depth: 0.7,
        positionY: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    };

    const postsGroup = new THREE.Group();
    scene.add(postsGroup);

    function createPosts() {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                
                const postX = postsGroupParams.baseX + (i - 1) * postsGroupParams.spacing;
                const postZ = postsGroupParams.baseZ + (j - 1) * postsGroupParams.spacing;

                const postGeometry = new THREE.BoxGeometry(
                    postsGroupParams.width,
                    postsGroupParams.height,
                    postsGroupParams.depth,
                );

                const postMaterial = new THREE.ShaderMaterial({
                    vertexShader: VertexShader,
                    fragmentShader: FragmentShader,
                    uniforms: {
                        uTime: { value: 0 },
                    },
                });

                const post = new THREE.Mesh(postGeometry, postMaterial);

                post.position.set(postX, postsGroupParams.positionY, postZ);
                post.scale.set(postsGroupParams.scaleX, postsGroupParams.scaleY, postsGroupParams.scaleZ);

                postsGroup.add(post);
            }
        }
    }

    createPosts();

    return { postsGroup, postsGroupParams };
}