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
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(inputDom, 'text/html');
    const element = document.createElement("div");
    element.style.pointerEvents = 'auto';
    element.style.padding  = "30px";
    element.appendChild(parsedHTML.body.firstChild);

    const object = new CSS3DObject(element);
    object.position.set(position.x, position.y,position.z-100);
    element.dataset.uuid = object.uuid;
    console.log( element)
    element.addEventListener('mousedown', function(event) {
        onClick(event, scene,transformControls,element);
    },true);
    element.addEventListener('touchstart', function(event) {
        onClick(event, scene, transformControls,element);
    },true);

    scene.add(object);
    return element;
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
            transformControls.attach(object);
            scene.add(transformControls)
            console.log(transformControls)
          }
          else if(object.uuid == uuid2){
            console.log("ok")
            transformControls.attach(object);
  
            scene.add(transformControls)
            console.log(transformControls)
          }
        });
    }
}
