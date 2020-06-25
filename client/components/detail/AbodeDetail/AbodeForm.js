import React, { Component } from "react";

import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
const { FETCH_ABODES, FETCH_GOD, FETCH_GOD_ABODE } = Queries;
import gql from "graphql-tag";

import {IconContext } from "react-icons";
import { FaWindowClose } from "react-icons/fa";

import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";

const { UPDATE_GOD_ABODE } = Mutations;
import { findId } from "../../util/helper";

import NameDetail from "../NameDetail";



class AbodeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      abodeId: "",
      godId: this.props.id || "",
      abodes: this.props.abodes || "",
    };
    this.fieldUpdate = this.fieldUpdate.bind(this);
  }

  fieldUpdate(field, value){
    return e => this.setState({ [field]: value });
  }

  createOptions(data){

    if(data.abodes){

      let abodes = data.abodes.map(abode => (
        <option value={abode.id} key={abode.id}>{abode.name}</option>
      ));
      return abodes
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

    let newAbodeId =  data.data.updateGodAbode.abode.id;
    let abodeFound = findId(this.props.abodes.abodes, newAbodeId);

    let theGod = god.god;
    theGod.abode = abodeFound;

    if (god){

      cache.writeQuery({
        query: FETCH_GOD,
        data: { god: theGod }})
      }
  }


  render() {
    const { abodes } = this.state;

      return (
        <Mutation mutation={UPDATE_GOD_ABODE} update={(cache, data) => this.updateCache(cache, data)}>

        {(updateGodAbode, data) => (
          <div>
            <form>

              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.props.edittingCompleted(this.props.abodeId)} />
              </IconContext.Provider>

              <label>Update Abode</label>

              <select
                id="prefix"
                value={(this.state.abodeId) ? this.state.abodeId : ""}
                onChange={e => {
                  e.preventDefault();
                  let abodeNewId = e.target.value;

                  const { godId } = this.state;

                  if(godId && abodeNewId){
                    updateGodAbode({
                      variables: { id: godId, idb: abodeNewId }
                    });
                  }
                  this.props.edittingCompleted(abodeNewId);
                }}
              >

                <option value="" disabled > -- select -- </option>
                  {(abodes) ? this.createOptions(abodes) : ""}

              </select>
            </form>
          </div>
        )}
        </Mutation>
      );
  }
}


export default AbodeForm;
