import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import{create3dObjElement} from"./create3dObjElement.js";
import {CameraController}from"./cameraController.js";
import{createInputHTML} from"./createInputHTML.js";
import{transformControlsModeChage}from "./transformControlsMode.js";
import {jsonExportSave} from"./jsonExportSave.js";
import { modelLoad } from './modelLoad.js';

const container=document.getElementById("id_canvasContainer");

const webGLRender = new THREE.WebGLRenderer();
webGLRender.setSize(window.innerWidth*0.75, window.innerHeight);
container.appendChild(webGLRender.domElement);

const cssRender = new CSS3DRenderer();
cssRender.setSize(window.innerWidth*0.75, window.innerHeight);

cssRender.domElement.style.top = 0;
container.appendChild(cssRender.domElement);

const canvas = document.createElement('canvas');
const canvasWidth = window.innerWidth * 0.75;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

container.appendChild(canvas);

cssRender.domElement.style.zIndex = '1';
webGLRender.domElement.style.zIndex = '0';
cssRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.top = 0;
cssRender.domElement.style.top = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,100);

const orbitControls = new OrbitControls(camera, cssRender.domElement);

const cssTransformControls = new TransformControls(
  camera, cssRender.domElement
)

const webGLtransformControls = new TransformControls(
  camera, webGLRender.domElement
)

cssTransformControls.setSize(1.5);
webGLtransformControls.setSize(1.5);
const cameraControls = new CameraController(camera, cssRender,orbitControls);

window.addEventListener('DOMContentLoaded', function(){
  
  const object=create3dObjElement("<button id='test'>aa</button>",camera.position,scene,cssTransformControls);

  transformControlsModeChage(cssTransformControls);
  scene.add(cssTransformControls);
  scene.add(webGLtransformControls);
  createInputHTML(scene,camera,cssTransformControls);

// 平面ジオメトリの作成
const geometry = new THREE.BoxGeometry(8, 8,9);

// マテリアルの作成
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// メッシュの作成
const mesh = new THREE.Mesh(geometry, material);
mesh.name="test"
mesh.position.set(0,30,200)
scene.add(mesh);
  modelLoad(scene);

  const light = new THREE.DirectionalLight(0xffffff); 
  light.position.set(1, 1, 1); 
  scene.add(light);

  function animate() {
    let isCameraMove;

    requestAnimationFrame(animate);
    isCameraMove=cameraControls.cameraPositionUpdate();
    orbitControls.update();
    cssRender.render(scene, camera);
    webGLRender.render(scene,camera);
  }
  animate();

  const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  event.preventDefault();
  mouse.x = (event.clientX / cssRender.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / cssRender.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const parentGroup = clickedObject.parent;
    console.log(intersects)
    if (parentGroup && parentGroup.isGroup) {
      webGLtransformControls.attach(parentGroup);
    }
    else{
      console.log("okkokook")

      webGLtransformControls.attach(intersects[0].object);
    }
  }
}

window.addEventListener('click', onMouseClick, false);

});

document.getElementById("id_jsonExportButton").addEventListener("click",function(){
  jsonExportSave(scene);
});

document.getElementById("id_sceneRemoveButton").addEventListener("click",function(){
  scene.remove(cssTransformControls.object);
  cssTransformControls.detach();
});

document.getElementById("id_modeHTMLButton").addEventListener("click",function(){
  webGLRender.domElement.style.opacity = 1.0;
  cssRender.domElement.style.zIndex = '1';
  webGLRender.domElement.style.zIndex = '0';
});

document.getElementById("id_modeModelButton").addEventListener("click",function(){
  webGLRender.domElement.style.opacity = 0.7;
  cssRender.domElement.style.zIndex = '0';
  webGLRender.domElement.style.zIndex = '1';
});

