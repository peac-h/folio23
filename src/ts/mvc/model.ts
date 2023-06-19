import data from "../data";
import { DataPattern } from "../types";

export class Model {
  private data: DataPattern[];

  constructor() {
    this.data = [];
  }

  public loadData(): void {
    this.data = data;
  }

  public getData(): DataPattern[] {
    return this.data;
  }
}

export default Model;
