//Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//setting up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
//Allows me to adjust view from mousclicks
const controls = new OrbitControls(camera, renderer.domElement);
//Allows me to load a glb file
const loader = new GLTFLoader();

//Lighitng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x9a6599, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

// Add background image
const textureLoader = new THREE.TextureLoader();
const backgroundImage = textureLoader.load('/vaporwave.jpg', function() {
    renderer.render(scene, camera);
});
scene.background = backgroundImage;

//Created so I can have the model stop moving with mouse hold
let model;
let rotateModel = true;

//loads the model
loader.load('/cheems.glb', function(gltf) {
    model = gltf.scene;
  scene.add(model);
}, undefined, function(error) {
  console.error(error);
});

// Stop rotating when mouse click is held
function handleMouseDown() {
    rotateModel = false; 
  }
// Resume rotating when mouse click is released
function handleMouseUp() {
    rotateModel = true; 
  }
  
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '/FlyMeToTheMoon.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( .3 );
	sound.play();
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // Rotate around the Y-axis and stops when mouse is held
    if (model && rotateModel) {     
        model.rotation.y += 0.01; 
    }

    renderer.render(scene, camera);
}

animate();
