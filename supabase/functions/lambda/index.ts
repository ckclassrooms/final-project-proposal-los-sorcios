import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { base64 } from "https://cdn.jsdelivr.net/gh/hexagon/base64@1/src/base64.js";

serve(async (req) => {
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  } 
  
  try {
    const file = await req.json()
    // instantiate supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // send request of labeling to GOOGLE_CLOUD_VISION
    const request = {
      "requests":[
        {
          "image":{
            "content": file.base64
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    }
    const response = await fetch(
      Deno.env.get('GOOGLE_VISION_URL') ?? '', {
      method : 'POST',
      mode : 'cors',
      body : JSON.stringify(request)
    });

    const datas = await response.json();
    const label = datas.responses[0].labelAnnotations[0].description

    // insert image row in the database
    const { _ } = await supabaseClient
      .from('images')
      .insert({ name: file.name, size: file.size, label: label })

    const name = label+':'+file.name
    console.log(name)

    // insert image in the bucket
    const { data, error } = await supabaseClient.storage
    .from('images')
    .upload( name, base64.toArrayBuffer(file.base64), {
      contentType: 'image/jpg'})

    //craft the response to be sent to the client
    return new Response(JSON.stringify(label), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

