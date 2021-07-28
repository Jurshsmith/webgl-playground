<template>
  <div ref="spinning_cube_container"></div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";

import * as THREE from "three";

function initializeWebGL() {}

export default {
  setup() {
    const spinningCubeContainer = ref(null);

    let scene, camera, renderer, box, box2, box3;

    const initializeWebGL = (context) => {
      // creates a scene to work with
      scene = new THREE.Scene();

      // adds a grey background
      scene.background = new THREE.Color(0xaaaaaa);

      // creates a pre-built three js box geometry
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      // select material color for the objects
      const materialOne = new THREE.MeshStandardMaterial({
        color: new THREE.Color("skyblue"),
      });

      const materialTwo = new THREE.MeshStandardMaterial({
        color: new THREE.Color("red"),
      });

      const materialThree = new THREE.MeshStandardMaterial({
        color: new THREE.Color("green"),
      });

      // creating each box object
      box = new THREE.Mesh(geometry, materialOne);
      scene.add(box);
      box2 = new THREE.Mesh(geometry, materialTwo);
      box2.position.x = 1.5;
      scene.add(box2);
      box3 = new THREE.Mesh(geometry, materialThree);
      box3.position.x = 3;
      scene.add(box3);

      // set light for the scene x, y, z vector direction
      const light = new THREE.DirectionalLight();
      light.position.set(0, 0.5, 2);
      scene.add(light);

      // set camera, using a frustum POV (based of a truncated 3d square based triangle)
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // set camera position, the more the number, the farther away the objects
      camera.position.z = 7;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      context.append(renderer.domElement);
      window.addEventListener("resize", onResize, false);

      update();
    };

    const update = () => {
      requestAnimationFrame(update);

      // alot can be learned from the co-ordinate system in this animation
      // z co-ordinate will point towards you
      // y is vertical
      // x is horizonatal
      // all conventional
      box.rotation.y += 0.01; // rotate y axis
      box2.rotation.z -= 0.01; // rotate z-axis
      box3.rotation.x -= 0.01; //rotate x-axis
      renderer.render(scene, camera); // render scene and camera view
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix(); // update camera view
      renderer.setSize(window.innerWidth, window.innerHeight); // update rendered aspect ratio
    };

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      initializeWebGL(spinningCubeContainer.value);
      console.log(spinningCubeContainer.value); // <div>This is a root element</div>
    });

    return {
      spinning_cube_container: spinningCubeContainer,
    };
  },
};
</script>
