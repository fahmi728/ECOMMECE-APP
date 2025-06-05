import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from "../context/ShopContext.jsx";
import Title from "./Title.jsx";

const LatestCollection = () => {

    const {prodcuts} = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);
    useEffect(() => {
        setLatestProduct(prodcuts.slice(0,10));
    },[])
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'}  />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem
                </p>
            </div>


        </div>
    )
}
export default LatestCollection
