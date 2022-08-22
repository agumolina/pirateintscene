import * as THREE from "three"

// Global variables
let currentRef

// Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x353535)
const camera = new THREE.PerspectiveCamera(
    25,
    100/100,
    0.1,
    100)
camera.position.set(3,0,0)
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(100,100)
/*
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true // Activamos sombras
renderer.shadowMap.type = THREE.PCFShadowMap // Sombras mas suaves
renderer.physicallCorrectLights = true // Corrección de las luces fisicamente
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.5
renderer.setPixelRatio(2) // Recomendado: 1 o 2
*/

//Resize canvas
const resize = () => {
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
    camera.updateProjectionMatrix();
  };
window.addEventListener("resize", resize);


// Animate the scene
const clock = new THREE.Clock()
const animate = () => {
    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);

}
animate();


// Init and mount the scene
export const initScene = (mountRef) => {
    currentRef = mountRef.current;
    resize();
    currentRef.appendChild(renderer.domElement);
}

// Dismount and clean up the buffer from the scene
export const cleanUpScene = () => {
    //gui.destroy();
    //scene.dispose();
    currentRef.removeChild(renderer.domElement); 
}


// Objects
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
scene.add(cube)