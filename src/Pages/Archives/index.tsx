import React, { useEffect, useState } from "react";
import { SupervisiorTab } from "../../Components/ui/supervisor-tab/supervisior_tab";
import ArchiveTable from "../../Components/table/ArchiveTable";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { Paragraph } from "../../Components/ui/paragraph/paragraph";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AppDispatch } from "../../Config/Store";
import { useDispatch, useSelector } from "react-redux";
import getActiveSessionAction from "../../Config/Store/Slices/actions/homepage_actions/activesessions_action";
import { setLocalStorage } from "../../Helpers/commonHelper";

const Archives = () => {
  // const { data } = useSelector((state: any) => state.getActiveSession);

  const [active, setActive] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [status, setStatus] = React.useState("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    dispatch(getActiveSessionAction("ARCHIVE"));
  }, []);

  const [activeClass, setActiveClass] = useState("customers");
  const addActiveClass = (url_type: string) => {
    setActiveClass(url_type);
  };

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { archieveData }: any = useSelector(
    (state: any) => state.getActiveSession
  );
  const tabs = [
    {
      name: "All Customers",
      url_type: "customers",
      bedge: archieveData.length,
    },
    { name: "Supervised", url_type: "supervised", bedge: "00" },
  ];

  // const handleClickRow = () => navigate("/agent-console");
  const handleClickRow = (
    type: string,
    status: string,
    customer_id: string,
    conv_session_id: string,
    showTranscript?: string | null
  ) => {
    setLocalStorage("agent_page", type);
    setLocalStorage("agent_page_status", status);
    setLocalStorage("selected_customer", customer_id);
    setLocalStorage("conv_session_id", conv_session_id);
    setLocalStorage("showTranscript", showTranscript);
    navigate("/agent-console", {
      state: { type, status, customer_id, conv_session_id, showTranscript },
    });
  };

  return (
    <Box width={"100%"}>
      <div className="flex px-2 flex-col  bg-white  w-full   my-2">
        <div className="flex w-full items-center justify-between py-2 px-1 ">
          <Paragraph className="text-sm uppercase  font-bold text-color-heading">
            Advanced Filters
          </Paragraph>

          <button
            onClick={() => setSearchBox(!searchBox)}
            className="bg-gray-100 text-color-heading border text-xs p-2 hover:bg-gray-200"
          >
            Show / Hide
          </button>
        </div>
        {searchBox && (
          <div className="my-2">
            <div className="grid grid-cols-4 gap-4">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <label htmlFor="" className="text-xs text-gray-500">
                  Status
                </label>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={status}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={""}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <label htmlFor="" className="text-xs text-gray-500">
                  Category
                </label>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={status}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={""}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <label htmlFor="" className="text-xs text-gray-500">
                  Request ID
                </label>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={status}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={""}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <label htmlFor="" className="text-xs text-gray-500">
                  Session Timming
                </label>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={status}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={""}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <label htmlFor="" className="text-xs text-gray-500">
                  Date & Time
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      sx={{
                        ".MuiInputBase-input": {
                          height: 7,
                        },
                      }}
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <label htmlFor="" className="text-xs text-gray-500">
                  Channel
                </label>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={status}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={""}>Select</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <button
              style={{ background: "#0096c5" }}
              className="ml-2 mt-2 text-white rounded-md text-xs py-2 px-3"
            >
              Search
            </button>
          </div>
        )}
      </div>
      <div className="bg-white h-full w-full py-1 md:py-3 px-1 md:px-2 xl:px-2 rounded-lg">
        <div className="sm:flex items-center bg-white justify-between  w-full border-b">
          <div className="flex items-center  ">
            {tabs.map((val, key) => (
              <SupervisiorTab
                name={val.name}
                url_type={val.url_type}
                bedge={val.bedge}
                index={key}
                active={activeClass == "" && active}
                setActive={setActive}
                activeClass={activeClass === val.url_type}
                addActiveClass={addActiveClass}
              />
            ))}
          </div>
        </div>
        <ArchiveTable
          tableData={archieveData}
          handleClickRow={handleClickRow}
        />
      </div>
    </Box>
  );
};

export default Archives;
