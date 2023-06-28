const formData = new FormData();
const uploadGlbFiles=document.getElementById("id_uploadGlb");

uploadGlbFiles.addEventListener("change", function(){
  formData.append("glb_files", uploadGlbFiles.files[0]);
})

export function uploadFiles(projectName) {
  formData.append("project_name", projectName);
  fetch('/save_project', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('エラー:', error);
  });
}

export function createFolder(projectName){
  formData.append("project_name", projectName);
}