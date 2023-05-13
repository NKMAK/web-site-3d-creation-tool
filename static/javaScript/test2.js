import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";


// JSON ファイルを読み込む
const loader = new THREE.ObjectLoader();
var scene = new THREE.Scene();

fetch('static/sceneJson/data.json')
  .then(response => response.json())
  .then(data => {
    for (var i = 0; i < data.length; i++) {
        var element = document.createElement(data[i].tagName);
        element.innerHTML = data[i].innerHTML;
      
        var object = new CSS3DObject(element);
        object.position.set(data[i].position.x, data[i].position.y, data[i].position.z);
        object.rotation.set(data[i].rotation.x, data[i].rotation.y, data[i].rotation.z);
        object.scale.set(data[i].scale.x, data[i].scale.y, data[i].scale.z);
      
        scene.add(object);
      }
      

  // WebGL レンダラーを作成
  const renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);
  // アニメーションループを開始
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  });
