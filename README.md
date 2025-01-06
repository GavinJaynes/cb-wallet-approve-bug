# ERC20 Token Approval Demo

A simple React application demonstrating how to implement ERC20 token approvals on Base network using AppKit and Wagmi.

## Overview

This application provides a user interface for approving ERC20 token spending. It supports multiple tokens including:

- AERO
- USDC
- CBBTC

The demo showcases best practices for implementing token approvals with a 5% buffer to account for potential price fluctuations.

## Features

- Connect wallet using AppKit
- Select from multiple supported tokens
- Input custom approval amounts
- Automatic 5% buffer on approval amounts
- Real-time transaction status updates
- Base network integration

## Technical Stack

- React 18
- TypeScript
- Viem/Wagmi for Web3 interactions
- AppKit for wallet connections
- TailwindCSS for styling
- Vite for build tooling

## Key Components

### Token Approval Hook

The `useApproveSpend` hook (see `src/hooks/use-approve-spend.ts`) handles the token approval logic. It:

- Manages approval transaction state
- Adds a 5% buffer to approval amounts
- Handles transaction submission and monitoring

### Token Selection

The application supports multiple tokens with their respective:

- Contract addresses
- Decimal places
- Token symbols
- Token icons

## Configuration

The application is configured to work with Base network and uses AppKit for wallet connections. The AppKit configuration can be found in:
`typescript:src/components/provider-appkit.tsx`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Security Considerations

- The approval implementation includes a 5% buffer to handle potential price fluctuations
- All token interactions are performed through verified contract addresses
- Transaction states are properly handled to prevent double submissions

## License

MIT
