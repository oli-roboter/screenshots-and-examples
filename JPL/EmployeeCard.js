import React from "react";
import propTypes from "prop-types";
import "../CssFiles/cards.css";
import { Link } from "react-router-dom";

const Card = props => {
  return (
    <div className="admin_card">
      <div className="admin_card_header">
        <div>
          {props.name} {props.surname}
        </div>
        <Link to={props.editPath}>
          <i className="material-icons">menu</i>
        </Link>
      </div>
      <section className="admin_card_body">
        <div>
          <i className="material-icons">person_outline</i>
          {props.position}
        </div>
        <div>
          <i className="material-icons">email</i>
          {props.eMail}
        </div>
        <div>
          <i className="material-icons">phone</i>
          {props.contactNumber}
        </div>
        <div>
          <i className="material-icons">vpn_key</i>
          {props.accessLevel}
        </div>
        <div>
          <span>
            <i className="material-icons">place</i>
          </span>
          <span>{props.workLocation}</span>
        </div>
      </section>
    </div>
  );
};
export default Card;

Card.propTypes = {
  mongo_id: propTypes.string,
  name: propTypes.string,
  surname: propTypes.string,
  workLocation: propTypes.string,
  contactNumber: propTypes.string,
  position: propTypes.string,
  accessLevel: propTypes.string,
  eMail: propTypes.string
};
