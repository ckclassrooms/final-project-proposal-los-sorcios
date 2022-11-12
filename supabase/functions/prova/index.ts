import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0'
import { Vision } from "https://googleapis.deno.dev/v1/vision:v1.ts";
import type { CredentialsClient } from "https://googleapis.deno.dev/v1/vision:v1.ts";


console.log(`Function "browser-with-cors" up and running!`)

serve(async (req) => {

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
  }

  console.log("here is the server")
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  } 

  function getRequestHeaders(string){
    return {Authorization: 'Bearer <access_token_value>'}
  }

  const cred: CredentialsClient = {
    projectId: "12",
    getRequestHeaders("str"),
  };

  const vision = new Vision("client", "string")
  
  try {
    const image = await req.json()
    const supabase_url = 'https://jsnykdczxbblcbkallpz.supabase.co'
    const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbnlrZGN6eGJibGNia2FsbHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1Mzk0NjAsImV4cCI6MTk4MjExNTQ2MH0.ZUXIpeMfXssS8tKZBdqCeiTDNbg-_VuKg-vMpB6CwZ4'
    const storage_url = 'https://app.supabase.com/project/jsnykdczxbblcbkallpz/storage/buckets'
    const service_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs'
    const google_apiKey = 'AIzaSyD6DVn3D1ay1TQ4DQ6d9hZrVi-9cU8yir8'
    const data = {
      message: image.base64,
    }
    
    const supabaseClient = createClient(supabase_url, anon_key,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )



    // insert image row in the database
    /*
    const { error } = await supabaseClient
      .from('images')
      .insert({ name: image.filename, size: image.filesize })
    */

    // upload image into a bucket
    /*
    var binary_string = window.atob(image.base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    let img = bytes.buffer;
    */
    const { error } = await supabaseClient.storage
      .from('images')
      .upload(image.filename, image.buffer, {
        contentType: 'image/jpg'
      })
    
    
    //craft the response to be sent to the client
    return new Response(JSON.stringify(data), {
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

// curl -i --location --request POST 'http://localhost:54321/functions/v1/browser-with-cors' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'