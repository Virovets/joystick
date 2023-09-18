const joystick1 = document.getElementById('joystick1');
const joystick2 = document.getElementById('joystick2');

joystick1.addEventListener('touchstart', (e) => {
    e.preventDefault();
    document.addEventListener('touchmove', moveJoystick1);
    document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', moveJoystick1);
    });
});

joystick2.addEventListener('touchstart', (e) => {
    e.preventDefault();
    document.addEventListener('touchmove', moveJoystick2);
    document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', moveJoystick2);
    });
});

function moveJoystick1(e) {
    const rect = joystick1.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touch = e.touches[0];
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    const distance = Math.min(rect.width / 2, Math.hypot(touch.clientX - centerX, touch.clientY - centerY));

    const stick = joystick1.querySelector('.stick');
    stick.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
}

function moveJoystick2(e) {
    const rect = joystick2.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touch = e.touches[0];
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    const distance = Math.min(rect.width / 2, Math.hypot(touch.clientX - centerX, touch.clientY - centerY));

    const stick = joystick2.querySelector('.stick');
    stick.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
}
