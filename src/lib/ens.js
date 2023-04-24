//ens.js
import { fetchGraphQL } from "./utils";

export async function getENSName(delegateAddress) {
  const ensSubgraphUrl = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
  const query = `
    {
      domains(where: { owner: "${delegateAddress.toLowerCase()}" }) {
        name
      }
    }
  `;

  const data = await fetchGraphQL(ensSubgraphUrl, query);

  if (data && data.errors) {
    console.error('GraphQL Errors:', data.errors);
    return null;
  }

  const domains = data.data.domains;
  return domains.length > 0 ? domains[0].name : null;
} 