const Product = require('./product.class');
class Store {
  constructor(id) {
    this.id = id;
    this.products = [];

  }

  findProduct(id) {

    return this.products.find((item) => item.id === id)
  }

  maxId() {
    let maxId = 0
    this.products.forEach(product => {
      if (product.id > maxId) {
        maxId = product.id
      }
    });
    return maxId
  }

  addProduct(data) {
    if (!data.name) {
      throw 'El producto debe tener una propiedad name'
    }
    if (!data.price || data.price <= 0 || isNaN(data.price)) {
      throw 'El producto tiene que tener precio positivo'
    }
    if (data.units && (data.units % 1 != 0 || data.units < 0)) {
      throw 'Units no es un numero entero positivo'
    }

    const producto = new Product(this.maxId() + 1, data.name, data.price, data.units)
    this.products.push(producto)
    return producto

  }



  delProduct(id) {
    let producto = this.findProduct(id)
    if (producto.units == 0) {
      this.products = this.products.filter((item) => item.id !== id)
      return producto
    } else {
      throw 'El producto que quieres eliminar tiene unidades'
    }
  }

  changeProduct(data) {

    if (data.id) {
      let producto = this.findProduct(data.id)

      if (data.name) {
        producto.name = data.name
      }
      if (data.price) {
        if (data.price <= 0 || isNaN(data.price)) {
          throw 'El precio no puedes ser menor o igual que 0'
        }
        producto.price = data.price
      }
      if (data.units % 1 != 0) {
        throw 'Unidades no es entero'
      } else if (data.units) {
        if (data.units > 0) {
          producto.units = data.units
        } else {
          throw 'Units no es mayor que 0'
        }
      }
      return producto
    } else {
      throw 'El producto no tiene id'
    }
  }

  changeProductUnits(id, units) {

    let producto = this.findProduct(id)
    if (!units || units % 1 != 0) {
      throw 'No has introducido unidades para cambiar'
    } else {
      producto.units = units
    }
    return producto
  }

  totalImport() {
    let total = 0
    this.products.forEach(product => {
      total += product.productImport()
    });
    return total
  }

  underStock(units) {

    return this.products.filter(producto => producto.units < units)
  }

  orderByUnits() {

    return this.products.sort((a, b) => b.units - a.units)
  }

  orderByName() {
    return this.products.sort((a, b) => a.name.localeCompare(b.name))
  }

  toString() {
    let cadena = ('Almacén ' + this.id + ' => ' + this.products.length + ' productos: ' + this.totalImport() + ' €')
    this.products.forEach((prod) => cadena += '\n- ' + prod);
    return cadena;
  }
}

// y tendrás que exportarla
module.exports = Store;

