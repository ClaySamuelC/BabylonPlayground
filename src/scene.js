import { canvas, engine } from './index.js';

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

  // const village = createVillage();
  const car = createCar();

  car.position.y = 0.125
  car.position.z = 2;
  car.rotation.y = Math.PI / 2;

  return scene;
};

const createVillage = () => {
  const village = BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "village.glb");

  return village;
};

const createCar = () => {
  const car = BABYLON.MeshBuilder.CreateBox("car", {depth: 2});

  const wheelRB = createWheel();
  wheelRB.parent = car;
  wheelRB.position.y = -0.5;

  const wheelRF = wheelRB.clone("wheelRF");
  const wheelLB = wheelRB.clone("wheelLB");
  const wheelLF = wheelRB.clone("wheelLF");

  wheelRB.position.x = 0.65;
  wheelRB.position.z = -0.7;

  wheelRF.position.x = 0.65;
  wheelRF.position.z = 0.7;

  wheelLB.position.x = -0.65;
  wheelLB.position.z = -0.7;

  wheelLF.position.x = -0.65;
  wheelLF.position.z = 0.7;

  // car.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
  /* height of car: (1 + 0.25) * 0.2 == 0.25
   to have the car rest on the ground, it should be raised by 0.125 (half the height of the main part of the car minus the height of the ovverreach of the wheels) */
  return car;
};

const createWheel = () => {
  const wheelUV = [];
  wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1); // front
  wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5); // side
  wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1); // back

  const wheelMat = new BABYLON.StandardMaterial("wheelMat");
  wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");
  
  const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.5, height: 0.25, faceUV: wheelUV});
  wheelRB.material = wheelMat;
  
  wheelRB.rotation.z = Math.PI / 2;

  return wheelRB;
};

const createWheelAnim = () => {
  const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
};

export default createScene;