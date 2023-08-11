const translateModeButton=document.getElementById("id_translateModeButton");
const rotateModeButton=document.getElementById("id_rotateModeButton");
const scaleModeButton=document.getElementById("id_scaleModeButton");

let currentStatusButton=translateModeButton;

export function transformControlsModeChage(transformControls,webGLTransformControls){

    translateModeButton.addEventListener("click",function(){
        transformControls.setMode("translate");
        webGLTransformControls.setMode("translate");
        currentStatusButton.style.background = "linear-gradient(to bottom, rgba(0, 98, 255, 0.4), rgba(115, 253, 239, 0.4))";
        translateModeButton.style.background = "linear-gradient(to bottom, rgba(255, 0, 0, 0.4), rgba(255, 94, 244, 0.4))";
        currentStatusButton=translateModeButton;
    });

    rotateModeButton.addEventListener("click",function(){
        transformControls.setMode("rotate");
        webGLTransformControls.setMode("rotate");
        currentStatusButton.style.background = "linear-gradient(to bottom, rgba(0, 98, 255, 0.4), rgba(115, 253, 239, 0.4))";
        rotateModeButton.style.background = "linear-gradient(to bottom, rgba(255, 0, 0, 0.4), rgba(255, 94, 244, 0.4))";
        currentStatusButton=rotateModeButton;
    });

    scaleModeButton.addEventListener("click",function(){  
        transformControls.setMode("scale");
        webGLTransformControls.setMode("scale");
        currentStatusButton.style.background = "linear-gradient(to bottom, rgba(0, 98, 255, 0.4), rgba(115, 253, 239, 0.4))";
        scaleModeButton.style.background = "linear-gradient(to bottom, rgba(255, 0, 0, 0.4), rgba(255, 94, 244, 0.4))";
        currentStatusButton=scaleModeButton;
    });

}