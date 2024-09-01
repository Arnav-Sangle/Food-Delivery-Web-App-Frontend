import React from 'react'

import FoodItem from './FoodItem'
import { getMenus } from '../../actions/menuAction'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'

import Loader from './Loader'
import Message from './Message'

function Menu() {
    const dispatch = useDispatch()
    const { id } = useParams()
        /* 
            instead of doing this Long process
                dispatch restaurants, 
                call restaurant id
                and then send it

            we use
                useParams()
                    This returns all the dynamic parameters (:id) 
                        as an object
                    It is a Redux hook, 
                        to pass dynamic params btwn components 
        */

    const {menus, loading, error} = useSelector((state) => state.menus)
        /* 
            useSelector = get Data from Reducer
        */
    

    useEffect(()=>{
        dispatch(getMenus(id))
    }, [dispatch, id])
        
    

    return (

        /* DYNAMIC */
            <div>
                {
                    loading 
                    ? <Loader />
                    : error 
                        ? <Message variant="danger"> {error} </Message>
                        : menus && menus.length>0 
                            ? menus.map( (menu) => (
                                <div key={menu._id}>
                                    <h2> {menu.category} </h2>
                                    <hr />

                                    {
                                        menu.items && menu.items.length>0 
                                            ? 
                                                <div className='row'>
                                                    {
                                                        menu.items.map( (fooditem) => (
                                                            <FoodItem 
                                                                key={fooditem._id} 
                                                                fooditem={fooditem} 
                                                                restaurant={id} 
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            : 
                                                <Message variant="info">
                                                    No FoodItem found
                                                </Message>
                                    }
                                </div>
                            ))
                            : <Message variant="info"> No Menus found </Message>
                }
            </div>
        

        
        

        /* STATIC */
            /* 
                <div>
                    
                    <div>
                        <h2>Chaats</h2>
                        <hr />

                        <div className="row">
                            <FoodItem />
                            <FoodItem />
                            <FoodItem />
                        </div>
                    </div>

                    <div>
                        <h2>Main Course</h2>
                        <hr />

                        <div className="row">
                            <FoodItem />
                            <FoodItem />
                            <FoodItem />
                        </div>
                    </div>

                </div>
            */
    )
}


export default Menu


