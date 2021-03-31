const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

  // world objects
  const ground = buildGround();
  const village = buildVillage();

  return scene;
};

// Build Functions
const buildVillage = () => {
  const smallHouse = buildHouse();
  const wideHouse = buildHouse(true);

  const houses = [];
  for (let i = 0; i < 8; i++) {
    if (i < 5) {
      houses[i] = smallHouse.createInstance("house" + i);
      houses[i].position.x = (i - 2.5 + 0.5) * 1.3;
      houses[i].position.z = -2;
    } else {
      houses[i] = wideHouse.createInstance("house" + i);
      houses[i].position.x = ((i - 5) - 1.5 + 0.5) * 2.5
      houses[i].position.z = 2;
    }
  }

  smallHouse.rotation.y = Math.PI / 2;
  smallHouse.position.x = -4;

  wideHouse.rotation.y = Math.PI / 2;
  wideHouse.position.x = 4;

  return houses;
}

const buildHouse = (isWide = false) => {
  const box = isWide ? buildBoxWide() : buildBoxRegular();
  const roof = buildRoof(isWide);

  return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
};

const buildGround = () => {
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3.Green();

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
  ground.material = groundMat;

  return ground;
};

const buildBoxRegular = () => {
  const boxMat = new BABYLON.StandardMaterial("boxmat");
  boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");

  faceUV = [
    new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0), // back
    new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0), // front
    new BABYLON.Vector4(0.25, 0.0, 0.5, 1.0), // right
    new BABYLON.Vector4(0.75, 0.0, 1.0, 1.0) // left
  ];

  const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true});
  box.material = boxMat;

  box.position.y = 0.5;

  return box;
};

const buildBoxWide = () => {
  const boxMat = new BABYLON.StandardMaterial("boxmat");
  boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png");

  faceUV = [
    new BABYLON.Vector4(0.4, 0.0, 0.8, 1.0), // back
    new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0), // front
    new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0), // right
    new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0) // left
  ];

  const box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, faceUV: faceUV, wrap: true});
  box.material = boxMat;

  box.position.y = 0.5;

  return box;
};

const buildRoof = (isWide) => {
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
  roof.material = roofMat;

  roof.scaling.x = 0.75;
  if (isWide) roof.scaling.y = 2;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  return roof;
};

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const scene = createScene(); // Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});