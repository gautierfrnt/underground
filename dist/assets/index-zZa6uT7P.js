import{X as j,ap as X,G as $,J as ne,l as z,b as W,aq as de,U as fe,B as pe,z as he,$ as me,ar as ve,V as ee,o as we,j as H,w as b,aj as Z,H as oe,a0 as ge,as as ye,a as xe,h as Me,I as _e,O as re,ao as ie,at as Se,au as be,a1 as Le,av as Te,aw as Oe,ax as Pe}from"./three-BvD1tDSt.js";import{G as J,O as Ee,E as Ce,R as ke,S as Ae,a as De}from"./three-addons-DmLJq6DV.js";import{g as S,S as se}from"./gsap-CI3CqjtC.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))u(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function i(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(a){if(a.ep)return;a.ep=!0;const r=i(a);fetch(a.href,r)}})();function Re(s,e){const{floorColorTexture:i,floorDisplacementTexture:u,floorNormalTexture:a,floorRoughnessTexture:r,wallsColorTexture:m,wallsNormalTexture:h,wallsAOTexture:v,wallsRoughnessTexture:w,wallsDisplacementTexture:f,floorIndoorColorTexture:g,floorIndoorNormalTexture:y,floorIndoorDisplacementTexture:x,floorIndoorRoughnessTexture:M}=e,C={width:50,height:104,displacementScale:.3,displacementBias:-.2},R=new j(new X(C.width,C.height),new $({alphaMap:r,map:i,aoMap:r,roughnessMap:r,metalnessMap:r,normalMap:a,displacementMap:u,displacementScale:C.displacementScale,displacementBias:C.displacementBias}));R.rotation.x=-Math.PI*.5,s.add(R);let k;new J().load("./models/wall.glb",l=>{const c=l.scene;c.position.set(0,0,0),c.scale.set(1,1,1),c.traverse(p=>{p.isMesh&&(p.material=new $({map:m,normalMap:h,aoMap:v,roughnessMap:w,displacementMap:f,displacementScale:.1,roughness:1,metalness:.2}),p.castShadow=!0,p.receiveShadow=!0)}),s.add(c),k=c});const L={width:50,height:50,positionX:0,positionY:-.59,positionZ:-43.1,scaleX:1,scaleY:1,scaleZ:1},o=new j(new X(L.width,L.height),new $({alphaMap:M,map:g,aoMap:r,roughnessMap:M,metalnessMap:M,normalMap:y,displacementMap:x,roughness:.5,metalness:.1}));o.rotation.x=-Math.PI*.5,o.position.set(L.positionX,L.positionY,L.positionZ),o.scale.set(L.scaleX,L.scaleY,L.scaleZ),o.receiveShadow=!0,s.add(o);const t={width:10,height:10,positionX:0,positionY:3,positionZ:-43.1},n=new j(new X(t.width,t.height),new ne({color:"#ffffff"}));return n.position.set(t.positionX,t.positionY,t.positionZ),{floor:R,house:k,floorIndoor:o,ceilingIndoor:n}}function je(s,e){const i=new z("#ffffff",10);i.position.set(0,6,2),i.intensity=20,s.add(i),W.radToDeg(i.rotation.x),W.radToDeg(i.rotation.y),W.radToDeg(i.rotation.z);const u=new de("#3f0c0c",.2);s.add(u);const a=new z("#ff0000",10);a.position.set(0,2.2,2.5),s.add(a);const r={nextFlicker:0,baseIntensity:10,hauteur:1.5,amplitude:1.5,speed:1.2},m=new z("#ff0033",6,20,2);m.position.set(-3.5,r.hauteur,3.5),m.castShadow=!0;const h=new z("#660033",6,20,2);h.position.set(3.5,r.hauteur,3.5),h.castShadow=!0,s.add(m,h);const v=new z("#ff0000",100,100);v.position.set(-.3,4.3,-38.7),v.castShadow=!0,s.add(v);function w(f){m.position.y=r.hauteur+Math.sin(f*r.speed+3)*r.amplitude,h.position.y=r.hauteur+Math.sin(f*r.speed+3)*r.amplitude,f>r.nextFlicker&&(a.intensity=Math.random()<.3?.2:r.baseIntensity*(.3+Math.random()*.7),r.nextFlicker=f+.05+Math.random()*1)}return{indoorLight:v,pointLight1:i,doorLight:a,lights:[m,h],animateLights:w,config:r}}function Ie(s=64){const e=document.createElement("canvas");e.width=e.height=s;const i=e.getContext("2d");i.clearRect(0,0,s,s),i.beginPath(),i.arc(s/2,s/2,s/2,0,Math.PI*2),i.fillStyle="white",i.fill();const u=new ve(e);return u.needsUpdate=!0,u}function qe(s){const e={count:500,size:.01,color:16720418,globalX:0,globalY:0,globalZ:8,amplitudeX:.15,amplitudeY:.25,amplitudeZ:.15,speed:1};let i=new Float32Array(e.count*3),u=new Float32Array(e.count*3);function a(){i=new Float32Array(e.count*3),u=new Float32Array(e.count*3);for(let w=0;w<e.count;w++){const f=w*3;i[f+0]=(Math.random()-.5)*10+e.globalX,i[f+1]=Math.random()*3+.2+e.globalY,i[f+2]=(Math.random()-.5)*10-2+e.globalZ,u[f+0]=i[f+0],u[f+1]=i[f+1],u[f+2]=i[f+2]}}const r=new fe;r.setAttribute("position",new pe(u,3));const m=new he({size:e.size,map:Ie(),color:e.color}),h=new me(r,m);s.add(h);function v(w){const f=h.geometry.attributes.position.array;for(let g=0;g<e.count;g++){const y=g*3;f[y+0]=i[y+0]+Math.sin(w*e.speed+g)*e.amplitudeX,f[y+1]=i[y+1]+Math.sin(w*e.speed*.8+g)*e.amplitudeY,f[y+2]=i[y+2]+Math.cos(w*e.speed*1.1+g)*e.amplitudeZ}h.geometry.attributes.position.needsUpdate=!0}return a(),{particleSystem:h,animateParticles:v,particleParams:e}}function Fe(s,e,i,u){let a=!1,r=0,m=!1,h=!1;const v=new ee(0,1,8),w=new ee(0,2,-39);function f(){const n=document.documentElement.scrollHeight-window.innerHeight;n>0&&(r=Math.min(window.scrollY/n,1))}window.addEventListener("scroll",f,{passive:!1}),window.addEventListener("touchmove",f,{passive:!1});let g,y,x,M;const C=document.querySelector(".overlay"),R=document.querySelector("#enter"),k=document.querySelector("#toggle-sound"),F=new Audio("./sounds/musique.mp3");function L(){g&&(h=!h,h?(M.gain.value=0,k.classList.add("muted"),document.querySelectorAll(".wave").forEach((l,c)=>{S.to(l,{height:"2px",duration:.5,delay:c*.1,ease:"power2.inOut"})})):(M.gain.value=.1+.9*r,k.classList.remove("muted"),document.querySelectorAll(".wave").forEach((l,c)=>{S.to(l,{height:"100%",duration:.8,delay:c*.1,ease:"elastic.out(1, 0.5)",onComplete:()=>o()})})))}k&&k.addEventListener("click",n=>{n.stopPropagation(),L()});function o(){if(h)return;const n=document.querySelectorAll(".wave"),l=Date.now(),c=.002;n.forEach((p,d)=>{const T=d*.5,D=5+15*Math.sin(l*c+T);p.style.height=`${D}px`,p.style.transform=`scaleY(${D/20})`}),requestAnimationFrame(o)}R.addEventListener("click",()=>{s.position.copy(v),s.lookAt(0,2,0),a=!0,i.enabled=!1,C.style.opacity=0,setTimeout(()=>{C.style.display="none";const n=document.querySelector("#toggle-sound"),l=document.querySelector(".music-credit");n&&(n.style.display="flex"),l&&(l.style.display="block"),S.from([n,l],{opacity:0,y:20,duration:.5,stagger:.1,ease:"power2.out"})},600),g=new(window.AudioContext||window.webkitAudioContext),y=g.createMediaElementSource(F),x=g.createBiquadFilter(),M=g.createGain(),x.type="lowpass",x.frequency.value=200,x.Q.value=.5,y.connect(x),x.connect(M),M.connect(g.destination),F.currentTime=0,F.play().catch(n=>console.log("La lecture a échoué :",n)),o()});function t(){if(a&&!m&&(s.position.lerpVectors(v,w,r),h||(M.gain.value=.1+.9*r),x&&(x.frequency.value=200+21850*r),r>=1&&!m)){m=!0,a=!1;const n=S.timeline();n.to(s.position,{x:v.x,y:v.y,z:v.z,duration:3,ease:"power2.inOut"},0),h||n.to(M.gain,{value:.1,duration:3,ease:"power2.inOut"},0),n.to(x.frequency,{value:200,duration:3,ease:"power2.inOut",onComplete:()=>{window.scrollTo({top:0,behavior:"instant"}),r=0,m=!1,a=!0,i.enabled=!1}},0)}}return{scrollEnabled:()=>a,finalAnimationTriggered:()=>m,camStart:v,camEnd:w,updateCamera:t}}function Xe(){const s=new we,e=s.load("./textures/floor/forest_ground_04_diff_4k.jpg"),i=s.load("./textures/floor/forest_ground_04_disp_4k.png"),u=s.load("./textures/floor/forest_ground_04_nor_dx_4k.jpg"),a=s.load("./textures/floor/forest_ground_04_rough_4k.jpg");e.colorSpace=H,e.repeat.set(8,8),u.repeat.set(8,8),i.repeat.set(8,8),a.repeat.set(8,8),e.wrapS=e.wrapT=b,u.wrapS=u.wrapT=b,i.wrapS=i.wrapT=b,a.wrapS=a.wrapT=b;const r=s.load("./textures/walls/stone_brick_wall_001_diff_4k.jpg"),m=s.load("./textures/walls/stone_brick_wall_001_disp_4k.png"),h=s.load("./textures/walls/stone_brick_wall_001_nor_dx_4k.jpg"),v=s.load("./textures/walls/stone_brick_wall_001_ao_4k.jpg"),w=s.load("./textures/walls/stone_brick_wall_001_rough_4k.jpg");r.colorSpace=H,r.repeat.set(8,8),h.repeat.set(8,8),m.repeat.set(8,8),w.repeat.set(8,8),v.repeat.set(8,8),r.wrapS=r.wrapT=b,h.wrapS=h.wrapT=b,m.wrapS=m.wrapT=b,w.wrapS=w.wrapT=b,v.wrapS=v.wrapT=b;const f=s.load("./textures/indoorfloor/floor_tiles_06_diff_4k.jpg"),g=s.load("./textures/indoorfloor/floor_tiles_06_disp_4k.jpg"),y=s.load("./textures/indoorfloor/floor_tiles_06_nor_dx_4k.jpg"),x=s.load("./textures/indoorfloor/floor_tiles_06_ao_4k.jpg"),M=s.load("./textures/indoorfloor/floor_tiles_06_rough_4k.jpg");return r.colorSpace=H,f.repeat.set(32,32),y.repeat.set(32,32),g.repeat.set(32,32),M.repeat.set(32,32),x.repeat.set(32,32),f.wrapS=f.wrapT=b,y.wrapS=y.wrapT=b,g.wrapS=g.wrapT=b,M.wrapS=M.wrapT=b,x.wrapS=x.wrapT=b,{floorColorTexture:e,floorDisplacementTexture:i,floorNormalTexture:u,floorRoughnessTexture:a,wallsColorTexture:r,wallsNormalTexture:h,wallsDisplacementTexture:m,wallsRoughnessTexture:w,wallsAOTexture:v,floorIndoorColorTexture:f,floorIndoorNormalTexture:y,floorIndoorDisplacementTexture:g,floorIndoorRoughnessTexture:M,floorIndoorAOTexture:x}}var ze=`varying vec2 vUv;

