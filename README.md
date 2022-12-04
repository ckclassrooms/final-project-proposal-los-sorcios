# Project Proposal

Link to our deployed website : [Website](https://comforting-selkie-9865de.netlify.app/)

## Update

After talking with prof Kanich during the online meeting, we have agreed to update our project functionalities.
The old readme can be found [here](https://github.com/ckclassrooms/final-project-proposal-los-sorcios/blob/main/oldREADME.md)

## What does your application do?

The main functionality of our application is to allow users to upload images, that will be first filtered through the Google Safe Search third party API, and then classified with the Google Cloud Vision third party API.
For each category there will be a separate bucket into which the image will be stored with similar ones. Furthermore the user can :

1. view and rate images of a specific bucket
2. view the images sorted by rates across all buckets (first 10)

## What makes it different than a CRUD app

It is different because of the following main functionlaities:

1. the use of a third party image classifier
2. the use of a third party image filter
3. the use of an edge function
4. the use of an RPC call through supabase to rate images

## What security and privacy concerns do you expect

The main concerns are :

1. Avoid users to upload explcit content
2. Avoid users to forge arbitrary rating requests 
3. Avoid users to select arbitrary labels for images
4. Avoid users to upoad images bypassing the edge function checks

## Building blocks of our architecture

Our building block can be :

1. The use of a database to store buckets and images metadata
2. A front end application to display content and allow users to interact with the app
3. An edge function to filter and classify images

## How our application works under the hood

* When a user uploads an image, the base64 image encoding is sent to the edge function, which is responsible for
interacting with third party APIs to filter and classify, and if everything works fine, the image is uploaded
in a supabase object storage along with its metadata in another dedicated table which contains also the label
assigned by the Google Classifier.
* When a user rates an image either with a positive or negative feedback, an RPC call to supabase is sent
from the client itself that will first check if the values are consistent, and then will update the rating of the
image in the supabase table of image metadata.
* When a user navigates the "display images" page, the client will fetch the first ten image metadata ordered by rating, and will access the object storage through a specific URL.


Note: We have set up RLS policies in such a way to give only "SELECT" priviledges to the client and "ALL" priviledges to the edge function in order to protect our database from malicius attackers.

# TechStack

Our Techstack can be found [here](https://github.com/ckclassrooms/final-project-proposal-los-sorcios/tree/main/documentation)

