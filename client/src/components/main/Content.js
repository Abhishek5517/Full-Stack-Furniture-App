import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home.js';
import About from '../optional/About.js';
import Contact from '../optional/Contact.js';
import Profile from '../profile/Profile.js';
import Orders from '../profile/Orders.js';
import YourOrders from '../profile/YourOrders.js';
import LoginSecurity from '../profile/LoginSecurity.js';
import SellForm from '../sell/SellForm.js';
import NavTabs from '../home/NavTabs.js';
import ProductBuyPage from '../cart/ProductBuyPage.js'
import HomeContent from '../home/HomeContent.js';
import Address from '../profile/Address.js';
import CompareProduct from '../compare/CompareProduct.js';
import AddressUpdate from '../profile/AddressUpdate.js';
import SoldPage from '../optional/SoldPage.js';
import ProductsPage from '../product/ProductsPage.js';
import BuyDetails from '../optional/BuyDetails.js';
import { useSelector } from 'react-redux';
import PaymentSucess from '../payment/PaymentSucess.js';
import CancelPayment from '../payment/CancelPayment.js';
import PageNotFound from '../NoDataError/PageNotFound.js';
import { useLocation } from 'react-router-dom';

const Content = () => {
   const location = useLocation();
  const Token = useSelector((state) =>{
    return state.LoginUserToken.Token ;
  })

  return (
    <div>
   
       { Token && <Routes>
        <Route path='/PaymentSucess/:productId' element={<PaymentSucess />}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/PaymentCancel' element={<CancelPayment />}/>
        <Route path='/' element={<Home />}>
          <Route path='' element={<NavTabs/>}>
          <Route path='' element={<HomeContent/>}/>
             <Route path='sell' element={<SellForm/>}/>
             <Route path='buy'  element={<ProductBuyPage/>}/>
             <Route path='compare'  element={<CompareProduct/>}/>
             <Route path='products' element={<ProductsPage/>}/>
             <Route path='products/buy/:id' element={<BuyDetails/>}/>
          </Route>
        </Route>
        <Route exact path='' element={<Home />} >
        <Route path=''  element={<NavTabs/>}/>
        <Route path=''  element={<HomeContent/>}/>
         </Route>     
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route path='/profile/address' element={<Address/>} />
        <Route path='/profile/yourOrders' element={<Orders />}>
          <Route path='orders' element={<YourOrders />} />
          <Route path='' element={<YourOrders />} />
          <Route path='sold' element={<SoldPage />} />
        </Route>
        <Route path='/profile/address/edit' element={<AddressUpdate/>}/>
        <Route path='/profile/login&Security' element={<LoginSecurity/>}/>
      </Routes>}

    </div>
  )
}

export default Content