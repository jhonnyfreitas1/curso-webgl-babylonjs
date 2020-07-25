window.addEventListener('DOMContentLoaded', startgame);

function startgame(){
   //CANVAS ONDE É RENDERIZADO A CENA
   canvas = document.getElementById('renderCanvas');
   //MOTOR DO BABYLONJS    
   engine = new BABYLON.Engine(canvas, true);
   ///OBJETO DE CENA
   scene = createScene();
   scene.autoClear = false; 
   scene.autoClearDepthAndStencil = false; 

   placarO=document.getElementById('jogadorO');
   placarX=document.getElementById('jogadorX');
   
   engine.runRenderLoop(()=>{
     
      scene.render();  

      camera.beta >= 1.6224530684231742 ? camera.beta = 1.6224530684231743 : '';
    }); 
}

function createScene(){/// CRIA A CENA
   scene = new BABYLON.Scene(engine);
   possoJogar =true;
   camera = new BABYLON.ArcRotateCamera('camera',0, 1,30, new BABYLON.Vector3(0,0,0), scene);
   camera.attachControl(canvas, true);   
   scene.activeCamera =camera;
   
   camera2 = new BABYLON.FreeCamera('camera',new BABYLON.Vector3(29.06257920217873,47.66885787257952,-29.26192807413112), scene);
   camera2.rotation = new BABYLON.Vector3(1.0055503635002186,-0.863123026826512,0)   

   //LUZ 
   const light = new BABYLON.HemisphericLight('light',  new BABYLON.Vector3(0.1,2,0),scene);
   light.intensity = .9;
   //textura das caixas que ficam sobre o chão
   const boxMaterial = new BABYLON.StandardMaterial('boxMaterial' , scene);
   boxMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
   boxMaterial.wireframe =true;
   const groundMaterial = new BABYLON.StandardMaterial('groundMaterial' , scene)  ;
   groundMaterial.diffuseColor= new BABYLON.Vector3(0,0,0);  
   groundMaterial.emissiveColor= new BABYLON.Vector3(1,1,1);
   

//ceu material 
   const skyboxMaterial = new BABYLON.StandardMaterial('skybox', scene);
   skyboxMaterial.backFaceCulling = false;
   skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/img/skybox", scene);
   skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
   skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
   
   //caixa do ceu
   const skybox = new BABYLON.Mesh.CreateBox('skybox' ,200, scene);
   skybox.material = skyboxMaterial;

   //CHAO 
   const ground = new BABYLON.Mesh.CreateBox('ground' ,15, scene);
   ground.position = new BABYLON.Vector3(0,-13.1,0);
   ground.scaling.y = 2;
   ground.material = groundMaterial;
   
   
   //array do game  
   game = [{},{},{},
           {},{},{},
           {},{},{}];   


   trocar = false;//variavel de troca de jogador
   
    X = -5;//distancia entre as caixas em x para as caixas
    Z = -5;//distancias entre as caixas em z para as caixas
  
   //cria e organiza as caixas encima da ground com base no array game[] e adicionando a ação
    for(i = 0; i < game.length; i++){
      game[i]= new BABYLON.Mesh.CreateBox(`box${i}`,4, scene);
         if(i < 3){//alterar a posição de 3 em 3 
            game[i].position.z= Z;
            game[i].position.x += i * X + 5;
         }else if(i >= 3 && i < 6){
            game[i].position.z = Z + 5;
            game[i].position.x += i * X + 20;
         }else{
            game[i].position.z = Z + 10;
            game[i].position.x += i * X + 35;
         }
         game[i].material = boxMaterial;
         game[i].freezeWorldMatrix();
         game[i].scaling.y =0.5;
         game[i].value = null;
         game[i].actionManager = new BABYLON.ActionManager(scene);//cria uma ação com base na cena
         game[i].actionManager.registerAction(clickEvent());//chama evento de click para executar um codigo
      }
   
   function clickEvent(){ //Codigo executor na hora do click/
      let execCode =  new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (event) => {
         if(possoJogar){
            if(event.meshUnderPointer.value === null ){
                  event.meshUnderPointer.value = trocar ? 'O' : 'X';
                  getParent(event.meshUnderPointer); //define qual objeto X ou O para ficar encima do Box  
                  verifyWin();//chamada de função pra verificar se alguem ganhou
               }
            }
      });
      return execCode;
   }

   function getMaterialColor(bol, scene){ //material do Mesh X ou do O verde ou vermelho
      const randomMaterial = new BABYLON.StandardMaterial('materialRandom' , scene);
      randomMaterial.diffuseColor = bol ?  new BABYLON.Color3(2,0,0) : new BABYLON.Color3(0,2,0);
      randomMaterial.freeze();
      return randomMaterial;
   }

   function getX(mesh, scene){ //cria um objeto de X com duas Caixas;
      let x1 = new BABYLON.Mesh.CreateBox('x', 3, scene);
      x1.scaling.x=0.1; 
      x1.rotation.y = 2.5;
   
      let x2 = new BABYLON.Mesh.CreateBox('x', 3, scene);
      x2.scaling.x=0.1;    
      x2.rotation.y =-2.5;
   
      x2.parent = mesh;
      x2.position.y =1.5;
      x1.parent = mesh;
      x2.material = getMaterialColor(trocar);

      return x1;  
   }
   function getParent(mesh){ //recebe o UMA DAS CAIXAS para tornar X ou O parent dela.
      jogador = trocar ?  new BABYLON.Mesh.CreateTorus('o',3, .8,50, scene) :  getX(mesh);
      jogador.parent = mesh;  
      jogador.value = trocar; // se trocar === true X se nao O     
      trocar ? jogador.position.y = 2 : jogador.position.y= 1.4;
      jogador.material = getMaterialColor(trocar);
         trocar = !trocar;
   }

   function verifyWin () {//verificar se alguem ganhou
      for(i = 0; i < game.length; i++){
         //verificar  linhas
         if(game[i].value && game[i+3] && game[i].value == game[i+3].value && game[i+6] && game[i+6].value === game[i+3].value)
         {
               setPlacar(game[i].value);
               possoJogar = false;
               resetGame();
               scene.activeCamera =camera2;
               return;
            }
            else if((i == 0 || i == 3 || i==6) && game[i+1].value && game[i].value == game[i+1].value && game[i+2] && game[i+2].value === game[i+1].value)
             {
               setPlacar(game[i].value);
               resetGame();
               scene.activeCamera =camera2;
               possoJogar = false;
               return;
            }else if(game[4].value && (game[0].value == game[4].value  && game[4].value == game[8].value ||  game[2].value == game[4].value && game[4].value == game[6].value)){
               setPlacar(game[4].value);
               possoJogar = false;
               scene.activeCamera =camera2;
               resetGame();
               return;
            }else{
               verifyVelha();  
            }
            
         }
      }      
      
      
      function setPlacar(value){  
         let ground =  scene.getMeshByName('ground');
         groundMaterial.emissiveColor= new BABYLON.Vector3(0,0,0);
   
         if(value == 'X'){
            let videoTextureX = new BABYLON.VideoTexture("video", "assets/img/x.mp4",scene, true);
            let value = parseInt(placarX.innerHTML);
            let placar = value ?  value + 1 : 1;
            placarX.innerHTML = placar;
            ground.material.emissiveTexture = videoTextureX;
         }else{
            let videoTextureO = new BABYLON.VideoTexture("video", "assets/img/o.mp4", scene, true);
            let value = parseInt(placarO.innerHTML);
            let placar = value ?  value + 1 : 1;
            placarO.innerHTML = placar;
            ground.material.emissiveTexture = videoTextureO;
         }
      
   }

   //verifica se deu velha
   function verifyVelha(){
      let testeVelha = game.filter((item) =>{
         return item.value != 'X' && item.value != 'O';
      });

       if(testeVelha[0] == null){     
         let videoTextureVelha = new BABYLON.VideoTexture("video", "assets/img/velha.mp4", scene, true);
         groundMaterial.emissiveColor= new BABYLON.Vector3(0,0,0);
   
         let ground =  scene.getMeshByName('ground');
         ground.material.emissiveTexture = videoTextureVelha;
         possoJogar = false;
         scene.activeCamera =camera2;
         resetGame();
       }
   }
    
   function resetGame(){
      setTimeout(()=>{
         scene.dispose();
         createScene();
         trocar = !trocar;    
         possoJogar =true;
      },4000)
     
   } 
   return scene;
}   