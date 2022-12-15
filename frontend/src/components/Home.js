import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLabels } from '../actions/labelActions'
import { fetchMenu } from '../actions/menuActions'
import '../styles/style.css'
import Pagination from './Pagination'

const Home = () => {

    //dispatch and states
    const dispatch = useDispatch()
    const label = useSelector(state => state.labels)
    const {labels} = label
    const menu = useSelector(state => state.menu)
    let {menus} = menu

    //data
    const [meals, setMeals] = useState(menus)
    const [tag, setTag] = useState('All')

    //states
    const [cart, setCart] = useState([])
    const [count, setCount] = useState(2)
    const [total, setTotal] = useState(0)

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3);
    const indexLastPost = currentPage * postsPerPage
    const indexFirstPost = indexLastPost - postsPerPage
    const [currentMeals, setCurrentMeals] = useState([])

    const handleTags = (txt) => {
      setTag(txt)
      if(txt == 'All') {
        setMeals(menu.menus)
        setCurrentMeals(menu.menus.slice(indexFirstPost, indexLastPost))
        setCurrentPage(1)
      } else {
        menus = menu.menus.filter(menu => {
        
          if(menu.labels.includes(txt)){
            return menu
          }
        })
  
        setMeals(menus)
        setCurrentMeals(menus.slice(indexFirstPost, indexLastPost))
        setCurrentPage(1)


      }
    }

    const addToCart = (e,idx) => {
    const drink =  document.querySelectorAll('.drink')[idx].value.split(':')

      setCart(() =>[...cart, {
        meal: e.title,
        price: e.price,
        drink: drink[0],
        drinkPrice: drink[1],
        img: e.img,
        total: parseFloat(e.price) + parseFloat(drink[1])
      }])

    }

    const updatePrice = (e) => {
      const value = e.target.value.split(":")[1]
    }

    const handleAddMore = (e) => {
      setCount(count + 1)
    }

    const handleRemove = (org) => {
      setCount(count - 1)
      setCart(() => cart.filter((cr,idx) => org != idx))

    }
    
    const updateTotal = () => {
      let ttl = 0

      cart.forEach((ct) => {
        ttl += ct.total
      })

      setTotal(ttl)
    }

    const updatePage = (page) => {
      setCurrentPage(page)
    }

    useEffect(() => {

        if(!labels && !menus){
          dispatch(fetchLabels())
          dispatch(fetchMenu())
        }

        setMeals(menus)

        if(menus){
          setCurrentMeals(menus.slice(indexFirstPost, indexLastPost))
        }
 
        updateTotal()


    },[menus, cart, count, total, currentPage])

  return (
<>
  <div className="heading">Meals Menu</div>
  <div className="container">
    <div className="foods">
      <div className="header">
        <div className="tags">
          <button className={tag == 'All' ? 'tag selected': 'tag'} onClick={() => handleTags('All')}>All</button>
          {labels && labels.map(label => <button onClick={() => handleTags(label.id)} key={label.id} className={tag == label.id ? 'tag selected': 'tag'}>{label.label}</button>)}
        </div>
      </div>
      <hr />
      <div className="menus">
        {currentMeals &&  currentMeals.map((menu, idx) =>  <React.Fragment key={menu.id}>
          <div  className="menu">
          <div className="img">
            <img src={menu.img} alt="" />
          </div>
          <div className="details">
            <p className="note">3 course meal + drink</p>
            <div className="title">{menu.title}</div>
            <div className="add-info">
              <p className="add starter">
                <span className="bold">Starter:</span> {menu.starter}
              </p>
              <p className="add desert">
                <span className="bold">Desert:</span> {menu.desert}
              </p>
              <div className="add select-drink">
                <span className="bold">Select Drink: &nbsp;</span>
                <form>
                    <select defaultValue="vine:4.99" onChange={(e) => updatePrice(e)} className="drink" name="drink">
                        {menu.drinks.map(drink => <option key={drink.id} value={drink.title+":"+drink.price}>{drink.title}: {drink.price}$</option>)}
                    </select>
                </form>
            </div>
            </div>
            <div className="action">
              <div className="left">
              </div>
              <div className="right">
                <div className="price">
                  {menu.price.toString().split('.')[0]}<sup>{menu.price.toString().split('.')[1]}</sup> $
                </div>
                <button className={cart.length >= count ? 'disabled': ''} disabled={cart.length >= count ? true: false} onClick={() => addToCart(menu,idx)}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        
        </React.Fragment>
        )}
        <Pagination pages={[...Array(currentMeals.length).keys()]} current={currentPage} updatePage={updatePage} />
      </div>
    </div>
    <div className="cart">
      <div className="title">Your orders:</div>
      <div className="passengers">
        <ul>
          <li>Flight: Indigo (Bengaluru to Mysore)</li>
          {[...Array(count).keys()].map(idx => 
          <li key={idx}>
            <span>Passenger {idx+1}</span>
            <span>{cart[idx] ? cart[idx].meal : 'select meal'} <br /> {cart[idx] ? `+ ${cart[idx].drink}` : ''}</span>
            <span><i onClick={() => handleRemove(idx)} className="fa-solid fa-trash"></i></span>

          </li>)}
        </ul>
      </div>
      <div className="total">
        <div className='btn'>
          <button onClick={() => handleAddMore()}>+ Add Passenger</button>
        </div>
        <div className='price-total'>
          <div className="content">Total: &nbsp;</div>
          <div className="price">
            {total > 0 ? total.toString().split('.')[0] : 0}<sup> {total > 0 ? total.toString().split('.')[1].slice(0,2) : 0}</sup> $
          </div>

        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Home