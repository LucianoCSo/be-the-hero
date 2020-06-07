import React from 'react'

export default  function Header(props){
    return(
        <div>
            <h1>{props.children}</h1>
        </div>
    )
}