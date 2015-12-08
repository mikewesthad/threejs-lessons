/*
	A spinning cube in ThreeJS 

	Based on:
		http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
*/

// Create a scene - this holds the things that are going to be rendered
var scene = new THREE.Scene();

// Create a perspective camera to view the scene
var fov = 75;
var w = window.innerWidth;
var h = window.innerHeight;
var aspectRatio = w / h;
var nearClip = 0.1;
var farClip = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearClip, farClip);
// By default the camera is placed at (0, 0, 0).  We'll shift the camera to 
// (0, 0, 5), so that we can see anything placed at (0, 0, 0).
camera.position.z = 5; 

// Create a WebGL renderer - this makes use of your graphics card for turning a 
// scene into wonderful pixels on your screen.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Create a basic, purple cube:
//  - Create the cube geometry, the vertices and faces that describe a the shape
// 	  of a cube.
//	- Create a material, the mathematics that describes how light interacts with
//    the surface of the cube.  In this case, just a basic purple shading.  
// 	- Put those together into a mesh, something that we can put into the scene.
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x9932CC });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube); // This will default to (0, 0, 0)


// _____________________________________________________________________________
// Render Loop
// This sets up the heartbeat of our application, looping and drawing to the 
// screen.  requestAnimationFrame(func) asks the browser to call the specified 
// function when the browser is about to redraw the screen.  This usually 
// happens 60 times a second.  The requestAnimationFrame function provides the 
// specified function with a timestamp (in ms) which we can then use for 
// animation.

var previousTime = 0;
var pi = Math.PI;
var twoPi = 2 * pi;

function render(currentTime) {
	// Tell the browser to schedule another call to the render function when 
	// the browser is about to repaint the screen. 
	requestAnimationFrame(render);

	// Calculate the elapsed time since the last frame
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

	// Draw the scene
	renderer.render(scene, camera);

	previousTime = currentTime;
}
requestAnimationFrame(render); // Kick off the render loop