class Subscriber {
  constructor(id) {
    this.element = document.getElementById(id);
    this.buttons = this.element.previousElementSibling.getElementsByTagName('button');
  }
}

export default Subscriber;
