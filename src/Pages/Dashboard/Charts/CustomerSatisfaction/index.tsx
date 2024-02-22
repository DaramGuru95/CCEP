import { Box, Button, Typography } from "@mui/material";
import FromHiestReviews from "../../../../assets/images/FromHiestReviews.png";
import FromMediumReviews from "../../../../assets/images/FromMediumReviews.png";
import FromLowReviews from "../../../../assets/images/FromLowReviews.png";
import MUISlider from "../../../../Components/slider/MuiSlider";

type Props = {};

const CustomerSatisfaction = (props: Props) => {
  return (
    <Box>
      <Typography>Overall</Typography>
      <Typography sx={{ color: "hsla(104, 61%, 45%, 1)", fontWeight: 600 }}>
        POSITIVE{" "}
        <span style={{ color: "hsla(194, 100%, 8%, 0.5)" }}>
          from 249 reviews
        </span>
      </Typography>
      <Box mb={1} mt={3}>
        <MUISlider />
      </Box>

      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "600", color: "#000", mb: "0.5em" }}
        >
          CUSTOMER FEEDBACK
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <Button>
            <img
              src={FromHiestReviews}
              alt="emojies"
              onClick={() => "Emoji Clicked"}
              style={{ cursor: "pointer" }}
            />
          </Button>
          <Typography variant="subtitle1">from 200 reviws</Typography>
        </Box>

        <Box>
          <Button>
            <img
              src={FromMediumReviews}
              alt="emojies"
              onClick={() => "Emoji Clicked"}
              style={{ cursor: "pointer" }}
            />
          </Button>
          <Typography>from 8 reviws</Typography>
        </Box>

        <Box>
          <Button>
            <img
              src={FromLowReviews}
              alt="emojies"
              onClick={() => "Emoji Clicked"}
              style={{ cursor: "pointer" }}
            />
          </Button>
          <Typography>from 2 reviws</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerSatisfaction;
