import {GLTFLoader} from"GLTFLoader";

export let gltfObjects=[];

function createModel(jsonData,scene) {
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
          console.log(model)
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    });
  }

  export function modelLoad(scene) {
    fetch("static/modelData/pathJson/modelPaths.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        createModel(jsonData,scene);
      })
      .catch(function (error) {
        console.error("モデルの読みこみに失敗", error);
      });
  }

  
  export function modelJsonLoad(scene,data) {

    const loader = new GLTFLoader();
    for(let i=0; i<data.gltf.length; i++){
      loader.load(
        data.gltf[i].path,
        function (gltf) {
          const model = gltf.scene;
          model.position.set(data.gltf[i].position.x, data.gltf[i].position.y, data.gltf[i].position.z);
          model.rotation.set(data.gltf[i].rotation.x, data.gltf[i].rotation.y, data.gltf[i].rotation.z);
          model.scale.set(data.gltf[i].scale.x, data.gltf[i].scale.y, data.gltf[i].scale.z);
          scene.add(model);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }

  export function uploadFileLoderGLTF(scene){
    document.getElementById('id_inputFile').addEventListener('change', function (event) {
      const file = event.target.files[0];
      const modelPath = URL.createObjectURL(file); 
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        function (gltf) {
          const model = gltf.scene;
          scene.add(model);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    });
  }

  