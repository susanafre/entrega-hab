"use strict";

const itemNames = ["Camisa", "Pantalón", "Calcetines"];
const itemPrices = [13, 27, 100];

//quiero tener los items para poder empezar a hacer el inventario y creamos la clase Item
//tendrán un nombre, un precio
class Item {
  name;
  price;
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class cartItem extends Item {
  ammount = 1;

  itemData;

  constructor(item) {
    super(item.name, item.price);
  }

  increaseAmmount() {
    this.ammount++;
  }
  get name() {
    return this.itemData.name;
  }

  get total() {
    return this.ammount * this.price;
  }
}

class User {
  //el carrito empezará siendo un array vacío
  #shoppingCart = [];

  addToCart(item) {
    const itemFound = this.#shoppingCart.find((cartItem) => {
      return item.name === cartItem.itemData.name;
    });
    if (itemFound) {
      //  console.log("Este item está en el carrito");
      itemFound.ammount++;
    } else {
      //console.log("Este item NO está en el carrito");
      this.#shoppingCart.push({ itemData: item, ammount: 1 });
    }
  }

  get cart() {
    return this.#shoppingCart;
  }
  buy() {
    Shop.checkout(this.#shoppingCart);
  }
}

class Shop {
  static checkout(shoppingCart) {
    for (const item of shoppingCart) {
      console.log(
        `${item.name} ${item.price}€ ${item.ammount}Uds Total: ${item.total}`
      );
    }
    const totalUnits = shoppingCart.reduce((accumulatedUnits, currentItem) => {
      return accumulatedUnits + currentItem.ammount;
    }, 0);

    const totalPrice = shoppingCart.reduce((accumulatedPrice, currentItem) => {
      return accumulatedPrice + currentItem.total;
    }, 0);

    console.log(`Unidades totales ${totalUnits}, ${totalPrice}`);
  }
}

//const myItem = new Item(itemNames[0], itemPrices[0]);

//hacemos un map para que coja los items
//y metemos un index para que coja cada índice
const inventory = itemNames.map((name, index) => {
  return new Item(name, itemPrices[index]);
});

const myUser = new User();
myUser.addToCart(inventory[0]);
myUser.addToCart(inventory[2]);
myUser.addToCart(inventory[1]);
myUser.addToCart(inventory[0]);
myUser.addToCart(inventory[0]);
myUser.addToCart(inventory[1]);
myUser.addToCart(inventory[1]);
myUser.addToCart(inventory[1]);
myUser.addToCart(inventory[2]);
myUser.addToCart(inventory[2]);

myUser.buy();

//console.log(inventory, myUser, myUser.cart);
