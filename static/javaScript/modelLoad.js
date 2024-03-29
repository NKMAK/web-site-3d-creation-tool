import {GLTFLoader} from"GLTFLoader";
import * as THREE from 'three';

export let gltfObjects=[];

const inputFile=document.getElementById("id_uploadGlb");

export function createModel(jsonData,scene) {
  const models = jsonData.modelPaths;
  models.forEach(function (modelPath) {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        gltfObjects.push(model);
        gltfObjects[gltfObjects.length-1].path=modelPath;
      }
    );
  });
}
  
export function modelJsonLoad(scene,data) {

  const loader = new GLTFLoader();
  for(let i=0; i<data.gltf.length; i++){
    const glbPath="static/project/"+data.project_name+"/glb/"+data.gltf[i].path;
    loader.load(
      glbPath,
      function (gltf) {
        const model = gltf.scene;
        model.position.set(data.gltf[i].position.x, data.gltf[i].position.y, data.gltf[i].position.z);
        model.rotation.set(data.gltf[i].rotation.x, data.gltf[i].rotation.y, data.gltf[i].rotation.z);
        model.scale.set(data.gltf[i].scale.x, data.gltf[i].scale.y, data.gltf[i].scale.z);
        scene.add(model);

        console.log(model.position);
      }
    );
  }
}

export function uploadFileLoderGLTF(scene,camera){
  inputFile.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const modelPath = URL.createObjectURL(file); 
    const loader = new GLTFLoader();

    const cameraPosition = camera.position.clone();
    const cameraDirection = camera.getWorldDirection(new THREE.Vector3());

    loader.load(
      modelPath,
      function (gltf) {
        const model = gltf.scene;
        model.position.copy(cameraPosition);
        model.position.x+=cameraDirection.x*100;
        model.position.z+=cameraDirection.z*100;
        model.rotation.x=camera.rotation.x;
        model.rotation.y=camera.rotation.y;
        model.rotation.z=camera.rotation.z;

        gltfObjects.push(model);
        gltfObjects[gltfObjects.length-1].path=file.name;
        scene.add(model);
      }
    );
  });
}

  