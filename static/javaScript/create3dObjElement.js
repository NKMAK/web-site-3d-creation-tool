import {CSS3DObject } from 'CSS3DRenderer';

export function create3dObjElement(inputDom,position){
    console.log(inputDom)
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(inputDom, 'text/html');
    var element = document.createElement("div");
    element.innerHTML =parsedHTML.body.firstChild.outerHTML;
    const object = new CSS3DObject(element);
    object.position.set(position.x, position.y,position.z-100);

    return object;
}