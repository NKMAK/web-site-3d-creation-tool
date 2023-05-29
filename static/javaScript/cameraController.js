import * as THREE from 'three';
export class CameraController {
    constructor(camera, render,orbitControls) {
        this.camera = camera;
        this.render = render;
        this.orbitControls=orbitControls;
        this.keys = {};
        this.speed = 2;
        this.up = new THREE.Vector3(0, 1, 0);
    
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    }
  
    handleKeyDown(event) {
        this.keys[event.code] = true;
    }
  
    handleKeyUp(event) {
        this.keys[event.code] = false;
    }
  
    cameraPositionUpdate() {
      
      const moveVector = new THREE.Vector3();
      const cameraDirection = new THREE.Vector3();
      let isCamereMove=false
      this.camera.getWorldDirection(cameraDirection);

      if (this.keys["KeyW"]) {
        moveVector.add(
            cameraDirection.clone().multiplyScalar(this.speed)
        );
        isCamereMove=true;
      }
  
      if (this.keys["KeyA"]) {
        moveVector.add(
          cameraDirection
            .clone()
            .cross(this.up)
            .normalize()
            .multiplyScalar(-this.speed)
        );
        isCamereMove=true;
      }
  
      if (this.keys["KeyS"]) {
        moveVector.add(
            cameraDirection.clone().multiplyScalar(-this.speed)
        );
        isCamereMove=true;
      }
  
      if (this.keys["KeyD"]) {
        moveVector.add(
            cameraDirection
            .clone()
            .cross(this.up)
            .normalize()
            .multiplyScalar(this.speed)
        );
        isCamereMove=true;
      }
      moveVector.y=0;
      this.camera.position.add(moveVector);
      this.orbitControlsTargetSet();
      return isCamereMove;
    }

    orbitControlsTargetSet(){
      const cameraDirection = new THREE.Vector3();
      this.camera.getWorldDirection(cameraDirection);
    
      const targetX = this.camera.position.x + cameraDirection.x;
      const targetY = this.camera.position.y+ cameraDirection.y;
      const targetZ = this.camera.position.z + cameraDirection.z;
    
      this.orbitControls.target.set(targetX, targetY, targetZ);
    
    }

}

