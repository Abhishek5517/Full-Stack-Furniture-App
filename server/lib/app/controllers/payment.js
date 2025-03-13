
const stripe = require('stripe')('sk_test_51NrkP1SJGSFy6UnkoAIaVaQfhpUZM8JXH17AKs9GoBmZ9CkpKP9t4gYHCOwaYQSSmu3gh9YbzXHC2nC1yDDjpGPf00KChidItV');
require('dotenv').config();


const YOUR_DOMAIN = 'http://localhost:8080';

const paymentStripe =   async (req,res)=>{
    const data = req.body.data;
   
   let a = data.productPrice.split(',');
   let price ='';
   for( let i = 0 ; i < a.length ; i++){
        price += a[i];
   }

  
    data.productPrice = price ;
    const lineItems =[{
        price_data:{
            currency:"inr",
            product_data:{
                name:data.productName,
                images:[process.env.ngrok_URL+'/images/'+data.productImage],
            },
            unit_amount: (price*100),
        },
        quantity:1
       
}];

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:`http://localhost:3000/PaymentSucess/${data.productId}`,
        cancel_url:`http://localhost:3000/PaymentCancel`,
    });

    res.json({id:session.id})
 
}

module.exports = {paymentStripe}
