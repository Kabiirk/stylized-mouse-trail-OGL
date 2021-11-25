import { Renderer, Camera, Orbit, Transform, Geometry, Vec3, Color, Polyline } from "https://cdn.jsdelivr.net/npm/ogl@0.0.32/dist/ogl.mjs";

const renderer = new Renderer({ dpr: 2 });
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(0.9, 0.9, 0.9, 1);

const camera = new Camera(gl);
camera.position.z = 3;

const controls = new Orbit(camera);

const scene = new Transform();

let polyline;

function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height
    });
    if(polyline){
        polyline.resize();
    }
}
window.addEventListener("resize", resize, false);
resize();

const count = 100;
const points = [];
for(let i=0; i<count; i++){
    const x = (i/(count-1)-0.5)*3;
    const y = Math.sin(i/10.5) * 0.5;
    const z = 0;

    points.push(new Vec3(x, y, z));
}

polyline = new Polyline(gl, {
    points,
    uniforms : {
        uColor : { value: new Color('#1b1b1b') },
        uThickness : { value: 20 },
        uMiter : { value: 0 },
    }
});

polyline.mesh.setParent(scene);

resize();

requestAnimationFrame(update);

function update(t){
    requestAnimationFrame(update);
    controls.update();
    renderer.render({scene, camera});
}