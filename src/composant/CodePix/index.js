import React from 'react'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [data, setData] = useState([]);
const getPix = () => {
  axios.get('http://localhost/restoAfrica/qrcode-pix-pagseguro-master/public/')
            .then(function(response){
              console.log(response)
            })
    }
    useEffect(() => {
      axios.get('http://localhost/restoAfrica/qrcode-pix-pagseguro-master/public/')
      .then(function(response){
        setData(response.data)
      })

    }, []);
   console.log(data)
  return (
    <div>
      <img src={data['qr_codes'][0]['links'][0]['href']} alt="" />
    </div>
  )
}

export default Index
