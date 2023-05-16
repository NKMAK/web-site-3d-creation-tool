import * as THREE from 'three';
export class CameraController {
    constructor(camera, render,cssControls) {
        this.camera = camera;
        this.render = render;
        this.cssControls=cssControls;
        this.keys = {};
        this.speed = 2;
        this.up = new THREE.Vector3(0, 1, 0);
  
        this.enableRotation=true;
    
        this.touch = {
          startX: 0,
          startY: 0,
          movedX: 0,
          movedY: 0,
        };
    
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        this.render.domElement.addEventListener("mousedown", this.handleMouseDown);
        this.render.domElement.addEventListener("touchmove", this.handleTouchMove, {
          passive: false,
        });
    }
  
    handleKeyDown(event) {
        this.keys[event.code] = true;
    }
  
    handleKeyUp(event) {
        this.keys[event.code] = false;
    }
  
    handleMouseDown(event) {
        event.preventDefault();
        this.touch.startX = event.clientX;
        this.touch.startY = event.clientY;
        document.addEventListener("mousemove", this.handleMouseMove, false);
        document.addEventListener("mouseup", this.handleMouseUp, false);
    }
  
    handleMouseMove(event) {
        if(this.enableRotation==true){
            event.preventDefault();
            this.touch.movedX = event.clientX - this.touch.startX;
            this.touch.movedY = event.clientY - this.touch.startY;
            this.camera.rotation.y += this.touch.movedX * 0.002;
            this.camera.rotation.x += this.touch.movedY * 0.002;
            this.touch.startX = event.clientX;
            this.touch.startY = event.clientY;
        }

    }
  
    handleMouseUp() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }
  
    handleTouchMove(event) {
        if(this.enableRotation==true){
            event.preventDefault();
            this.touch.movedX = event.touches[0].clientX - this.touch.startX;
            this.touch.movedY = event.touches[0].clientY - this.touch.startY;
            this.camera.rotation.y += this.touch.movedX * 0.002;
            this.camera.rotation.x += this.touch.movedY * 0.002;
            this.touch.startX = event.touches[0].clientX;
            this.touch.startY = event.touches[0].clientY;
        }
    }
  
    cameraPositionMove() {
        const moveVector = new THREE.Vector3();
        const cameraDirection = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDirection);
  
        if (this.keys["KeyW"]) {
          moveVector.add(
              cameraDirection.clone().multiplyScalar(this.speed)
          );
        }
    
        if (this.keys["KeyA"]) {
          moveVector.add(
            cameraDirection
              .clone()
              .cross(this.up)
              .normalize()
              .multiplyScalar(-this.speed)
          );
        }
    
        if (this.keys["KeyS"]) {
          moveVector.add(
              cameraDirection.clone().multiplyScalar(-this.speed)
          );
        }
    
        if (this.keys["KeyD"]) {
          moveVector.add(
              cameraDirection
              .clone()
              .cross(this.up)
              .normalize()
              .multiplyScalar(this.speed)
          );
        }
    
        this.camera.position.add(moveVector);
    }

    test(){
        if (this.keys["KeyW"]) {
            this.camera.position.z-=1;
            this.cssControls.target.z-=1;
        }
    }
}