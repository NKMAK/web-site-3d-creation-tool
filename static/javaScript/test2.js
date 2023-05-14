import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";


window.addEventListener('DOMContentLoaded', function(){

  const scene = new THREE.Scene();

  const renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z=100;
  const controls = new OrbitControls(camera, renderer.domElement);
  
// カメラの上方向を設定
const up = new THREE.Vector3(0, 1, 0);

// キー入力を格納するオブジェクト
const keys = {};

// カメラの移動速度
const speed = 1;

// キーボードイベントリスナーを設定する
document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

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

  // キー入力に応じてカメラを移動する
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  const moveVector = new THREE.Vector3();


  if (keys["KeyW"]){
    moveVector.add(cameraDirection.clone().multiplyScalar(speed));
  }
  if (keys["KeyA"]){
    moveVector.add(cameraDirection.clone().cross(up).normalize().multiplyScalar(-speed));
  }
  if (keys["KeyS"]){
    moveVector.add(cameraDirection.clone().multiplyScalar(-speed));
  } 
  if (keys["KeyD"]){
    moveVector.add(cameraDirection.clone().cross(up).normalize().multiplyScalar(speed));
  } 
  camera.position.add(moveVector);
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  init();
  animate();
});

