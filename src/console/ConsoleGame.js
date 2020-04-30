export default class ConsoleGame {
    constructor(core, eventHandler) {
        this.core = core
        this.eventHandler = eventHandler
    }

    run() {
        this.eventHandler.init(this.core)
        this.core.init(core => this.eventHandler.render(core))
        // setInterval(() => {
        //     this.eventHandler.render(this.core)
        // }, 1000)
        this.eventHandler.render(this.core)
    }
}
