# Vessel

*Backup for https://github.com/VesselFinance

### (Temporary) Prototype URL

https://vessel.finance/

### Collaborators and Contributors

This is a collaborative project between the individuals mentioned in the docs

### Repo Structure

- `docs/` contains the documentation of the project and the protocol is outlined at different levels of detail and complexity
- `contract/` contains the Solidity smart contract of the project along with some relevant files
- `home/` contains files relevant to the home page of the website
- `dApp/` contains files relevant to the dApp portion of the website, which contains funcitonality such as smart contract interactions, voting, etc.

### Aims of Project

Vessel Protocol aims to bring one of the most proven utilities on traditional markets, mutual funds, onto the decentralized web. We present a novel approach to how we have tackled this challenge in this paper - a DeFi utility token akin to an ETF for which the value is coupled to the assets which are encapsulated within the decentralized mutual fund our protocol provides. The fund itself is a trustless DAO, whereby user votes from one epoch to the next shape how constituent assets within it evolve using a voting algorithm we elaborate upon in this paper. Most ETF tokens work by ”wrapping” a set of reserve assets, however, our protocol emulates the price action of the assets with the help of token reserves and token burns, thereby rendering the ”reserve assets” in our prior comparison synthetic. In order to incentivize decentralization, there is an established bounty scheme within the protocol to ensure fairness and to encourage timely protocol re-stablization. A guaranteed token burn establishes a locked deflationary mechanic, and over time the token supply is guaranteed to diminish with volume. Thus, overall, the aforementioned combines the established advantages of diversification in mutual funds with the benefits of decentralization and deflationary mechanics and removes the element of ”opaque” management over how ETFs are shaped or how they evolve over time.  
