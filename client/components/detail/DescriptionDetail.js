import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import {IconContext } from "react-icons";
import { FaPencilAlt, FaWindowClose } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_DESCRIPTION } = Mutations;


class DescriptionDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      description: this.props.description || ""
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
        <Mutation mutation={UPDATE_GOD_DESCRIPTION}>
        {(updateGodDescription, data) => (
          <div className="detail-container">

            <IconContext.Provider value={{ className: "custom-icon-disabled"}}>
              <FaPencilAlt />
            </IconContext.Provider>
            <h4><span className="detail-heading">Description:</span></h4>
            <div className="description-div">
              <h4>{this.state.description}</h4>
            </div>

            <form
            onSubmit={e => {
              e.preventDefault();
              updateGodDescription({
                variables: { id: this.props.id, description: this.state.description }
              }).then(() => this.setState({ editing: false }));
            }}
            >
              <IconContext.Provider value={{ className: "close-icon"}}>
                <FaWindowClose onClick={() => this.setState({editing: false})} />
              </IconContext.Provider>
              <label>Update Description</label>
              <textarea
                value={this.state.description}
                onChange={this.fieldUpdate("description")}
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

            <h4><span className="detail-heading">Description:</span></h4>
            <div className="description-div">
              <h4>{this.state.description}</h4>
            </div>
            
          </div>
        </div>
      );
    }
  }
}

export default DescriptionDetail;
