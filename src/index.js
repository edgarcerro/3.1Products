'use strict'
const Store = require("./store.class")
// Creamos un nuevo almacén con id 1
const almacen = new Store(1)
// Antes deberás haber importado la 
// clase Store para poder usarla



// Añadimos los 4 objetos que nos piden
let prod1 = {
    name: 'TV Samsung MP45',
    price: 345.95,
    units: 3
}
let prod2 = {
    name: 'Ábaco de madera',
    price: 245.95
}
let prod3 = {
    name: 'impresora Epson LX-455',
    price: 45.95
}
let prod4 = {
    name: 'USB Kingston 16GB',
    price: 5.95,
    units: 45
}
try {
    almacen.addProduct(prod1)
    almacen.addProduct(prod2)
    almacen.addProduct(prod3)
    almacen.addProduct(prod4)
    almacen.changeProduct({ id: prod1.id, price: 325.90, units: 8 });
    almacen.changeProductUnits({ id: prod2.id, units: 15 });
    almacen.changeProduct({ id: prod3.id, price: 55.90, units: -2 });
    almacen.changeProductUnits({ id: prod1.id, units: -10 });
    almacen.changeProduct({ id: prod2.id, name: 'Ábaco de madera (nuevo modelo)' });

} catch (error) {
    console.error(error)
}

console.log(almacen.toString());
console.log('LISTADO DEL ALMACÉN alfabético');
almacen.orderByName().forEach(producto => console.log('- ' + producto));


try {
    almacen.delProduct(prod1.id);
    almacen.delProduct(prod3.id);

} catch(err) {
    console.error(err);
}

console.log('LISTADO DEL ALMACÉN por existencias');
almacen.orderByUnits().forEach(producto=>console.log('- '+producto));

console.log('LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS');
almacen.underStock(10).forEach(producto=>console.log('- '+producto));

// Mostramos por consola todo lo que nos piden

// Eliminamos los 2 productos

// Mostramos por consola todo lo que nos piden

