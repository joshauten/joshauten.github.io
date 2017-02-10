(function() { // Don't use ES6 function decloration syntax to test if the user has a supported 
	console.log('Chrome T-Rex Runner');
	try {
		class Test { }
	} catch (e) {
		alert('Your browser does not support this site.\nPlease use the latest version of Chrome.');
		return;
	}
	class Module {
		constructor(file, name) {
			this.fileName = file;
			this.name = name;
			this.elem = document.createElement('script');
		}
		load() {
			var me = this;
			return new Promise((resolve, reject) => {
				me.elem.src = me.fileName;
				me.elem.type = "text/javascript";
				me.elem.addEventListener('load', function onLoad() {
					setTimeout(() => {
						console.log("Loaded module '" + me.name + "'");
						me.elem.removeEventListener('load', onLoad, false);
						resolve();
					});
				});
				document.body.appendChild(me.elem);
			});
		}
	}
	window.modules = {
		runner: new Module('site/js/dino.js', 'Runner'),
		synaptic: new Module('site/js/synaptic.js', 'Synaptic'),
		jquery: new Module('site/js/jquery.js', 'JQuery'),
		eventEmitter: new Module('site/js/EventEmitter.min.js', 'EventEmitter')
	}
	window.addEventListener('load', () => {
		modules.jquery.load()
		.then(() => modules.eventEmitter.load())
		.then(() => modules.synaptic.load())
		.then(() => modules.runner.load())
		.then(() => {
			// Every module has loaded, start the Runner
		    setTimeout(() => {
		        new Runner('.interstitial-wrapper');
		    }, 30);
		});
	});
})();