const joystick1 = document.getElementById('joystick1');
const stick1 = document.getElementById('stick1');
const joystick2 = document.getElementById('joystick2');
const stick2 = document.getElementById('stick2');
let joystickState1 = {
    isActive: false,
    initialPositionX: 0,
    initialPositionY: 0,
    cursorOffsetX: 0,
    cursorOffsetY: 0,
};
let joystickState2 = {
    isActive: false,
    initialPositionX: 0,
    initialPositionY: 0,
    cursorOffsetX: 0,
    cursorOffsetY: 0,
};

stick1.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joystickState1.isActive = true;
    stick1.style.transition = '0s';
    const joystickRect1 = joystick1.getBoundingClientRect();
    const touch = e.touches[0];
    joystickState1.initialPositionX = touch.clientX - joystickRect1.left;
    joystickState1.initialPositionY = touch.clientY - joystickRect1.top;
    joystickState1.cursorOffsetX = stick1.offsetWidth / 2;
    joystickState1.cursorOffsetY = stick1.offsetHeight / 2;
});

stick2.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joystickState2.isActive = true;
    stick2.style.transition = '0s';
    const joystickRect2 = joystick2.getBoundingClientRect();
    const touch = e.touches[0];
    joystickState2.initialPositionX = touch.clientX - joystickRect2.left;
    joystickState2.initialPositionY = touch.clientY - joystickRect2.top;
    joystickState2.cursorOffsetX = stick2.offsetWidth / 2;
    joystickState2.cursorOffsetY = stick2.offsetHeight / 2;
});

document.addEventListener('touchmove', (e) => {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];

    if (joystickState1.isActive && touch1) {
        const joystickRect1 = joystick1.getBoundingClientRect();
        moveStick(touch1, joystick1, stick1, joystickState1.cursorOffsetX, joystickState1.cursorOffsetY, joystickState1.initialPositionX, joystickState1.initialPositionY, '1');
    }
    if (joystickState2.isActive && touch2) {
        const joystickRect2 = joystick2.getBoundingClientRect();
        moveStick(touch2, joystick2, stick2, joystickState2.cursorOffsetX, joystickState2.cursorOffsetY, joystickState2.initialPositionX, joystickState2.initialPositionY, '2');
    }
});

document.addEventListener('touchend', (e) => {
    joystickState1.isActive = false;
    stick1.style.transition = '0.2s';
    resetStickPosition(stick1, '1');

    joystickState2.isActive = false;
    stick2.style.transition = '0.2s';
    resetStickPosition(stick2, '2');
});

function moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY, joysticNumber) {
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
