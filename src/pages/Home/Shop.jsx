import axios from 'axios';
import {React, useEffect, useState,state } from 'react'
import { useLocation } from 'react-router-dom'

const Shop = () => {
  const [data,setData] = useState([{}]);
  const {state} = useLocation();
  const {id} = state;
  const url_id = id.id;

  useEffect(()=>{
    axios.get(`http://api_oh.udvc.ac.th/shop/${url_id}`)
    .then(response => {
      setData(response.data.data)
      console.log(response.data.data  )
    })
  },[])

  return (
    <div>Shop</div>
  )
}

export default Shop