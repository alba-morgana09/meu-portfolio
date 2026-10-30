import * as THREE from 'three';

const container = document.getElementById('canvas-capivara');
if (container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(220, 220); 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(luzAmbiente);

    const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.6);
    luzDirecional.position.set(4, 6, 4);
    scene.add(luzDirecional);

    // Cores geradas por código
    const matCorpo = new THREE.MeshStandardMaterial({ color: 0xB5835A, roughness: 0.6 }); 
    const matRosa = new THREE.MeshStandardMaterial({ color: 0xE6399B, roughness: 0.4 }); 
    const matOlhos = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, roughness: 0.2 }); 

    const fifiGrupo = new THREE.Group();

    // O código molda as formas aqui:
    const corpo = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 1.1, 32), matCorpo);
    corpo.position.y = 0.5;
    fifiGrupo.add(corpo);

    const base = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), matCorpo);
    base.position.y = -0.02;
    base.rotation.x = Math.PI;
    fifiGrupo.add(base);

    const cabeca = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), matCorpo);
    cabeca.position.set(0, 1.35, 0.1);
    cabeca.scale.set(1, 0.9, 1.2); 
    fifiGrupo.add(cabeca);

    const focinho = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.4, 16), matCorpo);
    focinho.position.set(0, 1.25, 0.62);
    focinho.rotation.x = Math.PI / 2;
    fifiGrupo.add(focinho);

    const olhoEsq = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), matOlhos);
    olhoEsq.position.set(-0.25, 1.4, 0.65);
    olhoEsq.scale.set(1, 1.4, 0.3); 
    const olhoDir = olhoEsq.clone();
    olhoDir.position.x = 0.25;
    fifiGrupo.add(olhoEsq, olhoDir);

    const bochechaEsq = new THREE.Mesh(new THREE.CircleGeometry(0.09, 32), matRosa);
    bochechaEsq.position.set(-0.42, 1.22, 0.62);
    bochechaEsq.rotation.y = -Math.PI / 6;
    const bochechaDir = bochechaEsq.clone();
    bochechaDir.position.x = 0.42;
    bochechaDir.rotation.y = Math.PI / 6;
    fifiGrupo.add(bochechaEsq, bochechaDir);

    const foneGrupo = new THREE.Group();

    const arco = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.05, 16, 48, Math.PI), matRosa);
    arco.position.set(0, 1.35, 0.1); 
    arco.rotation.z = Math.PI; 
    foneGrupo.add(arco);

    const conchaEsq = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 32), matRosa);
    conchaEsq.position.set(-0.68, 1.35, 0.1);
    conchaEsq.rotation.z = Math.PI / 2;
    const conchaDir = conchaEsq.clone();
    conchaDir.position.x = 0.68;
    foneGrupo.add(conchaEsq, conchaDir);

    const orelhaGatoEsq = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.25, 4), matRosa);
    orelhaGatoEsq.position.set(-0.35, 1.98, 0.1);
    orelhaGatoEsq.rotation.z = -Math.PI / 12;
    const orelhaGatoDir = orelhaGatoEsq.clone();
    orelhaGatoDir.position.x = 0.35;
    orelhaGatoDir.rotation.z = Math.PI / 12;
    foneGrupo.add(orelhaGatoEsq, orelhaGatoDir);

    fifiGrupo.add(foneGrupo);
    scene.add(fifiGrupo);

    function animate() {
        requestAnimationFrame(animate);
        fifiGrupo.position.y = Math.sin(Date.now() * 0.002) * 0.06;
        fifiGrupo.rotation.y = Math.sin(Date.now() * 0.0008) * 0.15;
        renderer.render(scene, camera);
    }
    animate();
}
