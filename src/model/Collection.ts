import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  evetns: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}
  get on() {
    return this.evetns.on;
  }

  get trigger() {
    return this.evetns.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
  }
}
