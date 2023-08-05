import * as THREE from 'three';
export function starCreate(scene){
    for (var i = 0; i < 2000; i++) {
        createParticle(scene)
    }
}


function createParticle(scene) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ size: 5, color: Math.random() * 0xffffff });
  
    let positions = [];
    const particle = new THREE.Vector3();
    particle.x = Math.random() * 4000 - 2000;
    particle.y = Math.random() * 2000 - 1000;
    particle.z = Math.random() * 4000 - 2000;
  
    positions.push(particle.x, particle.y, particle.z);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
  
    //return particles;
}