// const joystick1 = document.getElementById('joystick1');
// const stick1 = document.getElementById('stick1');
// const joystick2 = document.getElementById('joystick2');
// const stick2 = document.getElementById('stick2');
// let isJoystickActive1 = false;
// let initialPositionX1, initialPositionY1, cursorOffsetX1, cursorOffsetY1;
// let isJoystickActive2 = false;
// let initialPositionX2, initialPositionY2, cursorOffsetX2, cursorOffsetY2;
//
// stick1.addEventListener('touchstart', (e) => {
//     e.preventDefault(); // Зупиняємо подальшу обробку події браузером
//     isJoystickActive1 = true;
//     stick1.style.transition = '0s';
//     const joystickRect1 = joystick1.getBoundingClientRect();
//     const touch = e.touches[0];
//     initialPositionX1 = touch.clientX - joystickRect1.left - stick1.offsetWidth / 2;
//     initialPositionY1 = touch.clientY - joystickRect1.top - stick1.offsetHeight / 2;
//     cursorOffsetX1 = stick1.offsetWidth / 2;
//     cursorOffsetY1 = stick1.offsetHeight / 2;
// });
//
// stick2.addEventListener('touchstart', (e) => {
//     e.preventDefault(); // Зупиняємо подальшу обробку події браузером
//     isJoystickActive2 = true;
//     stick2.style.transition = '0s';
//     const joystickRect2 = joystick2.getBoundingClientRect();
//     const touch = e.touches[0];
//     initialPositionX2 = touch.clientX - joystickRect2.left - stick2.offsetWidth / 2;
//     initialPositionY2 = touch.clientY - joystickRect2.top - stick2.offsetHeight / 2;
//     cursorOffsetX2 = stick2.offsetWidth / 2;
//     cursorOffsetY2 = stick2.offsetHeight / 2;
// });
//
// document.addEventListener('touchmove', (e) => {
//     if (isJoystickActive1) {
//         const joystickRect1 = joystick1.getBoundingClientRect();
//         const touch = e.touches[0];
//         moveStick(touch, joystick1, stick1, cursorOffsetX1, cursorOffsetY1, initialPositionX1, initialPositionY1, '1');
//     }
//     if (isJoystickActive2) {
//         const joystickRect2 = joystick2.getBoundingClientRect();
//         const touch = e.touches[0];
//         moveStick(touch, joystick2, stick2, cursorOffsetX2, cursorOffsetY2, initialPositionX2, initialPositionY2, '2');
//     }
// });
//
// document.addEventListener('touchend', () => {
//     isJoystickActive1 = false;
//     stick1.style.transition = '0.2s';
//     resetStickPosition(stick1, '1');
//
//     isJoystickActive2 = false;
//     stick2.style.transition = '0.2s';
//     resetStickPosition(stick2, '2');
// });
//
// function moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY, joysticNumber) {
//     const joystickRect = joystick.getBoundingClientRect();
//     const x = touch.clientX - joystickRect.left - cursorOffsetX - initialPositionX;
//     const y = touch.clientY - joystickRect.top - cursorOffsetY - initialPositionY;
//
//     const stickRadius = stick.offsetWidth / 2;
//     const maxDistance = joystickRect.width / 2 - stickRadius + 30;
//
//     const distance = Math.sqrt(x * x + y * y);
//     if (distance <= maxDistance) {
//         stick.style.transform = `translate(${x - 32}px, ${y - 32}px)`;
//     } else {
//         const angle = Math.atan2(y, x);
//         const newX = Math.cos(angle) * maxDistance;
//         const newY = Math.sin(angle) * maxDistance;
//         stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
//     }
//
//     switch (joysticNumber) {
//         case '1':
//             document.getElementById('stick1x').innerHTML = x + '';
//             document.getElementById('stick1y').innerHTML = y + '';
//             break;
//         case '2':
//             document.getElementById('stick2x').innerHTML = x + '';
//             document.getElementById('stick2y').innerHTML = y + '';
//             break;
//     }
// }
//
// function resetStickPosition(stick) {
//     stick.style.transform = 'translate(-50%, -50%)';
//
//     document.getElementById('stick1x').innerHTML = '0';
//     document.getElementById('stick1y').innerHTML = '0';
//     document.getElementById('stick2x').innerHTML = '0';
//     document.getElementById('stick2y').innerHTML = '0';
// }
class Joystick {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isActive = false;
        this.initialPositionX = 0;
        this.initialPositionY = 0;
        this.cursorOffsetX = 0;
        this.cursorOffsetY = 0;
        this.stickRadius = 30; // Розмір джойстика

        canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        canvas.addEventListener('touchend', () => this.onTouchEnd());
        this.resetStickPosition();
    }

    onTouchStart(e) {
        e.preventDefault();
        this.isActive = true;
        const touch = e.touches[0];
        this.initialPositionX = touch.clientX - this.canvas.getBoundingClientRect().left;
        this.initialPositionY = touch.clientY - this.canvas.getBoundingClientRect().top;
        this.cursorOffsetX = this.stickRadius;
        this.cursorOffsetY = this.stickRadius;
    }

    onTouchMove(e) {
        if (this.isActive) {
            const touch = e.touches[0];
            this.moveStick(
                touch.clientX - this.canvas.getBoundingClientRect().left,
                touch.clientY - this.canvas.getBoundingClientRect().top
            );
        }
    }

    onTouchEnd() {
        this.isActive = false;
        this.resetStickPosition();
    }

    moveStick(x, y) {
        const maxDistance = this.canvas.width / 2 - this.stickRadius;
        const distance = Math.sqrt((x - this.canvas.width / 2) ** 2 + (y - this.canvas.height / 2) ** 2);

        if (distance <= maxDistance) {
            this.clearCanvas();
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.stickRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'blue';
            this.ctx.fill();
            this.ctx.closePath();
        } else {
            const angle = Math.atan2(y - this.canvas.height / 2, x - this.canvas.width / 2);
            const newX = Math.cos(angle) * maxDistance + this.canvas.width / 2;
            const newY = Math.sin(angle) * maxDistance + this.canvas.height / 2;

            this.clearCanvas();
            this.ctx.beginPath();
            this.ctx.arc(newX, newY, this.stickRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'blue';
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    resetStickPosition() {
        this.clearCanvas();
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.stickRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.closePath();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const joystick1Canvas = document.getElementById('joystick1');
const joystick2Canvas = document.getElementById('joystick2');

const joystick1 = new Joystick(joystick1Canvas);
const joystick2 = new Joystick(joystick2Canvas);
