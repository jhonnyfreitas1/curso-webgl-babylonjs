window.addEventListener('DOMContentLoaded', () => {
    //CANVAS ONDE É RENDERIZADO A CENA
    const canvas = document.getElementById('renderCanvas');
    //MOTOR DO BABYLONJS    
    const engine = new BABYLON.Engine(canvas, true);
    ///OBJETO DE CENA
    const scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color4(0.1,2,0,2);
    //CAMERA QUE NOS PERMITE OBSERVAR A CENA
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,1,-10), scene);
    //LUZ 
    const light = new BABYLON.HemisphericLight('light',  new BABYLON.Vector3(0.1,10,0),scene);
    
    camera.attachControl(canvas);   
   

   const box1 = new BABYLON.Mesh.CreateBox('box1', 1, scene);
   
   const box2 = new BABYLON.Mesh.CreateBox('box2', 1, scene);


   box1.scaling.y = 4;

   box2.position.x = -4;   
   box2.parent =box1;
   box2.position.y =3;

   engine.runRenderLoop(()=>{
      scene.render();  

      box1.rotation.y += .009;
   }); 
});