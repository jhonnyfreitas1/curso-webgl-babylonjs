window.addEventListener('DOMContentLoaded', () => {
    //CANVAS ONDE É RENDERIZADO A CENA
    const canvas = document.getElementById('renderCanvas');
    //MOTOR DO BABYLONJS    
    const engine = new BABYLON.Engine(canvas, true);
    ///OBJETO DE CENA
    const scene = new BABYLON.Scene(engine);
    //CAMERA QUE NOS PERMITE OBSERVAR A CENA
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,0,-30), scene);
    //LUZ 
    const light = new BABYLON.HemisphericLight('light',  new BABYLON.Vector3(0,5,0),scene);
    //CAIXA
    const box = new BABYLON.Mesh.CreateBox('box', 2,scene);
    //CHAO 
    const ground = new BABYLON.Mesh.CreateGround('CHAO',10,10,1,scene);
    ground.position.y = -2;

    //torus/
    const torus = new BABYLON.Mesh.CreateTorus('torus',4,0.8,20, scene);
    torus.position.y = 4;

    //cylinder
    const  cylinder = new BABYLON.Mesh.CreateCylinder('cilindro', 3.5,1,2.5,20,1,scene);
    cylinder.position.z = -3;
    cylinder.position.x = -3;

    //plano
    const  plane = new BABYLON.Mesh.CreatePlane('plane', 2,scene );
    plane.position.x =3;


    const Linha1 = new BABYLON.Mesh.CreateLines('linhas1', [
        new BABYLON.Vector3(0,0,0),
        new BABYLON.Vector3(0,5,0),
        new BABYLON.Vector3(-3,5,0),
        new BABYLON.Vector3(3,5,0),
    ],scene);

    
    const J = new BABYLON.Mesh.CreateLines('J', [
        new BABYLON.Vector3(0,0,0),
        new BABYLON.Vector3(-1,1,0),
        new BABYLON.Vector3(0,0,0),
        new BABYLON.Vector3(0,3,0),
        new BABYLON.Vector3(-1,3,0),
        new BABYLON.Vector3(1,3,0),
    ],scene);

    J.position.x = 6;
    camera.position.y =3;
    camera.position.z =-13;
    camera.attachControl(canvas);

    engine.runRenderLoop(()=>{
        
       scene.render();

    });



    
});