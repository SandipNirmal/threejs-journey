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
  // OrbitControl,
  Color,
  FogExp2
} from "three";

// assets
const mountain = new TextureLoader().load('./assets/mountain.jpg');
const displacementMap = new TextureLoader().load('./assets/landscape_displacement.png');
// const displacementMap = new TextureLoader().load('./assets/displacementMap.jpg');

// scene
const scene = new Scene();
scene.background = new Color( 0xcccccc );
scene.fog = new FogExp2( 0xcccccc, 0.002 )

// camera
const camera = new PerspectiveCamera(
  60, window.innerWidth / window.innerHeight, 1, 1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new PlaneGeometry(6, 6, 64, 64);
const material = new MeshStandardMaterial({
  color: 0xffffff,
  map: mountain,
  displacementMap,
  displacementScale: 12
});

// const material = new MeshBasicMaterial({
//   color: 0xffffff,
//   map: mountain,
// });

const mesh = new Mesh(geometry, material);


// const donut = new TorusGeometry(1.2, .5, 16, 40);
// const donutMat = new MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
// const donutMesh = new Mesh(donut, donutMat)

// donutMesh.position.y = 1.8

scene.add(mesh);
// scene.add(donutMesh)

const color = 0xFFFFFF;
const intensity = 1;
const light = new AmbientLight(color, intensity);
scene.add(light);

camera.position.z = 5;

mesh.rotation.x = 181;

function animate() {
  requestAnimationFrame(animate);

  // donutMesh.rotation.y += 0.01;
  mesh.rotation.z += 0.001;

  renderer.render(scene, camera);
}

animate();
