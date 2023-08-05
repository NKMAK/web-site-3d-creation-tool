export const colorPicker = document.getElementById("id_colorPicker");
colorPicker.value="#000000"

export function backColorChage(webGLRender){
    colorPicker.addEventListener("input", function() {
        webGLRender.setClearColor( colorPicker.value,1);
        console.log(colorPicker.value)
    });
}

