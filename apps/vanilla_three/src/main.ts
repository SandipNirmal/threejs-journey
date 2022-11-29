import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  TorusGeometry
} from "three";

// assets
const mountain = new TextureLoader().load("./assets/mountain.jpg");

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new PlaneGeometry(6, 6, 64, 64);
// const material = new MeshStandardMaterial({
//   color: 0x999999,
//   map: mountain,
// });

const material = new MeshBasicMaterial({
  color: 0xffffff,
  map: mountain,
});

// const material = new MeshStandardMaterial({
//   color: 0xffffff,
//   map: mountain,
//   // displacementMap
// })
const mesh = new Mesh(geometry, material);


const donut = new TorusGeometry(2, 1, 2, 40);
const donutMat = new MeshBasicMaterial( { color: 0x0000ff } )
const donutMesh = new Mesh(donut, donutMat)

scene.add(mesh);
// scene.add(donutMesh)

camera.position.z = 5;

mesh.rotation.x = 181;

function animate() {
  requestAnimationFrame(animate);

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  donutMesh.rotation.x += 0.01;
  donutMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
