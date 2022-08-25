import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {TransformControls} from "three/examples/jsm/controls/TransformControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as dat from "dat.gui"
import {gsap} from "gsap"
import {Water} from "three/examples/jsm/objects/Water.js"
import { Sky } from 'three/examples/jsm/objects/Sky.js';


// Global variables
let currentRef = null
let water

// Timeline
// Variables of time for animation with Gsap
const timeline = new gsap.timeline({
    defaults: {
        duration: 1
    }
})

// Controls Debugging
//const gui = new dat.GUI({width: 600})


// Objects of Scene
const objectsGroups = {
    ship: new THREE.Group(),
    palms: new THREE.Group(),
    tower: new THREE.Group(),
    stones: new THREE.Group(),
    beach: new THREE.Group(),
    map: new THREE.Group(),
    history: new THREE.Group(),
    xMap: new THREE.Group(),
    shovel: new THREE.Group(),
}

// FloatPoints
const floatPoints = []

// Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x006699)
const camera = new THREE.PerspectiveCamera(
    25,
    100/100,
    0.1,
    100)
camera.position.set(5.4203,7.1068,14.3716)
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(100,100)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true // Activamos sombras
renderer.shadowMap.type = THREE.PCFShadowMap // Sombras mas suaves
renderer.physicallCorrectLights = true // Corrección de las luces fisicamente
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.5
renderer.setPixelRatio(2) // Recomendado: 1 o 2

//Resize canvas
// Adjust canvas at the size of windows of client
const resize = () => {
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
    camera.updateProjectionMatrix();
    resetAnimation()
  };
window.addEventListener("resize", resize);

// OrbitControls
// Controlated of camera in real time
const orbitControls = new OrbitControls(camera,renderer.domElement)
orbitControls.enableDamping = true
orbitControls.target.set(1.15017,0.8066,0.46303)
//orbitControls.enableZoom = true



// Transform Controls
/*
const transformControls = new TransformControls(camera, renderer.domElement)
// Remplace between OrbitControls and TransformControls
transformControls.addEventListener("dragging-changed", (event) => {
    orbitControls.enabled = !event.value
    console.log(transformControls.object.position)
    // event = true => arrastramos objetos
})

// Add transform at object
transformControls.attach(objectsGroups.stones)
scene.add(transformControls)

// Set mode of transformControl
transformControls.setMode("translate")
*/



// Animate the scene
const clock = new THREE.Clock()
const animate = () => {
    const elapsedTime = clock.getElapsedTime() // Tiempo transcurrido desde creación del clock
    const movement = Math.sin(elapsedTime)
    
    objectsGroups.ship.position.y = movement * 0.057 -0.05
    objectsGroups.ship.rotation.x = movement * 0.015

    // move float points
    for(const floatPoint of floatPoints){
        const screenPositions = floatPoint.position.clone()
        screenPositions.project(camera)
        //console.log(screenPositions)
        const positionX = screenPositions.x * currentRef.clientWidth *0.5
        const positionY = screenPositions.y * currentRef.clientHeight * -0.5

        floatPoint.element.style.transform = `translate(${positionX}px, ${positionY}px)`
    }

    // Movement of camera
    //camera.position.y = window.pageYOffset * 0.09

    // Limit of camera
    if(camera.position.x > 50){
        camera.position.x = 50
    }
    if(camera.position.x < -50){
        camera.position.x = -50
    }
    if(camera.position.y < 1){
        camera.position.y = 1
    }
    if(camera.position.y > 50){
        camera.position.y = 50
    }
    if(camera.position.z > 50){
        camera.position.z = 50
    }
    if(camera.position.z < -50){
        camera.position.z = -50
    }
    
    
    orbitControls.update()
    // Renderer of the scene in real time
    renderer.render(scene,camera);
    requestAnimationFrame(animate);

}
animate();

// Gsap Animation
export const gsapAnimation = (targetPost, camPost, zoom) => {
    // Animation to: From the current position it is animated to the desired position.
    // "-=1.0" the animation is executed at the same time as the previous animation.
    timeline
    .to(orbitControls.target, {
        x: targetPost.x,
        y: targetPost.y,
        z: targetPost.z
    })
    .to(camera.position, {
        x: camPost.x,
        y: camPost.y,
        z: camPost.z
    }, "-=1.0")
    .to(camera, {
        zoom: zoom,
        onUpdate: () => camera.updateProjectionMatrix()
    }, "-=1.0")
}

