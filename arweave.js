const Arweave = require('arweave');
const fs = require('fs');

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

async function uploadFile(filePath) {
  const data = fs.readFileSync(filePath);
  const transaction = await arweave.createTransaction({ data }, /* arweaveWallet */);
  transaction.addTag('Content-Type', 'application/pdf');

  await arweave.transactions.sign(transaction, /* arweaveWallet */);
  const response = await arweave.transactions.post(transaction);

  console.log(`Transaction ID: ${transaction.id}`);
}


