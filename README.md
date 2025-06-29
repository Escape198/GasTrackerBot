# Gas Tracker Bot

A simple Telegram bot that displays current gas fees on Ethereum, Polygon, and Binance Smart Chain.

## Features

- Fetches real-time gas prices (EIP-1559 Base Fee and Gas Price)
- Supports multiple networks (Ethereum, Polygon, BSC)
- Optimized RPC calls
- Built with TypeScript, ethers.js v6, and Telegraf.js

## Requirements

- Node.js LTS
- Telegram Bot Token (from BotFather)
- RPC URLs for Ethereum and optionally Polygon, BSC

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/gas-tracker-bot.git
cd gas-tracker-bot
```

Install dependencies:
```bash
npm install
```

Create a .env file with your configuration:
```bash
TELEGRAM_TOKEN=your_telegram_bot_token
ETHEREUM_RPC=https://mainnet.infura.io/v3/your_project_id
POLYGON_RPC=https://polygon-rpc.com
BSC_RPC=https://bsc-dataseed.binance.org/
```

## Usage

Run the bot:
```bash
npm start
```
In Telegram, search for your bot and send /gas command.

You should receive a message with the current gas fees.

## Scripts

npm start — start the bot with ts-node
