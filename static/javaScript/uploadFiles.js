const formData = new FormData();
const inputFile=document.getElementById('id_inputFile');

inputFile.addEventListener("change", function(){
  formData.append("glb_files", inputFile.files[0]);
})

export function uploadFiles() {
    console.log(formData)
    fetch('/glb_upload', {
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