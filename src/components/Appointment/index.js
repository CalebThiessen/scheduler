import "./styles.scss";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import React, { useEffect, Fragment } from "react";
import useVisualMode from "hooks/useVisualMode";
import { create } from "react-test-renderer";
import InterviewerList from "components/InterviewerList";

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
// REMOVE ME>>>>>>>>>>>>>>
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function editInterview() {
    transition(EDIT);
  }

  function delCancel() {
    transition(SHOW);
  }

  function delConfirm() {
    transition(CONFIRM);
  }

  function delInt(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SAVE && (
        <Error
          message="No way, error during savation"
          onCancel={() => back(SHOW)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Yeah, no, error during deletation"
          onCancel={() => back(SHOW)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back(EMPTY)}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {mode === CONFIRM && <Confirm onConfirm={delInt} onCancel={delCancel} />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          onCancel={() => back(EMPTY)}
          onSave={(name, interviewer) => save(name, interviewer)}
          interviewer={props.interview.interviewer.id}
          interviewers={interviewers}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editInterview}
          onDelete={delConfirm}
        />
      )}
    </article>
  );
}
