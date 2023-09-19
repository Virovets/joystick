let firstStick = null;

class Joystick {
    constructor(joystickElement, stickElement, a) {
        this.a = a;
        this.joystickElement = joystickElement;
        this.stickElement = stickElement;
        this.isActive = false;
        this.initialPositionX = 0;
        this.initialPositionY = 0;
        this.cursorOffsetX = 0;
        this.cursorOffsetY = 0;
        this.initialPositionX2 = 0;
        this.initialPositionY2 = 0;
        this.cursorOffsetX2 = 0;
        this.cursorOffsetY2 = 0;

        stickElement.addEventListener('touchstart', (e) => this.onTouchStart(e));
        stickElement.addEventListener('touchmove', (e) => this.onTouchMove(e));
        stickElement.addEventListener('touchend', () => this.onTouchEnd());
    }

    onTouchStart(e) {
        e.preventDefault();
        this.isActive = true;
        this.stickElement.style.transition = '0s';
        const joystickRect = this.joystickElement.getBoundingClientRect();
        console.log(e.touches)
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            this.initialPositionX = touch1.clientX - joystickRect.left - this.stickElement.offsetWidth / 2;
            this.initialPositionY = touch1.clientY - joystickRect.top - this.stickElement.offsetHeight / 2;
            this.cursorOffsetX = this.stickElement.offsetWidth / 2;
            this.cursorOffsetY = this.stickElement.offsetHeight / 2;

            const touch2 = e.touches[1];
            this.initialPositionX2 = touch2.clientX - joystickRect.left - this.stickElement.offsetWidth / 2;
            this.initialPositionY2 = touch2.clientY - joystickRect.top - this.stickElement.offsetHeight / 2;
            this.cursorOffsetX2 = this.stickElement.offsetWidth / 2;
            this.cursorOffsetY2 = this.stickElement.offsetHeight / 2;
        } else {
            const touch = e.touches[0];
            this.initialPositionX = touch.clientX - joystickRect.left - this.stickElement.offsetWidth / 2;
            this.initialPositionY = touch.clientY - joystickRect.top - this.stickElement.offsetHeight / 2;
            this.cursorOffsetX = this.stickElement.offsetWidth / 2;
            this.cursorOffsetY = this.stickElement.offsetHeight / 2;
        }

    }

    onTouchMove(e) {
        if (this.isActive) {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const joystickRect1 = this.joystickElement.getBoundingClientRect();
                // this.moveStick(
                //     touch1,
                //     joystickRect1,
                //     this.stickElement,
                //     this.cursorOffsetX,
                //     this.cursorOffsetY,
                //     true
                // );

                const touch2 = e.touches[1];
                const joystickRect2 = this.joystickElement.getBoundingClientRect();
                this.moveStick(
                    [touch1, touch2],
                    [joystickRect1, joystickRect2],
                    this.stickElement,
                    [this.cursorOffsetX, this.cursorOffsetX2],
                    [this.cursorOffsetY, this.cursorOffsetY2],
                    true
                );
            } else {
                const touch = e.touches[0];
                const joystickRect = this.joystickElement.getBoundingClientRect();
                this.moveStick(
                    touch,
                    joystickRect,
                    this.stickElement,
                    this.cursorOffsetX,
                    this.cursorOffsetY,
                    false
                );
            }
        }
    }

    onTouchEnd() {
        this.isActive = false;
        this.stickElement.style.transition = '0.2s';
        this.resetStickPosition(this.stickElement);
    }

    moveStick(touch, joystick, stick, cursorOffsetX, cursorOffsetY, isTwo) {
        if (!firstStick) {
            firstStick = stick;
        }

        console.log(firstStick.id)
        if (isTwo) {
            if (firstStick.id === 'stick1') {
                // console.log(1)
                if (stick.id === 'stick1') {
                    // console.log(11)
                    // console.log(1111, stick)
                    const x1 = touch[0].clientX - joystick[0].left - cursorOffsetX[0] - this.initialPositionX;
                    const y1 = touch[0].clientY - joystick[0].top - cursorOffsetY[0] - this.initialPositionY;
                    const stickRadius1 = stick.offsetWidth / 2;
                    const maxDistance1 = joystick[0].width / 2 - stickRadius1 + 30;
                    const distance1 = Math.sqrt(x1 * x1 + y1 * y1);
                    if (distance1 <= maxDistance1) {
                        stick.style.transform = `translate(${x1 - 32}px, ${y1 - 32}px)`;
                    } else {
                        const angle = Math.atan2(y1, x1);
                        const newX = Math.cos(angle) * maxDistance1;
                        const newY = Math.sin(angle) * maxDistance1;
                        stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
                    }
                } else if (stick.id === 'stick2') {
                    // console.log(11.2)
                    const x2 = touch[1].clientX - joystick[1].left - cursorOffsetX[1] - this.initialPositionX2;
                    const y2 = touch[1].clientY - joystick[1].top - cursorOffsetY[1] - this.initialPositionY2;
                    const stickRadius2 = stick.offsetWidth / 2;
                    const maxDistance2 = joystick[1].width / 2 - stickRadius2 + 30;
                    const distance2 = Math.sqrt(x2 * x2 + y2 * y2);
                    if (distance2 <= maxDistance2) {
                        stick.style.transform = `translate(${x2 - 32}px, ${y2 - 32}px)`;
                    } else {
                        const angle = Math.atan2(y2, x2);
                        const newX = Math.cos(angle) * maxDistance2;
                        const newY = Math.sin(angle) * maxDistance2;
                        stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
                    }
                }
            } else if (firstStick.id === 'stick2') {
                // console.log(2)
                    if (stick.id === 'stick2') {
                        // console.log(22, touch)
                        // console.log(1111, stick)
                        const x1 = touch[0].clientX - joystick[0].left - cursorOffsetX[0] - this.initialPositionX;
                        const y1 = touch[0].clientY - joystick[0].top - cursorOffsetY[0] - this.initialPositionY;
                        const stickRadius1 = stick.offsetWidth / 2;
                        const maxDistance1 = joystick[0].width / 2 - stickRadius1 + 30;
                        const distance1 = Math.sqrt(x1 * x1 + y1 * y1);
                        if (distance1 <= maxDistance1) {
                            stick.style.transform = `translate(${x1 - 32}px, ${y1 - 32}px)`;
                        } else {
                            const angle = Math.atan2(y1, x1);
                            const newX = Math.cos(angle) * maxDistance1;
                            const newY = Math.sin(angle) * maxDistance1;
                            stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
                        }
                    } else if (stick.id === 'stick1') {
                        // console.log(22222)
                        const x2 = touch[1].clientX - joystick[1].left - cursorOffsetX[1] - this.initialPositionX2;
                        const y2 = touch[1].clientY - joystick[1].top - cursorOffsetY[1] - this.initialPositionY2;
                        const stickRadius2 = stick.offsetWidth / 2;
                        const maxDistance2 = joystick[1].width / 2 - stickRadius2 + 30;
                        const distance2 = Math.sqrt(x2 * x2 + y2 * y2);
                        if (distance2 <= maxDistance2) {
                            stick.style.transform = `translate(${x2 - 32}px, ${y2 - 32}px)`;
                        } else {
                            const angle = Math.atan2(y2, x2);
                            const newX = Math.cos(angle) * maxDistance2;
                            const newY = Math.sin(angle) * maxDistance2;
                            stick.style.transform = `translate(${newX - 32}px, ${newY - 32}px)`;
                        }
                    }
            }









            // console.log(x1, x2)
        } else {
            // console.log(2)
            const x = touch.clientX - joystick.left - cursorOffsetX - this.initialPositionX;
            const y = touch.clientY - joystick.top - cursorOffsetY - this.initialPositionY;

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
        }





    }

    resetStickPosition(stick) {
        stick.style.transform = 'translate(-50%, -50%)';
        firstStick = null;
    }
}


const joystick1 = new Joystick(document.getElementById('joystick1'), document.getElementById('stick1'), '1');
const joystick2 = new Joystick(document.getElementById('joystick2'), document.getElementById('stick2'), '2');
