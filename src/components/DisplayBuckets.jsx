import React from 'react'
import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';


function DisplayBuckets({file, setFile}) {
    const supabase_url = 'https://jsnykdczxbblcbkallpz.supabase.co/storage/v1/object/public/images/'
    const [imgs, setImgs] = useState(null)
    const [buckets, setBuckets] = useState(null)
    /* 
        fetch all the images from the database
    */
    const fetchImgs = async () => {
        const { data, error } = await supabase
            .storage
            .from('images')
            .list('', { offset: 1 })
        setImgs(data)
    }
    /* 
        fetch all the buckets from the database
    */
    const fetchBuckets = async () => {
        const { data, error } = await supabase
        .from('images')
        .select('label');
        var bucks = new Set(data.map((singleImg, index) => singleImg.label))
        var f_bucks = Array.from(bucks);
        setBuckets(f_bucks)
    }

    useEffect(() => {
        fetchBuckets();
        fetchImgs();
      }, []);

    return (
        <div className='container'>
        {buckets != null &&
            buckets.map((el, index) => (<div key={index} ><button className='box'>{el}</button></div>))
        }
        </div>
       
    )
}

export default DisplayBuckets