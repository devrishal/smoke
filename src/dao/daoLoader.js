//loader.js
async function loadDAOModules() {
  // Add the import() statements for all your DAO files here
  const daoModules = [
    import('./uniswap'),
    import('./compound'),
    // Add more DAOs here as needed
  ];

  const resolvedDAOModules = await Promise.all(daoModules);
  return resolvedDAOModules.map((module) => module.default);
}

export default loadDAOModules;
