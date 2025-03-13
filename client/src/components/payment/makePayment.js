import {loadStripe} from '@stripe/stripe-js';


const makePayment = async (props)=>{
    
    const stripe = await loadStripe("pk_test_51NrkP1SJGSFy6Unkl0Tsx2TAtTXByugbZlWAMn1vBg8xboHIlHDe4MqMgs48lKXFtzFpVax410GWUjFvb6T7Ogsu003e68JNa8");

    const body = {
        data:props
    }
    const headers = {
        "Content-Type":"application/json",
        "auth" : 'abhi123'
    }
    const response = await fetch("http://localhost:8080/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
        sessionId:session.id
    });
    if(result.error){
        console.log(result.error);
    }
}


export default makePayment ;