import * as THREE from 'three';

const selectElement = document.getElementById("id_decorationSelect");
let animationId;
let particleStarGroup;
let particleSnowGroup1=new THREE.Group();
let particleSnowGroup2=new THREE.Group();
let particleRainGroup1=new THREE.Group();
let particleRainGroup2=new THREE.Group();
let createDonutGroup=new THREE.Group();

export function decorationSelectHandler(scene){
    selectElement.addEventListener("change", function() {
        const selectedIndex = selectElement.selectedIndex;
        loadDecoration(selectedIndex,scene);
    });
}

export function jsonLoadDecoration(selectedIndex,scene){
    loadDecoration(selectedIndex,scene);
}

function loadDecoration(selectedIndex,scene){
    cancelAnimationFrame(animationId);
    scene.remove(particleStarGroup);
    scene.remove(particleSnowGroup1);
    scene.remove(particleSnowGroup2);
    scene.remove(createDonutGroup);
    switch(selectedIndex){
        case 0:
            break;
        case 1:
            particleStarGroup=createColorfulParticle(scene);
            break;
        case 2:
            const snowParticleNum=3000;
            const snowSpeed=5;
            createDownParticle(scene,0xffffff,snowParticleNum,snowSpeed);

            break;
        case 3:
            const rainParticleNum=3000;
            const rainSpeed=5;
            createDownParticle(scene,0x00b3ff,rainParticleNum,rainSpeed);
            break;
        case 4:
            createDonut(scene);
            break;
    }
}

function createColorfulParticle(scene) {
    const group = new THREE.Group();
    for (let i = 0; i < 3000; i++) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 5, color: Math.random() * 0xffffff });
  
        let positions = [];
        const particle = new THREE.Vector3();
        particle.x = Math.random() * 7000 - 3500;
        particle.y = Math.random() * 4000 - 2000;
        particle.z = Math.random() * 7000 - 3500;
  
        positions.push(particle.x, particle.y, particle.z);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
        const particles = new THREE.Points(geometry, material);
        group.add(particles);
    }
    scene.add(group);
    return group;
}

function createDownParticle(scene,color,particleNum,speed) {
    particleSnowGroup1=new THREE.Group();
    particleSnowGroup2=new THREE.Group();
    for (let i = 0; i < particleNum; i++) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 5, color: color });
  
        let positions = [];
        const particle = new THREE.Vector3();
        particle.x = Math.random() * 7000 - 3500;
        particle.y = Math.random() * 6000 - 3000;
        particle.z = Math.random() * 7000 - 3500;
  
        positions.push(particle.x, particle.y, particle.z);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
        const particles = new THREE.Points(geometry, material);
        (i < 1500) ?particleSnowGroup1.add(particles):particleSnowGroup2.add(particles);
    }
    particleSnowGroup1.position.y=0;
    particleSnowGroup2.position.y=3000;
    scene.add(particleSnowGroup1);
    scene.add(particleSnowGroup2);
    animate(speed);
}

function createDonut(scene){
    for(let i=0; i<10; i++){
        const donutGeometry = new THREE.TorusGeometry(200, 18, 3, 16);
        const DonutMesh = new THREE.MeshStandardMaterial({ wireframe: true, color: 0X00A5FF, roughness: 0.5, transparent: true, opacity: 1.0 });

        const donut=new THREE.Mesh(donutGeometry, DonutMesh)
        donut.position.set(0, 0, i*(-800));      
        createDonutGroup.add(donut)
    }
    scene.add( createDonutGroup);
}

function animate(speed) {
    animationId=requestAnimationFrame(animate);
    particleSnowGroup1.position.y -= 5;
    particleSnowGroup2.position.y -= 5;
    
    if (particleSnowGroup1.position.y < -3500) {
        particleSnowGroup1.position.y = 4000;
    } 
  
    if (particleSnowGroup2.position.y < -3500) {
        particleSnowGroup2.position.y = 4000;
    } 
}

