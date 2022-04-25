class Product {
  constructor(
    name,
    normalPrice,
    discountedPrice,
    isDiscounted,
    sku,
    brand,
  ) {
    this.name = name;
    this.normalPrice = normalPrice;
    this.discountedPrice = discountedPrice;
    this.isDiscounted = isDiscounted;
    this.sku = sku;
    this.brand = brand;
  }

  /**
   * 
   * @param {Number} qty - Cantidad del producto
   */
  sayMyName(qty = 0){
    console.log(`Mi name is ${this.name} and my quantity is: ${qty}`);
  }
}

module.exports = {
  Product,
  hola: function(){
    console.log('hola')
  }
};