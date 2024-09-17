
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
	const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
	const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
	//const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
	const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

	const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

	await helpers.impersonateAccount(TOKEN_HOLDER);
	const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

	const amountOut = ethers.parseUnits("1", 18);
	const amountInMax = ethers.parseUnits("3000", 6);

	const USDC_Contract = await ethers.getContractAt(
		"IERC20",
		USDC,
		impersonatedSigner
	);

	const WETH_Contract = await ethers.getContractAt(
		"IERC20",
		WETH,
		impersonatedSigner
	);

	const ROUTER = await ethers.getContractAt(
		"IUniswapV2Router",
		ROUTER_ADDRESS,
		impersonatedSigner
	);
	const approveTx = await USDC_Contract.approve(ROUTER_ADDRESS, amountInMax);
	await approveTx.wait();

	const deadline2 = Math.floor(Date.now() / 1000) + 60 * 10;



	const USDCBalanceBeforeSwap = await USDC_Contract.balanceOf(TOKEN_HOLDER);
	const WETHBalanceBeforeSwap = await WETH_Contract.balanceOf(TOKEN_HOLDER);
	const ETHERSBalanceBeforeSwap = await ethers.provider.getBalance(TOKEN_HOLDER);

	
	console.log({
		USDCBalanceBeforeSwap: ethers.formatUnits(USDCBalanceBeforeSwap, 6), 
		WETHBalanceBeforeSwap: ethers.formatUnits(WETHBalanceBeforeSwap, 18), 
		ETHERSBalanceBeforeSwap: ethers.formatUnits(ETHERSBalanceBeforeSwap, 18), 
	});
	const tx = await ROUTER.swapTokensForExactETH(
		amountOut,
		amountInMax,
		[USDC, WETH],
		TOKEN_HOLDER,
		deadline2
	);
	await tx.wait();
	console.log(tx);

	
	const USDCBalanceAfterSwap = await USDC_Contract.balanceOf(TOKEN_HOLDER);
	const WETHBalanceAfterSwap = await WETH_Contract.balanceOf(TOKEN_HOLDER);
	const ETHERSBalanceAfterSwap = await ethers.provider.getBalance(TOKEN_HOLDER);

	// Log balances after swap
	console.log("=========================================================");
	console.log({
		USDCBalanceAfterSwap: ethers.formatUnits(USDCBalanceAfterSwap, 6), 
		WETHBalanceAfterSwap: ethers.formatUnits(WETHBalanceAfterSwap, 18), 
		ETHERSBalanceAfterSwap: ethers.formatUnits(ETHERSBalanceAfterSwap, 18),
	});

	
}


main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});