import {canvas, engine} from './index.js';

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

  const village = createVillage();
  const car = createCar();

  return scene;
};

const createCar = () => {
  const outline = [
    new BABYLON.Vector3(-0.3, 0, -0.1),
    new BABYLON.Vector3(0.2, 0, -0.1),
  ];

  for (let i = 0; i < 20; i++) {
    outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
  }

  outline.push(new BABYLON.Vector3(0, 0, 0.1));
  outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

  const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2});

  return car;
};

const createVillage = () => {
  const village = BABYLON.SceneLoader.ImportMeshAsync("village", "https://assets.babylonjs.com/meshes/", "village.glb");

  return village;
}

export default createScene;