import gql from "graphql-tag";


export default {
  NEW_GOD: gql`
  mutation NewGod($name: String, $type: String, $description: String){
    newGod(name: $name, type: $type, description: $description){
      id
      name
      description
    }
  }`,
  DELETE_GOD: gql`
    mutation DeleteGod($id: ID!){
      deleteGod(id: $id){
        id
      }
    }
  `,
  NEW_EMBLEM: gql`
  mutation NewEmblem($name: String){
    newEmblem(name: $name){
      name
    }
  }`,
  NEW_ABODE: gql`
  mutation NewAbode($name: String, $coordinate: String){
    newAbode(name: $name, coordinate: $coordinate){
      name
      coordinate
    }
  }`,
  UPDATE_GOD_NAME: gql`
  mutation updateGod($id: ID, $name: String){
    updateGod(id: $id, name: $name){
      id
      name
    }
  }`,
  UPDATE_GOD_TYPE: gql`
  mutation updateGod($id: ID, $type: String){
    updateGod(id: $id, type: $type){
      id
      type
    }
  }`,
  UPDATE_GOD_DESCRIPTION: gql`
  mutation updateGod($id: ID, $description: String){
    updateGod(id: $id, description: $description){
      id
      description
    }
  }`,

  ADD_GOD_DOMAIN: gql`
  mutation addGodDomain($id: ID!, $domain: String!){
    addGodDomain(godId: $id, domain: $domain) {
      id
      domains
    }
  }`,
  REMOVE_GOD_DOMAIN: gql`
  mutation removeGodDomain($id: ID!, $domain: String!){
    removeGodDomain(godId: $id, domain: $domain) {
      id
      domains
    }
  }`,
  UPDATE_GOD_ABODE: gql`
  mutation updateGodAbode($id: ID!, $idb: ID!){
    updateGodAbode(godId: $id, abodeId: $idb){
      abode {
        id
      }
      id

    }
  }`,
  ADD_GOD_EMBLEM: gql`
  mutation addGodEmblem($id: ID!, $idb: ID!){
    addGodEmblem(godId: $id, emblemId: $idb){
      emblems {
        id
      }
      id
    }
  }`,
  ADD_GOD_RELATIVE: gql`
  mutation addGodRelative($id: ID!, $idb: ID!, $relationship: String!){
    addGodRelative(godId: $id, relativeId: $idb, relationship: $relationship){
      siblings {
        id
      }
      parents {
        id
      }
      children {
        id
      }
      id
    }
  }`,
};
