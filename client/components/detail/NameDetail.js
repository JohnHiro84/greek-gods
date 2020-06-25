import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import {IconContext } from "react-icons";
import { FaPencilAlt, FaWindowClose } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_NAME } = Mutations;


class NameDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      name: this.props.name || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e){
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field){
    return e => this.setState({ [field] : e.target.value });
  }

  render() {
    if(this.state.editing){
      return (
        <Mutation mutation={UPDATE_GOD_NAME}>
        {(updateGodName, data) => (
          <div className="detail-container">

            <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
              <FaPencilAlt />
            </IconContext.Provider>
            <h4><span className="detail-heading">Name:</span>{this.state.name}</h4>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateGodName({
                  variables: { id: this.props.id, name: this.state.name }
                }).then(() => this.setState({ editing: false }));
              }}
            >
              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.setState({editing: false})} />
              </IconContext.Provider>

              <label>Update Name</label>
              <input
                value={this.state.name}
                onChange={this.fieldUpdate("name")}
              />
              <button type="submit">Update</button>
            </form>

          </div>
        )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div
            className="detail-container"
            onClick={this.handleEdit}
            >
            <IconContext.Provider value={{ className: "custom-icon"}}>
              <FaPencilAlt />
            </IconContext.Provider>
            <h4><span className="detail-heading">Name:</span>{this.state.name}</h4>
          </div>
        </div>
      );
    }
  }
}

export default NameDetail;
