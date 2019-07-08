import React, { useState } from "react";
import { PATHS } from "../../../env/paths";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import NoData from "../../../components/empty/NoData";
import { UNIVERSITY_FIELDS } from "../mutations";
import LogoLoading from "../../../assets/gfx/logos/LogoLoading";
import LogoError from "../../../assets/gfx/logos/LogoError";
import "./Universities.css";
import IconButton from "@material/react-icon-button";
import AddUniversity from "./AddUniversity";

function Universities({ notifications, onUniAdded }) {
  const [showForm, setShowForm] = useState(null);

  return (
    <Query query={ALL_UNIVERSITIES} fetchPolicy="network-only">
      {({ loading, error, data, refetch }) => {
        function onCompleted() {
          setShowForm(null);
          refetch();
          onUniAdded();
        }

        if (loading) {
          return <LogoLoading />;
        }

        if (error) {
          return <LogoError msg={error.message} />;
        }

        const universities = data.universities;

        if (universities.length === 0) {
          return (
            <NoData
              icon="fas fa-school"
              title="Start adding universities"
              text="Here you can do things like change university details"
              linkTo={PATHS.admin.universities.all}
              linkAlt="add new university"
            />
          );
        }

        return (
          <ul data-cy="universities-list" className="Universities admin-list">
            <header className="f__r-jc--sb">
              <h3>Universities / HEIs</h3>

              <IconButton
                aria-label="add new university"
                data-cy="newUniversity-btn"
                onClick={() => setShowForm(!showForm)}
              >
                <i className="fas fa-plus f__r-both--cen" />
              </IconButton>
            </header>

            {universities.map(u => {
              return (
                <li key={u.id} className="f__c">
                  <h5>{u.name}</h5>

                  <span className="Universities-address f__r-ai--cen">
                    {u.department && <p>{u.department}</p>}
                    {u.address.address1 && <p>{u.address.address1}</p>}
                    {u.address.address2 && <p>{u.address.address2}</p>}
                    {u.address.town && <p>{u.address.town}</p>}
                    {u.address.county && <p>{u.address.county}</p>}
                    {u.address.postcode && <p>{u.address.postcode}</p>}
                  </span>
                </li>
              );
            })}

            {showForm && (
              <AddUniversity
                isOpen={showForm}
                onRequestClose={() => {
                  setShowForm(false);
                  notifications.clear();
                }}
                notifications={notifications}
                onCompleted={() => onCompleted("University / HEI added")}
              />
            )}
          </ul>
        );
      }}
    </Query>
  );
}

const ALL_UNIVERSITIES = gql`
  {
    universities {
      ${UNIVERSITY_FIELDS}
    }
  }
`;

export default Universities;
