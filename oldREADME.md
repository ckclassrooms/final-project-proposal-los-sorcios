# Project Proposal

## What does your application do?

The main functionality of our application is to allow users to upload images, that will be classified with a third party API, and for each category there will be a separate bucket into which the image will be stored with similar ones. Once the user access this bucket, he/she can do three actions :

1. rate images
2. chat with other live users
3. view the images sorted by rates

A not logged user can only see the bukets and the ranked images, while a logged user can rate and chat as well.

## What makes it different than a CRUD app

It is different because of two main functionlaities:

1. the use of a third party classifier
2. the use of a live chat

## What security and privacy concerns do you expect

The main concerns are :

1. Avoid not logged users to chat and rank images
2. Avoid users to see other user's information
3. Avoid other users to post images / chat messages with other user's identities (i.e with CSRF)
4. Avoid users to upload / post in chats inapropiate contents (i.e we can use a third party API like safesearch)

## Building blocks of our architecture

Our building block can be

1. The use of a database to store bucket, images and user's informtion
2. A front end application to store in local buckets
3. A back-end application to handle all the main functionalities like login, image upload and bucket selection

# TechStack

Our Techstack can be found [here](https://github.com/ckclassrooms/final-project-proposal-los-sorcios/tree/main/documentation)

