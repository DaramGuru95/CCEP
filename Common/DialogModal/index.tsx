import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import AddAttechment from "../DialogContent/AddAttechment";
import Feedback from "../DialogContent/Feedback";
import { useSelector } from "react-redux";
import { RootState } from "../../Config/Store";
import { getLocalStorage } from "../../Helpers/commonHelper";
import transferChatAction from "../../Config/Store/Slices/actions/agent_console_action/transferChat_action";
import { useDispatch } from "react-redux";
import { resetTransferState } from "../../Config/Store/Slices/reducers/agentconsole_reducers/transferChat_reducers";
import { postTicketDetailsAction } from "../../Config/Store/Slices/reducers/ticket_reducers/createTicket_reducer";
import { handleShowAttechmentClose } from "../../Config/Store/Slices/reducers/modal_reducers";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CustomizedDialogsProps {
  open: boolean;
  handleClose: () => void;
  dialogContent: any;
  submitButtonFunction?: any;
  isAttachment: boolean;
  attachmentClickFunction: any;
  extraButtonFunction?: any;
}

const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({
  open,
  handleClose,
  dialogContent,
  isAttachment,
  attachmentClickFunction,
  extraButtonFunction,
}) => {
  const dispatch = useDispatch();
  const { postTicketDetails } = useSelector(
    (state: RootState) => state.createTicket
  );
  const [selectedPdf, setSelectedPdf] = React.useState<File | null>(null);
  const [attechment, setAttechment] = React.useState(false);
  const [feedback, setFeedback] = React.useState(false);
  const [feedbackFormData, setFeedbackFormData] = React.useState([]);
  const { formData } = useSelector(
    (state: RootState) => state.transferChatReducer
  );
  const selected_customer = getLocalStorage("selected_customer");
  const conversation_session_id = getLocalStorage("conv_session_id");

  const addAttechment = {
    id: 1,
    text: "Add Attechment",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: <AddAttechment />,
    submitButtonText: "Submit",
    submitButtonFunction: () => console.log("Clicked"),
  };
  const handleFeedbackForm = () => {
    console.log("feedback clicked", feedbackFormData);
  };

  const { showAttechmentPopUp } = useSelector(
    (state: RootState) => state.modalState
  );

  const FeedbackConversation = {
    id: 1,
    text: "Feedback",
    icon: <ForwardToInboxRoundedIcon />,
    dialogContent: (
      <Feedback
        setFeedbackFormData={setFeedbackFormData}
        handleFeedbackForm={handleFeedbackForm}
      />
    ),
    submitButtonText: "Submit",
    submitButtonFunction: () => handleFeedbackForm,
  };

  const closeModal = () => {
    setAttechment(false);
    setFeedback(false);
    handleClose();
    dispatch(resetTransferState());
    dispatch(handleShowAttechmentClose());
  };

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("PDFCHANGE");
    if (file) {
      setSelectedPdf(file);
    }
  };

  React.useEffect(() => {
    if (selectedPdf) {
      dispatch(
        postTicketDetailsAction({ ...postTicketDetails, pdf: selectedPdf })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedPdf]);

  const {
    isLoading: transferChatLoader,
    status: transferStatus,
    formData: statereducer,
  }: any = useSelector((state: RootState) => state.transferChatReducer);
  React.useEffect(() => {
    if (!transferChatLoader && transferStatus == "success") {
      closeModal();
      // console.log("sodfnsidnfisndi");
      // dispatch(resetTransferState());
    } else {
      // console.log("sodfnsidnfisnd sdfsdfsdfsdfsdfi");
    }
  }, [transferChatLoader]);

  return (
    <React.Fragment>
      <BootstrapDialog
        // onClose={closeModal}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"xs"}
        // fullWidth
        // sx={{ width: "30rem" }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: 600 }}
          id="customized-dialog-title"
        >
          {attechment && addAttechment.text}
          {!attechment && !feedback && dialogContent.text}
          {feedback && FeedbackConversation.text}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: "100%" }}>
          {attechment && addAttechment.dialogContent}
          {!feedback && !attechment && dialogContent.dialogContent}

          {feedback && FeedbackConversation.dialogContent}
        </DialogContent>
        <DialogActions sx={{ margin: 2 }}>
          <Button
            onClick={() => {
              // if (attechment) {
              //   setAttechment(false);
              // } else {
              if (showAttechmentPopUp) {
                dialogContent?.submitButtonFunction(dispatch);

                return;
              }
              closeModal();
              // }
            }}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #f0f2f2",
            }}
          >
            Cancel
          </Button>
          {isAttachment ? (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              onClick={() => {
                // extraButtonFunction();
                dialogContent?.extraButtonFunction(dispatch);
              }}
              // startIcon={<CloudUploadIcon />}
            >
              Add Attachment
              {/* <VisuallyHiddenInput
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
              /> */}
            </Button>
          ) : null}

          {dialogContent?.text === "Raise a Ticket" && !attechment && (
            <Button
              autoFocus
              onClick={() => {
                dialogContent?.extraButtonFunction(dispatch);
                // setAttechment(true);
              }}
              size="small"
              variant="contained"
              sx={{ backgroundColor: "#fff", color: "#000" }}
            >
              Add Attachment
            </Button>
          )}

          <Button
            autoFocus
            onClick={() => {
              // if (attechment) {
              //   setAttechment(false);
              // } else if (dialogContent?.text == "End Conversation") {
              //   // submitButtonFunction();
              //   if (feedback) {
              //     console.log("im tjere");
              //     handleFeedbackForm();
              //     // FeedbackConversation.submitButtonFunction();
              //     return;
              //   }
              //   setFeedback(true);
              //   dialogContent.submitButtonFunction();
              //   console.log("im again in el if ", dialogContent?.text);
              // } else {
              dialogContent.submitButtonFunction(dispatch);
              // }
            }}
            variant="contained"
            size="small"
          >
            {dialogContent.submitButtonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomizedDialogs;
