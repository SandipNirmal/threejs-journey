import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  TorusGeometry,
  AmbientLight,
  PointLight,
  Color,
  FogExp2,
  SphereGeometry,
  CameraHelper
  // CylinderGeometry
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const params = {
  sceneBackground: 0xcccccc,
  fogColor: 0xcccccc,
  lightColor: 0xffffff
};

// assets
const mountain = new TextureLoader().load("./assets/mountain.jpg");
const displacementMap = new TextureLoader().load(
  "./assets/landscape_displacement.png"
);
// const displacementMap = new TextureLoader().load('./assets/displacementMap.jpg');

// scene
const scene = new Scene();
scene.background = new Color(params.sceneBackground);
scene.fog = new FogExp2(params.fogColor, 0.002);

// camera
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new PlaneGeometry(6, 6, 64, 64);
const material = new MeshStandardMaterial({
  color: 0xffffff,
  map: mountain,
  displacementMap,
  displacementScale: 12,
  // displacementBias: -1
});

// const material = new MeshBasicMaterial({
//   color: 0xffffff,
//   map: mountain,
// });

const mesh = new Mesh(geometry, material);
mesh.receiveShadow = true;
scene.add(mesh);

// Donut
const donut = new TorusGeometry(0.7, 0.3, 16, 40);
const donutMat = new MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const donutMesh = new Mesh(donut, donutMat);
donutMesh.castShadow = true;
donutMesh.position.y = 1.8;
donutMesh.position.x = -1;
scene.add(donutMesh)

//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new SphereGeometry(0.5, 32, 32);
const sphereMaterial = new MeshStandardMaterial( { color: '#ff4f00' } );
const sphere = new Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
sphere.position.x = 1;
sphere.position.y = 1.2;
sphere.position.z = 1.2;
scene.add( sphere );

// const color = 0xcccccc;
// const intensity = 1;
// const light = new AmbientLight(color, intensity);

const light = new PointLight(params.lightColor, 1, );
light.position.set(0, 10, 14);
light.castShadow = true;
scene.add(light);

// GUI Controls
const gui = new GUI();

// light controls
// const lightFolder = gui.addFolder("Light");
// lightFolder
//   .addColor(params, "lightColor")
//   .onChange((val) => (light.color = val));

// scene controls
const sceneFolder = gui.addFolder("Scene");
sceneFolder
  .addColor(params, "sceneBackground")
  .onChange((value) => (scene.background = new Color(value)));

camera.position.z = 5;

mesh.rotation.x = 181;

//Create a helper for the shadow camera (optional)
// const helper = new CameraHelper( light.shadow.camera );
// scene.add( helper );

const stats = Stats();
document.body.appendChild(stats.dom);

// animate on each frame
function animate() {
  requestAnimationFrame(animate);

  // donutMesh.rotation.y += 0.01;
  mesh.rotation.z += 0.001;

  renderer.render(scene, camera);
  stats.update();
}

animate();
