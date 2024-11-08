const nbspSelectors = [
	'h1',
	'h3',
	'h4',
	'h5',
	'h6',
	'p',
	'blockquote'
];

const nbspWordMin = 6;

nbspSelectors.forEach(function(selector) {
	var nbspElements = document.querySelectorAll(selector);
	nbspElements.forEach(function(element) {
		var wordCount = (element.innerHTML.split(" ").length);
		if (wordCount >= nbspWordMin) {
			element.innerHTML = element.innerHTML.replace(/ ([^ ]*)$/,'&nbsp;$1');
		}
	});
});
