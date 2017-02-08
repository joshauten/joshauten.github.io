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
		}
		load() {
			var me = this;
			return new Promise((resolve, reject) => {
				var s = document.createElement('script');
				s.src = me.fileName;
				s.type = "text/javascript";
				s.addEventListener('load', function onLoad() {
					setTimeout(() => {
						console.log("Loaded module '" + me.name + "'");
						s.removeEventListener('load', onLoad, false);
						resolve();
					});
				});
				document.body.appendChild(s);
			});
		}
	}
	window.modules = {
		runner: new Module('site/js/dino.js', 'Runner'),
		synaptic: new Module('site/js/synaptic.js', 'Synaptic'),
		jquery: new Module('site/js/jquery.js', 'JQuery')
	}
	window.addEventListener('load', () => {
		modules.jquery.load()
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