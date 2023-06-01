const applyCssButton = document.getElementById("id_applyCssButton");

applyCssButton.addEventListener("click", applyCSS);

function applyCSS() {
    const inputCSS = document.getElementById("id_inputCSS").value;
    const blob = new Blob([inputCSS], { type: "text/css" });
    const cssURL = URL.createObjectURL(blob);
    document.getElementById("id_dynamicStylesheet").href = cssURL;
}