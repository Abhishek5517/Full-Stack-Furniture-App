import React from 'react'

import '../../style/NoDataComp.css';

const NoDataComp = (props) => {
  return (
    <div class="No-data-comp">
       
    <h1>
        {props.message}
    </h1>
     
 </div>
  )
}

export default NoDataComp ;