void main() {\r
    vUv = uv;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`,Ue=`precision mediump float;\r
uniform float uTime;

void main() {\r
    float bpm = 202.0;\r
    float period = 60.0 / bpm; 
    float phase = mod(uTime, period); 
 \r
    float fadeDuration = 0.2;

    float isRed = 1.0 - smoothstep(0.0, fadeDuration, phase);

    vec3 color = vec3(1.0, 0.0, 0.0) * isRed;

    gl_FragColor = vec4(color, 1.0);\r
}`;function Ye(s){const e=new Z({vertexShader:ze,fragmentShader:Ue,uniforms:{uTime:{value:0}}}),i={positionX:0,positionY:6.7,positionZ:0,rotateX:0,scaleX:3.6,scaleY:.9,scaleZ:1.7},u=new X(5,5,10,10),a=new j(u,e);return a.position.set(i.positionX,i.positionY,i.positionZ),a.scale.set(i.scaleX,i.scaleY,i.scaleZ),a.rotation.x=i.rotateX,s.add(a),{shaderPlane:a,material:e}}var Ze=`varying vec2 vUv;

void main() {\r
    vUv = uv;\r
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);\r
}`,Ne=`precision mediump float;\r
varying vec2 vUv;\r
uniform float uTime;

void main() {\r
    
    float movingUv = vUv.x + uTime * 0.05;\r
    \r
    
    float strength = mod(movingUv * 10.0, 1.0);\r
    strength = step(0.8, strength);

    
    gl_FragColor = vec4(strength, 0.0, 0.0, 1.0);\r
}`;function Be(s){const e=new Z({vertexShader:Ze,fragmentShader:Ne,uniforms:{uTime:{value:0}},side:oe}),i=new J;let u;return i.load("./models/tunnel.glb",a=>{u=a.scene,u.traverse(r=>{r.isMesh&&(r.material=e)}),s.add(u)}),{tunnelModel:u,shaderMaterial:e}}var Ge=`varying vec2 vUv;

