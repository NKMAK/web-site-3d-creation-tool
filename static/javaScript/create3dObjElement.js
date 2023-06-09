import {CSS3DObject } from 'CSS3DRenderer';

export function create3dObjElement(inputDom,position,scene,transformControls){
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(inputDom, 'text/html');
    var element = document.createElement("div");
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
  if (event.button != 2) {
    return;
  }
    const uuid = event.target.parentNode.dataset.uuid;
    const uuid2 = event.target.dataset.uuid;
    console.log(event.target)
    if (uuid != undefined || uuid2 != undefined  ) {
        scene.traverse(function (object) {
          if (object.uuid == uuid) {
            transformControls.attach(object);
            scene.add(transformControls)
          }
          else if(object.uuid == uuid2){
            console.log("ok")
            transformControls.attach(object);
            scene.add(transformControls)
          }
        });
    }
}