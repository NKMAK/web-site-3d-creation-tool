import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import{create3dObjElement} from"./create3dObjElement.js";
import {CameraController}from"./cameraController.js";
import{createInputHTML} from"./createInputHTML.js";
import{transformControlsModeChage}from "./transformControlsMode.js";
import {jsonExportSave} from"./jsonExportSave.js";
import { modelLoad,gltfObjects, uploadFileLoderGLTF } from './modelLoad.js';
import {cssActiveTransformControls, webGLActiveTransformControls} from "./acriveStateTransformControls.js"

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

const cssOrbitControls = new OrbitControls(camera, cssRender.domElement);
const webGLOrbitControls = new OrbitControls(camera, webGLRender.domElement);

const cssTransformControls = new TransformControls(
  camera, cssRender.domElement
)

const webGLtransformControls = new TransformControls(
  camera, webGLRender.domElement
)


const cssCameraControls = new CameraController(camera, cssRender,cssOrbitControls);
const webGLCameraControls = new CameraController(camera, cssRender,webGLOrbitControls);

cssActiveTransformControls(cssTransformControls,webGLtransformControls);

window.addEventListener('DOMContentLoaded', function(){
  
  const object=create3dObjElement("<button id='test'>aa</button>",camera.position,scene,cssTransformControls);

  transformControlsModeChage(cssTransformControls);
  cssTransformControls.name="TransformControls";
  webGLtransformControls.name="TransformControls";
  scene.add(cssTransformControls);
  scene.add(webGLtransformControls);
  createInputHTML(scene,camera,cssTransformControls);

  modelLoad(scene);
  uploadFileLoderGLTF(scene);
  uploadFileLoderImage(scene);

  const light = new THREE.DirectionalLight(0xffffff); 
  light.position.set(1, 1, 1); 
  scene.add(light);

  function animate() {

    requestAnimationFrame(animate);
    cssCameraControls.cameraPositionUpdate();
    webGLCameraControls.cameraPositionUpdate();
    cssOrbitControls.update();
    webGLOrbitControls.update();
    cssRender.render(scene, camera);
    webGLRender.render(scene,camera);
  }
  animate();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function onMouseClick(event) {
  if (event.button != 2) {
      return;
    }

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
          console.log("okokok")
          console.log(clickedObject)
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

document.getElementById("id_jsonExportButton").addEventListener("click",function(){
  jsonExportSave(scene,gltfObjects);
});

document.getElementById("id_sceneRemoveButton").addEventListener("click",function(){
  scene.remove(cssTransformControls.object);
  cssTransformControls.detach();
});

document.getElementById("id_modeHTMLButton").addEventListener("click",function(){
  webGLRender.domElement.style.opacity = 1.0;
  cssRender.domElement.style.zIndex = '1';
  webGLRender.domElement.style.zIndex = '0';
  cssActiveTransformControls(cssTransformControls,webGLtransformControls);
});

document.getElementById("id_modeModelButton").addEventListener("click",function(){
  webGLRender.domElement.style.opacity = 0.8;
  cssRender.domElement.style.zIndex = '0';
  webGLRender.domElement.style.zIndex = '1';
  webGLActiveTransformControls(cssTransformControls,webGLtransformControls);
});


function uploadFileLoderImage(scene){
  document.getElementById('id_inputFilePNG').addEventListener('change', function (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = function (event) {
        const imageUrl = event.target.result;
        const image = new Image();
        image.src = imageUrl;
        image.onload = function () {
          const aspectRatio = image.width / (image.height*0.75); 
      
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load(imageUrl);
      
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const geometry = new THREE.PlaneGeometry(aspectRatio*50, 50);

      
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        }

      };
    
      // 画像ファイルをData URL形式で読み込む
      reader.readAsDataURL(file);
    });
}