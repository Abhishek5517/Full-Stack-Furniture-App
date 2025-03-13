import React, { useState } from 'react';
import { NavLink, Outlet} from 'react-router-dom';

import '../../style/Order.css';
const Orders = () => {
    const [act, setAct] = useState(false);
    const [pos, setPos] = useState(false);
    return (
        <div>
            <div className="sec-nav">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink to='/profile/yourOrders/orders'  className={`nav-link nav-b ${({ isActive }) =>{ return (isActive ? 'active' : 'inactive')}}`} >Orders</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink to='/profile/yourOrders/sold'  className="nav-link nav-b" >Sold</NavLink>
                    </li> */}
                </ul>
                <hr />
            </div>
            <Outlet/>
        </div>
    )
}
export default Orders ;