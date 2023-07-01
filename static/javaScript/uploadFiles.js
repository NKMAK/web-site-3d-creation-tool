const formData = new FormData();
const uploadGlbFiles=document.getElementById("id_uploadGlb");
const uploadImageFiles=document.getElementById("id_uploadImage");

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
  project_data.project_require_data.image_paths =image_paths;
  project_data.project_require_data.glb_paths =glb_paths;
  project_data.project_require_data.project_name =projectName;

  const json_data = JSON.stringify(project_data);

  formData.append("project_name", projectName);
  formData.append("json_data", json_data);

  fetch("/save_project", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error("エラー:", error);
  });
}

export function createFolder(projectName){
  formData.append("project_name", projectName);
}