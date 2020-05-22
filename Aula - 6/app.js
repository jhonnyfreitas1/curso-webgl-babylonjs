window.addEventListener('DOMContentLoaded', () => {
    //CANVAS ONDE É RENDERIZADO A CENA
    const canvas = document.getElementById('renderCanvas');
    //MOTOR DO BABYLONJS    
    const engine = new BABYLON.Engine(canvas, true);
    ///OBJETO DE CENA
    const scene = new BABYLON.Scene(engine);
    
    //CAMERA QUE NOS PERMITE OBSERVAR A CENA
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,1.5,-8), scene);

    //LUZ 
    const light = new BABYLON.HemisphericLight('light',  new BABYLON.Vector3(0.1,10,0),scene);
    camera.attachControl(canvas);   

    scene.clearColor = new BABYLON.Color3(1,1,1);

    const box = new BABYLON.Mesh.CreateBox('box',2 ,scene);

    const boxMaterial = new BABYLON.StandardMaterial('boxMaterial', scene);
    //boxMaterial.diffuseColor = new BABYLON.Color3(0,0,1);
    
    boxMaterial.diffuseTexture = new BABYLON.Texture('assets/img/caixa.png', scene);
    box.material = boxMaterial;

    const box1 = new BABYLON.Mesh.CreateBox('box1',2 ,scene);

    box1.material = boxMaterial;
    box1.position =  new BABYLON.Vector3(0,2,0);

   
    engine.runRenderLoop(()=>{
      scene.render();  
   }); 
});