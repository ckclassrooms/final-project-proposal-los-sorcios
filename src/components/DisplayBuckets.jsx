import React from 'react'
import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import { ShowBucket } from './ShowBucket'
import { DropDownList } from "@progress/kendo-react-dropdowns"; 
import '../App.css'

function DisplayBuckets() {

    /**
     * this attribute represents an array of buckets
     */
    const [buckets, setBuckets] = useState(null)

    /**
     * this attribute represents the current label of the buclet displayed
     */
    const [label, setLabel] = useState(null)

    /**
     * this attribute represents an array containing all the poosible labels
     */
    const [labels, setLabels] = useState(null)

    /**
     * this attribute represents the index of the image to display given
     * the bucket selected of the label "label"
     */
    const [imageIndex, setImageIndex] = useState(0)

    /**
     * this attribute represents the default message to display in the 
     * dropdownlist
     */
    const defaultMessage = "Select bucket ..."

    /**
     * this attribute represents the default message to dispaly
     * to guide the users and give information about the page
     * functionality
     */
    const defaultLabelMessage = "Choose your favourite bucket and rate!"
   
    /**
     * this funciton fetches all the images metadata from the
     * database and sets an array of unique labels from it
     */
    const fetchBuckets = async () => {
        const { data, error } = await supabase
        .from('images')
        .select('*');
        console.log(data)
        const newLabels = new Set(data.map((singleImg, index) => singleImg.label))
        
        setBuckets(Array.from(data))
        setLabels(Array.from(newLabels))
        
    }

    /**
     * this function handles a button press
     * in particular it reset the image index to zero and
     * set the label, such that the bucket can be displayed
     * if the label is the default message, then it just
     * resets itself
     * @param {*} el this is the label of the bucket to show, or 
     *              the default message
     */
    function handleButton(el){
        setImageIndex(0)
        el === defaultMessage ? setLabel(null) : setLabel(el)
        

    }

    /**
     * this function is called at each render, and fethces the
     * images metadata
     */
    useEffect(() => {
        fetchBuckets();
      }, []);

    return (
        <>
            <div>
                {label != null && <ShowBucket bucket={label} imgs={buckets} imageIndex={imageIndex} setImageIndex={setImageIndex}></ShowBucket>}
            </div>
            <section className="k-my-8">
                <form className="k-form k-mb-4">
                    <label className="k-label k-mb-3">{defaultLabelMessage}</label>
                    {
                        labels != null &&
                        <DropDownList data={labels} defaultItem={defaultMessage} onChange={e => handleButton(e.value)} />
                    }
                </form>
            </section>
        </>
    )
}

export default DisplayBuckets