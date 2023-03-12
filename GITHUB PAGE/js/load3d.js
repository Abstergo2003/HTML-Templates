let scene, camera, renderer;

      function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color("#222322");

        camera = new THREE.PerspectiveCamera(45,1,1,500000);
       
        
        camera.position.x = 0;
        camera.position.y = 00;
        camera.position.z = -50;

        controls = new THREE.OrbitControls(camera);
        controls.noPan = true;
        controls.maxDistance = controls.minDistance = 50;  
        controls.noZoom = true;
        controls.addEventListener('change', renderer);

        hlight = new THREE.AmbientLight (0x404040,4);
        scene.add(hlight);

        directionalLight = new THREE.DirectionalLight(0xffffff,1);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        light = new THREE.PointLight(0xc4c4c4,1);
        light.position.set(0,30000,50000);
        scene.add(light);
        light2 = new THREE.PointLight(0xc4c4c4,1);
        light2.position.set(50000,10000,0);
        scene.add(light2);
        light3 = new THREE.PointLight(0xc4c4c4,1);
        light3.position.set(0,10000,-50000);
        scene.add(light3);
        light4 = new THREE.PointLight(0xc4c4c4,1);
        light4.position.set(-50000,30000,50000);
        scene.add(light4);

        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(200,200);
        const div = document.getElementById("3d")
        div.appendChild(renderer.domElement);

        let loader = new THREE.GLTFLoader();
        loader.load('https://pp-group.com.pl/new.gltf', function(gltf){
          car = gltf.scene.children[0];
          car.scale.set(0.5,0.5,0.5);
          scene.add(gltf.scene);
          animate();
        });
      }
      function animate() {
        
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
      }
      init();
