const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_BASE_RPC);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const Watchlist = await ethers.getContractFactory('Watchlist', signer);
  const watchlist = await Watchlist.deploy();
  await watchlist.deployed();

  console.log('Watchlist deployed to:', watchlist.address);
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'deployments', 'Watchlist.json'),
    JSON.stringify({ address: watchlist.address }, null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
