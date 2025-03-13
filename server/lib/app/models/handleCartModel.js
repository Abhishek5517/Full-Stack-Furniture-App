const connection = require('../config/config');

exports.checkCart = (productId , callback) =>{
    const checkCartQuery = 'Select * from cart where productId = ?' ;
    connection.query(checkCartQuery , [productId] , callback ) ;
}

exports.insertIntoCart = ( productId , supplierId , userEmail , callback) =>{
    const query = 'INSERT INTO cart (productId, supplierId , userEmail ) VALUES (?, ?,?)';
    connection.query(query, [productId , supplierId ,userEmail] , callback) ;
}


exports.getCartProduct = (productId , callback) =>{
    const getCartElement = `SELECT * FROM cart WHERE productId = ?` ;
    connection.query(getCartElement , [productId] , callback) ;
}

exports.deleteFromCart = (productId , userEmail , callback) =>{
    const query = 'DELETE FROM cart WHERE productId = ? and userEmail = ? ';
    connection.query(query, [productId , userEmail], callback) ;
}

exports.cartDetails = (userEmail , callback ) =>{
    const cartQuery = `select * from cart join (select products.* , supplier.supplierName , supplier.supplierAddress, supplier.supplierEmail , supplier.supplierPhone 
        from products join supplier on products.supplierId = supplier.supplierId ) as temp1 on temp1.productId = cart.productId where cart.userEmail = ? ` ; 
        connection.query(cartQuery , [userEmail], callback) ;
}