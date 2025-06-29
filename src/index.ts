import { config } from "dotenv";
import { ethers } from "ethers";
import { Telegraf } from "telegraf";

config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);


const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC);
const polygonProvider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC);
const bscProvider = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC);

async function getGasInfo(provider: ethers.providers.JsonRpcProvider) {
    const block = await provider.getBlock("latest");
    const baseFee = block.baseFeePerGas
        ? ethers.utils.formatUnits(block.baseFeePerGas, "gwei")
        : "N/A";

    const gasPrice = await provider.getGasPrice();
    const gasPriceGwei = ethers.utils.formatUnits(gasPrice, "gwei");

    return {
        baseFee,
        gasPrice: gasPriceGwei
    };
}

bot.command("gas", async (ctx) => {
    ctx.reply("Fetching gas data, please wait...");

    try {
        const [eth, polygon, bsc] = await Promise.all([
            getGasInfo(ethereumProvider),
            getGasInfo(polygonProvider),
            getGasInfo(bscProvider)
        ]);

        const message = `
⛽ Gas Tracker:
🔹 Ethereum:
  Base Fee: ${eth.baseFee} Gwei
  Gas Price: ${eth.gasPrice} Gwei

🔹 Polygon:
  Base Fee: ${polygon.baseFee} Gwei
  Gas Price: ${polygon.gasPrice} Gwei

🔹 BSC:
  Base Fee: ${bsc.baseFee} Gwei
  Gas Price: ${bsc.gasPrice} Gwei
        `;

        ctx.reply(message);
    } catch (error) {
        console.error(error);
        ctx.reply("Error fetching gas data.");
    }
});

bot.launch();

console.log("🚀 Gas Tracker Bot started");
