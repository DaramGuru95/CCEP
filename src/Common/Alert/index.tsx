import React from "react";

import { Alert, Snackbar } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { closeAlert } from "../../Config/Store/Slices/reducers/alerts";
import { useDispatch } from "react-redux";

type Props = {};

const CustomAlert = (props: Props) => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: any) => state.alertState
  );

  const borderLeft = severity === "error" ? "#E22853" : "#51B82C";

  return (
    <Snackbar
      open={open}
      onClose={() => dispatch(closeAlert())}
      // autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        onClose={() => dispatch(closeAlert())}
        sx={{ mb: 2, borderLeft: `5px solid ${borderLeft}` }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
