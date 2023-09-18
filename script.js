class Joystick {
    constructor(container) {
        this.container = container;
        this.stick = container.querySelector('.stick');
        this.isActive = false;
        this.initialPositionX = 0;
        this.initialPositionY = 0;

        container.addEventListener('touchstart', (e) => this.onTouchStart(e));
        container.addEventListener('touchmove', (e) => this.onTouchMove(e));
        container.addEventListener('touchend', () => this.onTouchEnd());
        this.resetStickPosition();
    }

    onTouchStart(e) {
        e.preventDefault();
        this.isActive = true;
        const touch = e.touches[0];
        this.initialPositionX = touch.clientX - this.container.getBoundingClientRect().left;
        this.initialPositionY = touch.clientY - this.container.getBoundingClientRect().top;
    }

    onTouchMove(e) {
        if (this.isActive) {
            const touch = e.touches[0];
            this.moveStick(
                touch.clientX - this.container.getBoundingClientRect().left,
                touch.clientY - this.container.getBoundingClientRect().top
            );
        }
    }

    onTouchEnd() {
        this.isActive = false;
        this.resetStickPosition();
    }

    moveStick(x, y) {
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;
        const stickWidth = this.stick.clientWidth;
        const stickHeight = this.stick.clientHeight;

        const maxX = containerWidth - stickWidth;
        const maxY = containerHeight - stickHeight;

        x = Math.min(maxX, Math.max(0, x - this.initialPositionX));
        y = Math.min(maxY, Math.max(0, y - this.initialPositionY));

        this.stick.style.transform = `translate(${x}px, ${y}px)`;
    }

    resetStickPosition() {
        this.stick.style.transform = 'translate(-50%, -50%)';
    }
}

const joystick1 = new Joystick(document.getElementById('joystick1'));
const joystick2 = new Joystick(document.getElementById('joystick2'));
