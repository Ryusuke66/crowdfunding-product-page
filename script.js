let menuIcon = document.getElementById("menu");
let nav = document.querySelector("nav");
let body = document.querySelector("body");

menuIcon.addEventListener("click", () => {
    if(menuIcon.classList.contains('active')) {
        menuIcon.classList.remove("active");
        menuIcon.classList.add("inactive");
        nav.classList.remove("on");
    } else {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        menuIcon.classList.add('active');
        menuIcon.classList.remove("inactive");
        nav.classList.add("on");
    }
});

body.addEventListener("click", () => {
    if (menuIcon.classList.contains("active")) {
        nav.classList.remove("on");
        menuIcon.classList.remove("active");
        menuIcon.classList.add("inactive");
    };
});
menuIcon.addEventListener("click", (ev) => {
    ev.stopPropagation();
});
nav.querySelector("ul").addEventListener("click", (ev) => {
    ev.stopPropagation();
});

let backProject = document.getElementById("back-project");
let popUp = document.querySelector(".popup");

backProject.addEventListener("click", () => {
    if(popUp.classList.contains("on")) {
        popUp.classList.remove('on');
    } else {
        popUp.classList.add("on")
    }
});

let bookmark = document.querySelector(".bookmark");

bookmark.addEventListener("click" , () => {
    if (bookmark.classList.contains("active")) {
        bookmark.classList.remove("active");
        bookmark.classList.add("inactive");
    } else {
        bookmark.classList.add("active");
        bookmark.classList.remove("inactive");
    }
});

let num = 89914;
let backers = 5007;
let backed = document.querySelector(".stats .num");
let total = document.querySelector("#total .num");
let pledges = document.querySelectorAll(".pledge");
let aboutLeft = document.querySelectorAll(".pledge .num");
let form = document.querySelector("form");
let labels = document.querySelectorAll("form > label");
let radios = document.querySelectorAll("input[type=radio]");
let left = document.querySelectorAll(".left span");
let inputs = document.querySelectorAll("input[type=number]");
let button = document.querySelectorAll(".grid button");
let error = document.querySelectorAll(".error-text");
let rewardButton = document.querySelectorAll('.pledge button');
let thanks = document.getElementById("thanks");
    
for (let i = 0; i < rewardButton.length; i++) {
    rewardButton[i].addEventListener('click', (e) => {
        labels[i + 1].classList.add("check");
        radios[i + 1].checked = true;
        popUp.classList.add("on");
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" 
        });
    })
}
    
for (let i = 0; i < radios.length; i++) {

    if (labels[i].classList.contains("out")) {
        radios[i].disabled = true;
    }

    radios[i].addEventListener("click", () => {
        if (radios[i].checked) {
            labels.forEach(a => a.classList.remove("check"));
            labels[i].classList.add("check");
        } else {
            labels[i].classList.remove("check");
        }
    });
}



form.addEventListener("submit", (e) => {
    let valid = true;

    e.preventDefault();
    
    if ((inputs[0].value < 25 || inputs[0].value >= 75) && labels[1].classList.contains("check")) {
        inputs[0].classList.add("error");
        error[0].classList.add("activated");
        error[0].textContent = "The pledge should be within the range";
        valid = false;
    } else {
        inputs[0].classList.remove("error");
        error[0].classList.remove("activated");
    }

    if ((inputs[1].value < 75 || inputs[1].value >= 200) && labels[2].classList.contains("check")) {
        inputs[1].classList.add("error");
        error[1].classList.add("activated");
        error[1].textContent = "The pledge should be within the range";
        valid = false;
    } else {
        inputs[1].classList.remove("error");
        error[1].classList.remove("activated");
    }

    if (inputs[2].value < 200 && labels[3].classList.contains("check")) {
        inputs[2].classList.add("error");
        error[2].classList.add("activated");
        error[2].textContent = "The pledge should be within the range";
        valid = false;
    } else {
        inputs[2].classList.remove("error");
        error[2].classList.remove("activated");
    }

    if(valid) {
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].classList.contains("check")) {
                if(parseInt(left[i - 1].textContent) === 1) {
                    labels[i].classList.add("out");
                    pledges[i - 1].classList.add("out");
                    labels[i].classList.remove("check");
                    radios[i].disabled = true;
                    radios[i].checked = false;
                    popUp.classList.remove("on");
                }
                left[i - 1].textContent = parseInt(left[i - 1].textContent) - 1;
                aboutLeft[i - 1].textContent = left[i - 1].textContent;
            }
            
        }
        let totalPledgeAmount = 0;
    
        inputs.forEach(input => {
            let pledgeAmount = parseInt(input.value);
            if (!isNaN(pledgeAmount)) {
                totalPledgeAmount += pledgeAmount;
            }
        });

        num += totalPledgeAmount;
        backers += 1;

        backed.textContent = `$${(num.toLocaleString())}`;
        total.textContent = backers.toLocaleString();
        inputs.forEach(a => a.value = '');
        labels.forEach(e => e.classList.remove("check"));
        popUp.classList.remove("on");
        window.scrollTo({
            top:0,
            left:0,
            behavior: "smooth"
        })
        thanks.classList.add("on");
        thanks.querySelector("button").addEventListener("click", () => {
            thanks.classList.remove("on");
        })
    }
    let bar = document.querySelector(".bar span"); 
    
    bar.style.width = `${(100000 - (100000 - num)) / 1000}%`;
});


let closePopUpButton = document.querySelector("form img");

closePopUpButton.addEventListener("click", () => {
    popUp.classList.remove("on");
    labels.forEach(a => a.classList.remove("check"));
    radios.forEach(e => e.checked = false);
});