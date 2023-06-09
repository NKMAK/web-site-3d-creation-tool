import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import {CameraController}from"./cameraController.js";
import{createInputHTML} from"./createInputHTML.js";
import{transformControlsModeChage}from "./transformControlsMode.js";
import { modelLoad,gltfObjects, uploadFileLoderGLTF} from './modelLoad.js';
import {cssActiveTransformControls, webGLActiveTransformControls} from "./activeStateTransformControls.js";
import{imageLoder,imageObjects} from"./imageLoder.js";
import{uploadFiles} from"./uploadFiles.js";
import {jsonExport} from"./jsonExport.js";

const container=document.getElementById("id_canvasContainer");

const webGLRender = new THREE.WebGLRenderer({ alpha: true, antialias: true });
webGLRender.setClearColor( 0x000000, 0 );
webGLRender.setSize(window.innerWidth, window.innerHeight);

const cssRender = new CSS3DRenderer();
cssRender.setSize(window.innerWidth, window.innerHeight);
cssRender.domElement.style.top = 0;
container.appendChild(cssRender.domElement);
cssRender.domElement.appendChild(webGLRender.domElement);

const canvas = document.createElement('canvas');
const canvasWidth = window.innerWidth;
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
webGLRender.domElement.style.pointerEvents="none";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,100);

const cssOrbitControls = new OrbitControls(camera, cssRender.domElement);
const webGLOrbitControls = new OrbitControls(camera, webGLRender.domElement);

const cssTransformControls = new TransformControls(
  camera, cssRender.domElement
)

const webGLtransformControls = new TransformControls(
  camera, webGLRender.domElement
)


const cssCameraControls = new CameraController(camera, cssRender,cssOrbitControls);
const webGLCameraControls = new CameraController(camera, webGLRender,webGLOrbitControls);

cssActiveTransformControls(cssTransformControls,webGLtransformControls);

window.addEventListener('DOMContentLoaded', function(){
  transformControlsModeChage(cssTransformControls,webGLtransformControls);
  cssTransformControls.name="TransformControls";
  webGLtransformControls.name="TransformControls";
  scene.add(cssTransformControls);
  scene.add(webGLtransformControls);
  createInputHTML(scene,camera,cssTransformControls);

  modelLoad(scene);
  uploadFileLoderGLTF(scene,camera);
  imageLoder(scene,camera);

  const light = new THREE.DirectionalLight(0xffffff); 
  light.position.set(1, 1, 1); 
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    cssCameraControls.cameraPositionUpdate();
    webGLCameraControls.cameraPositionUpdate();
    //cssOrbitControls.update();
    //webGLOrbitControls.update();
    webGLRender.render(scene,camera);
    cssRender.render(scene, camera);

  }
  animate();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function onMouseClick(event) {
  if (event.button != 2) {
      return;
    }

    console.log("clixk")
    event.preventDefault();
    mouse.x = (event.clientX / cssRender.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / cssRender.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      let clickedObject = intersects[0].object;
      const parentGroup = clickedObject.parent;

      for(let i=0; i<intersects.length-1; i++){
        if(intersects[i].object.type=="TransformControlsPlane" || intersects[i].object.type=="webGLtransformControls"){
          clickedObject=intersects[i+1].object;
        }
        else{
          break;
        }
      }

      if (parentGroup && parentGroup.isGroup) {
        console.log("intersects")
        webGLtransformControls.attach(parentGroup);
        scene.add(webGLtransformControls)
      }
      else{
        webGLtransformControls.attach(clickedObject);
        scene.add(webGLtransformControls)
      }

    }
  }

  webGLRender.domElement.addEventListener('mousedown', onMouseClick);

});

document.getElementById("id_jsonExportButton").addEventListener("click",async function(){
  const projectName=prompt("名前を入力してください");
  const project_data=await jsonExport(scene,gltfObjects,imageObjects);
  await uploadFiles(projectName,project_data);
});

document.getElementById("id_sceneRemoveButton").addEventListener("click",function(){
  scene.remove(cssTransformControls.object);
  cssTransformControls.detach();
});

document.getElementById("id_modeHTMLButton").addEventListener("click",function(){
  webGLRender.domElement.style.opacity = 1.0;
  cssRender.domElement.style.zIndex = '1';
  webGLRender.domElement.style.zIndex = '0';
  webGLRender.domElement.style.pointerEvents="none";
  cssActiveTransformControls(cssTransformControls,webGLtransformControls);
});

document.getElementById("id_modeModelButton").addEventListener("click",function(){
  webGLRender.domElement.style.opacity = 0.8;
  cssRender.domElement.style.zIndex = '0';
  webGLRender.domElement.style.zIndex = '1';
  webGLRender.domElement.style.pointerEvents="auto";
  webGLActiveTransformControls(cssTransformControls,webGLtransformControls);
});

