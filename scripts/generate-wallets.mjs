import { Wallet } from 'ethers';

const AGENT_NAMES = ['Lucky', 'Bob', 'Stella', 'Alice', 'Pete'];

console.log('=== Celest Agent Wallets ===\n');
console.log('Save the private keys securely. Do NOT commit them.\n');

const wallets = AGENT_NAMES.map((name) => {
  const wallet = Wallet.createRandom();
  return {
    name,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
});

// Print full details (for saving privately)
for (const w of wallets) {
  console.log(`${w.name}`);
  console.log(`  Address:     ${w.address}`);
  console.log(`  Private Key: ${w.privateKey}`);
  console.log();
}

// Print the mapping for characters.ts
console.log('\n=== Copy this into data/characters.ts ===\n');
console.log('export const agentWallets: Record<string, string> = {');
for (const w of wallets) {
  console.log(`  '${w.name}': '${w.address}',`);
}
console.log('};');
