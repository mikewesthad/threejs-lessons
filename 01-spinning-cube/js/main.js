/*
	A spinning cube in ThreeJS 

	Based on:
		http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
*/


// _____________________________________________________________________________
// Setup

var scene = new THREE.Scene();

var fov = 75;
var w = window.innerWidth;
var h = window.innerHeight;
var aspectRatio = w / h;
var nearClip = 0.1;
var farClip = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearClip, farClip);
camera.position.z = 5; // So we can see things that are placed at (0, 0, 0)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x9932CC });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube); // This will be at (0, 0, 0)


// _____________________________________________________________________________
// Render Loop

var previousTime = 0;
var pi = Math.PI;
var twoPi = 2 * pi;
function render(currentTime) {
	requestAnimationFrame(render);

	currentTime /= 1000; // Convert time to seconds - easier to think about
	var elapsedSeconds = currentTime - previousTime; // Time since last frame 

	// Use the elapsed time (in seconds) to add a small amount of rotation each
	// frame.  The cube's rotation is in radians, so two pi is a full rotation. 
	cube.rotation.x += pi * elapsedSeconds; // 0.5 rotations per second
	cube.rotation.y += pi / 2 * elapsedSeconds; // 0.25 rotations per second

	// Use a sine wave to make the cube grow and shrink.
	// 	- Sine waves ranges from -1 to 1.  Adding 1 shifts the sine wave so that
	//	  it's range is 0 to 2.
	// 	- It takes 2 pi (~6.28) for a sine wave to go through a wavelength 
	//	  (e.g. a full cycle from 2x through 0x and back to 2x).
	var s = 1 + Math.sin(currentTime);
	cube.scale.set(s, s, s)

	renderer.render(scene, camera);

	previousTime = currentTime;
}
render(0);
