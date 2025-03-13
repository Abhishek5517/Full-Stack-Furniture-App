const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models/userDetailsModel.js');
function getAddress(fields) {
  let street = fields.street;
  let country = fields.country;
  let postalCode = fields.postalCode;
  let state = fields.state;
  let city = fields.city;
  const address = street + ', ' + city + ', ' + state + ', ' + postalCode + ', ' + country;
  return address;
}

const addressUpdate = (req, res) => {

  let address = req.body;
  let Address = getAddress(address)

  let jwtToken = req.headers.authorization;
  let response;
  jwt.verify(jwtToken, 'your_secret_key', (err, verifiedJwt) => {
    if (err) {
      res.send(err.message)
    } else {
      response = verifiedJwt;
    }
  })
  let userId = response.userId;
  let userName = response.userName;



  db.updateAddress(Address, userId, (err, result) => {

    if (err) {
      console.error('error uploading data:', err);
      return res.status(500).json({ error: 'address not updated' });
    }
    res.status(201).json({ "success": "address updated successfully" });

  })

}

const AddressGet = (req, res) => {
  let jwtToken = req.headers.authorization;
  let response;
  jwt.verify(jwtToken, 'your_secret_key', (err, verifiedJwt) => {
    if (err) {
      res.send(err.message)
    } else {
      response = verifiedJwt;
    }
  })
  let userId = response.userId;
  let userName = response.userName;



  db.getAddress(userId, (err, result) => {
    if (err) {
      console.error('error fetching data:', err);
      return res.status(500).json({ error: 'address not found' });
    }
    if (result[0]) {
      let Address = result[0].userAddress;
      res.status(200).json({
        userAddress: Address
      })
    } else {
      return res.status(500).json({ error: 'address not found' });
    }


  })
}



const userDetailGet = (req, res) => {

  const userEmail = req.headers.useremail;

  db.getUserDetails(userEmail, (err, result) => {
    if (err) {
      console.error('error fetching data:', err);
      return res.status(500).json({ error: 'userDetails not found' });
    }

    if (result[0]) {

      res.status(200).json(result[0]);

    } else {
      return res.status(500).json({ error: 'userDetails not found' });
    }

  })

}


const userDetailUpdate = (req, res) => {
  if (req.headers.auth === 'abhi123') {
    let data = req.body;
    const userEmail = req.headers.useremail;
    let userPhone = data.userPhone;
    let userAddress = data.userAddress;

    db.updateUserDetails(userPhone, userAddress, userEmail, (err, result) => {
      if (err) {
        console.error('error updating data:', err);
        return res.status(500).json({ error: 'user not found' });
      }
      res.status(201).json({ "result": "successfully updated profile data" })
    });
  } else {
    res.status(404).json({ "error": "Invalid access key" })
  }
}
module.exports = { addressUpdate, AddressGet, userDetailGet, userDetailUpdate };


