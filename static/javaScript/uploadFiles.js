let formData = new FormData();
let uploadGlbFiles=document.getElementById("id_uploadGlb");
let uploadImageFiles=document.getElementById("id_uploadImage");

let image_paths=[];
let glb_paths=[];

uploadGlbFiles.addEventListener("change", function(){
  formData.append("glb_files", uploadGlbFiles.files[0]);
  glb_paths.push(uploadGlbFiles.files[0].name);
});

uploadImageFiles.addEventListener("change", function(){
  formData.append("image_files", uploadImageFiles.files[0]);
  image_paths.push(uploadImageFiles.files[0].name)
})

export function uploadFiles(projectName,project_data) {
  const inputCssText=document.getElementById("id_inputCSS").value;

  project_data.project_name =projectName;

  const json_data = JSON.stringify(project_data);

  formData.append("project_name", projectName);
  formData.append("json_data", json_data);
  formData.append("css_text", inputCssText);
  console.log(json_data)

  fetch("/save_project", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    formData=new FormData();
    console.log(result);
  })
  .catch(error => {
    console.error("エラー:", error);
  });
}

export function createFolder(projectName){
  formData.append("project_name", projectName);
}