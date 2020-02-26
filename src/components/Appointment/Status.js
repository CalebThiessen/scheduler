import "./styles.scss";
import React from "react";
import { action } from "@storybook/addon-actions";

export default function Confirm(props) {
    return (
        <main className="appointment__card appointment__card--status">
        <img
          className="appointment__status-image"
          src="images/status.png"
          alt="Loading"
        />
        <h1 messageclassName="text--semi-bold">{props.message}</h1>
      </main>
    )
  }