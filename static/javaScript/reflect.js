import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {CameraController}from"./cameraController.js";

const container=document.getElementById("id_canvasContainer");

const webGLRender = new THREE.WebGLRenderer();
webGLRender.setSize(window.innerWidth, window.innerHeight);
container.appendChild(webGLRender.domElement);

const cssRender = new CSS3DRenderer();
cssRender.setSize(window.innerWidth, window.innerHeight);

cssRender.domElement.style.top = 0;
container.appendChild(cssRender.domElement);

const canvas = document.createElement('canvas');
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

container.appendChild(canvas);

cssRender.domElement.style.zIndex = '1';
webGLRender.domElement.style.zIndex = '0';
webGLRender.domElement.style.position = 'absolute';
cssRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.top = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,100);

const orbitControls = new OrbitControls(camera, cssRender.domElement);
const cameraControls = new CameraController(camera, cssRender,orbitControls);

window.addEventListener('DOMContentLoaded', function(){

  function init(){
    fetch('static/sceneJson/data (1).json')
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
  var particles = [];

  function createParticle() {
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

    return particles;
  }

  // パーティクルを生成し、配列に格納
  for (var i = 0; i < 2000; i++) {
    particles.push(createParticle());
  }

  function animate() {
    cameraControls.cameraPositionUpdate();
    orbitControls.update();
    cssRender.render(scene, camera);
    webGLRender.render(scene,camera);


    requestAnimationFrame(animate);
  }

  init();
  animate();
});

