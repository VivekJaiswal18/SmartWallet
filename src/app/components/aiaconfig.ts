import { Chain } from 'wagmi/chains'

export const aiachain: Chain = {
  id: 1320,
  name: 'AIA Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'AIA',
    symbol: 'AIA',
  },
  rpcUrls: {
    public: { http: ['https://aia-dataseed1-testnet.aiachain.org'] },
    default: { http: ['https://aia-dataseed1-testnet.aiachain.org'] },
  },
  blockExplorers: {
    default: { name: 'xt4scan', url: '' },
  },
  testnet: true
};