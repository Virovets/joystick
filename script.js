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
    constructor(joystickElement, stickElement, stickNumber) {
        this.joystickElement = joystickElement;
        this.stickElement = stickElement;
        this.isActive = false;
        this.initialPositionX = 0;
        this.initialPositionY = 0;
        this.cursorOffsetX = 0;
        this.cursorOffsetY = 0;
        this.stickNumber = stickNumber;

        stickElement.addEventListener('touchstart', (e) => this.onTouchStart(e));
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));
        document.addEventListener('touchend', () => this.onTouchEnd());
    }

    onTouchStart(e) {
        e.preventDefault();
        this.isActive = true;
        this.stickElement.style.transition = '0s';
        const joystickRect = this.joystickElement.getBoundingClientRect();
        const touch = e.touches[0];
        this.initialPositionX = touch.clientX - joystickRect.left - this.stickElement.offsetWidth / 2;
        this.initialPositionY = touch.clientY - joystickRect.top - this.stickElement.offsetHeight / 2;
        this.cursorOffsetX = this.stickElement.offsetWidth / 2;
        this.cursorOffsetY = this.stickElement.offsetHeight / 2;
    }

    onTouchMove(e) {
        if (this.isActive) {
            const touch = e.touches[0];
            const joystickRect = this.joystickElement.getBoundingClientRect();
            this.moveStick(
                touch,
                joystickRect,
                this.stickElement,
                this.cursorOffsetX,
                this.cursorOffsetY,
                this.initialPositionX,
                this.initialPositionY,
                this.stickNumber
            );
        }
    }

    onTouchEnd() {
        this.isActive = false;
        this.stickElement.style.transition = '0.2s';
        this.resetStickPosition(this.stickElement, this.stickNumber);
    }

    moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY, stickNumber) {
        const x = touch.clientX - joystick.left - cursorOffsetX - initialPositionX;
        const y = touch.clientY - joystick.top - cursorOffsetY - initialPositionY;

        const stickRadius = stick.offsetWidth / 2;
        const maxDistance = joystick.width / 2 - stickRadius + 30;

        const distance = Math.sqrt(x * x + y * y);
        if (distance <= maxDistance) {
            stick.style.transform = `translate(${x - 32}px, ${y - 32}px)`;
        } else {
            const angle = Math.atan2(y, x);
            const newX = Math.cos(angle) * maxDistance;
            const newY = Math.sin(angle) * maxDistance;
            stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
        }

        console.log(stickNumber)

        switch (stickNumber) {
            case '1':
                document.getElementById('stick1x').innerHTML = x + '';
                document.getElementById('stick1y').innerHTML = y + '';
                break;
            case '2':
                document.getElementById('stick2x').innerHTML = x + '';
                document.getElementById('stick2y').innerHTML = y + '';
                break;
        }
    }

    resetStickPosition(stick, stickNumber) {
        stick.style.transform = 'translate(-50%, -50%)';

        switch (stickNumber) {
            case '1':
                document.getElementById('stick1x').innerHTML = '0';
                document.getElementById('stick1y').innerHTML = '0';
                break;
            case '2':
                document.getElementById('stick2x').innerHTML = '0';
                document.getElementById('stick2y').innerHTML = '0';
                break;
        }
    }
}

const joystick1 = new Joystick(document.getElementById('joystick1'), document.getElementById('stick1'), '1');
const joystick2 = new Joystick(document.getElementById('joystick2'), document.getElementById('stick2'), '2');
