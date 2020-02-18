'use strict';

const itemNames = ['Camisa', 'Pantalon', 'Calcetines'];
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

class CartItem {
  constructor(item) {
    this.item = item;
  }

  increase() {
    this.units++;
  }
  addToCart() { }
}

class User {
  #cart = [];
  constructor(name) {
    this.name = name;
  }

  fillCart() { }
}

class Shop {
  constructor(name)
  checkout(cart)
  console.log(cart);
  for(const item of cart) {
    console.log(`item:${cartitem.item.name}${units}${price}`);
  }
  totalUnits() {

  }
  PaymentAddress() {

  }
}

//myCatalogue devuelve el array con nombre y precio de los artículos

const myCatalogue = Item.getItemsList(itemNames, itemPrices);
console.log(myCatalogue);

//creamos un nombre de usuario

const myUser = new User('Susana');
console.log(myUser);

myUser.addToCart(myCatalogue[1])


