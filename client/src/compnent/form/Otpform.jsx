import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToasContainer, toast } from "react-toastify";

const Otpform = () => {
  return (
    <div className="container">
      <div className="row login">
        <div className="col-md-2"></div>

        <div className="col-md-6">
          <ToasContainer />
          <h3 className="">Reset Password</h3>
          <form autoComplete="off" id="otpForm" className="form-label">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                autoComplete="off"
              />
            </div>

            <div>
              <button type="button" className="btn btn-primary">
                Send Otp
              </button>

              <Link to="/login">
                <Button type="button">click</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otpform;
