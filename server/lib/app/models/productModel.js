const connection = require('../config/config');



exports.getSupplierId = (callback) =>{
    let supplierQuery = 'select supplierId from supplier order by supplierId desc limit 1';
    connection.query(supplierQuery, callback) ;
}

// API
exports.insertSupplierData = (supplierTableData , callback ) =>{
    const supplierDataQuery = 'INSERT INTO supplier (supplierName,supplierEmail,supplierPhone,supplierAddress) VALUES ?';
    connection.query(supplierDataQuery, [supplierTableData],callback);
}

exports.insertProductData = ( productTableData , callback) =>{
    const query = 'INSERT INTO products (productName, productPrice, productType, productCategory, productDimension,productImage, productDescription ,supplierId) VALUES ?';
    connection.query(query, [productTableData], callback); 
}


exports.insertProductDetails = (product_name, product_price, type, dimension, imageURL, product_description, supplierId , callback) =>{
    const query = 'INSERT INTO products (productName, productPrice, productType, productCategory, productDimension,productImage, productDescription,supplierId) VALUES (?, ?, ?,?, ?, ?,?,?)';
    connection.query(query, [product_name, product_price, type, type, dimension, imageURL, product_description, supplierId],callback);

}

exports.insertSupplierDetails = (name, email, phone, Address, callback) =>{
    const supplierDataQuery = 'INSERT INTO supplier (supplierName,supplierEmail,supplierPhone,supplierAddress) VALUES (?, ?, ?,?)';
    connection.query(supplierDataQuery, [name, email, phone, Address],callback);
}


exports.getSupplier = ( callback) =>{
    const supplierQuery = 'SELECT * from supplier';
    connection.query(supplierQuery, callback) ;
}


exports.getOneProduct = (productId , callback) =>{
    const query = " Select * from products where productId = ?";
    connection.query(query, [productId],callback);
}

exports.getProducts = (callback) =>{
    const query = ' SELECT * from products';
    connection.query(query,callback);
}