# Guidelines

Recommended steps to follow for React Application development

### React and Component Styling
- create history of mints with hardcoded values
- create an input section that is going to accept mint amount
- add mint to the history with an amount provided in the input

### Blockchain Interactions
- add `wagmi` provider
- add connect wallet button
- read token symbol and display in mint input
- read and display token balance for connected wallet

### Backend Interactions
- fetch and display mints from the backend using `useQuery`
- create mint on button click using `useMutation`
- wait for the transaction to finish using `useWaitForTransaction`
- refetch list of mints after successful transaction
- refetch displayed token balance
