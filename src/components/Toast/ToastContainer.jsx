import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export default function ToastContainerConfig() {
  const StyledContainer = styled(ToastContainer).attrs({
    // custom props
  })`
    .Toastify__toast-container {
    }
    .Toastify__toast {
    }
    .Toastify__toast--error {
    }
    .Toastify__toast--warning {
    }
    .Toastify__toast--success {
    }
    .Toastify__toast-body {
    }
    .Toastify__progress-bar {
    }
  `;

  return (
    <StyledContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
