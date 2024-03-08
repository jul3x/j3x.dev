var TxtType = function(el, sections, period) {
    this.el = el;
    this.sections = sections;
    this.currentTxt = '';
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    var that = this;
    var currentJob = setTimeout(function() {
        that.tick();
    }, 2000);
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    if (!this.currentTxt || !this.txt) {
        this.currentTxt = this.sections[document.location.hash];
    }
    var fullTxt = this.currentTxt;
    if (this.isDeleting) {
        var newChars = 1;
        if (fullTxt[this.txt.length - 1] == '>') {
            for (var i = this.txt.length - 2; i >= 0; --i) {
                if (fullTxt[i] == '<') {
                    newChars = this.txt.length - i;
                    break;
                }
            }
        }

        this.txt = fullTxt.substring(0, this.txt.length - newChars);
    } else {
        var newChars = 1;
        if (fullTxt[this.txt.length] == '<') {
            for (var i = this.txt.length + 1; i < fullTxt.length; ++i) {
                if (fullTxt[i] == '>') {
                    newChars = i - this.txt.length + 1;
                    break;
                }
            }
        }

        this.txt = fullTxt.substring(0, this.txt.length + newChars);
    }

    var that = this;
    var delta = 0;

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (!this.isDeleting && this.txt === '') {
        delta = 2000;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    } else {
        delta = 200 - Math.random() * 100;

        if (this.isDeleting) { 
            delta /= 2; 
        }    
    }

    this.el.getElementsByClassName('wrap')[0].innerHTML = this.txt;

    this.currentJob = setTimeout(function() {
        that.tick();
    }, delta);
};

window.addEventListener('load', function() {
    var elements = document.getElementsByClassName('typewrite');
    var sectionElements = document.getElementsByClassName('page-section');
    
    var sections = {};
    for (var section of sectionElements) {
        sections['#' + section.getAttribute('id')] = section.getAttribute('data-type');
    }

    var txtType = null;
    var period = elements[0].getAttribute('data-period');
    txtType = new TxtType(elements[0], sections, period);
    elements[0].removeAttribute('data-type');

    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = `
    .typewrite .caret {
        animation: caret 1s steps(1) infinite;
        opacity: 1;
        background-color: #fff;
        width: 0.6em;
        height: 0.4rem;
        display: inline-block;
        margin-left: 0.2rem;
    }

    @keyframes caret {
        50% {
            opacity: 0;
        }
      }
    `;
    document.body.appendChild(css);
    window.addEventListener(
        "hashchange",
        () => {
            clearTimeout(txtType.currentJob);
            txtType.isDeleting = true;
            txtType.tick();
        },
        false,
    );
});
