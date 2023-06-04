export function cssActiveTransformControls(cssTransformControls,webGLCameraControls){
    cssTransformControls.enabled = true;
    webGLCameraControls.enabled = false;

    cssTransformControls.showX = true; 
    cssTransformControls.showY = true; 
    cssTransformControls.showZ = true;  

    webGLCameraControls.showX = false; 
    webGLCameraControls.showY = false; 
    webGLCameraControls.showZ = false;  
}

export function webGLActiveTransformControls(cssTransformControls,webGLCameraControls){
    cssTransformControls.enabled = false;
    webGLCameraControls.enabled = true;

    cssTransformControls.showX = false; 
    cssTransformControls.showY = false; 
    cssTransformControls.showZ = false;  

    webGLCameraControls.showX = true; 
    webGLCameraControls.showY = true; 
    webGLCameraControls.showZ = true;  
}