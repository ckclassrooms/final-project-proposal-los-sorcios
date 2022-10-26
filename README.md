# Proposal

## What does your application do?

The main goal of our application is to create a WEB 3 social network to handle events.
In particular, it should allow users to sign up, login, create events, search for events, subscribe to events.
In order to integrate our app with the WEB 3 technology we will use an API suchas alchemy

## What makes it different than a CRUD app

The main difference is that our application will be developed using a WEB 3 framework, that differs from a CRUD app because it is decentralized, based on a blockchain,
where a set of information about events in stored and handled in a peer-to-peer network, while another set of information about users is stored in a centralized database.

## What security and privacy concerns do you expect

The main security issues expected are about hadling the difference storages systems between the database and the decentralized system, allow users to
securely create private evenets and don't allow not authorized users to join it, and avoid users to see private information such as user sessions, user database information, user event history.

## Building blocks of our architecture

1. "Backend": we will need to define smart contracts, programs that runs on the blockchain and define the logic behind the state changes happening on it. In order to manage the node infrastructure in the blockchain, we could exploit a third-party serivce, like Infura or Alchemy.
3. Database: we will use a decentralized off-chain storage solution, like IPFS or Swarm (the data is sent in a peer-to-peer network).
4. Frontend: we could host the frontend on AWS, or on a decentralized storage solution, like IPFS or Swarm (not to create a centralization checkpoint).

