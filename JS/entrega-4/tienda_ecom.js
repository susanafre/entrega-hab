"use strict";

const itemNames = ["Camisa", "Pantalon", "Calcetines"];
const itemPrices = [13, 27, 100];

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  /* static getItemsList(names, prices) {
      return names.map(new Item(name, prices[i]));
    } */
}

class CartItem {
  constructor(item) {
    this.item = item;
  }

  increase() {
    this.units++;
  }
  addToCart() {}
}

class User {
  #cart = [];
  constructor(name) {
    this.name = name;
  }
  fillCart() {}
}

const myItem = new Item(itemNames, itemPrices);

console.log(myItem);

const myCatalogue = new Item(itemNames, itemPrices);
console.log(myCatalogue);
