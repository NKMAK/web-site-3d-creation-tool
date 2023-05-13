import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";

var canvas = document.getElementById('renderCanvas');
var renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;
const controls = new OrbitControls(camera, renderer.domElement);

var element = document.createElement('div');
element.innerHTML = 'Hello World!';
var object = new CSS3DObject(element);
object.position.set(0, 0, -100);
scene.add(object);

var element2 = document.createElement('button');
element2.innerHTML = 'Hello World!';
var object2 = new CSS3DObject(element2);
object2.position.set(0, 20, -100);
scene.add(object2);

const objects = []; // CSS3Dオブジェクトを格納する配列

// シーン内の全てのCSS3Dオブジェクトを取得し、配列に格納する
scene.traverse(function(object) {
    if(object.type=="Object3D"){
        objects.push(object);
    }
});

renderer.render(scene, camera);

const data = objects.map(function(object) {
    return {
      id: object.element.id,
      tagName: object.element.tagName,
      innerHTML: object.element.innerHTML,
      position: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z
      },
      rotation: {
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z
      },
      scale: {
        x: object.scale.x,
        y: object.scale.y,
        z: object.scale.z
      }
    };
  });
  
  // JSONデータをダウンロードする
  const json = JSON.stringify(data);
  const a = document.createElement('a');
  const file = new Blob([json], {type: 'application/json'});
  a.href = URL.createObjectURL(file);
  a.download = 'data.json';
  a.click();

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // OrbitControlsを更新する
    renderer.render(scene, camera);
}
animate();
