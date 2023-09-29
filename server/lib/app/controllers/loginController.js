const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'your_secret_key';
const bcrypt = require('bcrypt');
const db = require('../models/loginSignupModel.js');


const signUpController = async (req, res) => {
    const { email, name , password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.checkEmail(email , (err , result) =>{
      if (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ error: 'Error creating user' });
      }
      if( result[0] ){
        
        if( result[0].userEmail === email ){
          console.log(result[0].userEmail);
          res.status(400).json({"error" : "Email Already Exist!"});
        }
      }else{
        db.insertAccount( name , email , hashedPassword , (err, result) => {
          if (err) {
            console.error('Signup error:', err);
            return res.status(500).json({ error: 'Error creating user' });
          } 
           db.insertUserdetails( name , email , (err, result) => {
            if (err) {
              console.error('Signup error:', err);
              return res.status(500).json({ error: 'Error creating user' });
            }
            
          return res.status(201).json({ message: 'User created successfully' });
          }
          );
        })
          
          
}
});


   
  }

  const loginController = async (req, res) => {
    const { name, email ,password } = req.body;
  

    db.detailsWithEmail(email ,async (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Error fetching user' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
   
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.userPassword);
   
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      jwtBotSub = user.userEmail ;
      const token = jwt.sign({ userId: user.userId, userName: user.userName , userEmail : user.userEmail}, JWT_SECRET_KEY, {});
  
      return res.status(200).json({ message: 'Login successful', token , jwtBotSub });
    })




    
  }
// module.exports = jwtBotSub ;
module.exports = {loginController, signUpController } ;

// ngrok http 8080