function setNumber(parent, num) {
    const n = [
        [0, 1, 2, 4, 5, 6],
        [2, 5],
        [0, 2, 3, 4, 6],
        [0, 2, 3, 5, 6],
        [1, 2, 3, 5],
        [0, 1, 3, 5, 6],
        [0, 1, 3, 4, 5, 6],
        [0, 1, 2, 5],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 5, 6],
    ]
    for (let i = 0; i < 7; i++) {
        setLineColor(parent.children[i], i, '#335F70');
    }
    for (let i = 0; i < n[num].length; i++) {
        setLineColor(parent.children[n[num][i]], n[num][i], 'white');
    }
}

function setLineColor(target, num, color) {
    const left = target.querySelector('.line-left');
    const right = target.querySelector('.line-right');
    const top = target.querySelector('.line-top');
    const bottom = target.querySelector('.line-bottom');
    if (num % 3 == 0) {
        left.style.borderRightColor = color;
        right.style.borderLeftColor = color;
    } else {
        top.style.borderBottomColor = color;
        bottom.style.borderTopColor = color;
    }
    target.style.backgroundColor = color;
}

let dotTick = 0;
let on = true;

function updateClock() {
    if (!on) {
        setTimeout(updateClock, 500);
        return
    }
    if (dotTick == 0) {
        document.querySelectorAll('.dot')[0].style.backgroundColor = 'var(--color-empty)';
        document.querySelectorAll('.dot')[1].style.backgroundColor = 'var(--color-empty)';
        dotTick++;
    } else if (dotTick == 1) {
        let date = new Date();
        let hour = date.getHours() + "";
        let miniute = date.getMinutes() + "";
        let second = date.getSeconds() + "";
        hour = hour >= 10 ? hour : "0" + hour;
        miniute = miniute >= 10 ? miniute : "0" + miniute;
        second = second >= 10 ? second : "0" + second;
        setNumber(document.querySelector('.hour .left'), hour.split('')[0]);
        setNumber(document.querySelector('.hour .right'), hour.split('')[1]);
        setNumber(document.querySelector('.miniute .left'), miniute.split('')[0]);
        setNumber(document.querySelector('.miniute .right'), miniute.split('')[1]);
        setNumber(document.querySelector('.second .left'), second.split('')[0]);
        setNumber(document.querySelector('.second .right'), second.split('')[1]);
        document.querySelectorAll('.dot')[0].style.backgroundColor = 'white';
        document.querySelectorAll('.dot')[1].style.backgroundColor = 'white';
        dotTick = 0;
    }
    setTimeout(updateClock, 500);
}
updateClock();
document.querySelector('.btnStop').addEventListener('click', function () {
    on = !on;
    const onoff = document.querySelector('.onoff');
    if (!on) {
        onoff.classList.remove('on');
        onoff.classList.add('off');
    } else {
        onoff.classList.remove('off');
        onoff.classList.add('on');
    }
})

let mouseDown = false;
let startX, startY;
let rX = 0,
    rY = 0;
const cube = document.querySelector('.cube');
document.body.addEventListener('touchstart', function (e) {
    mouseDown = true;
    startX = e.targetTouches[0].clientX;
    startY = e.targetTouches[0].clientY;
    if (cube.style.transform != '') {
        rX = cube.style.transform.split('rotateX(')[1].split('deg')[0];
        rY = cube.style.transform.split('rotateY(')[1].split('deg')[0];
    }
})
document.body.addEventListener('mousedown', function (e) {
    mouseDown = true;
    startX = e.offsetX;
    startY = e.offsetY;
    if (cube.style.transform != '') {
        rX = cube.style.transform.split('rotateX(')[1].split('deg')[0];
        rY = cube.style.transform.split('rotateY(')[1].split('deg')[0];
    }
})

window.addEventListener('touchend', function (e) {
    mouseDown = false;
})
window.addEventListener('mouseup', function (e) {
    mouseDown = false;
})

let moveX, moveY;
let tick = 0;
setInterval(function(){
    if(!mouseDown){
      return;
    }
    if(tick % 2 == 0){
        cube.style.transform = 'rotateX(' + moveX + 'deg) rotateY(' + moveY +'deg)'
    }
}, 10)

document.addEventListener('mousemove', function (e) {
    if (!mouseDown) return;
    moveX = -(Number(rY) + (startY - e.clientY));
    moveY = Number(rX) + (startX - e.clientX);
})

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!mouseDown) return;
    tick++;
      moveX = -(Number(rY) + (startY - e.targetTouches[0].clientY));
      moveY = (Number(rX) + (startX - e.targetTouches[0].clientX));
}, true)

window.onload = function () {
    if (innerWidth < 700) {
        document.body.style.transform = 'scale(0.8, 0.8)';
    }
}