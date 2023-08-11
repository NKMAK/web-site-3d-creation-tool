import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {CameraController}from"./cameraController.js";
import{modelJsonLoad}from"./modelLoad.js"
import{imageJsonLoad}from"./imageLoder.js"
import{cssLoad}from"./cssLoader.js"
import{jsonLoadDecoration}from"./decoration.js"

const container=document.getElementById("id_canvasContainer");

const webGLRender = new THREE.WebGLRenderer({ alpha: true, antialias: true });
webGLRender.setSize(window.innerWidth, window.innerHeight);
container.appendChild(webGLRender.domElement);
webGLRender.setClearColor( 0x000000,1);

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

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0,20,300);

const orbitControls = new OrbitControls(camera, cssRender.domElement);
const cameraControls = new CameraController(camera, cssRender,orbitControls);

const light = new THREE.DirectionalLight(0xffffff); 
light.position.set(1, 10, 1); 
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5); 
scene.add(ambientLight); 
const light2 = new THREE.DirectionalLight(0xFFFFFF, 1); 
scene.add(light2); 
const pointLight = new THREE.PointLight(0xffffff, 0.8); 
scene.add(pointLight); 

window.addEventListener('DOMContentLoaded', function(){
  init();
  //setTimeout(init,4000)
  function animate() {
    cameraControls.cameraPositionUpdate();
    orbitControls.update();
    cssRender.render(scene, camera);
    webGLRender.render(scene,camera);


    requestAnimationFrame(animate);
  }
  animate();
});

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

    const observer = new MutationObserver(function(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type == "attributes" && mutation.attributeName == "style" && element.offsetHeight != 0) {
          console.log(element.offsetWidth)
          //setTimeout(() => {console.log("ok"+element.offsetWidth),10000});

          const material = new THREE.MeshPhongMaterial({
              opacity: 0,
              color: new THREE.Color(0x000000),
              side: THREE.DoubleSide,
          });
          const geometry = new THREE.BoxGeometry(element.offsetWidth, element.offsetHeight, 1);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(data.html[i].position.x, data.html[i].position.y, data.html[i].position.z);
          mesh.rotation.set(data.html[i].rotation.x, data.html[i].rotation.y, data.html[i].rotation.z);
          mesh.scale.set(data.html[i].scale.x, data.html[i].scale.y, data.html[i].scale.z);

          group.add(mesh);
          break;
        }
      }    
    });

    observer.observe(element, { attributes: true });
    setTimeout(() => {
      scene.add(group);
  }, 1000);
  }
  modelJsonLoad(scene, data);
  imageJsonLoad(scene,data);
  cssLoad(data);
  jsonLoadDecoration(data.decoration,scene);
  webGLRender.setClearColor( data.webGLRenderColor,1);
}

