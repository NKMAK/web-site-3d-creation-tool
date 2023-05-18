import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {CameraController}from"./cameraMove.js";

window.addEventListener('DOMContentLoaded', function(){

  const scene = new THREE.Scene();

  const renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z=100;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableRotate = false;
  const touchControls = new CameraController(camera, renderer);

  function init(){
    fetch('static/sceneJson/data.json')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
          const element = document.createElement(data[i].tagName);
          element.innerHTML = data[i].innerHTML;
        
          const object = new CSS3DObject(element);
          object.position.set(data[i].position.x, data[i].position.y, data[i].position.z);
          object.rotation.set(data[i].rotation.x, data[i].rotation.y, data[i].rotation.z);
          object.scale.set(data[i].scale.x, data[i].scale.y, data[i].scale.z);
        
          scene.add(object);
        }
    });
  }

  function animate() {
  touchControls.cameraPositionMove();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  init();
  animate();
});

