import {GLTFLoader} from"GLTFLoader";

function createModel(jsonData,scene) {
    const models = jsonData.modelPaths;
    models.forEach(function (modelPath) {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        function (gltf) {
          const model = gltf.scene;
          scene.add(model);
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
