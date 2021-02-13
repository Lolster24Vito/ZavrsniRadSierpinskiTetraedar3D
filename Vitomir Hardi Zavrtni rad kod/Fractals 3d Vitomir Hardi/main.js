let level = 2;


function sredinaTocaka(p1, p2)
{
    let hp = new THREE.Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
    return hp;
}

//POSTAVLJANJE SCENE I KAMERE
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;
camera.position.y = 30;


//Postavljanje Three JS OrbitControls za kontroliranje kamere 
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN

};
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};


//Material  sierpinskog tetrahedrona
let material = new THREE.MeshPhongMaterial(
{
    color: 0x919191,
    dithering: false
});



let sin_PI_3 = Math.sin(Math.PI / 3);


//Funkcija koja vraća mesh sierpinskog tetraedra
function sierpinski_build(level, side, v0, geometry)
{
    if (geometry == null) geometry = new THREE.Geometry();


    let v1 = new THREE.Vector3().copy(v0);
    v1.x += side;

    //sin_PI_3=sin 60°.
    let v2 = new THREE.Vector3().copy(v0);
    v2.x += side / 2;
    v2.y += side * sin_PI_3;
    v2.z += side / (sin_PI_3 * 4);

    let v3 = new THREE.Vector3().copy(v0);
    v3.x += side / 2;
    v3.z += side * sin_PI_3;

    console.log(level, "v0", v0, "v1", v1, "v2", v2, "v3", v3);
    if (level === 1)
    {
        let v0_i = geometry.vertices.length;
        //Stavljanje vrhova u geometry
        geometry.vertices.push(v0);
        geometry.vertices.push(v1);
        geometry.vertices.push(v2);
        geometry.vertices.push(v3);
        //Stavljanje strana u geometry
        geometry.faces.push(new THREE.Face3(v0_i + 0, v0_i + 2, v0_i + 1));
        geometry.faces.push(new THREE.Face3(v0_i + 1, v0_i + 2, v0_i + 3));
        geometry.faces.push(new THREE.Face3(v0_i + 3, v0_i + 2, v0_i + 0));
        geometry.faces.push(new THREE.Face3(v0_i + 0, v0_i + 1, v0_i + 3));
    }
    else
    {
        let hside = side / 2;
        sierpinski_build(level - 1, hside, v0, geometry);
        let v01 = sredinaTocaka(v0, v1);
        sierpinski_build(level - 1, hside, v01, geometry);
        let v02 = sredinaTocaka(v0, v2);
        sierpinski_build(level - 1, hside, v02, geometry);
        let v03 = sredinaTocaka(v0, v3);
        sierpinski_build(level - 1, hside, v03, geometry);


    }
    return geometry;
}

function sierpinski(level, side)
{
    let geometry = sierpinski_build(level, side,
        new THREE.Vector3(-side / 2,
            0, -side / 2));
    // pojednostavljanje mesha
    geometry.mergeVertices(); 
    geometry.computeVertexNormals(true);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
}



//sierpinski object koji se pokazuje prilikom učitavanja
let sierpinski_obj;
sierpinski_obj = sierpinski(level, 50);
scene.add(sierpinski_obj);


//Postavljanje svijetla za scenu
//Zeleno svijetlo
const frontSpot = new THREE.SpotLight(0x00ff33);
frontSpot.position.set(500, 25, 0);
frontSpot.intensity = 1.7;
frontSpot.castShadow = true; // default false
frontSpot.target = sierpinski_obj;
scene.add(frontSpot);

//Ružićasto svijetlo
const frontSpot2 = new THREE.SpotLight(0xff00e3);
frontSpot2.position.set(-250, 250, 500);
frontSpot2.intensity = 1.7;
frontSpot2.castShadow = true; // default false
frontSpot2.target = sierpinski_obj;
scene.add(frontSpot2);

//Plavo svijetlo
const frontSpot3 = new THREE.SpotLight(0x00e0ff);
frontSpot3.position.set(0, -250, 0);
frontSpot3.intensity = 1.7;
frontSpot3.castShadow = true; // default false
frontSpot3.target = sierpinski_obj;

scene.add(frontSpot3);

//žuto svijetlo
const frontSpot4 = new THREE.SpotLight(0xffee00);
frontSpot4.position.set(-250, 250, -500);
frontSpot4.intensity = 1.7;
frontSpot4.castShadow = true; // default false
frontSpot4.target = sierpinski_obj;
scene.add(frontSpot4);

//crveno svijetlo
const frontSpot5 = new THREE.SpotLight(0xff0033);
frontSpot5.position.set(0, 250, 0);
frontSpot5.intensity = 1.7;
frontSpot5.castShadow = true; // default false
frontSpot5.target = sierpinski_obj;
scene.add(frontSpot5);


//Funkcija koja crta  sierpinski tetraedar za jednu višu iteraciju  
function PlusButton()
{
    if (level < 9)
    {
        level += 1;
        scene.remove(sierpinski_obj);

        sierpinski_obj = sierpinski(level, 50);
        scene.add(sierpinski_obj);
        document.getElementById("level").textContent = level;
    }
}

//Funkcija koja crta  sierpinski tetraedar za jednu nižu iteraciju  
function MinusButton()
{
    if (level > 1)
    {
        level -= 1;
        scene.remove(sierpinski_obj);
        sierpinski_obj = sierpinski(level, 50);
        scene.add(sierpinski_obj);
        document.getElementById("level").textContent = level;
    }
}

//funkcija koja kontrolira kretanje kamere
let controller = function()
{
    requestAnimationFrame(controller);

    controls.update();

    renderer.render(scene, camera);
};

controller();