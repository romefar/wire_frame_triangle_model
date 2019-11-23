
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 10000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// triangle height
const HEIGHT = 50;
// rotation value
let rotation = 0.001;

// helper group to center inner group
let pivot = new THREE.Group();

// group to store all out lines
let group = new THREE.Group();

const scene = new THREE.Scene();

// custom rotation vector
const axis = new THREE.Vector3(-150, -25, 300).normalize();

// dashed line material
const material = {
  color: 0xedf0ee, // вертикальные грани
  dashSize: 5,
  gapSize: 0.0001,
  linewidth: 10
};

// figure lines array
let arr = [];

const figureCoords = [
  // bottom outher triangle
  [0, 50, 300],
  [0, 50, 0],
  [0, 50, 0],
  [300, 50, 0],
  [300, 50, 0],
  [0, 50, 300],
  // bottom inner triangle
  [50, 50, 200],
  [50, 50, 50],
  [50, 50, 50],
  [200, 50, 50],
  [200, 50, 50],
  [50, 50, 200],
  // bottom inner triangle edges
  [50, 50, 200],
  [50, 50 + HEIGHT, 200],
  [50, 50, 50],
  [50, 50 + HEIGHT, 50],
  [200, 50, 50],
  [200, 50 + HEIGHT, 50],
  // top inner triangle 
  [50, 50 + HEIGHT, 200],
  [50, 50 + HEIGHT, 50],
  [50, 50 + HEIGHT, 50],
  [200, 50 + HEIGHT, 50],
  [200, 50 + HEIGHT, 50],
  [50, 50 + HEIGHT, 200],
  // bottom outher triangle edges
  [0, 50, 300],
  [0, 50 + HEIGHT, 300],
  [300, 50, 0],
  [300, 50 + HEIGHT, 0],
  [0, 50, 0],
  [0, 50 + HEIGHT, 0],
  // top outher triangle 
  [0, 50 + HEIGHT, 300],
  [0, 50 + HEIGHT, 0],
  [0, 50 + HEIGHT, 0],
  [300, 50 + HEIGHT, 0],
  [300, 50 + HEIGHT, 0],
  [0, 50 + HEIGHT, 300]
];

init();
animate();

function init() {
  // default camera position 350 350 350
  camera.position.z = 350;
  camera.position.x = 0;
  camera.position.y = 350;
  camera.lookAt(scene.position);

  // show asix 
  const axisHelper = new THREE.AxesHelper(800);
  scene.add(axisHelper);
  axisHelper.geometry.rotateY(100);

  // create wire-frame triangle model 
  for (let i = 0; i < figureCoords.length; i += 2) {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(getVector3(i), getVector3(i + 1));
    let line = new THREE.LineSegments(geometry, new THREE.LineDashedMaterial(material)).computeLineDistances();
    group.add(line);
    arr.push(line);
  }

  // change the position of our line group 
  group.translateX(30);
  group.translateZ(-150);
  group.translateY(-50);
  group.rotation.y = -Math.PI / 3.5;

  pivot = new THREE.Group();
  scene.add(pivot);
  pivot.add(group);
  pivot.rotation.z = Math.PI / -20;
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  if (pivot.rotation.x < -6.3) pivot.rotation.x = 0;

  pivot.rotation.x -= rotation;

  let rot = pivot.rotation.x;

  if (rot >= -0.75) {
    arr[0].material.gapSize = 10;
    arr[1].material.gapSize = 10;

    arr[3].material.gapSize = 10;
    arr[4].material.gapSize = 10;
    arr[5].material.gapSize = 10;

    arr[6].material.gapSize = 10;
    arr[8].material.gapSize = 10;
    arr[14].material.gapSize = 10;
  }
  if (rot < -0.76) {
    arr[7].material.gapSize = 10;
    arr[0].material.gapSize = 0;
    arr[1].material.gapSize = 0;

    arr[3].material.gapSize = 0;
    arr[4].material.gapSize = 0;
    arr[5].material.gapSize = 0;

    arr[9].material.gapSize = 10;
    arr[10].material.gapSize = 10;
    arr[11].material.gapSize = 10;

    arr[15].material.gapSize = 10;
    arr[16].material.gapSize = 10;
  }
  if (rot < - 0.95) {
    arr[7].material.gapSize = 0;
  }

  if (rot < -1.66) {
    arr[9].material.gapSize = 0;
    arr[10].material.gapSize = 0;
  }

  if (rot < -2.34) {
    arr[12].material.gapSize = 0;
    arr[13].material.gapSize = 0;

    arr[14].material.gapSize = 0;

    arr[17].material.gapSize = 10;

    arr[0].material.gapSize = 0;
    arr[1].material.gapSize = 0;

    arr[10].material.gapSize = 0;
    arr[11].material.gapSize = 0;

    arr[15].material.gapSize = 0;
    arr[16].material.gapSize = 0;

    arr[3].material.gapSize = 0;
    arr[4].material.gapSize = 0;
    arr[5].material.gapSize = 0;
  }

  if (rot < - 2.55) {
    arr[7].material.gapSize = 10;
    arr[9].material.gapSize = 10;
    arr[10].material.gapSize = 10;
  }

  if (rot < -3.4) {
    arr[7].material.gapSize = 0;
  }

  if (rot < -3.93) {
    arr[10].material.gapSize = 10;
    arr[17].material.gapSize = 0;
  }
  // TODO: add invisible edges

  renderer.render(scene, camera);
}

function getVector3(index) {
  return new THREE.Vector3(figureCoords[index][0], figureCoords[index][1], figureCoords[index][2]);
}