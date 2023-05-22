import{create3dObjElement} from"./create3dObjElement.js";

export function createInputHTML(scene,camera) {
    const inputHTML=document.getElementById("id_inputHTML");
    const drawHTMLButton=document.getElementById("id_drawHTMLButton")
    
    drawHTMLButton.addEventListener("click", drawButtonKeyDown);

    function drawButtonKeyDown() {
        const object=create3dObjElement(inputHTML.value,camera.position);
        scene.add(object);
    }
}