import React from 'react'
import { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import Nav from './Navbar'

function AddImages({ file, setFile }) {

    const callLambda = async() =>{
        const { data, error } = await supabase.functions.invoke('lambda', {
          body: { name: file.name, size: file.size, type: file.type, base64: file.base64},
        })
        console.log(data)
      }
    
    const uploadImage = async() =>{
        //get base 64 of image
        let base64;
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);
        reader.onload = () => {
          // from jpg image to base64
          base64 = reader.result.split(',')[1];
          let updatedFile = file;
          updatedFile.base64 = base64;
          // modify the file
          setFile(updatedFile);
          //call lambda with updated file
          callLambda();
        };
      }
    
    const setLocalFile = event => {
        setFile(event.target.files[0]);
    };

    return (
        <>
        <div>ADD IMAGES</div>
        <div>
            <input type="file" onChange={setLocalFile} />
            <button onClick={uploadImage}>Upload image</button>
        </div>
        </>
    )
}

export default AddImages