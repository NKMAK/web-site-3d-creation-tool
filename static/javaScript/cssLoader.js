
export function cssLoad(data) {
    const cssPath = "static/project/"+data.project_name+"/css/project.css";
    fetch(cssPath)
        .then(response => response.text())
        .then(css => {
            const linkElement = document.getElementById("id_loadCSS");
            linkElement.href = "data:text/css," + encodeURIComponent(css);
        })
        .catch(error => console.error("Failed to load CSS:", error));
}
