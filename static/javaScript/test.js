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

renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // OrbitControlsを更新する
    renderer.render(scene, camera);
}
animate();
