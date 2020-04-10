window.addEventListener('DOMContentLoaded', () => {
    //CANVAS ONDE É RENDERIZADO A CENA
    const canvas = document.getElementById('renderCanvas');
    //MOTOR DO BABYLONJS    
    const engine = new BABYLON.Engine(canvas, true);
    ///OBJETO DE CENA
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.UniversalCamera('camera',new BABYLON.Vector3(0,0,-50),scene );

    camera.attachControl(canvas);
    
    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    const box1  = BABYLON.Mesh.CreateBox('sphere', 4, scene);


    engine.runRenderLoop(()=>{
       scene.render();   
    }); 
});