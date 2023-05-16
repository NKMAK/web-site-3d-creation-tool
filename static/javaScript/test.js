import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import{create3dObjElement} from"../javaScript/create3dObjElement.js";
import {CameraController}from"../javaScript/cameraRotation.js";

const webGLRender = new THREE.WebGLRenderer();
webGLRender.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(webGLRender.domElement);

const cssRender = new CSS3DRenderer();
cssRender.setSize(window.innerWidth, window.innerHeight);
cssRender.domElement.style.position = 'absolute';
cssRender.domElement.style.top = 0;
document.body.appendChild(cssRender.domElement);

cssRender.domElement.style.zIndex = '1';
webGLRender.domElement.style.zIndex = '0';
webGLRender.domElement.style.position = 'absolute';
webGLRender.domElement.style.top = 0;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,20,100);

const cssControls = new OrbitControls(camera, cssRender.domElement);
const webGLControls = new OrbitControls(camera, webGLRender.domElement);


const touchControls = new CameraController(camera, cssRender,cssControls);
touchControls.enableRotation=false;   

window.addEventListener('DOMContentLoaded', function(){

  const object=create3dObjElement("<div><button>aa</button></div>",camera.position);
  scene.add(object);
  
// 立方体の形状を作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);
// 物体を作成
const material = new THREE.MeshBasicMaterial({ color: 0xffffff  });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

  const transformControls = new TransformControls(
    camera, cssRender.domElement
  )
  transformControls.addEventListener(
    'mouseDown', function(e){
     touchControls.enableRotation=false;   

    }.bind(this)
  )
  transformControls.addEventListener(
    'mouseUp', function(e){
      //touchControls.enableRotation=true;
    }.bind(this)
  )
  /// 移動対象のメッシュを指定
  transformControls.attach( object );
  /// TransformControlsを追加
  scene.add(transformControls)

  function animate() {
    requestAnimationFrame(animate);
    touchControls.test();
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
  

  function dl(){
    const objects = []; // CSS3Dオブジェクトを格納する配列
    
    // シーン内の全てのCSS3Dオブジェクトを取得し、配列に格納する
    scene.traverse(function(object) {
        if(object.element!=undefined&&object.type=="Object3D"){
            objects.push(object);
            console.log(object)
        }
    });
    
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
      //a.click();
    
    
    
  }
  

});

