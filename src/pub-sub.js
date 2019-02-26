class Bus {
  constructor() {
    this.rooms = {};
  }

  /**
   * Add new subscriber to array
   *
   * @param {*} roomName Name of the room
   * @param {*} obj New subscriber
   * @memberof Bus
   */
  subscribe(roomName, obj) {
    this.rooms[roomName] = this.rooms[roomName] || [];
    this.rooms[roomName].push(obj);
  }

  /**
   * Send event from publisher
   *
   * @param {*} roomName Name of the room
   * @param {*} data Param for subscriber method
   * @memberof Bus
   */
  publish(roomName, data) {
    if (this.rooms[roomName]) {
      this.rooms[roomName].forEach((element) => { element.update(data); });
    }
  }

  /**
   * Remove subscriber from Array
   *
   * @param {*} roomName
   * @param {*} obj
   * @memberof Bus
   */
  unsubscribe(roomName, obj) {
    if (this.rooms[roomName]) {
      const tmpArr = this.rooms[roomName].filter(elemet => elemet !== obj);
      this.rooms[roomName] = tmpArr;
    }
  }
}

export default Bus;
