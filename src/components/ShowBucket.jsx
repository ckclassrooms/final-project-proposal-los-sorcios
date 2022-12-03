import { Close, Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ShowBucket({bucket, imgs, imageIndex, setImageIndex}){

    
    const supabase_url = 'https://jsnykdczxbblcbkallpz.supabase.co/storage/v1/object/public/images/'
    /* 
    * this attribute represents an array containing only the images of the bucket selected by the user
    */
    const filteredImgs = imgs.filter(singleImg => singleImg.label == bucket)

    /**
     * this function is used to rate an image and then change image
     * in particular, it sends a rpc call to a stored procedure
     * that updates the database field "rating" of the image
     * with name "name".
     * Then it increments the index of the image to display in
     * a modular way, mening that if we are at image 7 and there
     * are 7 images in total, the next image displayedn will be the
     * 1st image
     *  
     * @param {Int16Array} rating this argument is the rating to increment / decrement
     * for the image
     */
    async function rateAndSwitchImage(rating){

        // set rating to update
        const inc = rating

        // set name of the image to update
        const rated_name = filteredImgs[imageIndex].name

        // call the rpc
        let { data, error } = await supabase
            .rpc('rate', {
                inc, 
                rated_name
            })
        
        // show popup
        if(rating == 1){
            toast.success("Rated with like!",{
                autoClose: 1000,
            })
        }
        else{
            toast.error("Rated with dislike!",{
                autoClose: 1000,
            })
        }

        // update the index of the images to display
        setImageIndex((imageIndex + 1) % filteredImgs.length)
    }

    return(
        <>
            <div >
                <img src={supabase_url + filteredImgs[imageIndex].label + ':' + filteredImgs[imageIndex].name} 
                style={{ 
                    height: 450,
                    width: 400,
                    position: 'relative',
                    left: '50%',
                    transform: 'translate(-50%)'
                }}
                />
                <div >
                <IconButton className="SwipeButtons__right" onClick={() => rateAndSwitchImage(1)}
                >
                    <Favorite fontSize="small" />
                </IconButton>
                <IconButton className="SwipeButtons__left" onClick={() => rateAndSwitchImage(-1)}
                >
                    <Close fontSize="small" />
                </IconButton>

                <ToastContainer />

                </div>
                
            </div>
        </>
        
    )

}



export {ShowBucket}