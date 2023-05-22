import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import{create3dObjElement} from"../javaScript/create3dObjElement.js";
import {CameraController}from"./cameraMove.js";
import{createInputHTML} from"./createInputHTML.js"
import {jsonExportSave} from"./jsonExportSave.js";

const container=document.getElementById("id_canvasContainer");

const webGLRender = new THREE.WebGLRenderer();
webGLRender.setSize(window.innerWidth*0.75, window.innerHeight);
container.appendChild(webGLRender.domElement);

const cssRender = new CSS3DRenderer();
cssRender.setSize(window.innerWidth*0.75, window.innerHeight);

cssRender.domElement.style.top = 0;
container.appendChild(cssRender.domElement);

cssRender.domElement.style.zIndex = '1';
webGLRender.domElement.style.zIndex = '0';
webGLRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.top = 0;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,100);

const cssControls = new OrbitControls(camera, webGLRender.domElement);

//cssControls.addEventListener( 'start', change );
function change(){
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  const targetX = camera.position.x + cameraDirection.x;
  const targetY = camera.position.y+ cameraDirection.y;
  const targetZ = camera.position.z + cameraDirection.z;

  cssControls.target.set(targetX, targetY, targetZ);

}

const touchControls = new CameraController(camera, cssRender,cssControls);

window.addEventListener('DOMContentLoaded', function(){

  const object=create3dObjElement("<div><button>aa</button></div>",camera.position);
  scene.add(object);

  createInputHTML(scene,camera)
  
  // 立方体の形状を作成
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);
  // 物体を作成
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const transformControls = new TransformControls(
    camera, webGLRender.domElement
  )
  transformControls.addEventListener(
    'mouseDown', function(e){

    }.bind(this)
  )
  transformControls.addEventListener(
    'mouseUp', function(e){
      
    }.bind(this)
  )
  transformControls.attach( object );
  scene.add(transformControls)

  function animate() {
    let isCameraMove;

    requestAnimationFrame(animate);
    isCameraMove=touchControls.cameraPositionMove();
    change();
    cssControls.update();
    cssRender.render(scene, camera);
    webGLRender.render(scene,camera);
  }
  animate();


  function onClick(event) {
    if (event.button == 0) {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
  
      const intersects = raycaster.intersectObjects(scene.children);
  
      for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object.object;
        if(obj==undefined){
          continue;
        }
        if (obj.type == 'Object3D') {
          console.log(obj);
        }
      }
    }
  }
  
  window.addEventListener('click', onClick);

});

