window.addEventListener('DOMContentLoaded', () => {
    //CANVAS ONDE É RENDERIZADO A CENA
    const canvas = document.getElementById('renderCanvas');
    //MOTOR DO BABYLONJS    
    const engine = new BABYLON.Engine(canvas, true);
    ///OBJETO DE CENA
    const scene = new BABYLON.Scene(engine);


    const camera = new BABYLON.UniversalCamera('camera',new BABYLON.Vector3(0,0,-15),scene );

    camera.attachControl(canvas);
    
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0,5,0),scene);

    const sphere  = BABYLON.Mesh.CreateSphere('sphere', 10, 5, scene);
    
    const sphere2  = BABYLON.Mesh.CreateSphere('sphere', 10, 5, scene);

    sphere2.position.x = -15;

   engine.runRenderLoop(()=>{
       scene.render();  
    }); 
});