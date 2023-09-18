const joystick1 = document.getElementById('joystick1');
const joystick2 = document.getElementById('joystick2');
const touches = {};

joystick1.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    touches[touch.identifier] = {
        element: joystick1,
        offsetX: touch.clientX - joystick1.getBoundingClientRect().left,
        offsetY: touch.clientY - joystick1.getBoundingClientRect().top,
    };
});

joystick2.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    touches[touch.identifier] = {
        element: joystick2,
        offsetX: touch.clientX - joystick2.getBoundingClientRect().left,
        offsetY: touch.clientY - joystick2.getBoundingClientRect().top,
    };
});

document.addEventListener('touchmove', (e) => {
    for (const touch of e.changedTouches) {
        const joystickData = touches[touch.identifier];
        if (joystickData) {
            moveJoystick(joystickData.element, touch.clientX - joystickData.offsetX, touch.clientY - joystickData.offsetY);
        }
    }
});

document.addEventListener('touchend', (e) => {
    for (const touch of e.changedTouches) {
        const joystickData = touches[touch.identifier];
        if (joystickData) {
            delete touches[touch.identifier];
            resetJoystick(joystickData.element);
        }
    }
});

function moveJoystick(joystick, x, y) {
    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX);
    const distance = Math.min(rect.width / 2, Math.hypot(x - centerX, y - centerY));

    const stick = joystick.querySelector('.stick');
    stick.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
}

function resetJoystick(joystick) {
    const stick = joystick.querySelector('.stick');
    stick.style.transform = 'translate(-50%, -50%)';
}
