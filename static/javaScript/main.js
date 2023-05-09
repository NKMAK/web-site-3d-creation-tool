import * as THREE from 'three';

window.addEventListener('DOMContentLoaded', init);
function init() {
    var objects = [];
 
    // シーンの作成
    var scene = new THREE.Scene();
    // カメラの作成
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // レンダラーの作成
    var renderer = new THREE.WebGLRenderer();
     
    // レンダラーが描画するキャンバスサイズの設定
    renderer.setSize( window.innerWidth, window.innerHeight );
    // キャンバスをDOMツリーに追加
    document.body.appendChild( renderer.domElement );
     
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
     
    animate();
    function animate() {
     requestAnimationFrame( animate );
     renderer.render( scene, camera );
    }
}
// オブジェクトを格納する配列
