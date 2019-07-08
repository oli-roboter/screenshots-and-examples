import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import UniversityInfoForm from "../forms/UniversityInfoForm";
import Modal from "../../../components/modal/Modal";
import { UNIVERSITY_FIELDS } from "../mutations";
import { NOTIFICATION_TYPES } from "../../../components/notifications/notification-context";
import { formatGraphQLError } from "../../../components/formatting/error-formatting";

const AddUniversity = ({
  isOpen,
  onRequestClose,
  notifications,
  onCompleted
}) => {
  return (
    <Mutation
      mutation={ADD_UNIVERSITY}
      onError={error => {
        notifications.raise({
          type: NOTIFICATION_TYPES.error,
          message: formatGraphQLError(error),
          title: "Could not add university"
        });
      }}
      onCompleted={onCompleted}
    >
      {(addUniversity, { loading }) => {
        return (
          <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <UniversityInfoForm
              loading={loading}
              submitButtonDisplay="ADD UNIVERSITY"
              onSubmit={function(values) {
                addUniversity({
                  variables: {
                    input: {
                      name: values.name,
                      department: values.department,
                      address: {
                        address1: values.address1,
                        address2: values.address2,
                        town: values.town,
                        county: values.county,
                        postcode: values.postcode
                      }
                    }
                  }
                });
              }}
            />
          </Modal>
        );
      }}
    </Mutation>
  );
};

const ADD_UNIVERSITY = gql`
  mutation($input: UniversityInput!) {
    addUniversity(input: $input) {
      university {
        ${UNIVERSITY_FIELDS}
      }
    }
  }
`;

export default AddUniversity;
