/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst Store = __webpack_require__(/*! ./store.class */ \"./src/store.class.js\")\n// Creamos un nuevo almacén con id 1\nconst almacen = new Store(1)\n// Antes deberás haber importado la \n// clase Store para poder usarla\n\n\n\n// Añadimos los 4 objetos que nos piden\nlet prod1 = {\n    name: 'TV Samsung MP45',\n    price: 345.95,\n    units: 3\n}\nlet prod2 = {\n    id: 1,\n    name: 'Ábaco de madera',\n    price: 245.95\n}\nlet prod3 = {\n    name: 'impresora Epson LX-455',\n    price: 45.95\n}\nlet prod4 = {\n    name: 'USB Kingston 16GB',\n    price: 5.95,\n    units: 45\n}\ntry {\n    almacen.addProduct(prod1)\n    almacen.addProduct(prod2)\n    almacen.addProduct(prod3)\n    almacen.addProduct(prod4)\n    almacen.changeProduct({ id: prod1.id, price: 325.90, units: 8 });\n    almacen.changeProductUnits({ id: prod2.id, units: 15 });\n    almacen.changeProduct({ id: prod3.id, price: 55.90, units: -2 });\n    almacen.changeProductUnits({ id: prod1.id, units: -10 });\n    almacen.changeProduct({ id: prod2.id, name: 'Ábaco de madera (nuevo modelo)' });\n\n} catch (error) {\n    console.error(error)\n}\n\nconsole.log(almacen.toString());\nconsole.log('Lista de almacén por orden alfabético');\nalmacen.orderByName().forEach(producto => console.log('- ' + producto));\n\n\ntry {\n    almacen.delProduct(prod1.id);\n    almacen.delProduct(prod3.id);\n\n} catch(err) {\n    console.error(err);\n}\n\nconsole.log('LIsta de almacén por existencias');\nalmacen.orderByUnits().forEach(producto=>console.log('- '+producto));\n\nconsole.log('Lista de productos con pocas existencias');\nalmacen.underStock(10).forEach(producto=>console.log('- '+producto));\n\n// Mostramos por consola todo lo que nos piden\n\n// Eliminamos los 2 productos\n\n// Mostramos por consola todo lo que nos piden\n\n\n\n//# sourceURL=webpack://products/./src/index.js?");

/***/ }),

/***/ "./src/product.class.js":
/*!******************************!*\
  !*** ./src/product.class.js ***!
  \******************************/
/***/ ((module) => {

eval("// Aquí la clase Product\nclass Product {\n    constructor(id, name, price, units = 0) {\n        this.id = id;\n        this.name = name;\n        this.price = price;\n        this.units = units;\n    }\n\n    changeUnits(units) {\n        if (this.units + units < 0) {\n            throw 'No hay suficientes unidades para restar'\n        }\n        if (units % 1 != 0) {\n            throw 'No has introducido un numero entero'\n        }\n\n        this.units += units\n        return this\n    }\n\n\n    productImport() {\n        return this.price * this.units\n    }\n\n    toString() {\n        return (this.name + \": \" + this.units + \" uds. x \" + this.price.toFixed(2) + \" €/u = \" + this.productImport().toFixed(2) + \" €\")\n    }\n}\n\n\n\nmodule.exports = Product;\n\n\n//# sourceURL=webpack://products/./src/product.class.js?");

/***/ }),

/***/ "./src/store.class.js":
/*!****************************!*\
  !*** ./src/store.class.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Product = __webpack_require__(/*! ./product.class */ \"./src/product.class.js\");\nclass Store {\n  constructor(id) {\n    this.id = id;\n    this.products = [];\n\n  }\n\n  findProduct(id) {\n\n    return this.products.find((item) => item.id === id)\n  }\n\n  maxId() {\n    let maxId = 0\n    this.products.forEach(product => {\n      if (product.id > maxId) {\n        maxId = product.id\n      }\n    });\n    return maxId\n  }\n\n  addProduct(data) {\n    if (!data.name) {\n      throw 'El producto debe tener una propiedad name'\n    }\n    if (!data.price || data.price <= 0 || isNaN(data.price)) {\n      throw 'El producto tiene que tener precio positivo'\n    }\n    if (data.units && (data.units % 1 != 0 || data.units < 0)) {\n      throw 'Units no es un numero entero positivo'\n    }\n\n    const producto = new Product(this.maxId() + 1, data.name, data.price, data.units)\n    this.products.push(producto)\n    return producto\n\n  }\n\n\n\n  delProduct(id) {\n    let producto = this.findProduct(id)\n    if (producto.units == 0) {\n      this.products = this.products.filter((item) => item.id !== id)\n      return producto\n    } else {\n      throw 'El producto que quieres eliminar tiene unidades'\n    }\n  }\n\n  changeProduct(data) {\n\n    if (data.id) {\n      let producto = this.findProduct(data.id)\n\n      if (data.name) {\n        producto.name = data.name\n      }\n      if (data.price) {\n        if (data.price <= 0 || isNaN(data.price)) {\n          throw 'El precio no puedes ser menor o igual que 0'\n        }\n        producto.price = data.price\n      }\n      if (data.units % 1 != 0) {\n        throw 'Unidades no es entero'\n      } else if (data.units) {\n        if (data.units > 0) {\n          producto.units = data.units\n        } else {\n          throw 'Units no es mayor que 0'\n        }\n      }\n      return producto\n    } else {\n      throw 'El producto no tiene id'\n    }\n  }\n\n  changeProductUnits(id, units) {\n\n    let producto = this.findProduct(id)\n    if (!units || units % 1 != 0) {\n      throw 'No has introducido unidades para cambiar'\n    } else {\n      producto.units = units\n    }\n    return producto\n  }\n\n  totalImport() {\n    let total = 0\n    this.products.forEach(product => {\n      total += product.productImport()\n    });\n    return total\n  }\n\n  underStock(units) {\n\n    return this.products.filter(producto => producto.units < units)\n  }\n\n  orderByUnits() {\n\n    return this.products.sort((a, b) => b.units - a.units)\n  }\n\n  orderByName() {\n    return this.products.sort((a, b) => a.name.localeCompare(b.name))\n  }\n\n  toString() {\n    let cadena = ('Almacén ' + this.id + ' => ' + this.products.length + ' productos: ' + this.totalImport() + ' €')\n    this.products.forEach((prod) => cadena += '\\n- ' + prod);\n    return cadena;\n  }\n}\n\n// y tendrás que exportarla\nmodule.exports = Store;\n\n\n\n//# sourceURL=webpack://products/./src/store.class.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;