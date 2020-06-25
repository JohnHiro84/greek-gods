import React, { Component } from "react";
import { Query } from "react-apollo";

import Queries from "../../../graphql/queries";
const { FETCH_ABODES, FETCH_GOD, FETCH_GOD_ABODE } = Queries;

import gql from "graphql-tag";
import NameDetail from "../NameDetail";

import {IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";

import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { ADD_GOD_RELATIVE } = Mutations;

import { idFilter, helper } from "../../util/helper";


class RelativeForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      relationship: "",
      relativeId: "",
      thisGod: this.props.thisGod || "",
      godId: this.props.id || "",
      children: this.props.children || "",
      parents: this.props.parents || "",
      siblings: this.props.siblings || "",
      allGods: this.props.allGods || "",
      foreignGods: ""
    };
    this.fieldUpdate = this.fieldUpdate.bind(this);
  }

  componentWillUnmount(){
    this.setState({
      children: "",
      parents: "",
      siblings: "",
      relationship: "",
      relativeId: "",
      thisGod: "",
      allGods: "",
      foreignGods: ""
    })
  }

  componentDidMount(){
    const { children, parents, siblings, allGods, thisGod } = this.state;

    let family = children.concat(parents).concat(siblings).concat(thisGod);

    let result = idFilter(allGods, family);
    this.setState({foreignGods: result });

  }

  fieldUpdate(field){
    return e => this.setState({ [field]: e.target.value });
  }

  createOptions(data){

    if(data){
      let gods = data.map(god => (
        <option value={god.id} key={god.id}>{god.name}</option>
      ));
      return gods;

    } else {
      return (
        <option value="default" >default</option>
      )
    }
  }

  updateCache(cache, data){

    let god;

    try {
      god = cache.readQuery({
        query: FETCH_GOD,
        variables: {
            id: this.state.godId
        }
      });
    } catch(err){
      return;
    }

    let theGod = god.god;
    this.props.edittingCompleted(theGod);

  }


  render() {
    const { godEmblems, foreignGods } = this.state;

      return (
        <Mutation mutation={ADD_GOD_RELATIVE} update={(cache, data) => this.updateCache(cache, data)}>

        {(addGodRelative, data) => (
          <div>
            <form>
              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.props.doneEditting()} />
              </IconContext.Provider>
              <label>Add New Relative</label>
              <select
                id="relative"
                value={(this.state.relativeId) ? this.state.relativeId : ""}
                onChange={this.fieldUpdate("relativeId")}
              >
                <option value="" disabled > -- select -- </option>
                  {(foreignGods) ? this.createOptions(foreignGods) : ""}
              </select>
              <label>Relationship</label>

              <select
                id="relationship"
                value={(this.state.relationship) ? this.state.relationship : ""}
                onChange={this.fieldUpdate("relationship")}
              >
                <option value="" disabled > -- select -- </option>
                <option value="sibling" key="sibling">sibling</option>
                <option value="parent" key="parent">parent</option>
                <option value="child" key="child">child</option>
              </select>

              <button
                onClick={e => {
                  e.preventDefault();
                  const { godId, relationship, relativeId} = this.state;

                  if(godId && relationship && relativeId){
                    addGodRelative({
                      variables: { id: godId, idb: relativeId, relationship: relationship }
                    });
                  }
                }}
              >Add Relative</button>

            </form>
          </div>
        )}
        </Mutation>
      );
  }
}


export default RelativeForm;
