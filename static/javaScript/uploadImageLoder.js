import * as THREE from 'three';
export function uploadImageLoder(scene){
    document.getElementById('id_uploadImage').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          const image = new Image();
          image.src = imageUrl;
          image.onload = function () {
            const aspectRatio = image.width / (image.height*0.75); 
        
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(imageUrl);
        
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const geometry = new THREE.PlaneGeometry(aspectRatio*50, 50);
  
        
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
          }
  
        };
      
        // 画像ファイルをData URL形式で読み込む
        reader.readAsDataURL(file);
      });
  }