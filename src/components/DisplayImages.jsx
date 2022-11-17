import React from 'react'
import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';

function DisplayImages({file, setFile}) {
    const supabase_url = 'https://jsnykdczxbblcbkallpz.supabase.co/storage/v1/object/public/images/'
    const [imgs, setImgs] = useState(null)
    const fetchImgs = async () => {
        const { data, error } = await supabase
            .storage
            .from('images')
            .list('', { offset: 1 })
        setImgs(data)
    }

    useEffect(() => {
        fetchImgs();
      }, []);

    return (
        <>
        <div className='container'>
        {imgs != null &&
            imgs.map((singleImg, index) => (<div><img src={supabase_url+singleImg.name} height={200} width={200}/><p>{singleImg.name.split(':')[0]}</p></div>))
        }
        </div>
        </>
    )
}

export default DisplayImages