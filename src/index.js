import './css/style.css';

export default class Slide {
  appended = false;

  initialX;

  init() {
    console.log('Hello World!');

    const main = document.querySelector('main');
    main.addEventListener('touchend', console.log('end'));
    main.addEventListener('touchmove', (e) => {
      this.slideOver(main, e);
    });
  }

  slideOver(element, e) {
    const { x, y } = this.getXandYCoordinatesOnTouchMove(e);
    if (!this.initialX) {
      this.initialX = this.getInitialX(e);
    }
    const direction = this.getDirection(this.initialX, x, y);
    console.log(direction);
    const colorPigment = document.createElement('span');
    colorPigment.classList.add('pigment');
    if (!this.appended) {
      element.appendChild(colorPigment);
      this.appended = true;
    }
    const pigment = document.querySelector('.pigment');
    if (direction) {
      if (direction === 'right') {
        pigment.style.left = '';
        pigment.style.width = `${window.innerWidth - x}px`;
        pigment.style.height = `${window.innerHeight}px`;
        pigment.style.right = '0px';
        pigment.style.borderRadius = '100% 0 0 100%';
      } else {
        pigment.style.right = '';
        pigment.style.width = `${x}px`;
        pigment.style.height = `${window.innerHeight}px`;
        pigment.style.left = '0px';
        pigment.style.borderRadius = '0 100% 100% 0';
      }
    }
    pigment.style.bottom = `${0}px`;
    if (e.type == 'touchend' || e.type == 'touchcancel') {
      element.removeChild(pigment);
      this.appended = false;
    }
    const main = document.querySelector('main');
  }

  getInitialX(e) {
    if (e.type == 'touchstart' || e.type == 'touchmove') {
      const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
      const touch = evt.touches[0] || evt.changedTouches[0];
      return touch.pageX;
    } if (e.type === 'mousedown') {
      return e.clientX;
    }
  }

  getXandYCoordinatesOnTouchMove(e) {
    let x;
    let y;
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
      const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
      const touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
      x = e.clientX;
      y = e.clientY;
    }
    console.log(`x ${x}, y ${y}`);
    return { x, y };
  }

  getDirection(initialX, x, y) {
    console.log(initialX);
    if (initialX !== x && initialX < x) {
      this.initialX = null;
      return 'left';
    } if (initialX !== x && initialX > x) {
      this.initialX = null;
      return 'right';
    }
  }
}

const testObj = new Slide();
testObj.init();