void main() {\r
    vUv = uv;\r
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);\r
}`,$e=`precision mediump float;\r
varying vec2 vUv;\r
uniform float uTime;

void main() {\r
    
    float movingUv = vUv.y - uTime * 0.1; 

    
    float pattern = mod(movingUv * 10.0, 1.0); 
    float strength = step(0.9, pattern); 

    
    gl_FragColor = vec4(strength, 0.0, 0.0, 1.0);\r
}`;function We(s){const e={baseX:-2.7,baseZ:-25.6,spacing:6.2,width:.7,height:20,depth:.7,positionY:0,scaleX:1,scaleY:1,scaleZ:1},i=new ge;s.add(i);function u(){for(let a=0;a<4;a++)for(let r=0;r<4;r++){const m=e.baseX+(a-1)*e.spacing,h=e.baseZ+(r-1)*e.spacing,v=new ye(e.width,e.height,e.depth),w=new Z({vertexShader:Ge,fragmentShader:$e,uniforms:{uTime:{value:0}}}),f=new j(v,w);f.position.set(m,e.positionY,h),f.scale.set(e.scaleX,e.scaleY,e.scaleZ),i.add(f)}}return u(),{postsGroup:i,postsGroupParams:e}}var He=`varying vec2 vUv;\r
varying vec3 vPosition;

