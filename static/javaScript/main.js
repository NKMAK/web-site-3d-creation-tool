import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'CSS3DRenderer';

window.addEventListener('DOMContentLoaded', init);
function init() {

    const canvas = document.getElementById('renderCanvas');
    const canvas2 = document.getElementById('renderCanvas2');

    let screenWidth
    let screenHeight

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;

    var objects = [];
 
    // シーンの作成
    var scene = new THREE.Scene();
    // カメラの作成
    
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({
        canvas: renderCanvas,
        antialias: true
    });
     
    // レンダラーが描画するキャンバスサイズの設定
    renderer.setSize( window.innerWidth, window.innerHeight );
     
    // ジオメトリーの作成
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // マテリアルの作成
    var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
    // オブジェクトの作成
    var cube = new THREE.Mesh( geometry, material );
    // オブジェクトの位置調整
    cube.position.x = 2.0;
    // オブジェクトをシーンに追加
    scene.add( cube );
    objects.push( cube );
     
    // オブジェクトを複製
    var cube2 = cube.clone();
    // オブジェクトの位置調整
    cube.position.x = -2.0;
    // オブジェクトをシーンに追加
    scene.add( cube2 );
    objects.push( cube2 );
     
    // カメラ位置設定
    camera.position.z = 5;
    camera.position.x = 0.5;
    camera.position.y = 0.5;

    let css3dRender = new CSS3DRenderer({
        canvas: canvas2,
        antialias: true
    });

// three.jsのrendererと同じサイズのCSS3DRendererを作成
css3dRender.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(css3dRender.domElement);
const html_musicSelectRange = document.createElement("button");
let musicSelectRangeObj;
html_musicSelectRange.classList.add("musicSelectRange");
musicSelectRangeObj = new CSS3DObject(html_musicSelectRange);
musicSelectRangeObj.position.set(75, 90, 0);
musicSelectRangeObj.rotation.z = -Math.PI / 2;
scene.add(musicSelectRangeObj);

css3dRender.render(scene, camera);
     
    animate();
    function animate() {
     requestAnimationFrame( animate );
     renderer.render( scene, camera );
    }
}
// オブジェクトを格納する配列
