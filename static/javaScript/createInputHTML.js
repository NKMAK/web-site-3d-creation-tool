import * as THREE from 'three';
import {CSS3DObject } from 'CSS3DRenderer';

let clickedElement;

export function createInputHTML(scene,camera,transformControls) {
    const inputHTML=document.getElementById("id_inputHTML");
    const drawHTMLButton=document.getElementById("id_drawHTMLButton")
    
    drawHTMLButton.addEventListener("click", drawButtonKeyDown);

    function drawButtonKeyDown() {
         const object=create3dObjElement(inputHTML.value,scene,transformControls,camera);
    }
}

function create3dObjElement(inputDom,scene,transformControls,camera){
    const element = document.createElement("div");
    const group = new THREE.Group();
    const cssObject = new CSS3DObject(element);
    element.innerHTML=inputDom;
    element.dataset.uuid = cssObject.uuid;
    element.style.backgroundColor = "white";

    const cameraPosition = camera.position.clone();
    const cameraDirection = camera.getWorldDirection(new THREE.Vector3());

    element.addEventListener('mousedown', function(event) {
        onClick(event, scene,transformControls,element);
    },true);
    element.addEventListener('touchstart', function(event) {
        onClick(event, scene, transformControls,element);
    },true);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    
    group.add(cssObject);
    scene.add(group);
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type == "attributes" && mutation.attributeName == "style" && element.offsetHeight != 0) {

            const material = new THREE.MeshStandardMaterial({
                opacity: 0,
                color: new THREE.Color(0x000000),
                side: THREE.DoubleSide,
            });
            const geometry = new THREE.BoxGeometry(element.offsetWidth, element.offsetHeight, 1);
            const mesh = new THREE.Mesh(geometry, material);

            group.add(mesh);
            observer.disconnect();
            break;
          }
        }
      });
      group.position.copy(cameraPosition);
      group.position.x+=cameraDirection.x*100;
      group.position.z+=cameraDirection.z*100;
      group.rotation.x=camera.rotation.x;
      group.rotation.y=camera.rotation.y;
      group.rotation.z=camera.rotation.z;

      observer.observe(element, { attributes: true });

    return group;
}

function onClick(event,scene,transformControls,element){
  if (event.button == 0) {
    clickedElement = event.target;
  }
  if (event.button != 2) {
    return;
  }
  const uuid = event.target.parentNode.dataset.uuid;
  const uuid2 = event.target.dataset.uuid;

  if (uuid != undefined || uuid2 != undefined  ) {
    scene.traverse(function (object) {
      if (object.uuid == uuid) {
        transformControls.attach(object.parent);
        transformControls.position.set(object.position.x,object.position.y,object.position.z)

        object.parent.children.forEach((child, index) => {
          if(child.type=="Mesh"){
            child.geometry.dispose();
            const newGeometry = new THREE.BoxGeometry(element.offsetWidth, element.offsetHeight, 1);
            child.geometry = newGeometry;
            child.geometry.computeBoundingBox();
            child.geometry.computeBoundingSphere();
          }
        });
        scene.add(transformControls)
      }
      else if(object.uuid == uuid2){
        transformControls.attach(object.parent);
        transformControls.position.set(object.position.x,object.position.y,object.position.z)

        object.parent.children.forEach((child, index) => {
          if(child.type=="Mesh"){
            child.geometry.dispose();
            const newGeometry = new THREE.BoxGeometry(element.offsetWidth, element.offsetHeight, 1);
            child.geometry = newGeometry;
            child.geometry.computeBoundingBox();
            child.geometry.computeBoundingSphere();
          }
        });
        scene.add(transformControls)
      }
    });
  }
}

function handleMouseUp(event) {
  if (event.button == 0 && clickedElement != null) {
    clickedElement.focus();
    clickedElement = null;
  }
}