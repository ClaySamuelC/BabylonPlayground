const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

  // world objects
  const ground = buildGround();
  const house = buildHouse();

  return scene;
};

// Build Functions
const buildHouse = () => {
  const box = buildBox();
  const roof = buildRoof();

  return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}

const buildGround = () => {
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3.Green();

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
  ground.material = groundMat;

  return ground;
};

const buildBox = () => {
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

const buildRoof = () => {
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
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