export function jsonExportSave(scene,gltfObjects){
    const objects = []; 

    scene.traverse(function(object) {
        if(object.element!=undefined&&object.type=="Object3D"){
            objects.push(object);
        }
    });
    
    const data ={
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
      })
    }

      
      const json = JSON.stringify(data);
      console.log(json)
      return json;
      /*a.href = URL.createObjectURL(file);
      console.log(a.href)
      a.download = 'data.json';
      a.click();*/
}
