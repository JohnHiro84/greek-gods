import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_GOD } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_GODS } = Queries;


class GodCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      type: "",
      description: "",
      message: ""
    }
  }

  update(field){
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newGod){
    e.preventDefault();
    newGod({
      variables: {
        name: this.state.name,
        type: this.state.type,
        description: this.state.description
      }
    })
    .then(data => {
      this.setState({
        message: `New god "${this.state.name}" created successfully`,
        name: "",
        type: "god",
        description: ""
      })
    })
  }

  updateCache(cache, { data: { newGod } }){
    let gods;

    try {
      gods  = cache.readQuery({ query: FETCH_GODS });

    } catch (err){
      return;
    }

    if(gods){
      let godArray = gods.gods;

      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: godArray.concat(newGod) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) =>this.updateCache(cache, data)}
      >
      {(newGod, {data}) => (
        <div>
        <form onSubmit={e => this.handleSubmit(e, newGod)}>
        <label>Create a new God</label>

        <input
          value={this.state.name}
          onChange={this.update("name")}
          placeholder="Name"
        />

        <textarea
          value={this.state.description}
          onChange={this.update("description")}
          placeholder="Description"

        />

        <input
          value={this.state.type}
          onChange={this.update("type")}
          placeholder="Type"

        />

        <button type="submit">Create God</button>
        </form>
        <p>{this.state.message}</p>
        </div>
      )}
      </Mutation>
    );
  }
}

export default GodCreate;
