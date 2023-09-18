const joystick1 = document.getElementById('joystick1');
const stick1 = document.getElementById('stick1');
const joystick2 = document.getElementById('joystick2');
const stick2 = document.getElementById('stick2');
let isJoystickActive1 = false;
let initialPositionX1, initialPositionY1, cursorOffsetX1, cursorOffsetY1;
let isJoystickActive2 = false;
let initialPositionX2, initialPositionY2, cursorOffsetX2, cursorOffsetY2;

stick1.addEventListener('mousedown', (e) => {
    isJoystickActive1 = true;
    stick1.style.transition = '0s';
    const joystickRect1 = joystick1.getBoundingClientRect();
    initialPositionX1 = e.clientX - joystickRect1.left - stick1.offsetWidth / 2;
    initialPositionY1 = e.clientY - joystickRect1.top - stick1.offsetHeight / 2;
    cursorOffsetX1 = stick1.offsetWidth / 2;
    cursorOffsetY1 = stick1.offsetHeight / 2;
});

stick2.addEventListener('mousedown', (e) => {
    isJoystickActive2 = true;
    stick2.style.transition = '0s';
    const joystickRect2 = joystick2.getBoundingClientRect();
    initialPositionX2 = e.clientX - joystickRect2.left - stick2.offsetWidth / 2;
    initialPositionY2 = e.clientY - joystickRect2.top - stick2.offsetHeight / 2;
    cursorOffsetX2 = stick2.offsetWidth / 2;
    cursorOffsetY2 = stick2.offsetHeight / 2;
});

document.addEventListener('mousemove', (e) => {
    if (isJoystickActive1) {
        moveStick(e, joystick1, stick1, cursorOffsetX1, cursorOffsetY1, initialPositionX1, initialPositionY1, '1');
    }
    if (isJoystickActive2) {
        moveStick(e, joystick2, stick2, cursorOffsetX2, cursorOffsetY2, initialPositionX2, initialPositionY2, '2');
    }
});

document.addEventListener('mouseup', () => {
    isJoystickActive1 = false;
    stick1.style.transition = '0.2s';
    resetStickPosition(stick1, '1');

    isJoystickActive2 = false;
    stick2.style.transition = '0.2s';
    resetStickPosition(stick2, '2');
});

function moveStick(e, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY, joysticNumber) {
    const joystickRect = joystick.getBoundingClientRect();
    const x = e.clientX - joystickRect.left - cursorOffsetX - initialPositionX;
    const y = e.clientY - joystickRect.top - cursorOffsetY - initialPositionY;

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

    switch (joysticNumber) {
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

function resetStickPosition(stick) {
    stick.style.transform = 'translate(-50%, -50%)';

    document.getElementById('stick1x').innerHTML = '0';
    document.getElementById('stick1y').innerHTML = '0';
    document.getElementById('stick2x').innerHTML = '0';
    document.getElementById('stick2y').innerHTML = '0';
}
