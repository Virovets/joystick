class Joystick {
    constructor(joystickElement, stickElement) {
        this.joystickElement = joystickElement;
        this.stickElement = stickElement;
        this.isActive = false;
        this.initialPositionX = 0;
        this.initialPositionY = 0;
        this.cursorOffsetX = 0;
        this.cursorOffsetY = 0;

        this.stickElement.addEventListener('touchstart', (e) => this.onTouchStart(e));
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));
        document.addEventListener('touchend', () => this.onTouchEnd());
    }

    onTouchStart(e) {
        e.preventDefault();
        this.isActive = true;
        this.stickElement.style.transition = '0s';
        const joystickRect = this.joystickElement.getBoundingClientRect();
        const touch = e.touches[0];
        this.initialPositionX = touch.clientX - joystickRect.left;
        this.initialPositionY = touch.clientY - joystickRect.top;
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
                this.initialPositionY
            );
        }
    }

    onTouchEnd() {
        this.isActive = false;
        this.stickElement.style.transition = '0.2s';
        this.resetStickPosition(this.stickElement);
    }

    moveStick(touch, joystickRect, stickElement, cursorOffsetX, cursorOffsetY, initialPositionX, initialPositionY) {
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

    resetStickPosition(stickElement) {
        stickElement.style.transform = 'translate(-50%, -50%)';
    }
}

const joystick1 = new Joystick(document.getElementById('joystick1'), document.getElementById('stick1'));
const joystick2 = new Joystick(document.getElementById('joystick2'), document.getElementById('stick2'));
