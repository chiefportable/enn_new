const caro = document.querySelector(".caro");
const first = document.querySelector(".first");
const second = document.querySelector(".second");


setTimeout(() => {
    first.classList.add("addFirst");
    setTimeout(() => {
        caro.classList.add("addcolor");
        setTimeout(() => {
            second.classList.add("addSecond");
        }, 1000);
    }, 1000);
}, 1000);


const navbar = document.querySelector(".navbar");

const sticky = navbar.offsetTop;

const myFunction = ()=>{
    if(window.scrollY > sticky){
        navbar.classList.add("fixed-top", "fade-in-item");
    }else{
        navbar.classList.remove("fixed-top");
    }
}

window.onscroll = function(){
    myFunction();
}