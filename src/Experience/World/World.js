import Experience from '../Experience.js'
import Flag from './Flag.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Wait for resources
    this.resources.on('ready', () => {
      this.flag = new Flag()
    })
  }

  update() {}
}
