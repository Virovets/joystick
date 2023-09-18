function createJoystick(joystickElement, stickElement) {
    let joystickState = {
        isActive: false,
        initialPositionX: 0,
        initialPositionY: 0,
        cursorOffsetX: 0,
        cursorOffsetY: 0,
    };

    stickElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        joystickState.isActive = true;
        stickElement.style.transition = '0s';
        const joystickRect = joystickElement.getBoundingClientRect();
        const touch = e.touches[0];
        joystickState.initialPositionX = touch.clientX - joystickRect.left;
        joystickState.initialPositionY = touch.clientY - joystickRect.top;
        joystickState.cursorOffsetX = stickElement.offsetWidth / 2;
        joystickState.cursorOffsetY = stickElement.offsetHeight / 2;
    });

    document.addEventListener('touchmove', (e) => {
        if (joystickState.isActive) {
            const touch = e.touches[0];
            const joystickRect = joystickElement.getBoundingClientRect();
            moveStick(
                touch,
                joystickElement,
                stickElement,
                joystickState.cursorOffsetX,
                joystickState.cursorOffsetY,
                joystickState.initialPositionX,
                joystickState.initialPositionY
            );
        }
    });

    document.addEventListener('touchend', () => {
        joystickState.isActive = false;
        stickElement.style.transition = '0.2s';
        resetStickPosition(stickElement);
    });

    function moveStick(
        touch,
        joystickElement,
        stickElement,
        cursorOffsetX,
        cursorOffsetY,
        initialPositionX,
        initialPositionY
    ) {
        const joystickRect = joystickElement.getBoundingClientRect();
        const x = touch.clientX - joystickRect.left - cursorOffsetX - initialPositionX;
        const y = touch.clientY - joystickRect.top - cursorOffsetY - initialPositionY;

        const stickRadius = stickElement.offsetWidth / 2;
        const maxDistance = joystickRect.width / 2 - stickRadius + 30;

        const distance = Math.sqrt(x * x + y * y);
        if (distance <= maxDistance) {
            stickElement.style.transform = `translate(${x - 32}px, ${y - 32}px)`;
        } else {
            const angle = Math.atan2(y, x);
            const newX = Math.cos(angle) * maxDistance;
            const newY = Math.sin(angle) * maxDistance;
            stickElement.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
        }
    }

    function resetStickPosition(stickElement) {
        stickElement.style.transform = 'translate(-50%, -50%)';
    }
}

const joystick1 = document.getElementById('joystick1');
const stick1 = document.getElementById('stick1');
createJoystick(joystick1, stick1);

const joystick2 = document.getElementById('joystick2');
const stick2 = document.getElementById('stick2');
createJoystick(joystick2, stick2);
