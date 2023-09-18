const joystick1 = document.getElementById('joystick1');
const joystick2 = document.getElementById('joystick2');
let joystick1Active = false;
let joystick2Active = false;

joystick1.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joystick1Active = true;
    moveJoystick1(e.touches[0]);
});

joystick2.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joystick2Active = true;
    moveJoystick2(e.touches[0]);
});

document.addEventListener('touchmove', (e) => {
    if (joystick1Active) {
        moveJoystick1(e.touches[0]);
    }
    if (joystick2Active) {
        moveJoystick2(e.touches[0]);
    }
});

document.addEventListener('touchend', () => {
    joystick1Active = false;
    joystick2Active = false;
    resetJoysticks();
});

function moveJoystick1(touch) {
    const rect = joystick1.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    const distance = Math.min(rect.width / 2, Math.hypot(touch.clientX - centerX, touch.clientY - centerY));

    const stick = joystick1.querySelector('.stick');
    stick.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
}

function moveJoystick2(touch) {
    const rect = joystick2.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    const distance = Math.min(rect.width / 2, Math.hypot(touch.clientX - centerX, touch.clientY - centerY));

    const stick = joystick2.querySelector('.stick');
    stick.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
}

function resetJoysticks() {
    const sticks = document.querySelectorAll('.stick');
    sticks.forEach(stick => {
        stick.style.transform = 'translate(-50%, -50%)';
    });
}
