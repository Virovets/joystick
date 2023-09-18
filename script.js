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
        if (!this.isActive) {
            this.isActive = true;
            this.stickElement.style.transition = '0s';
            const joystickRect = this.joystickElement.getBoundingClientRect();
            const touch = e.touches[0];
            this.initialPositionX = touch.clientX - joystickRect.left - this.stickElement.offsetWidth / 2;
            this.initialPositionY = touch.clientY - joystickRect.top - this.stickElement.offsetHeight / 2;
            this.cursorOffsetX = this.stickElement.offsetWidth / 2;
            this.cursorOffsetY = this.stickElement.offsetHeight / 2;
        }
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

let activeJoystick = null;

const joystick1 = new Joystick(document.getElementById('joystick1'), document.getElementById('stick1'), '1');
const joystick2 = new Joystick(document.getElementById('joystick2'), document.getElementById('stick2'), '2');
