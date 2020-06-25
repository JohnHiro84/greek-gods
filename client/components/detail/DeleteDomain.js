import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { REMOVE_GOD_DOMAIN } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_GODS } = Queries;

const linkStyle = {
  cursor: "pointer",
  fontSize: "10px",
  color: "red"
};

const DeleteDomain = props => {
  return (
    <Mutation mutation={ REMOVE_GOD_DOMAIN } refetchQueries={()=> {
      return [
        {
          query: FETCH_GODS
        }
      ];
    }}
    >
      { (deleteDomain, {data}) => (
        <a
          style={linkStyle}
          onClick={e => {
            e.preventDefault();

            deleteDomain({ variables: { id: props.id, domain: props.domain } }).then(res => props.domainsUpdate(res.data.removeGodDomain.domains ));
          }}
        >
        <p> Delete</p>
        </a>
      )}
    </Mutation>
  );
};

export default DeleteDomain;
