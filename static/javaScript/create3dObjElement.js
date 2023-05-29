import {CSS3DObject } from 'CSS3DRenderer';

export function create3dObjElement(inputDom,position,scene,transformControls){
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(inputDom, 'text/html');
    var element = document.createElement("div");
    element.appendChild(parsedHTML.body.firstChild);

    const object = new CSS3DObject(element);
    object.position.set(position.x, position.y,position.z-100);
    element.dataset.uuid = object.uuid;
    console.log(element)
    element.addEventListener('mousedown', function(event) {
        onClick(event, scene,transformControls,element);
    });
    element.addEventListener('touchstart', function(event) {
        onClick(event, scene, transformControls,element);
    });

    scene.add(object);
    return element;
}

function onClick(event,scene,transformControls,element){
    const uuid = event.target.parentNode.dataset.uuid;
    console.log(event.target)
    console.log(element)
    if (uuid !== undefined) {
        console.log("ok")
        scene.traverse(function (object) {
          if (object.uuid === uuid) {
            transformControls.attach(object);
            scene.add(transformControls)
          }
        });
    }
}