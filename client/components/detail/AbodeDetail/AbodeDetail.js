import React, { Component } from "react";

import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
const { FETCH_ABODES } = Queries;

import gql from "graphql-tag";

import {IconContext } from "react-icons";
import { FaPencilAlt, FaWindowClose } from "react-icons/fa";
import AbodeForm from "./AbodeForm";



class AbodeDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      abodeId: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.edittingCompleted = this.edittingCompleted.bind(this);

  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  edittingCompleted(value){
    this.setState({ editing: false, abodeId: value});
  }


  render() {
    const { abode } = this.state;

    if(this.state.editing){
      return (
        <Query query={FETCH_ABODES}>
        {({ loading, error, data}) => {
          if(loading) return <p>Loading...</p>;
          if(error) return <p>{error}</p>;

          return (
                  <div className="detail-container">
                    <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
                      <FaPencilAlt />
                    </IconContext.Provider>

                    <h4><span className="detail-heading">Abode:</span>{(this.props.abode)? this.props.abode.name : "n/a"}</h4>
                    <AbodeForm
                      id={this.props.id}
                      abode={this.props.abode}
                      abodes={data}
                      edittingCompleted={this.edittingCompleted}
                      abodeId={this.state.abodeId}
                    />
                  </div>
                );
        }}
        </Query>
      );
    } else {
      return (
        <div>
          <div className="detail-container">
            <IconContext.Provider value={{ className: "custom-icon"}}>
              <FaPencilAlt onClick={this.handleEdit}/>
            </IconContext.Provider>
            <h4><span className="detail-heading">Abode:</span>{(this.props.abode)? this.props.abode.name : "n/a"}</h4>
          </div>
        </div>
      );
    }

  }
}


export default AbodeDetail;
