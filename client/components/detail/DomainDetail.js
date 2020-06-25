import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

import {IconContext } from "react-icons";
import { FaPencilAlt, FaWindowClose } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { ADD_GOD_DOMAIN } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_GOD } = Queries;

import DeleteDomain from "./DeleteDomain";

class DomainDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      domains: this.props.domains || "",
      domain: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.renderDomains = this.renderDomains.bind(this);
    this.domainsUpdate = this.domainsUpdate.bind(this);

  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field){
    return e => this.setState({ [field] : e.target.value });
  }

  domainsUpdate(value){
    this.setState({ domains: value });
  }

  renderDomains(){
    if(this.state.domains){

      let domains = this.state.domains.map(domain => (

            <li key={this.props.id  +"/" + domain}>
              {domain}
              <DeleteDomain
                id={this.props.id}
                domain={domain}
                domainsUpdate={this.domainsUpdate.bind(this)}
              />
            </li>

      ));
      return (
        <>
          <div className="domains-list">
            <ul className="domains-list-ul">
              {domains}
            </ul>
          </div>
        </>
      )
    } else {
      return "";
    }
  }

  updateCache(cache, data){

    let domains = data.data.addGodDomain.domains;
    this.setState({ domains: domains});

  }

  render() {
    if(this.state.editing){
      return (
        <Mutation mutation={ADD_GOD_DOMAIN} update={(cache, data) => this.updateCache(cache, data)}>
        {(updateGodDomain, data) => (

          <div className="detail-container">
            <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
              <FaPencilAlt />
            </IconContext.Provider>

            <h4><span className="detail-heading">Domains:</span></h4>


            <form
              onSubmit={e => {
                e.preventDefault();
                updateGodDomain({
                  variables: { id: this.props.id, domain: this.state.domain }
                }).then(() => this.setState({ editing: false, domain: "" }));
              }}
            >
              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.setState({editing: false})} />
              </IconContext.Provider>
              <label>Add a new domain</label>

              <input
                value={this.state.domain}
                onChange={this.fieldUpdate("domain")}
                placeholder="domain(example: music)"
              />
              <button type="submit">Add Domain</button>
            </form>
            {this.renderDomains()}
          </div>
        )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div className="detail-container">

            <IconContext.Provider value={{ className: "custom-icon"}}>
              <FaPencilAlt onClick={this.handleEdit}/>
            </IconContext.Provider>

            <h4><span className="detail-heading">Domains:</span></h4>

            {this.renderDomains()}
          </div>
        </div>
      );
    }
  }
}

export default DomainDetail;
