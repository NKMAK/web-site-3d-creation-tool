import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {CameraController}from"./cameraController.js";
import{modelJsonLoad}from"./modelLoad.js"
import{imageJsonLoad}from"./imageLoder.js"

const container=document.getElementById("id_canvasContainer");

const webGLRender = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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

cssRender.domElement.style.zIndex = '0';
webGLRender.domElement.style.zIndex = '1';
webGLRender.domElement.style.position = 'absolute';
cssRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.top = 0;
webGLRender.domElement.style.pointerEvents="none";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,600);

const orbitControls = new OrbitControls(camera, cssRender.domElement);
const cameraControls = new CameraController(camera, cssRender,orbitControls);

window.addEventListener('DOMContentLoaded', function(){

  function init(){
    const data=project_json;
    for (let i = 0; i < data.html.length; i++) {
      const element = document.createElement(data.html[i].tagName);
      const group = new THREE.Group();

      element.innerHTML = data.html[i].innerHTML;
    
      const object = new CSS3DObject(element);
      object.position.set(data.html[i].position.x, data.html[i].position.y, data.html[i].position.z);
      object.rotation.set(data.html[i].rotation.x, data.html[i].rotation.y, data.html[i].rotation.z);
      object.scale.set(data.html[i].scale.x, data.html[i].scale.y, data.html[i].scale.z);
    
      group.add(object);
      scene.add(group);
      const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type == "attributes" && mutation.attributeName == "style" && element.offsetHeight != 0) {

            const material = new THREE.MeshPhongMaterial({
                opacity: 0,
                color: new THREE.Color(0x000000),
                side: THREE.DoubleSide,
            });
            const geometry = new THREE.BoxGeometry(element.offsetWidth, element.offsetHeight, 1);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(data.html[i].position.x, data.html[i].position.y, data.html[i].position.z);

            group.add(mesh);
            observer.disconnect();
            break;
          }
        }
      });
      
      observer.observe(element, { attributes: true });
    }
    modelJsonLoad(scene, data);
    imageJsonLoad(scene,data);
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

  const light = new THREE.DirectionalLight(0xffffff); 
  light.position.set(1, 1, 1); 
  scene.add(light);

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

