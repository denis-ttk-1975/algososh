export class Stack {
  stack: string[];

  constructor() {
    this.stack = [];
  }

  add(value: string) {
    this.stack.push(value);
    return this;
  }

  delete() {
    this.stack.pop();
    return this;
  }

  clear() {
    this.stack = [];
    return this;
  }
}
