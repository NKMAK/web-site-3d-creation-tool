import * as THREE from 'three';
import {CSS3DObject } from 'CSS3DRenderer';

export function createInputHTML(scene,camera,transformControls) {
    const inputHTML=document.getElementById("id_inputHTML");
    const drawHTMLButton=document.getElementById("id_drawHTMLButton")
    
    drawHTMLButton.addEventListener("click", drawButtonKeyDown);

    function drawButtonKeyDown() {
         const object=create3dObjElement(inputHTML.value,camera.position,scene,transformControls);
    }
}

function create3dObjElement(inputDom,position,scene,transformControls){
    const element = document.createElement("div");
    const group = new THREE.Group();
    const cssObject = new CSS3DObject(element);
    element.innerHTML=inputDom;
    cssObject.position.set(position.x, position.y,position.z-100);
    element.dataset.uuid = cssObject.uuid;

    element.addEventListener('mousedown', function(event) {
        onClick(event, scene,transformControls,element);
    },true);
    element.addEventListener('touchstart', function(event) {
        onClick(event, scene, transformControls,element);
    },true);
    group.add(cssObject);
    scene.add(group);
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type == "attributes" && mutation.attributeName == "style" && element.offsetHeight != 0) {

            const material = new THREE.MeshPhongMaterial({
                opacity: 0,
                color: new THREE.Color(0x000000),
                side: THREE.DoubleSide,
            });
            const geometry = new THREE.BoxGeometry(element.offsetWidth, element.offsetHeight, 1);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(position.x, position.y,position.z-100);

            group.add(mesh);
            observer.disconnect();
            break;
          }
        }
      });
      
      observer.observe(element, { attributes: true });

    return group;
}

function onClick(event,scene,transformControls,element){
    console.log(event.target)
    console.log("oko");
    if (event.button != 2) {
        return;
    }
    const uuid = event.target.parentNode.dataset.uuid;
    const uuid2 = event.target.dataset.uuid;

    if (uuid != undefined || uuid2 != undefined  ) {
        scene.traverse(function (object) {
          if (object.uuid == uuid) {
            transformControls.attach(object.parent);
            scene.add(transformControls)
          }
          else if(object.uuid == uuid2){
            transformControls.attach(object.parent);
            scene.add(transformControls)
          }
        });
    }
}