void main() {\r
    vUv = uv;\r
    vPosition = position;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`,Ve=`uniform float time;\r
uniform vec3 color;\r
uniform float density;\r
uniform float speed;\r
uniform vec2 resolution;\r
varying vec2 vUv;\r
varying vec3 vPosition;

float rand(vec2 n) {\r
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\r
}

float noise(vec2 p) {\r
    vec2 ip = floor(p);\r
    vec2 u = fract(p);\r
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(\r
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),\r
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),\r
        u.y);

    return res * res;\r
}

float fbm(vec2 x) {\r
    float v = 0.0;\r
    float a = 0.5;\r
    vec2 shift = vec2(100.0);

    for (int i = 0; i < 4; ++i) {\r
        v += a * noise(x);\r
        x = x * 2.0 + shift;\r
        a *= 0.5;\r
    }

    return v;\r
}

void main() {\r
    
    vec2 uv = vUv * 2.0 - 1.0;\r
    uv.x *= resolution.x / resolution.y;

    
    uv.y += time * speed;

    
    float f = fbm(uv * 4.0);

    
    float smokeIntensity = smoothstep(0.2, 0.8, f) * density;

    
    vec3 smoke = mix(vec3(0.0), color, smokeIntensity);

    
    float dist = length(uv);\r
    smoke *= 1.0 - smoothstep(0.5, 1.5, dist);

    
    float alpha = smoothstep(0.2, 0.8, f) * 0.8;

    gl_FragColor = vec4(smoke, alpha);\r
}`;function Ke(s){const e={position:{x:0,y:.3,z:-27.3},scale:{x:1,y:1},density:.1,color:0,speed:.1},i=new X(20,20,32,32),u=new Z({uniforms:{time:{value:0},color:{value:new Me(e.color)},density:{value:e.density},speed:{value:e.speed},resolution:{value:new xe(1,1)}},vertexShader:He,fragmentShader:Ve,transparent:!0,side:oe,depthWrite:!1}),a=new j(i,u);return a.position.set(e.position.x,e.position.y,e.position.z),a.scale.set(e.scale.x,e.scale.y,1),a.rotation.x=-Math.PI/2,s.add(a),{smokePlane:a,smokeMaterial:u}}var Je=`varying vec2 vUv;

