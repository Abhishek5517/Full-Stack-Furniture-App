const connection = require("../config/config");


exports.getOrders = ( userEmail , callback ) =>{
    const query = `select * from (select products.* from products join supplier on products.supplierId = supplier.supplierId) as temp 
    join orders on temp.productId  = orders.productId where orders.userEmail = ? `;

    connection.query(query, [userEmail], callback) ;

}


exports.getSuppliersId = (productId  , callback) =>{
    const getSupplierId = "SELECT supplierId from products WHERE productId = ?"
    connection.query(getSupplierId , [productId] , callback) ;
}

exports.insertOrder = (productId ,userEmail , supplierId , callback) =>{
    const query = 'INSERT INTO orders (productId, userEmail,orderDate,supplierId ,orderStatus) VALUES (?, ?, ?,?,?)';
    const date = new  Date();
    connection.query(query, [productId, userEmail, date, supplierId, 'placed'],callback) ;
}