(() => {
	// Start the runner
	new Runner('.interstitial-wrapper');
	class Dino extends EventEmitter {
		constructor() {
			// Call the constructor for the EventEmitter
			super();
			this.runner = Runner.instance_;
			this.rex = Runner.instance_.tRex;
			// Create assets for the dino's neural network
			this.nn = new synaptic.Architect.Perceptron(2, 10, 1);
			this.trainer = new synaptic.Trainer(this.nn);
		}
		play() {
			dino.runner.loadSounds();
			dino.runner.activated = true;
			dino.rex.startJump();
		}
		respawn() {
			dino.runner.restart();
		}
		jump() {
			dino.rex.startJump();
		}
	}
	window.dino = new Dino();
	window.Dino = Dino;
})();