import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';
import {OrbitControls} from "OrbitControls";
import {TransformControls} from"TransformControls";
import {CameraController}from"./cameraMove.js";
import {jsonExportSave} from"./jsonExportSave.js";
// 初期化
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new CSS3DRenderer;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//develop
let elementTest;
const object=create3dObjElement("<button id='test'>aa</button>",camera.position);

// CSS3Dオブジェクトをsceneに追加
var css3DScene =  new THREE.Object3D();
await waitSceneAddCss3D();


// TransformControlsの作成
var transformControls = new TransformControls(camera, renderer.domElement);


// クリックイベントのハンドラ
function onClick(event) {
    console.log(event);
    console.log(elementTest)
    console.log(css3DScene);

    const uuid = event.target.parentNode.dataset.uuid;
  
    if (uuid !== undefined) {
      console.log("Clicked object3D uuid:", uuid);
      attachObjectByUuid(uuid); // uuidに対応するオブジェクトをアタッチ
    }

}

// クリックイベントのリスナーを追加


// アニメーションループ
function animate() {
  requestAnimationFrame(animate);
  renderer.render(css3DScene, camera);
}
animate();



//develop
function  create3dObjElement(inputDom,position){
    console.log(inputDom)
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(inputDom, 'text/html');
    elementTest = document.createElement("div");
    elementTest.appendChild(parsedHTML.body.firstChild); // パースした要素を追加する
    elementTest.addEventListener('mousedown', onClick);
    elementTest.addEventListener('touchstart', onClick);
    const object = new CSS3DObject(elementTest);
    elementTest.dataset.uuid = object.uuid;
    object.position.set(position.x, position.y,position.z-100);
    
    return object;
}

function attachObjectByUuid(uuid) {
    // シーン内のすべてのオブジェクトを検索
    css3DScene.traverse(function (object) {
        //console.log(object.uuid)
      if (object.uuid === uuid) {
        console.log("ok")
        // オブジェクトをTransformControlsにアタッチ
        transformControls.attach(object);
        css3DScene.add(transformControls)
      }
    });
  }

  async function waitSceneAddCss3D(){
    css3DScene.add(object);
    console.log(document.getElementById("test"))
  }