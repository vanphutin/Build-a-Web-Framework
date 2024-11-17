import { User } from "../model/User";
export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModle();
  }

  bindModle(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  eventMaps(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
    };
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input?.value;
      if (!name || name.length === 0) {
        return;
      }
      this.model.set({ name });
    }
  };
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
    <div>
        <h1>User form</h1>
        <div>User name: ${this.model.get("name")}</div>
        <div>User age: ${this.model.get("age")}</div>
        <input type='text'/>
        <button class='set-name'>Change name</button>
        <button class="set-age">Set random age</button>
    </div>`;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventMaps();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      //   eventName; -> click
      //   selector; -> button

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
