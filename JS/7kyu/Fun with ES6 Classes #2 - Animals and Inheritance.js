class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age);
    this.legs = 0;
    this.species = "shark";
    this.status = status;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age);
    this.legs = 4;
    this.species = "cat";
    this.status = status;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.  Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age);
    this.legs = 4;
    this.species = "dog";
    this.status = status;
    this.master = master;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  greetMaster() {
    return `Hello ${this.master}`;
  }
}