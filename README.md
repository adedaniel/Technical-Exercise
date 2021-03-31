## Technical Exercise

### by Adetola Daniel

This app uses [chakra-ui](https://chakra-ui.com) as the UI component library within a lightweight Next.js app, and Yarn as package manager.

### To start development server, run:

```bash
yarn
# then,
yarn dev
```

The main code can be found in src/pages/index.js

The inital data is found in src/data.js . It is distributed under "Required" and "Optional"
The groups are then mapped to the UI as menu buttons

When an item under the optional group is clicked, it creates a payload which is in the format of a GraphQL mutation payload.

There is also a function that accepts this payload, and then acts like the backend to perform the desired changes and return the updated data.
