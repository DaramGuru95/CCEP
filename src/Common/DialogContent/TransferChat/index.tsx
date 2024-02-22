import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetTransferState,
  updateFormData,
} from "../../../Config/Store/Slices/reducers/agentconsole_reducers/transferChat_reducers";
import getMasterDataService from "../../../Config/Store/Slices/services/masterData/getMasterData";
import getActiveAgentService from "../../../Config/Store/Slices/services/masterData/getActiveAgent";
import { RootState } from "../../../Config/Store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteLocalStorage,
  getLocalStorage,
} from "../../../Helpers/commonHelper";
import { socket } from "../../../Config/socket";
import { showAlert } from "../../../Config/Store/Slices/reducers/alerts";

type Props = {};

const TransferChat = (props: Props) => {
  const [status, setStatus] = React.useState("");
  const [reasonDropDown, setReasonDropDown] = useState<any>([]);
  const [productDropDown, setProductDropDown] = useState<any>([]);
  const [assignedToDropDown, setAssginedToDropDown] = useState<any>([]);
  const [categoryDropDown, setCategoryDropDown] = useState<any>([]);
  const [subCategoryDropDown, setSubCategoryDropDown] = useState<any>([]);
  const [subProductDropDown, setSubProductDropDown] = useState<any>([]);

  const agent_id = useSelector((state: RootState) => state.appState.emp_id);
  const {
    isLoading,
    status: transferStatus,
    formData: statereducer,
  } = useSelector((state: RootState) => state.transferChatReducer);
  // console.log("formData", statereducer);

  const navigate = useNavigate();
  const conv_session_id = getLocalStorage("conv_session_id");

  useEffect(() => {
    if (!isLoading && transferStatus == "success") {
      dispatch(
        showAlert({
          message: "Your Chat has been transfered",
          status: "success",
        })
      );
      deleteLocalStorage("selected_customer");
      // dispatch(resetTransferState());
      deleteLocalStorage("conv_session_id");
      socket.emit("leave_chat_room", conv_session_id);

      navigate("/home");
    }
    if (transferStatus == "failed") {
      dispatch(
        showAlert({
          message:
            "Your Chat has been not transfered due to technical issue you can re try",
          status: "error",
        })
      );
    }
  }, [isLoading]);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const reasonData = await getMasterDataService({
        data_type: "INTENT",
        data_sub_type: "DEFAULT",
      });
      setReasonDropDown(reasonData?.code_values);

      const activeAgent = await getActiveAgentService();

      setAssginedToDropDown(activeAgent?.emp_data);

      const productData = await getMasterDataService({
        data_type: "PRODUCT",
        data_sub_type: "DEFAULT",
      });

      setProductDropDown(productData?.code_values);

      const categoryData = await getMasterDataService({
        data_type: "CATEGORY",
        data_sub_type: "DEFAULT",
      });

      setCategoryDropDown(categoryData?.code_values);

      const subProductData = await getMasterDataService({
        data_type: "",
        data_sub_type: "",
      });

      const subCategoryData = await getMasterDataService({
        data_type: "",
        data_sub_type: "",
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [isLoading]);

  const [formData, setFormData] = useState({
    reason: "",
    assigned_to: "",
    product: "",
    sub_product: "",
    category: "",
    subCategory: "",
    remarks: "",
  });

  const handleChange = (event: any, field: any) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
    dispatch(updateFormData({ [field]: value }));

    if (field == "category") {
      subCat(value);
      dispatch(updateFormData({ [field]: value }));
    }
    if (field == "product") {
      subProduct(value);
      dispatch(updateFormData({ [field]: value }));
    }
  };

  // useEffect(() => {
  //   if (reasonDropDown.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       reason: reasonDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(updateFormData({ ["reason"]: reasonDropDown[0]["code"] }));
  //   }
  // }, [reasonDropDown]);

  const subCat = async (value: string) => {
    const subCategoryData = await getMasterDataService({
      data_type: value,
      data_sub_type: "DEFAULT",
    });
    setSubCategoryDropDown(subCategoryData?.code_values);
  };

  const subProduct = async (value: string) => {
    const subProductData = await getMasterDataService({
      data_type: value,
      data_sub_type: "DEFAULT",
    });
    setSubProductDropDown(subProductData?.code_values);
  };

  // useEffect(() => {
  //   if (categoryDropDown.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       category: categoryDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(updateFormData({ ["category"]: categoryDropDown[0]["code"] }));

  //     subCat(categoryDropDown[0]["code"]);
  //   }
  // }, [categoryDropDown]);

  // useEffect(() => {
  //   if (productDropDown.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       product: productDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(updateFormData({ ["product"]: productDropDown[0]["code"] }));

  //     subProduct(productDropDown[0]["code"]);
  //   }
  // }, [productDropDown]);

  // useEffect(() => {
  //   if (subCategoryDropDown.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       subCategory: subCategoryDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(
  //       updateFormData({ ["subCategory"]: subCategoryDropDown[0]["code"] })
  //     );
  //   }
  // }, [subCategoryDropDown]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Reason
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.reason}
            onChange={(event) => handleChange(event, "reason")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>

            {reasonDropDown.map((item: any) => (
              <MenuItem key={item.id} value={item.code}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Assigned To
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.assigned_to}
            onChange={(event) => handleChange(event, "assigned_to")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>
            <MenuItem value={"AUTO"}>Auto</MenuItem>
            {assignedToDropDown.map(
              (item: any) =>
                agent_id != item.emp_id && (
                  <MenuItem key={item.id} value={item.emp_id}>
                    {item.full_name}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Product
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.product}
            onChange={(event) => handleChange(event, "product")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>

            {productDropDown.map((item: any) => (
              <MenuItem key={item.id} value={item.code}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Sub-Product
          </label>

          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.sub_product}
            onChange={(event) => handleChange(event, "sub_product")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>

            {subProductDropDown?.map((item: any) => (
              <MenuItem key={item.id} value={item.code}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Category
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.category}
            onChange={(event) => handleChange(event, "category")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>

            {categoryDropDown.map((item: any) => (
              <MenuItem key={item.id} value={item.code}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Sub-Category
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.subCategory}
            onChange={(event) => handleChange(event, "subCategory")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>

            {subCategoryDropDown.map((item: any) => (
              <MenuItem key={item.id} value={item.code}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <FormControl sx={{ m: 1 }} fullWidth size="small">
        <label htmlFor="" className="text-xs text-gray-500">
          Remarks
        </label>
        <TextField
          placeholder="Please describe the issue"
          multiline
          fullWidth
          value={formData.remarks}
          onChange={(event) => handleChange(event, "remarks")}
        />
      </FormControl>
    </div>
  );
};

export default TransferChat;
