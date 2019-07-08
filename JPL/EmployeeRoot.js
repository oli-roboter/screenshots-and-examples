import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEmployees } from "./employee-actions";
import Card from "./EmployeeCard";
import TaskBar from "../TaskBar/TaskBar";
import UpdatePage from "../Tools/UpdatePage";

const mapStateToProps = state => {
  return {
    employeeData: state.employeeData.allEmployeeData,
    got: state.employeeData.gotAllEmployees,
    isUpdating: state.employeeData.isUpdating
  };
};

class CardRoot extends Component {
  static propTypes = {
    got: propTypes.bool,
    isUpdating: propTypes.bool,
    employeeData: propTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      filterOn: false,
      filteredEmployeeData: null
    };
  }

  componentDidMount() {
    if (!this.props.got && !this.props.isUpdating) {
      this.props.getEmployees();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isUpdating !== this.props.isUpdating) {
      this.props.getEmployees();
    } else {
    }
  }

  filterFunc = e => {
    let filter = e.target.value;
    let filteredEmployeeData = this.props.employeeData.filter(employee =>
      employee.name.toLowerCase().startsWith(filter.toLowerCase())
    );
    this.setState({
      filterOn: true,
      filteredEmployeeData: filteredEmployeeData
    });
  };

  //render methods
  renderCards = card => {
    return (
      <Card
        key={card.user_id}
        auth0_id={card.user_id}
        name={card.user_metadata.userName}
        surname={card.user_metadata.userSurname}
        position={card.user_metadata.position}
        workLocation={card.app_metadata.allowedLocationAccess}
        contactNumber={card.user_metadata.contactNumber}
        eMail={card.email}
        accessLevel={card.app_metadata.role}
        editPath={`/admin/employees/edit/${card.email}`}
      />
    );
  };

  renderFilterData = () => {
    if (this.state.filterOn) {
      return this.state.filteredEmployeeData;
    } else {
      return this.props.employeeData;
    }
  };

  ascbyName = (card1, card2) => {
    if (card1.name < card2.name) {
      return -1;
    }
    if (card1.name > card2.name) {
      return 1;
    }
    return 0;
  };

  render() {
    return (
      <div>
        {this.props.got && (
          <div>
            <TaskBar
              title={"Employees"}
              placeholder={"Employee Name"}
              filterFunc={this.filterFunc}
              addItemLink={"/admin/employees/new"}
              btnText={"New Employee"}
              enabled={true}
            />

            <div className="work_area_main">
              <div className="card_area_layout">
                {this.renderFilterData()
                  .sort(this.ascbyName)
                  .map(this.renderCards)}
              </div>
            </div>
          </div>
        )}
        {this.props.isUpdating && (
          <UpdatePage
            updateClass={"refresh_spinner"}
            updateText={"Submitting new Employee"}
          />
        )}
        {!this.props.got && !this.props.isUpdating && (
          <UpdatePage
            updateClass={"refresh_spinner"}
            updateText={"Loading Employees"}
          />
        )}
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEmployees: getEmployees
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(CardRoot);
