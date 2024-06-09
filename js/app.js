const titleContainer = document.getElementById("title-container");
const titles = document.querySelectorAll("#title-container h1.rel");
const titleScreen = document.getElementById("title-screen");
const info = document.getElementById("info-text");
const infoContainer = document.getElementById("info-screen");
const scrollDown = document.getElementById("sd");
const helpButton = document.getElementById("headerHelp");
const infoBar = document.getElementById("info-bar");
const question = document.getElementById("port-text");
const introSection = document.getElementById("intro_section");
const timeline = document.getElementById("timeline");
const bottomBar = document.getElementById("bottom-bar");
const portScreen = document.getElementById("port-screen-parralax");


const GCard = document.getElementById("graphic-card");
const CCard = document.getElementById("coding-card");

const TSHeight = titleContainer.offsetHeight
const TCHeight = titleContainer.offsetHeight;
const IHeight = infoContainer.offsetHeight;
const ISHeight = introSection.offsetHeight;
const THeight = timeline.offsetHeight;
const IBHeight = infoBar.offsetHeight;
const BBHeight = bottomBar.offsetHeight;
const PSHeight = portScreen.offsetHeight;


window.onload = function () { 
    titleContainer.style.top = "calc(50vh - "+(titleContainer.offsetHeight / 2)+"px)";
    //console.log("calc(50vh - "+(titleContainer.offsetHeight / 2)+"px)");
    window.scrollTo(0, 0); // scroll to top
}

window.onbeforeunload = function () {
    //window.scrollTo(0, 0); // scroll to top
}


document.addEventListener('scroll', (e) => { // on scroll
    const scrollY = window.scrollY;
    console.log(scrollY);

    if (scrollY < 1) {
        scrollDown.style.display = "block";
    } else {
        scrollDown.style.display = "none";
    }

    if (scrollY >= 0 && scrollY <= TCHeight) {
        titleContainer.style.display = "block";
        const rotateZ = scrollY/30;
        const scale = (scrollY/5) + 100;
        const titlesRot = (scrollY/5) + 90;
        const opacity = 100 - (scrollY/TCHeight*125);

        //console.log(scrollY);
        //console.log( "rotateX(0deg) rotateY("+rotateY+"deg) rotateZ("+rotateZ+"deg)");
        titleContainer.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ("+rotateZ+"deg) scale("+scale+"%)";
        titleContainer.style.opacity = opacity+"%";
        titles.forEach((title) => {
            title.style.transform = "rotateX("+titlesRot+"deg)";
        });
        info.style.opacity = "0%";
        
    } else if (scrollY > TCHeight && scrollY >= 0) {
        titleContainer.style.opacity = "0";
        //const infoOpacity = ((scrollY - (TCHeight*0.5)) / (IHeight-250)) * 100;
        const infoPercent = ((scrollY - TCHeight) / IHeight) * 100;
        const io = infoPercent ;
        
        //console.log(scrollY);

        info.style.opacity = io+"%";

        var ls = 80 - infoPercent;
        if (ls < 10) {
            ls = 10;
        }
        info.style.letterSpacing = ls.toString()+"px";

        if (scrollY > (TCHeight+IHeight+ISHeight+THeight)) {
            info.style.opacity = "0%";
        }


        if (scrollY < (TCHeight+IHeight+ISHeight+THeight-(.5*THeight))) {
            question.style.opacity = "0%";
            GCard.style.marginRight = "100vw";
            CCard.style.marginLeft = "100vw";
        }
        if (scrollY > (TCHeight+IHeight+ISHeight+THeight+BBHeight)) {
            const beforePort = (TSHeight+IHeight+ISHeight+THeight+BBHeight);
            console.log("Before: "+beforePort, "ScrollY: "+scrollY);
            const portPercent = ((scrollY - beforePort) / PSHeight) * 100;
            question.style.opacity = (((portPercent)*1.3)-20).toString()+"%";
            var qs = 80 - portPercent;
            if (qs < 3) {
                qs = 3;
            }
            question.style.letterSpacing = qs+"px";
            GCard.style.marginRight = qs+"vw";
            CCard.style.marginLeft = qs+"vw";
            console.log(portPercent);
        }


        /* // To add Sticky Text
        if (scrollY > 2620) {
            info.style.top = "calc(50% + "+(scrollY - 2620)+"px * -1)";
        } else {
            info.style.top = "50%";
        }
        */
    } else {}
});



// Start of scroll fade animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    })
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));

document.getElementById("age").innerHTML = calcAge("2005-02-14"); // change the age <h1> tag to my real age