const joystick1 = document.getElementById('joystick1');
const stick1 = document.getElementById('stick1');
const joystick2 = document.getElementById('joystick2');
const stick2 = document.getElementById('stick2');

function createJoystick(joystick, stick) {
    let isJoystickActive = false;
    let initialPositionX, initialPositionY, cursorOffsetX, cursorOffsetY;

    stick.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isJoystickActive = true;
        stick.style.transition = '0s';
        const joystickRect = joystick.getBoundingClientRect();
        const touch = e.touches[0];
        initialPositionX = touch.clientX - joystickRect.left;
        initialPositionY = touch.clientY - joystickRect.top;
        cursorOffsetX = stick.offsetWidth / 2;
        cursorOffsetY = stick.offsetHeight / 2;
    });

    document.addEventListener('touchmove', (e) => {
        if (isJoystickActive) {
            const joystickRect = joystick.getBoundingClientRect();
            const touch = e.touches[0];
            moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY);
        }
    });

    document.addEventListener('touchend', () => {
        isJoystickActive = false;
        stick.style.transition = '0.2s';
        resetStickPosition(stick);
    });

    function moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY) {
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
    }

    function resetStickPosition(stick) {
        stick.style.transform = 'translate(-50%, -50%)';
    }
}

createJoystick(joystick1, stick1);
createJoystick(joystick2, stick2);