void main() {\r
    vUv = uv;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`,Qe=`precision mediump float;\r
uniform float uTime;

void main() {\r
    float bpm = 130.0;\r
    float period = 60.0 / bpm; 
    float phase = mod(uTime, period); 
 \r
    float fadeDuration = 0.2;

    float isRed = 1.0 - smoothstep(0.0, fadeDuration, phase);

    vec3 color = vec3(1.0, 0.0, 0.0) * isRed;

    gl_FragColor = vec4(color, 1.0);\r
}`;function et(s){const e=new Z({vertexShader:Je,fragmentShader:Qe,uniforms:{uTime:{value:0}}}),i={positionX:0,positionY:8.5,positionZ:-40,rotateX:0,scaleX:10.2,scaleY:11.7,scaleZ:1.7},u=new X(10,10,10,10),a=new j(u,e);return a.position.set(i.positionX,i.positionY,i.positionZ),a.scale.set(i.scaleX,i.scaleY,i.scaleZ),a.rotation.x=i.rotateX,s.add(a),{shaderIndoor:a,materialIndoor:e}}let E,ae,V,tt=new ie,_={size:1e3,position:{x:1.6,y:.1,z:-18},scale:{x:.5,y:.5,z:.5},spread:50};function nt(){if(!E)return;const s=tt.getElapsedTime(),e=new re;for(let i=0;i<_.size;i++)E.getMatrixAt(i,e.matrix),e.matrix.decompose(e.position,e.quaternion,e.scale),e.position.y=_.position.y+.5+Math.sin(s*4+i)*.1,e.updateMatrix(),E.setMatrixAt(i,e.matrix);E.instanceMatrix.needsUpdate=!0}function ot(s){V=s,rt()}function rt(){new J().load("./models/bonhomme.glb",e=>{ae=e.scene.children[0],st()},void 0,e=>console.error("Erreur de chargement du modèle :",e))}function it(){return new ne({color:0})}function st(){E&&V.remove(E);const e=ae.clone().geometry,i=it();E=new _e(e,i,_.size);const u=new re;for(let a=0;a<_.size;a++)u.position.set((Math.random()-.5)*_.spread+_.position.x,_.position.y,(Math.random()-.5)*_.spread+_.position.z),u.rotation.y=Math.random()*Math.PI*2,u.scale.set(_.scale.x,_.scale.y,_.scale.z),u.updateMatrix(),E.setMatrixAt(a,u.matrix);E.scale.set(_.scale.x,_.scale.y,_.scale.z),E.position.set(_.position.x,_.position.y,_.position.z),V.add(E)}S.registerPlugin(se);document.addEventListener("DOMContentLoaded",()=>{document.fonts.ready.then(()=>{let s=se.create(".text",{type:"chars"});S.from(s.chars,{y:100,autoAlpha:0,stagger:.1,opacity:1})})});const le=document.querySelector("canvas.webgl"),O=new Se,at=Xe(),{floor:lt}=Re(O,at),ct=je(O);O.fog=new be("#000000",10,25);const P={width:window.innerWidth,height:window.innerHeight},I=new Le(75,P.width/P.height,.1,100);I.position.set(0,3,8);O.add(I);const q=new Ee(I,le);q.enableDamping=!0;q.enableRotate=!1;q.enablePan=!1;q.enableZoom=!1;const A=new Te({canvas:le});A.setSize(P.width,P.height);A.setPixelRatio(Math.min(window.devicePixelRatio,2));A.shadowMap.enabled=!0;A.shadowMap.type=Oe;A.toneMapping=Pe;A.toneMappingExposure=1;const G=new Ce(A);G.addPass(new ke(O,I));const ut=new Ae(De);G.addPass(ut);lt.receiveShadow=!0;const dt=qe(O),{updateCamera:ft}=Fe(I,O,q),{material:pt}=Ye(O),{shaderMaterial:ht}=Be(O),{postsGroup:mt}=We(O),{smokeMaterial:vt}=Ke(O),{materialIndoor:wt}=et(O);ot(O);window.addEventListener("resize",()=>{P.width=window.innerWidth,P.height=window.innerHeight,I.aspect=P.width/P.height,I.updateProjectionMatrix(),A.setSize(P.width,P.height),A.setPixelRatio(Math.min(window.devicePixelRatio,2)),G.setSize(P.width,P.height)});const gt=new ie,ce=()=>{const s=gt.getElapsedTime();ct.animateLights(s),dt.animateParticles(s),pt.uniforms.uTime.value+=.01,wt.uniforms.uTime.value+=.01,ht.uniforms.uTime.value+=.01,vt.uniforms.time.value+=.015,mt.children.forEach(e=>{e.material&&e.material.uniforms&&e.material.uniforms.uTime&&(e.material.uniforms.uTime.value+=.01)}),nt(),ft(),q.enabled&&q.update(),G.render(),window.requestAnimationFrame(ce)};ce();var N={exports:{}},te;function yt(){if(te)return N.exports;te=1;var s=typeof Reflect=="object"?Reflect:null,e=s&&typeof s.apply=="function"?s.apply:function(t,n,l){return Function.prototype.apply.call(t,n,l)},i;s&&typeof s.ownKeys=="function"?i=s.ownKeys:Object.getOwnPropertySymbols?i=function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:i=function(t){return Object.getOwnPropertyNames(t)};function u(o){console&&console.warn&&console.warn(o)}var a=Number.isNaN||function(t){return t!==t};function r(){r.init.call(this)}N.exports=r,N.exports.once=k,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var m=10;function h(o){if(typeof o!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof o)}Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return m},set:function(o){if(typeof o!="number"||o<0||a(o))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+o+".");m=o}}),r.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(t){if(typeof t!="number"||t<0||a(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this};function v(o){return o._maxListeners===void 0?r.defaultMaxListeners:o._maxListeners}r.prototype.getMaxListeners=function(){return v(this)},r.prototype.emit=function(t){for(var n=[],l=1;l<arguments.length;l++)n.push(arguments[l]);var c=t==="error",p=this._events;if(p!==void 0)c=c&&p.error===void 0;else if(!c)return!1;if(c){var d;if(n.length>0&&(d=n[0]),d instanceof Error)throw d;var T=new Error("Unhandled error."+(d?" ("+d.message+")":""));throw T.context=d,T}var D=p[t];if(D===void 0)return!1;if(typeof D=="function")e(D,this,n);else for(var Q=D.length,ue=M(D,Q),l=0;l<Q;++l)e(ue[l],this,n);return!0};function w(o,t,n,l){var c,p,d;if(h(n),p=o._events,p===void 0?(p=o._events=Object.create(null),o._eventsCount=0):(p.newListener!==void 0&&(o.emit("newListener",t,n.listener?n.listener:n),p=o._events),d=p[t]),d===void 0)d=p[t]=n,++o._eventsCount;else if(typeof d=="function"?d=p[t]=l?[n,d]:[d,n]:l?d.unshift(n):d.push(n),c=v(o),c>0&&d.length>c&&!d.warned){d.warned=!0;var T=new Error("Possible EventEmitter memory leak detected. "+d.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");T.name="MaxListenersExceededWarning",T.emitter=o,T.type=t,T.count=d.length,u(T)}return o}r.prototype.addListener=function(t,n){return w(this,t,n,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(t,n){return w(this,t,n,!0)};function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function g(o,t,n){var l={fired:!1,wrapFn:void 0,target:o,type:t,listener:n},c=f.bind(l);return c.listener=n,l.wrapFn=c,c}r.prototype.once=function(t,n){return h(n),this.on(t,g(this,t,n)),this},r.prototype.prependOnceListener=function(t,n){return h(n),this.prependListener(t,g(this,t,n)),this},r.prototype.removeListener=function(t,n){var l,c,p,d,T;if(h(n),c=this._events,c===void 0)return this;if(l=c[t],l===void 0)return this;if(l===n||l.listener===n)--this._eventsCount===0?this._events=Object.create(null):(delete c[t],c.removeListener&&this.emit("removeListener",t,l.listener||n));else if(typeof l!="function"){for(p=-1,d=l.length-1;d>=0;d--)if(l[d]===n||l[d].listener===n){T=l[d].listener,p=d;break}if(p<0)return this;p===0?l.shift():C(l,p),l.length===1&&(c[t]=l[0]),c.removeListener!==void 0&&this.emit("removeListener",t,T||n)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(t){var n,l,c;if(l=this._events,l===void 0)return this;if(l.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):l[t]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete l[t]),this;if(arguments.length===0){var p=Object.keys(l),d;for(c=0;c<p.length;++c)d=p[c],d!=="removeListener"&&this.removeAllListeners(d);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(n=l[t],typeof n=="function")this.removeListener(t,n);else if(n!==void 0)for(c=n.length-1;c>=0;c--)this.removeListener(t,n[c]);return this};function y(o,t,n){var l=o._events;if(l===void 0)return[];var c=l[t];return c===void 0?[]:typeof c=="function"?n?[c.listener||c]:[c]:n?R(c):M(c,c.length)}r.prototype.listeners=function(t){return y(this,t,!0)},r.prototype.rawListeners=function(t){return y(this,t,!1)},r.listenerCount=function(o,t){return typeof o.listenerCount=="function"?o.listenerCount(t):x.call(o,t)},r.prototype.listenerCount=x;function x(o){var t=this._events;if(t!==void 0){var n=t[o];if(typeof n=="function")return 1;if(n!==void 0)return n.length}return 0}r.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]};function M(o,t){for(var n=new Array(t),l=0;l<t;++l)n[l]=o[l];return n}function C(o,t){for(;t+1<o.length;t++)o[t]=o[t+1];o.pop()}function R(o){for(var t=new Array(o.length),n=0;n<t.length;++n)t[n]=o[n].listener||o[n];return t}function k(o,t){return new Promise(function(n,l){function c(d){o.removeListener(t,p),l(d)}function p(){typeof o.removeListener=="function"&&o.removeListener("error",c),n([].slice.call(arguments))}L(o,t,p,{once:!0}),t!=="error"&&F(o,c,{once:!0})})}function F(o,t,n){typeof o.on=="function"&&L(o,"error",t,n)}function L(o,t,n,l){if(typeof o.on=="function")l.once?o.once(t,n):o.on(t,n);else if(typeof o.addEventListener=="function")o.addEventListener(t,function c(p){l.once&&o.removeEventListener(t,c),n(p)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof o)}return N.exports}var xt=yt();const U=new Audio("./sounds/hoverbutton.mp3"),K=new Audio("./sounds/clickbutton.mp3");U.preload="auto";K.preload="auto";let B=!1;window.addEventListener("click",()=>{B=!0},{once:!0});const Mt=(s,e,i)=>(1-i)*s+i*e,_t=s=>({x:s.clientX,y:s.clientY}),St=(s,e,i,u)=>Math.sqrt(Math.pow(i-s,2)+Math.pow(u-e,2));let Y={x:0,y:0};window.addEventListener("mousemove",s=>{Y=_t(s)});class bt extends xt.EventEmitter{constructor(e){super(),this.DOM={el:e},this.DOM.text=this.DOM.el.querySelector(".button__text"),this.DOM.textinner=this.DOM.el.querySelector(".button__text-inner"),this.DOM.decoTop=this.DOM.el.querySelector(".button__deco--1"),this.DOM.decoBottom=this.DOM.el.querySelector(".button__deco--2"),this.renderedStyles={tx:{previous:0,current:0,amt:.1},ty:{previous:0,current:0,amt:.1},tx2:{previous:0,current:0,amt:.05},ty2:{previous:0,current:0,amt:.05}},this.state={hover:!1},this.calculateSizePosition(),this.initEvents(),requestAnimationFrame(()=>this.render())}calculateSizePosition(){this.rect=this.DOM.el.getBoundingClientRect(),this.distanceToTrigger=this.rect.width*1.5}initEvents(){this.onResize=()=>this.calculateSizePosition(),window.addEventListener("resize",this.onResize),this.DOM.el.addEventListener("mouseenter",()=>{B&&(U.currentTime=0,U.play().catch(e=>console.log("Hover audio error:",e))),this.enter()}),this.DOM.el.addEventListener("mouseleave",()=>{B&&(U.currentTime=0,U.play().catch(e=>console.log("Hover audio error:",e))),this.leave()}),this.DOM.el.addEventListener("click",()=>{B&&(K.currentTime=0,K.play().catch(e=>console.log("Click audio error:",e)))})}render(){const e=St(Y.x+window.scrollX,Y.y+window.scrollY,this.rect.left+this.rect.width/2,this.rect.top+this.rect.height/2);let i=0,u=0;e<this.distanceToTrigger?(this.state.hover||this.enter(),i=(Y.x+window.scrollX-(this.rect.left+this.rect.width/2))*.3,u=(Y.y+window.scrollY-(this.rect.top+this.rect.height/2))*.3):this.state.hover&&this.leave(),this.renderedStyles.tx.current=this.renderedStyles.tx2.current=i,this.renderedStyles.ty.current=this.renderedStyles.ty2.current=u;for(const a in this.renderedStyles)this.renderedStyles[a].previous=Mt(this.renderedStyles[a].previous,this.renderedStyles[a].current,this.renderedStyles[a].amt);S.set(this.DOM.decoTop,{x:this.renderedStyles.tx.previous,y:this.renderedStyles.ty.previous}),S.set(this.DOM.decoBottom,{x:this.renderedStyles.tx2.previous,y:this.renderedStyles.ty2.previous}),S.set(this.DOM.text,{x:this.renderedStyles.tx.previous*.5,y:this.renderedStyles.ty.previous*.5}),requestAnimationFrame(()=>this.render())}enter(){this.emit("enter"),this.state.hover=!0,this.DOM.el.classList.add("button--hover"),document.body.classList.add("active"),S.killTweensOf(document.body),S.killTweensOf(this.DOM.textinner),S.timeline().to(document.body,.2,{backgroundColor:"#000"}).to(this.DOM.textinner,.1,{ease:"Power3.easeOut",opacity:0,y:"-10%"},0).to(this.DOM.textinner,.2,{ease:"Expo.easeOut",opacity:1,startAt:{y:"20%"},y:"0%"})}leave(){this.emit("leave"),this.state.hover=!1,this.DOM.el.classList.remove("button--hover"),document.body.classList.remove("active"),S.killTweensOf(document.body),S.killTweensOf(this.DOM.textinner),S.timeline().to(document.body,.2,{backgroundColor:"#000"}).to(this.DOM.textinner,.1,{ease:"Power3.easeOut",opacity:0,y:"10%"},0).to(this.DOM.textinner,.2,{ease:"Expo.easeOut",opacity:1,startAt:{y:"-20%"},y:"0%"})}destroy(){window.removeEventListener("resize",this.onResize)}}new bt(document.getElementById("enter"));
//# sourceMappingURL=index-zZa6uT7P.js.map
