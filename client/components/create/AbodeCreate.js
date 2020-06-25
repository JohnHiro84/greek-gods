import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_ABODE } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_ABODES } = Queries;


class AbodeCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      coordinate: "",
      message: ""
    }
  }

  update(field){
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newAbode){
    e.preventDefault();
    newAbode({
      variables: {
        name: this.state.name,
        coordinate: this.state.coordinate,
      }
    })
    .then(data => {
      this.setState({
        message: `New Coordinate "${this.state.name}" created successfully`,
        name: "",
        coordinate: ""
      })
    })
  }

  updateCache(cache, { data: { newAbode } }){
    let abodes;

    try {
      abodes  = cache.readQuery({ query: FETCH_ABODES });

    } catch (err){
      return;
    }

    if(abodes){
      let abodesArray = abodes.abodes;

      cache.writeQuery({
        query: FETCH_ABODES,
        data: { abodes: abodesArray.concat(newAbode) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) =>this.updateCache(cache, data)}
      >
      {(newAbode, {data}) => (
        <div>
        <form onSubmit={e => this.handleSubmit(e, newAbode)}>
        <label>Create a new Abode</label>


        <input
          value={this.state.name}
          onChange={this.update("name")}
          placeholder="Name"
        />

        <input
          value={this.state.coordinate}
          onChange={this.update("coordinate")}
          placeholder="Coordinate"
        />

        <button type="submit">Create Abode</button>
        </form>
        <p>{this.state.message}</p>
        </div>
      )}
      </Mutation>
    );
  }
}

export default AbodeCreate;
