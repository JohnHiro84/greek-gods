import React, { Component } from "react";

import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;

import gql from "graphql-tag";
import {IconContext } from "react-icons";
import { FaPencilAlt, FaJedi, FaWindowClose } from "react-icons/fa";
import EmblemForm from "./EmblemForm";


class EmblemDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      godEmblems: this.props.godEmblems || "",
      foreignEmblems: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.edittingCompleted = this.edittingCompleted.bind(this);
    this.renderEmblems = this.renderEmblems.bind(this);
  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  edittingCompleted(moreEmblems){
    this.setState({ editing: false, godEmblems: moreEmblems });

  }

  renderEmblems(){
    if(this.state.godEmblems){

      let emblems = this.state.godEmblems.map(emblem => (

            <li key={this.props.id  +"/" + emblem.name}>
              <IconContext.Provider value={{ className: "emblem-icon"}}>
                <FaJedi />
              </IconContext.Provider>
              {emblem.name}
            </li>

      ));
      return (
        <>

        <div className="emblems-list">
          <ul className="emblems-list-ul">
            {emblems}
          </ul>
        </div>
        </>
      )
    } else {
      return "";
    }
  }

  render() {

    if(this.state.editing){
      return (
        <Query query={FETCH_EMBLEMS}>
          {({ loading, error, data}) => {
          if(loading) return <p>Loading...</p>;
          if(error) return <p>{error}</p>;

          return (
                  <div className="detail-container">
                    <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
                      <FaPencilAlt />
                    </IconContext.Provider>

                    <h4>Emblems:</h4>

                    <EmblemForm
                      id={this.props.id}
                      godEmblems={this.props.godEmblems}
                      allEmblems={data.emblems}
                      edittingCompleted={this.edittingCompleted}
                    />

                    {this.renderEmblems()}

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
              <FaPencilAlt onClick={this.handleEdit} />
            </IconContext.Provider>

            <h4>Emblems:</h4>
              {this.renderEmblems()}

          </div>
        </div>
      );
    }

  }
}


export default EmblemDetail;
