import React, { Component } from "react";
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
import Queries from "../../../graphql/queries";
const { FETCH_GODS } = Queries;

import gql from "graphql-tag";

import {IconContext } from "react-icons";
import { FaPencilAlt, FaWindowClose } from "react-icons/fa";

import RelativeForm from "./RelativeForm";



class RelativeDetail extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      editing: false,
      parents: this.props.parents || "",
      children: this.props.children || "",
      siblings: this.props.siblings || "",
      foreignGods: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.edittingCompleted = this.edittingCompleted.bind(this);
    this.renderRelatives = this.renderRelatives.bind(this);
    this.doneEditting = this.doneEditting.bind(this);

  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  edittingCompleted(updatedGod){

    this.setState({
      editing: false,
      children: updatedGod.children,
      parents: updatedGod.parents,
      siblings: updatedGod.siblings
    });
  }

  doneEditting(){
    this.setState({
      editing: false
    })
  }

  renderRelatives(){
    const { parents, children, siblings } = this.state;

    if(parents || children || siblings){

      let parents = this.state.parents.map(relative => (
            <li key={this.props.id  +"/" + relative.name}>
                {relative.name}
            </li>
      ));

      let children = this.state.children.map(relative => (
            <li key={this.props.id  +"/" + relative.name}>
                {relative.name}
            </li>
      ));
      let siblings = this.state.siblings.map(relative => (
            <li key={this.props.id  +"/" + relative.name}>
                {relative.name}
            </li>
      ));
      return (
        <>

        <div className="relatives-list">
          <h4>Parents:</h4>
          <ul className="relatives-list-ul">
            {parents}
          </ul>
          <h4>Children:</h4>
          <ul className="relatives-list-ul">
            {children}
          </ul>
          <h4>Siblings:</h4>
          <ul className="relatives-list-ul">
            {siblings}
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
        <Query query={FETCH_GODS}>
        {({ loading, error, data}) => {
          if(loading) return <p>Loading...</p>;
          if(error) return <p>{error}</p>;

          return (
                  <div className="detail-container">
                    <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
                      <FaPencilAlt />
                    </IconContext.Provider>

                    <h4>Relatives:</h4>

                    <RelativeForm
                      id={this.props.id}
                      thisGod={this.props.thisGod}
                      children={this.props.children}
                      parents={this.props.parents}
                      siblings={this.props.siblings}
                      allGods={data.gods}
                      edittingCompleted={this.edittingCompleted}
                      doneEditting={this.doneEditting}
                    />

                    {this.renderRelatives()}

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

            <h4>Relatives:</h4>
              {this.renderRelatives()}

          </div>
        </div>
      );
    }

  }
}


export default RelativeDetail;
