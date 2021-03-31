const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

  // world objects
  const ground = buildGround();
  const box = buildBox();
  const roof = buildRoof();

  return scene;
};

// Build Functions
const buildHouse = () => {
  const box = buildBox();
  const roof = buildRoof();

  return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}

const buildGround = () => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});

  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3.Green();

  ground.material = groundMat;

  return ground;
};

const buildBox = () => {
  const box = BABYLON.MeshBuilder.CreateBox("box", {});

  const boxMat = new BABYLON.StandardMaterial("boxmat");
  boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png");

  box.material = boxMat;

  box.position.y = 0.5;

  return box;
};

const buildRoof = () => {
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});

  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

  roof.material = roofMat;

  roof.scaling.x = 0.75;
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