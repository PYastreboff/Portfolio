window.addEventListener("load", function () {
  document.getElementById("loader").style.display = "none"; // remove loader div
  //document.getElementById("header").style.display = "initial"; // add in header
  //document.getElementById("content").style.display = "initial"; // add in content div
  window.scrollHeight = -10;
});

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000)); // number is the number of seconds in the required years
}


//=============================================================================
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
//=============================================================================

function showModal(type) {
    if (type == 'help') {
        disableScroll();
        document.getElementById('helpModal').style.display = "flex";
    }
}

function closeModal(type) {
    if (type == 'help') {
        enableScroll();
        document.getElementById('helpModal').style.display = "none";
    }
}

function slowScrollToElement(elementId, duration) {
    const targetElement = document.getElementById(elementId);
  
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startingY = window.pageYOffset;
    const distance = targetPosition - startingY;
    let startTime = null;
  
    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;
        const easeInOutCubic = progress => progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 2 / 2; // Easing function
        //const easeOutCubic = progress => 1 - (1 - progress) ** 3;
        //const easeInCubic = progress => 4 * progress ** 3;

            
        window.scrollTo(0, startingY + distance * easeInOutCubic(progress / duration));
    
        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }
  
    requestAnimationFrame(step);
}

function introScroll() {
    slowScrollToElement('intro_section', 5500);
}