// Reset Animation
// Returns to the original camera position.
export const resetAnimation = () => {
    let zoom = 1.0
    if(currentRef.clientWidth < 1000){
        zoom = 0.5
    }
    else{
        zoom = 1.0
    }
    timeline
    .to(orbitControls.target, {
        x: 1.15017,
        y: 0.8066,
        z: 0.46303
    })
    .to(camera.position, { 
        x: 5.4203,
        y: 7.1068,
        z: 14.3716
    }, "-=1.0")
    .to(camera, {
        zoom: zoom,
        onUpdate: () => camera.updateProjectionMatrix()
    }, "-=1.0")
}


// Loader
const loadingManager = new THREE.LoadingManager(()=> {
    castShadow()
})

// Loader of the GLTF Models
const gltfLoader = new GLTFLoader(loadingManager)

// Cast and receive shadows
const castShadow = () => {
    // runs the entire scene and set objects with: cast and receive shadows
    scene.traverse((child) => {
        if(child instanceof THREE.Mesh){
            child.castShadow = true
            child.receiveShadow = true
            child.material.envMapIntensity = 0.38
        }
    })
}

// Load groups
// Add all objects at the scene
export const loadGroups = () => {
    scene.add(objectsGroups.ship)
    scene.add(objectsGroups.palms)
    scene.add(objectsGroups.tower)
    scene.add(objectsGroups.stones)
    scene.add(objectsGroups.beach)
    scene.add(objectsGroups.map)
    scene.add(objectsGroups.history)
    scene.add(objectsGroups.xMap)
    scene.add(objectsGroups.shovel)
}

// Load gltf models
export const loadModels = (path, group) => {
    gltfLoader.load(path, (gltf) => {
        while(gltf.scene.children.length){
            // Add the object to group
            objectsGroups[group].add(gltf.scene.children[0])
        }
    })
}

// Objects of scene
// Ship
objectsGroups.ship.scale.set(0.3781,0.3781,0.3781)
objectsGroups.ship.position.set(-1.65482,0,0)
objectsGroups.ship.rotation.set(0,2.8953,0)

// Tower
objectsGroups.tower.scale.set(0.6,0.6,0.6)
objectsGroups.tower.position.set(-0.8147215725165493, 0.12803030921348135, -1.6103953548846128)
objectsGroups.tower.rotation.set(0,3,0)

// Palms
objectsGroups.palms.position.set(-1.521884534267274, 0,6.486878641193636)
objectsGroups.palms.rotation.set(0,0.25,0)

// Stones
objectsGroups.stones.position.set(-6.14124557016479,0,11)

// Beach
objectsGroups.beach.scale.set(3,1,3)
objectsGroups.beach.position.set(1.6856249143075364,0,0)

// Map
objectsGroups.map.scale.set(0.2,0.2,0.2)
objectsGroups.map.position.set(0.75024, 0.17, -0.15166)
objectsGroups.map.rotation.set(0,4.05717,0)

// Map: History
objectsGroups.history.scale.set(0.03345,0.03345,0.03345)
objectsGroups.history.position.set(0.8066,0.17,0.20534)
objectsGroups.history.rotation.set(0, 0.89236, 0)

// Map: X
objectsGroups.xMap.scale.set(0.07,0.07,0.07)
objectsGroups.xMap.position.set(0.77,0.18,-0.24)
objectsGroups.xMap.rotation.set(0, 0.8066, 0)

// Shovel
objectsGroups.shovel.scale.set(1,1,1)
objectsGroups.shovel.position.set(3.5552,0.5,0.8066)
objectsGroups.shovel.rotation.set(1.40786, 0, 0.72069)


