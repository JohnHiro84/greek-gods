import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_EMBLEM } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;


class EmblemCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      message: ""
    }
  }

  update(field){
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newEmblem){
    e.preventDefault();
    newEmblem({
      variables: {
        name: this.state.name,
        type: this.state.type,
        description: this.state.description
      }
    })
    .then(data => {
      this.setState({
        message: `New Emblem "${this.state.name}" created successfully`,
        name: "",
      })
    })
  }

  updateCache(cache, { data: { newEmblem } }){
    let emblems;

    try {
      emblems  = cache.readQuery({ query: FETCH_EMBLEMS });

    } catch (err){
      return;
    }

    if(emblems){
      let emblemsArray = emblems.emblems;

      cache.writeQuery({
        query: FETCH_EMBLEMS,
        data: { emblems: emblemsArray.concat(newEmblem) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_EMBLEM}
        update={(cache, data) =>this.updateCache(cache, data)}
      >
      {(newEmblem, {data}) => (
        <div>
        <form onSubmit={e => this.handleSubmit(e, newEmblem)}>
        <label>Create a new Emblem</label>
        <input
          value={this.state.name}
          onChange={this.update("name")}
          placeholder="Name"
        />

        <button type="submit">Create Emblem</button>
        </form>
        <p>{this.state.message}</p>
        </div>
      )}
      </Mutation>
    );
  }
}

export default EmblemCreate;
