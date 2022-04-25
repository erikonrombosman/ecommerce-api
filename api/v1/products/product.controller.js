import Product from "./product.model";

exports.createProduct = async (req, res) => {
  try {
    const newProd = await Product.create(req.body);
    res.status(201).json({product: newProd});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

exports.indexProduct = async (req, res) => {
  try {
    const pagination = {page: req.query.page || 1, limit: req.query.limit || 10};
    const products = await Product.paginate({}, pagination);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({_id: req.params.id});
    if (!product) res.status(404).json({error: 'Entity not found'});

    res.status(204).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({_id: req.params.id});

    if (!product) res.status(404).json({error: 'Entity not found'});
    else if (product) res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const body = Object.assign({}, req.body);
    const product = await Product.findOneAndUpdate(
      {_id: req.params.id}, body,
    );
    if (!product) res.status(404).json({error: 'Entity not found'});
    else if(product) res.status(200).json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}