import * as THREE from 'three';

const selectElement = document.getElementById("id_decorationSelect");
let animationId;
let particleGroup;

export function starCreate(scene){
    particleGroup=createColorfulParticle(scene);
}


export function decorationSelectHandler(scene){
    selectElement.addEventListener("change", function() {
        const selectedIndex = selectElement.selectedIndex;
        switch(selectedIndex){
            case 1:
                cancelAnimationFrame(animationId);
                scene.remove(particleGroup);
                particleGroup=createColorfulParticle(scene);
                animate();
                break;
            case 2:
                cancelAnimationFrame(animationId);
                scene.remove(particleGroup);
                createSnowParticle(scene);
                break;
            case 3:
                break;
        }
    });
}



function createColorfulParticle(scene) {
    const group = new THREE.Group();
    for (var i = 0; i < 3000; i++) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 5, color: Math.random() * 0xffffff });
  
        let positions = [];
        const particle = new THREE.Vector3();
        particle.x = Math.random() * 7000 - 3500;
        particle.y = Math.random() * 2000 - 1000;
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
    const group = new THREE.Group();
    for (var i = 0; i < 3000; i++) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 5, color: 0xffffff });
  
        let positions = [];
        const particle = new THREE.Vector3();
        particle.x = Math.random() * 7000 - 3500;
        particle.y = Math.random() * 2000 - 1000;
        particle.z = Math.random() * 7000 - 3500;
  
        positions.push(particle.x, particle.y, particle.z);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
        const particles = new THREE.Points(geometry, material);
        group.add(particles);
    }
    scene.add(group);
    return group;
}

function animate() {
    animationId=requestAnimationFrame(animate);


    if (particleGroup.position.y < -1000) {
      particleGroup.position.y = 0;
    } else {
      particleGroup.position.y -= 1;
    }
  
  }