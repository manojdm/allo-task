import React, { useEffect } from 'react'
import '../styles/style.css'

const Pagination = ({pages, current, updatePage}) => {

    return (
    <div className="pagination">
    <ul>
        {pages.map((pg, idx) => <li onClick={() => updatePage(idx+1)} key={idx} className={current == idx+1 ? "current" : ''}>{idx+1}</li>)}
    </ul>
  </div>  )
}

export default Pagination