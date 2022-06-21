/**
* Fixture for Product model
* @param {Factory} Factory - Autofixture factory object
*/
export default {
  load: function(Factory) {
    Factory.define('Product', [
      'name',
      'normalPrice'.asNumber(),
      'discountedPrice'.asNumber(),
      'isDiscouted'.asBoolean(),
      'sku',
      'brand',
      'imageUrl',
      'description',
      'fileId',
      'hasStock'.asBoolean()
    ]);
  },
};
