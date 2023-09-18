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

function createJoystick(joystickElement, stickElement, stickNumber) {
    let isJoystickActive = false;
    let initialPositionX, initialPositionY, cursorOffsetX, cursorOffsetY;

    stickElement.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Зупиняємо подальшу обробку події браузером
        isJoystickActive = true;
        stickElement.style.transition = '0s';
        const joystickRect = joystickElement.getBoundingClientRect();
        const touch = e.touches[0];
        initialPositionX = touch.clientX - joystickRect.left - stickElement.offsetWidth / 2;
        initialPositionY = touch.clientY - joystickRect.top - stickElement.offsetHeight / 2;
        cursorOffsetX = stickElement.offsetWidth / 2;
        cursorOffsetY = stickElement.offsetHeight / 2;
    });

    document.addEventListener('touchmove', (e) => {
        if (isJoystickActive) {
            const joystickRect = joystickElement.getBoundingClientRect();
            const touch = e.touches[0];
            moveStick(touch, joystickElement, stickElement, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY, stickNumber);
        }
    });

    document.addEventListener('touchend', () => {
        isJoystickActive = false;
        stickElement.style.transition = '0.2s';
        resetStickPosition(stickElement, stickNumber);
    });

    function moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY, stickNumber) {
        const joystickRect = joystick.getBoundingClientRect();
        const x = touch.clientX - joystickRect.left - cursorOffsetX - initialPositionX;
        const y = touch.clientY - joystickRect.top - cursorOffsetY - initialPositionY;

        const stickRadius = stick.offsetWidth / 2;
        const maxDistance = joystickRect.width / 2 - stickRadius + 30;

        const distance = Math.sqrt(x * x + y * y);
        if (distance <= maxDistance) {
            stick.style.transform = `translate(${x - 32}px, ${y - 32}px)`;
        } else {
            const angle = Math.atan2(y, x);
            const newX = Math.cos(angle) * maxDistance;
            const newY = Math.sin(angle) * maxDistance;
            stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
        }

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

    function resetStickPosition(stick, stickNumber) {
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

const joystick1 = document.getElementById('joystick1');
const stick1 = document.getElementById('stick1');
createJoystick(joystick1, stick1, '1');

const joystick2 = document.getElementById('joystick2');
const stick2 = document.getElementById('stick2');
createJoystick(joystick2, stick2, '2');
