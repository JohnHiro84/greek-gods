import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import {IconContext } from "react-icons";
import { FaPencilAlt, FaWindowClose } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_TYPE } = Mutations;


class TypeDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      type: this.props.type || ""
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
        <Mutation mutation={UPDATE_GOD_TYPE}>
          {(updateGodType, data) => (
            <div className="detail-container">
            <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
              <FaPencilAlt />
            </IconContext.Provider>

            <h4><span className="detail-heading">Type:</span>{this.state.type}</h4>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateGodType({
                  variables: { id: this.props.id, type: this.state.type }
                }).then(() => this.setState({ editing: false }));
              }}
            >
              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.setState({editing: false})} />
              </IconContext.Provider>

              <label>Update Type</label>

              <input
                value={this.state.type}
                onChange={this.fieldUpdate("type")}
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
            <h4><span className="detail-heading">Type:</span>{this.state.type}</h4>
          </div>
        </div>
      );
    }
  }
}

export default TypeDetail;
