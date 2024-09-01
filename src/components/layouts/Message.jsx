/* 
    if any error (in fetching|dispatching data) occurs
        then this message will be rendered on the screen 

*/

import React from 'react'

export default function Message({variant, children}) {
  return (
    <div className={`alert alert-${variant}`}>
        
        {children}

    </div>
  )
}
