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
const { ADD_GOD_EMBLEM } = Mutations;

import { idFilter } from "../../util/helper";




class EmblemForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      emblemId: "",
      godId: this.props.id || "",
      godEmblems: this.props.godEmblems || "",
      allEmblems: this.props.allEmblems || "",
      foreignEmblems: ""
    };
    this.fieldUpdate = this.fieldUpdate.bind(this);
  }



  componentDidMount(){
    const { allEmblems, godEmblems } = this.state;

    let result = idFilter(allEmblems, godEmblems);
    this.setState({foreignEmblems: result });

  }

  fieldUpdate(field, value){
    return e => this.setState({ [field]: value });
  }

  createOptions(data){

    if(data){

      let godEmblems = data.map(emblem => (
        <option value={emblem.id} key={emblem.id}>{emblem.name}</option>
      ));
      return godEmblems;

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
    this.props.edittingCompleted(theGod.emblems);

  }



  render() {
    const { godEmblems, foreignEmblems } = this.state;

      return (
        <Mutation mutation={ADD_GOD_EMBLEM} update={(cache, data) => this.updateCache(cache, data)}>

        {(addGodEmblem, data) => (
          <div>
            <form>
              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.props.edittingCompleted(this.props.godEmblems)} />
              </IconContext.Provider>

              <label>Add a new emblem</label>

              <select
                id="prefix"
                value={(this.state.emblemId) ? this.state.emblemId : ""}
                onChange={e => {
                  e.preventDefault();
                  let emblemNewId = e.target.value;

                  const { godId } = this.state;

                  if(godId && emblemNewId){
                    addGodEmblem({
                      variables: { id: godId, idb: emblemNewId }
                    });
                  }
                }}
              >

                <option value="" disabled > -- select -- </option>
                  {(foreignEmblems) ? this.createOptions(foreignEmblems) : ""}

              </select>
            </form>
          </div>
        )}
        </Mutation>
      );
  }
}


export default EmblemForm;
