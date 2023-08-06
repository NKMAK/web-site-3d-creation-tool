import * as THREE from 'three';

const selectElement = document.getElementById("id_decorationSelect");
let animationId;
let particleStarGroup;
let particleSnowGroup1=new THREE.Group();;
let particleSnowGroup2=new THREE.Group();;

export function starCreate(scene){
    particleStarGroup=createColorfulParticle(scene);
}


export function decorationSelectHandler(scene){
    selectElement.addEventListener("change", function() {
        const selectedIndex = selectElement.selectedIndex;
        switch(selectedIndex){
            case 1:
                cancelAnimationFrame(animationId);
                scene.remove(particleStarGroup);
                scene.remove(particleSnowGroup1);
                scene.remove(particleSnowGroup2);
                particleStarGroup=createColorfulParticle(scene);
                break;
            case 2:
                cancelAnimationFrame(animationId);
                scene.remove(particleStarGroup);
                createSnowParticle(scene);
                animate();
                break;
            case 3:
                break;
        }
    });
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

function createSnowParticle(scene) {
    for (let i = 0; i < 3000; i++) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 5, color: 0xffffff });
  
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
}

function animate() {
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