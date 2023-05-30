const translateModeButton=document.getElementById("id_translateModeButton");
const rotateModeButton=document.getElementById("id_rotateModeButton");
const scaleModeButton=document.getElementById("id_scaleModeButton");

let currentStatusButton=translateModeButton;

export function transformControlsModeChage(transformControls){

    translateModeButton.addEventListener("click",function(){
        transformControls.setMode("translate");
        currentStatusButton.style.borderColor="white";
        translateModeButton.style.borderColor = "green";
        currentStatusButton=translateModeButton;
    });

    rotateModeButton.addEventListener("click",function(){
        transformControls.setMode("rotate");
        currentStatusButton.style.borderColor="white";
        rotateModeButton.style.borderColor = "green";
        currentStatusButton=rotateModeButton;
    });

    scaleModeButton.addEventListener("click",function(){  
        transformControls.setMode("scale");
        currentStatusButton.style.borderColor="white";
        scaleModeButton.style.borderColor = "green";
        currentStatusButton=scaleModeButton;
    });

}