const sun = new THREE.Vector3();
// Water
water = new Water(
    new THREE.PlaneGeometry(100,100),
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load("texture/waternormals.jpg", (texture) =>{
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 0,
        fog: scene.fog !== undefined
    }
)
water.rotation.x = -Math.PI /2
scene.add(water)

// Skybox
const sky = new Sky()
sky.scale.setScalar(1000)
sky.elevation = 2.9
scene.add(sky)
const skyUniforms = sky.material.uniforms
skyUniforms[ 'turbidity' ].value = 10;
skyUniforms[ 'rayleigh' ].value = 2;
skyUniforms[ 'mieCoefficient' ].value = 0.005;
skyUniforms[ 'mieDirectionalG' ].value = 0.8;

const parameters = {
    elevation: 2,
    azimuth: 54.1
};

const pmremGenerator = new THREE.PMREMGenerator( renderer );
let renderTarget;

function updateSun() {

    const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    if ( renderTarget !== undefined ) renderTarget.dispose();

    renderTarget = pmremGenerator.fromScene( sky );

    scene.environment = renderTarget.texture;

}
updateSun();


// Lights
const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
light1.castShadow = true
// Resolution of shadows
light1.shadow.mapSize.set(1024,1024)
light1.shadow.bias = -0.000131
light1.position.set(4.4784, 10, 4.9108)
scene.add(light1)

// Ambient Light
const al = new THREE.AmbientLight(0x333333, 0.3)
scene.add(al)


// Debuggeo
/*
// Cube LookAt
const cubeForDebugging = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.1,0.1,0.1,0.1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
const LookAtFolder = gui.addFolder("Look At")
scene.add(cubeForDebugging)
  // target
LookAtFolder.add(cubeForDebugging.position, "x")
    .min(-10)
    .max(10)
    .step(0.00001)
    .name("target x")
    .onChange(()=>{
      orbitControls.target.x = cubeForDebugging.position.x
    })
LookAtFolder.add(cubeForDebugging.position, "y")
    .min(-10)
    .max(10)
    .step(0.00001)
    .name("target y")
    .onChange(()=>{
      orbitControls.target.y = cubeForDebugging.position.y
    })
LookAtFolder.add(cubeForDebugging.position, "z")
    .min(-10)
    .max(10)
    .step(0.00001)
    .name("target z")
    .onChange(()=>{
      orbitControls.target.z = cubeForDebugging.position.z
    })


const cameraFolder = gui.addFolder("Camera")
    cameraFolder.add(camera.position, "x")
    .min(-15)
    .max(15)
    .name("Cam x")
    .step(0.0001)
    cameraFolder.add(camera.position, "y")
    .min(-15)
    .max(15)
    .name("Cam y")
    .step(0.0001)
    cameraFolder.add(camera.position, "z")
    .min(-15)
    .max(15)
    .name("Cam z")
    .step(0.0001)

    gui.add(camera, "zoom")
    .name("Cam Zoom")
    .min(-50)
    .max(10)
    .step(0.00001)
    .onChange(() => {
      camera.updateProjectionMatrix()
    })


const waterUniforms = water.material.uniforms;

const waterFolder = gui.addFolder( 'Water' );
waterFolder.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
waterFolder.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
waterFolder.open();


const skyFolder = gui.addFolder( 'Sky' );
skyFolder.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
skyFolder.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
skyFolder.open();


const lightFolder = gui.addFolder("Lights")
lightFolder.add(light1.position, "x")
    .min(-10)
    .max(10)
    .step(0.0001)
    .name("LD pos x")
lightFolder.add(light1.position, "y")
    .min(-10)
    .max(10)
    .step(0.0001)
    .name("LD pos y")
lightFolder.add(light1.position, "z")
    .min(-10)
    .max(10)
    .step(0.0001)
    .name("LD pos z")
*/



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


// Add the float points (vector 3D + float point of Dom)
export const fetchFloatPointsElements = () => {
    floatPoints.push({
        position: new THREE.Vector3(-1.59844,2.3527,0.03355),
        element: document.querySelector(".float-point-0")
    })

    floatPoints.push({
        position: new THREE.Vector3(2.52449,2.95397,-0.39592),
        element: document.querySelector(".float-point-1")
    })

    floatPoints.push({
        position: new THREE.Vector3(0.40,0.29124,-0.50),
        element: document.querySelector(".float-point-3")
    })

    floatPoints.push({
        position: new THREE.Vector3(3.61351,1,0.84595),
        element: document.querySelector(".float-point-4")
    })


}