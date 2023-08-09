import * as THREE from 'three';

const selectElement = document.getElementById("id_decorationSelect");
let animationId;
let particleStarGroup;
let particleGroup1=new THREE.Group();
let particleGroup2=new THREE.Group();
let donutGroup=new THREE.Group();
let randomShapeGroup=new THREE.Group();

export let decorationData=[];

export function decorationSelectHandler(scene){
    selectElement.addEventListener("change", function() {
        const selectedIndex = selectElement.selectedIndex;
        loadDecoration(selectedIndex,scene);
    });
}

export function jsonLoadDecoration(decorationData,scene){
    decorationData.forEach(selectedIndex => {
        loadDecoration(selectedIndex,scene);
    });
}

function loadDecoration(selectedIndex,scene){
    switch(selectedIndex){
        case 0:
            cancelAnimationFrame(animationId);
            scene.remove(particleStarGroup);
            scene.remove(particleGroup1);
            scene.remove(particleGroup2);
            scene.remove(donutGroup);
            scene.remove(randomShapeGroup);
            decorationData=[];
            break;
        case 1:
            particleStarGroup=createColorfulParticle(scene);
            decorationData.push(selectedIndex);
            break;

        case 2:
            const snowParticleNum=3000;
            const snowSpeed=5;
            createDownParticle(scene,0xffffff,snowParticleNum,snowSpeed);
            decorationData.push(selectedIndex);
            break;

        case 3:
            const rainParticleNum=3000;
            const rainSpeed=5;
            createDownParticle(scene,0x00b3ff,rainParticleNum,rainSpeed);
            decorationData.push(selectedIndex);
            break;

        case 4:
            createDonut(scene);
            decorationData.push(selectedIndex);
            break;
        case 5:
            createRandomShape(scene);
            decorationData.push(selectedIndex);
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
        particle.x = Math.random() * 8000 - 4000;
        particle.y = Math.random() * 4000 - 2000;
        particle.z = Math.random() * 8000 - 4000;
  
        positions.push(particle.x, particle.y, particle.z);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
        const particles = new THREE.Points(geometry, material);
        group.add(particles);
    }
    scene.add(group);
    return group;
}

function createDownParticle(scene,color,particleNum,speed) {
    particleGroup1=new THREE.Group();
    particleGroup2=new THREE.Group();
    for (let i = 0; i < particleNum; i++) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 5, color: color });
  
        let positions = [];
        const particle = new THREE.Vector3();
        particle.x = Math.random() * 8000 - 4000;
        particle.y = Math.random() * 6000 - 3000;
        particle.z = Math.random() * 8000 - 4000;
  
        positions.push(particle.x, particle.y, particle.z);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
        const particles = new THREE.Points(geometry, material);
        (i < 1500) ?particleGroup1.add(particles):particleGroup2.add(particles);
    }
    particleGroup1.position.y=0;
    particleGroup2.position.y=3000;
    scene.add(particleGroup1);
    scene.add(particleGroup2);
    animate(speed);
}

function createDonut(scene){
    for(let i=0; i<10; i++){
        const donutGeometry = new THREE.TorusGeometry(200, 18, 3, 16);
        const DonutMesh = new THREE.MeshStandardMaterial({ wireframe: true, color: 0X00A5FF, roughness: 0.5, transparent: true, opacity: 1.0 });

        const donut=new THREE.Mesh(donutGeometry, DonutMesh)
        donut.position.set(0, 0, i*(-800)-100);      
        donutGroup.add(donut)
    }
    scene.add( donutGroup);
}

function createRandomShape(scene) {
    let geometry;
    let shape;
    for(let i=0; i<300; i++){
        const geometryType = Math.floor(Math.random() * 4);
        const  material=new THREE.MeshBasicMaterial({ color: Math.random() *0xffffff, wireframe: true});
        switch (geometryType) {
        case 0: 
            geometry = new THREE.ConeGeometry(20, 20, 3);
            shape = new THREE.Mesh(geometry, material);
            break;

        case 1: 
            geometry = new THREE.SphereGeometry(25, 5, 5);
            shape = new THREE.Mesh(geometry,material);
            break;

        case 2: 
            geometry = new THREE.BoxGeometry(20, 20, 20);
            shape = new THREE.Mesh(geometry, material);
            break;

        case 3: 
            geometry = new THREE.CylinderGeometry(20,20, 30, 10);
            shape = new THREE.Mesh(geometry,material);
            break;
        }
        shape.position.x = Math.random() * 8000 - 4000;
        shape.position.y = Math.random() * 4000 - 2000;
        shape.position.z = Math.random() * 8000 - 4000;

        shape.rotation.x = Math.random() * Math.PI * 2;
        shape.rotation.y = Math.random() * Math.PI * 2;
        shape.rotation.z = Math.random() * Math.PI * 2;

        randomShapeGroup.add(shape);
    }
    scene.add(randomShapeGroup);
}

function animate(speed) {
    animationId=requestAnimationFrame(animate);
    particleGroup1.position.y -= 5;
    particleGroup2.position.y -= 5;
    
    if (particleGroup1.position.y < -3500) {
        particleGroup1.position.y = 4000;
    } 
  
    if (particleGroup2.position.y < -3500) {
        particleGroup2.position.y = 4000;
    } 
}

