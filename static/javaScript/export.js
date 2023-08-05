import {colorPicker}from"./colorPicker.js"

export function jsonExport(scene,gltfObjects,imageObjects){
    const objects = []; 
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
            x: object.parent.position.x,
            y: object.parent.position.y,
            z: object.parent.position.z
          },
          rotation: {
            x: object.parent.rotation.x,
            y: object.parent.rotation.y,
            z: object.parent.rotation.z
          },
          scale: {
            x: object.parent.scale.x,
            y: object.parent.scale.y,
            z: object.parent.scale.z
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
      }),
      image:imageObjects.map(function(imageObject) {
        return {
          path:imageObject.path,
          position: {
            x: imageObject.position.x,
            y: imageObject.position.y,
            z: imageObject.position.z
          },
          rotation: {
            x: imageObject.rotation.x,
            y: imageObject.rotation.y,
            z: imageObject.rotation.z
          },
          scale: {
            x: imageObject.scale.x,
            y: imageObject.scale.y,
            z: imageObject.scale.z
          },
          size:{
            width: imageObject.geometry.parameters.width,
            height: imageObject.geometry.parameters.height
          }
        };
      }),
      webGLRenderColor:colorPicker.value
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
