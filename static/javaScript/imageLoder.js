import * as THREE from 'three';
export let imageObjects=[];

export function imageLoder(scene,camera){
    document.getElementById('id_uploadImage').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            const image = new Image();
            image.src = imageUrl;
            image.onload = function () {
                const cameraPosition = camera.position.clone();
                const cameraDirection = camera.getWorldDirection(new THREE.Vector3());

                const aspectRatio = image.width / image.height; 
        
                const textureLoader = new THREE.TextureLoader();
                const texture = textureLoader.load(imageUrl);
        
                var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                const geometry = new THREE.PlaneGeometry(aspectRatio*50, 50);
  
        
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.copy(cameraPosition);
                mesh.position.x+=cameraDirection.x*100;
                mesh.position.z+=cameraDirection.z*100;

                scene.add(mesh);
                imageObjects.push(mesh);
                imageObjects[imageObjects.length-1].path=file.name;
            }
  
        };
      
        // 画像ファイルをData URL形式で読み込む
        reader.readAsDataURL(file);
      });
  }

  export function imageJsonLoad(scene,data) {
    console.log(data)

    for(let i=0; i<data.image.length; i++){
        const imagePath="static/project/"+data.project_require_data.project_name+"/image/"+data.image[i].path;

        const texLoader = new THREE.TextureLoader();
        texLoader.load(imagePath, 
            texture => {
                const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                const geometry = new THREE.PlaneGeometry(texture.image.width/2, texture.image.height/2);
                const mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set(data.image[i].position.x,data.image[i].position.y,data.image[i].position.z);
    
                scene.add(mesh);
            }
        );
    }
  }