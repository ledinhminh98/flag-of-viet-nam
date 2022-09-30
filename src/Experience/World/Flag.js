import * as THREE from 'three'
import testFragmentShader from '../../Shaders/test/fragment.glsl'
import testVertexShader from '../../Shaders/test/vertex.glsl'
import Experience from '../Experience.js'

export default class Flag {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.clock = new THREE.Clock()

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.time.on('tick', () => {
      this.update()
    })
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    const count = this.geometry.attributes.position.count
    const randoms = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random()
    }
    this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
  }

  setMaterial() {
    const textureLoader = new THREE.TextureLoader()
    const flagTexture = textureLoader.load('/textures/flag-vietnam.png')

    this.material = new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') },
        uTexture: { value: flagTexture },
      },
      side: THREE.DoubleSide,
    })

    // Debug
    this.debug.ui
      .add(this.material.uniforms.uFrequency.value, 'x')
      .min(0)
      .max(20)
      .step(0.01)
      .name('frequencyX')
    this.debug.ui
      .add(this.material.uniforms.uFrequency.value, 'y')
      .min(0)
      .max(20)
      .step(0.01)
      .name('frequencyY')
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.y = 2 / 3
    this.scene.add(this.mesh)
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime()
    this.material.uniforms.uTime.value = elapsedTime
  }
}
