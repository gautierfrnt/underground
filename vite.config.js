import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart';
import glsl from 'vite-plugin-glsl';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  server: {
    host: true,
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare Three.js et ses plugins
          three: ['three'],
          'three-addons': [
            'three/examples/jsm/loaders/GLTFLoader.js',
            'three/examples/jsm/controls/OrbitControls.js',
            'three/examples/jsm/postprocessing/EffectComposer.js',
            'three/examples/jsm/postprocessing/RenderPass.js',
            'three/examples/jsm/postprocessing/ShaderPass.js',
            'three/examples/jsm/shaders/RGBShiftShader.js',
          ],
          // Sépare GSAP
          gsap: ['gsap', 'gsap/SplitText'],
        },
      },
    },
  },
  plugins: [
    restart({ restart: ['../static/**'] }),
    glsl(), // Plugin pour importer les fichiers .glsl
    viteStaticCopy({
      targets: [
        { src: '../static/fonts/*.woff2', dest: 'fonts' },
        { src: '../static/sounds/*.mp3', dest: 'sounds' },
        { src: '../static/models/*.glb', dest: 'models' },
        { src: '../static/textures/**/*', dest: 'textures' },
      ],
    }),
  ],
});
