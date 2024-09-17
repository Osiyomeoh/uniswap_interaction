# Uniswap Token Swap Interactions

This project demonstrates two types of Uniswap token swaps:
1. Swapping tokens (like USDC) for an exact amount of ETH.
2. Swapping ETH for an exact amount of tokens (like DAI or USDC).

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables (if needed) in the `.env` file for the Ethereum RPC URL.

## Usage

### Swap Tokens for Exact ETH

This script swaps an ERC20 token (e.g., USDC) for a specific amount of ETH using the `swapTokensForExactETH` function from the Uniswap V2 Router.

1. **Description**:
   - The script allows you to specify a maximum amount of tokens you're willing to spend to receive an exact amount of ETH.
   - You will receive exactly the amount of ETH specified (`amountOut`), while spending as few tokens (e.g., USDC) as possible, but no more than the maximum allowed (`amountInMax`).

2. **How to Run**:
   ```bash
   npx hardhat run scripts/swapTokensForExactETH.js
   ```

3. **Important Variables**:
   - `amountOut`: The exact amount of ETH you want to receive.
   - `amountInMax`: The maximum number of tokens you're willing to spend.
   - `USDC`: The address of the USDC token.
   - `WETH`: The address of the wrapped ETH (WETH).

### Swap ETH for Exact Tokens

This script swaps ETH for an exact amount of an ERC20 token (e.g., DAI) using the `swapExactETHForTokens` function from the Uniswap V2 Router.

1. **Description**:
   - The script allows you to swap a certain amount of ETH for an exact amount of tokens.
   - It specifies the minimum number of tokens you'd accept in the trade (`amountOutMin`), ensuring that you're not underpaid for the ETH spent.

2. **How to Run**:
   ```bash
   npx hardhat run scripts/swapETHForExactTokens.js
   ```

3. **Important Variables**:
   - `amountOutMin`: The minimum number of tokens you're willing to accept.
   - `WETH`: The address of wrapped ETH (WETH).
   - `DAI`: The address of the DAI token (or any other token).

## Example Output

### Swap Tokens for Exact ETH

```bash
USDC balance before swap: 3000
ETH balance before swap: 0
USDC balance after swap: 1000
ETH balance after swap: 1
```

### Swap ETH for Exact Tokens

```bash
ETH balance before swap: 5
DAI balance before swap: 0
ETH balance after swap: 4
DAI balance after swap: 1000
```

## Dependencies

- `hardhat`: Development environment for Ethereum smart contracts.
- `ethers`: Library for interacting with the Ethereum blockchain.
- `@nomicfoundation/hardhat-network-helpers`: Helper functions for testing.

