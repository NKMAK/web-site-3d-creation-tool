const colorPicker = document.getElementById("id_colorPicker");

export function backColorChage(webGLRender){
    colorPicker.addEventListener("input", function() {
        webGLRender.setClearColor( colorPicker.value,1);
    });
}

