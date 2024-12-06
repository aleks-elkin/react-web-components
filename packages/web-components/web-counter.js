class WebCounter extends HTMLElement {
  #value = 0;
  #increment = { value: 1 };
  #isDark = false;

  set increment(value) {
    this.#increment = value;
    this.incButton.innerText = "+" + this.#increment.value;
  }
  get increment() {
    return this.#increment;
  }

  static get observedAttributes() {
    return ["isdark"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "isdark") {
      this.#isDark = newValue !== null;
      this.update();
    }
  }

  onIncremented() {
    this.#value = this.#value + this.#increment.value;
    this.update();
    const incrementedEvent = new CustomEvent("IncrementedEvent", {
      detail: {
        value: this.#value,
      },
    });
    this.dispatchEvent(incrementedEvent);
  }

  constructor() {
    super();

    const container = document.createElement("div");

    this.valueSpan = document.createElement("span");

    this.incButton = document.createElement("button");
    this.incButton.innerText = "+" + this.#increment.value;
    this.incButton.addEventListener("click", this.onIncremented.bind(this));
    const separator = document.createElement("span");
    separator.innerText = " Count: ";

    container.appendChild(this.incButton);
    container.appendChild(separator);
    container.appendChild(this.valueSpan);

    this.container = container;
  }

  connectedCallback() {
    this.appendChild(this.container);
    this.update();
  }

  update() {
    this.valueSpan.innerText = this.#value;
    this.valueSpan.style.color = this.#isDark ? "yellow" : "green";
  }
}

if (!customElements.get("web-counter")) {
  customElements.define("web-counter", WebCounter);
}
