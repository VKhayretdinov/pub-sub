import Bus from './pub-sub';
import Subscriber from './subscriber';

/**
 * Class repesenting a Circle subscriber
 *
 * @class Circle
 * @extends {Subscriber}
 */
class Circle extends Subscriber {
  /**
   * Update background color of circle
   *
   * @param {string} color new color
   * @memberof Circle
   */
  update(color) {
    this.element.style.backgroundColor = color;
  }
}

/**
 * Class repesenting a ChangeCircle subscriber
 *
 * @class ChangedCircle
 * @extends {Subscriber}
 */
class ChangedCircle extends Subscriber {
  constructor(element) {
    super(element);
    this.radiuses = ['0%', '5%', '20%', '30%', '40%'];
  }

  /**
   * Update background color of circle
   *
   * @param {string} color new color
   * @memberof Circle
   */
  update(color) {
    this.element.style.backgroundColor = color;
    this.element.style.borderRadius = `${this.randomRadius()} ${this.randomRadius()}`;
  }

  /**
   * Return random radius from radiuses array
   *
   * @returns random radius from radiuses array
   * @memberof ChangedCircle
   */
  randomRadius() {
    return this.radiuses[Math.floor(Math.random() * this.radiuses.length)];
  }
}

const colorPicker = document.getElementById('color-picker');

const circle1 = new Circle('circle-1');
const circle2 = new ChangedCircle('circle-2');
const circle3 = new Circle('circle-3');
const circle4 = new ChangedCircle('circle-4');

const colorBus = new Bus();

const circles = [];
circles.push(circle1);
circles.push(circle3);

const changedCircles = [];
changedCircles.push(circle2);
changedCircles.push(circle4);

// Subcribe elements
circles.forEach(subscriber => colorBus.subscribe('color', subscriber));
changedCircles.forEach(subscriber => colorBus.subscribe('color and shape', subscriber));

circles.forEach((subscriber) => {
  subscriber.buttons[0].addEventListener('click', () => {
    colorBus.subscribe('color', subscriber);
  });
  subscriber.buttons[1].addEventListener('click', () => {
    colorBus.unsubscribe('color', subscriber);
  });
});

changedCircles.forEach((subscriber) => {
  subscriber.buttons[0].addEventListener('click', () => {
    colorBus.subscribe('color and shape', subscriber);
  });
  subscriber.buttons[1].addEventListener('click', () => {
    colorBus.unsubscribe('color and shape', subscriber);
  });
});

colorPicker.addEventListener('change', (e) => {
  colorBus.publish('color', e.target.value);
  colorBus.publish('color and shape', e.target.value);
});
