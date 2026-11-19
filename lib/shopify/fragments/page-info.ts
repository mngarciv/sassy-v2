const pageInfoFragment = /* GraphQL */ `
  fragment pageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export default pageInfoFragment;
