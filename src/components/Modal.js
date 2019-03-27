import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  render() {
    return (
      <div className="Modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.hide}>
            ×
          </span>
          <div id="modal-text">
            <div className="alert-title">Invalid email or password</div>
            <div className="alert-text">Please reinsert both carefully</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
