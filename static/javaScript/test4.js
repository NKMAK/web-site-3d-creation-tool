// 必要なライブラリとシーン、カメラ、レンダラーを用意する
import * as THREE from 'three';
import {TransformControls} from"TransformControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 立方体のジオメトリとマテリアルを作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 立方体のメッシュを作成
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// transformControlsを作成し、立方体にアタッチ
const controls = new TransformControls(camera, renderer.domElement);
controls.attach(cube);
scene.add(controls);

// カメラの位置を設定
camera.position.z = 5;

// レンダリングループを作成
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
