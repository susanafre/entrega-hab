"use strict";

const itemNames = ["Camisa", "Pantalon", "Calcetines"];
const itemPrices = [13, 27, 100];

//###############################
//------CLASS ITEM --------------
//###############################

//con getItemsList creamos un array con name y price

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  static getItemsList(names, prices) {
    return names.map((name, index) => {
      return new Item(name, prices[index]);
    });
  }
}

class User {
  cart = [];
  name;
  constructor(name) {
    this.name = name;
  }
  addToCart(item) {
    this.cart.push(item);
  }
}

class CartItem {
  ammount = 1;
  constructor(item) {
    this.item = item;
  }
  increase() {
    this.ammount++;
  }
}

//myCatalogue devuelve el array con nombre y precio de los artículos

const myCatalogue = Item.getItemsList(itemNames, itemPrices);
console.log(myCatalogue);

const myUser = new User("Susana");
console.log(myUser);

const myCart = myUser.addToCart(myCatalogue[2]);
