import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import{create3dObjElement} from"../javaScript/create3dObjElement.js";
import {CameraController}from"./cameraController.js";
import{createInputHTML} from"./createInputHTML.js"
import{transformControlsModeChage}from "./transformControlsMode.js"
import {jsonExportSave} from"./jsonExportSave.js";

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
webGLRender.domElement.style.position = 'absolute';
cssRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.top = 0;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,100);

const orbitControls = new OrbitControls(camera, cssRender.domElement);

const transformControls = new TransformControls(
  camera, cssRender.domElement
)
transformControls.setMode("translate");
transformControls.addEventListener(
  'mouseDown', function(e){

  }.bind(this)
)
transformControls.addEventListener(
  'mouseUp', function(e){
    
  }.bind(this)
)

const cameraControls = new CameraController(camera, cssRender,orbitControls);

window.addEventListener('DOMContentLoaded', function(){
  
  const object=create3dObjElement("<button id='test'>aa</button>",camera.position,scene,transformControls);

  transformControlsModeChage(transformControls);

  createInputHTML(scene,camera,transformControls);
  
  // 立方体の形状を作成
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);
  // 物体を作成
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);


  function animate() {
    let isCameraMove;

    requestAnimationFrame(animate);
    isCameraMove=cameraControls.cameraPositionUpdate();
    orbitControls.update();
    cssRender.render(scene, camera);
    webGLRender.render(scene,camera);
  }
  animate();

});