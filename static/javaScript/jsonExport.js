export function jsonExport(scene,gltfObjects){
    const objects = []; 
    console.log(gltfObjects)
    scene.traverse(function(object) {
        if(object.element!=undefined&&object.type=="Object3D"){
            objects.push(object);
        }
    });
    
    const project_data ={
      html: objects.map(function(object) {
        return {
          id: object.element.id,
          tagName: object.element.tagName,
          innerHTML: object.element.innerHTML,
          position: {
            x: object.position.x,
            y: object.position.y,
            z: object.position.z
          },
          rotation: {
            x: object.rotation.x,
            y: object.rotation.y,
            z: object.rotation.z
          },
          scale: {
            x: object.scale.x,
            y: object.scale.y,
            z: object.scale.z
          }
        };
      }),
      gltf:gltfObjects.map(function(gltfObject) {
        return {
          path:gltfObject.path,
          position: {
            x: gltfObject.position.x,
            y: gltfObject.position.y,
            z: gltfObject.position.z
          },
          rotation: {
            x: gltfObject.rotation.x,
            y: gltfObject.rotation.y,
            z: gltfObject.rotation.z
          },
          scale: {
            x: gltfObject.scale.x,
            y: gltfObject.scale.y,
            z: gltfObject.scale.z
          }
        };
      }),//project_require_dataいらない　 path:gltfObject.pathにpathを入れる画像も上のJSON構造で作る
      project_require_data:{
        glb_paths:[],
        image_paths:[]
        //project_name:,
      }
    }
      
    return project_data;
    
    //const json = JSON.stringify(prpject_data);
    //console.log(json)
      /*a.href = URL.createObjectURL(file);
          var imagePathArray = ["test.path", "test2.path"];
    prpject_data.project_require_files["image"] =imagePathArray;
      console.log(a.href)
      a.download = 'data.json';
      a.click();*/
}
