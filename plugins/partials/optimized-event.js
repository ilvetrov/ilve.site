export default class OptimizedEvent {
  static instances = new Map()

  constructor({name, element}) {
    const props = {
      name,
      element
    }
    if (OptimizedEvent.instances.has(props)) return OptimizedEvent.instances.get(props)

    this.name = props.name
    this.namePrefix = this.name + "-optimized-"
    this.element = props.element
    this.allEvents = []

    OptimizedEvent.instances.set(props, this)
  }
  
  dynamicName(interval) {
    const eventName = this.#createName(interval);
  
    if (this.allEvents.indexOf(eventName) === -1) this.#createNew(interval);
    return eventName;
  }
  
  #createName(interval) {
    return this.namePrefix + interval;
  }
  
  #createNew(interval) {
    const eventName = this.#createName(interval);
  
    const event = new CustomEvent(eventName);
    this.allEvents.push(eventName);
  
    let didEvent = false;
    this.element.addEventListener(this.name, function() {
      didEvent = true;
    }, {
      passive: true
    });
    
    setInterval(() => {
      if (didEvent) {
        didEvent = false;
    
        this.element.dispatchEvent(event);
      }
    }, interval);
  }
}