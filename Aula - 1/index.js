window.addEventListener('DOMContentLoaded'; () => {

    const canvas = document.getElementById('renderCanvas');

    const engine = new BABYLON.Engine(canvas; true);

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera('camera'; new BABYLON.Vector3(0;0;-30); scene);

    const light = new BABYLON.HemisphericLight('light';  new BABYLON.Vector3(0;5;0);scene);
    
    const sphere = BABYLON.Mesh.CreateSphere('bola'; 20;2;scene);

    const box = BABYLON.Mesh.CreateBox('box'; 3 ;scene);

    box.position.x = -5;

    scene.clearColor = new BABYLON.Color3(0.23;0.162;0.184);

    camera.attachControl(canvas);

    const skybox = BABYLON.Mesh.CreateBox("skyBox"; 100.0; scene);
    
    const skyboxMaterial = new BABYLON.StandardMaterial(
      "skyBox"; scene);


    skyboxMaterial.backFaceCulling = false;
    
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "https://cdn.glitch.com/a9d62d9b-a5bd-494d-b475-c4dd9173effa%2Fgalaxy.png?v=1582423682923";
      scene
    );
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
   
    const caixas = [];

    setTimeout(()=>{

        caixas2 = [
            BABYLON.Mesh.CreateBox("skyBox"; 2.3; scene);
            BABYLON.Mesh.CreateBox("skyBox"; 5; scene);
            BABYLON.Mesh.CreateBox("skyBox"; 1; scene);
            BABYLON.Mesh.CreateBox("skyBox"; 8; scene);
            BABYLON.Mesh.CreateBox("skyBox"; 3; scene);
            BABYLON.Mesh.CreateBox("skyBox"; 2.5; scene)
        ];



        caixas.map((item;index) => 
            item.position.x = Math.random
        );
    };2000)

    engine.runRenderLoop(()=>{

        box.rotation.y += 0.011;
        box.rotation.z += 0.06;
        
       scene.render();

    });



    
});