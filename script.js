import { Renderer, Camera, Orbit, Transform, Geometry, Vec3, Color, Polyline } from "https://cdn.jsdelivr.net/npm/ogl@0.0.32/dist/ogl.mjs";

const renderer = new Renderer({ dpr: 2 });
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(0.9, 0.9, 0.9, 1);

const camera = new Camera(gl);
camera.position.z = 5;

function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height
    });
}
window.addEventListener("resize", resize, false);
resize();

const scene = new Transform();
const geometry = new Box(gl);
const program = new Program(gl, {
    vertex:`
    attribute vec3 position;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    fragment:`
    void main(){
        gl_FragColor = vec4(1.0);
    }
    `
});

const mesh = new Mesh(gl, {geometry, program});
mesh.setParent(scene);

requestAnimationFrame(update);

function update(t){
    requestAnimationFrame(update);

    mesh.rotation.y -= 0.04;
    mesh.rotation.x += 0.04;
    renderer.render({scene, camera});
}