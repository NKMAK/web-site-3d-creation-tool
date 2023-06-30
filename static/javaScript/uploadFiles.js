const formData = new FormData();
const uploadGlbFiles=document.getElementById("id_uploadGlb");
const uploadImageFiles=document.getElementById("id_uploadImage");

uploadGlbFiles.addEventListener("change", function(){
  formData.append("glb_files", uploadGlbFiles.files[0]);
});

uploadImageFiles.addEventListener("change", function(){
  formData.append("image_files", uploadImageFiles.files[0]);
})

export function uploadFiles(projectName,json) {
  formData.append("project_name", projectName);
  formData.append("json_data", json);

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