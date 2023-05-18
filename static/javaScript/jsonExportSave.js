export function jsonExportSave(scene){
    const objects = []; // CSS3Dオブジェクトを格納する配列
    
    // シーン内の全てのCSS3Dオブジェクトを取得し、配列に格納する
    scene.traverse(function(object) {
        if(object.element!=undefined&&object.type=="Object3D"){
            objects.push(object);
            console.log(object)
        }
    });
    
    const data = objects.map(function(object) {
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
      });
      
      // JSONデータをダウンロードする
      const json = JSON.stringify(data);
      const a = document.createElement('a');
      const file = new Blob([json], {type: 'application/json'});
      a.href = URL.createObjectURL(file);
      a.download = 'data.json';
      //a.click();
  }