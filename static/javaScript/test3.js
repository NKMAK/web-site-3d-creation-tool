import * as THREE from 'three';
import {CameraController}from"./cameraMove.js";

var scene, camera, renderer;
var touchStartX, touchStartY;
var touchMoveX = 0, touchMoveY = 0;
var touchSensitivity = 0.0002;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z=100;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const geometry = new THREE.BoxGeometry(10, 10, 10);

  // マテリアルを作成
  const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
  
  // メッシュを作成
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube)

  const touchControls = new CameraController(camera, renderer);
  // シーンの初期化などの処理
  touchControls.enableRotation=false; 
  // タッチ操作の有効化
  enableTouchControls();

  // アニメーションループの開始
  animate();
  function animate() {
    requestAnimationFrame(animate);
    touchControls.cameraPositionMove();
    // カメラの回転処理
    camera.rotation.y -= touchMoveX;
    camera.rotation.x -= touchMoveY;
  
    renderer.render(scene, camera);
  }
}

function enableTouchControls() {
  function onTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }

  function onTouchMove(event) {
    var touchX = event.touches[0].clientX;
    var touchY = event.touches[0].clientY;

    var deltaX = touchX - touchStartX;
    var deltaY = touchY - touchStartY;

    touchMoveX += deltaX * touchSensitivity;
    touchMoveY += deltaY * touchSensitivity;

    touchStartX = touchX;
    touchStartY = touchY;
  }

  function onTouchEnd() {
    touchMoveX = 0;
    touchMoveY = 0;
  }

  window.addEventListener('touchstart', onTouchStart, false);
  window.addEventListener('touchmove', onTouchMove, false);
  window.addEventListener('touchend', onTouchEnd, false);
}



// 初期化の呼び出し
init();
