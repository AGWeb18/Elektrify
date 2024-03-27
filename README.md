# 🏗 Elektris

<h3 align="center">Made with Scaffold-ETH-2</h3>
<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>


 <h2 align="center"> Written by a Human</h2>
I was driving home from the gym when I saw a family in an Electric Vehicle with their hazards on in a mall parking lot. I asked them if they needed help and they politely declined.
As I pulled in my driveway and plugged my EV into my charger, I realized theres no easy way to offer a electric vehicle charging service from your own driveway.

**That is where the idea of Elektris came from.**
 <h2 align="center"> Written by AI</h2>
This project is a decentralized application (dApp) that connects electric vehicle (EV) owners with private EV charger owners. Utilizing Ethereums Layer 2 scaling solutions for efficient, low-cost transactions, platform aims to create a peer-to-peer network where individuals can list their personal EV chargers for for others to rent. Key components include:

<h3>Blockchain Integration:</h3>
For secure, transparent transactions and to maintain a trustless environment. It leverages smart contracts for listing, booking, and payment processes, ensuring integrity and automation of interactions between users.

<h3>Geohashing and Privacy:</h3>
To address privacy concerns associated with listing personal charging stations, the project employs a technique converts precise geolocations into less precise geolocations, until payment is made. 

<h3>Off-Chain Data Management:</h3>
Precise location details and potentially sensitive user data are managed off-chain, in a secure database. This approach ensures that while the blockchain facilitates trust and transactional integrity, personal privacy is safeguarded. 

<h3>Integration with Mapping Services:</h3>
For user convenience, the dApp integrates with mapping services like Google Maps, enabling users to find nearby chargers easily and receive directions. This feature, while intuitive, emphasizes privacy and data security, revealing precise charger locations only upon booking confirmation.

<h3>Income Generation for Charger Owners:</h3>
By listing their chargers, individuals can generate passive income, contributing to the platforms appeal. It not only incentivizes the expansion of EV charging infrastructure but also promotes the use of renewable energy sources by making charging more accessible.

<h3>Sustainability and Community Building:</h3>
The project supports the growth of the EV market by enhancing charging infrastructure accessibility. It fosters a community of EV enthusiasts and environmental advocates, aligning economic incentives with sustainability goals.



## Quickstart

To get started with Elektris (Scaffold-ETH 2), follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/AGWeb18/Elektris.git
cd Elektris
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.



## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
