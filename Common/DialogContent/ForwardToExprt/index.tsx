import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select, TextField, Box } from "@mui/material";
import {
  resetTransferState,
  updateFormData,
} from "../../../Config/Store/Slices/reducers/agentconsole_reducers/transferChat_reducers";
import getMasterDataService from "../../../Config/Store/Slices/services/masterData/getMasterData";
import { useDispatch } from "react-redux";
import {
  deleteLocalStorage,
  getLocalStorage,
} from "../../../Helpers/commonHelper";
import { socket } from "../../../Config/socket";
import getActiveAgentService from "../../../Config/Store/Slices/services/masterData/getActiveAgent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";

type Props = {};

const ForwardToExpert = (props: Props) => {
  const [status, setStatus] = useState("");
  const [departmentDropDown, setDepartmentDropDown] = useState<any>([]);
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
      deleteLocalStorage("selected_customer");
      dispatch(resetTransferState());
      deleteLocalStorage("conv_session_id");
      socket.emit("leave_chat_room", conv_session_id);

      navigate("/home");
    }
  }, [isLoading]);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const departmentData = await getMasterDataService({
        data_type: "DEPARTMENT",
        data_sub_type: "DEFAULT",
      });
      setDepartmentDropDown(departmentData?.code_values);

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
    department: "",
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
  //   if (departmentDropDown?.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       reason: departmentDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(updateFormData({ ["reason"]: departmentDropDown[0]["code"] }));
  //   }
  // }, [departmentDropDown]);

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
  //   if (categoryDropDown?.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       category: categoryDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(updateFormData({ ["category"]: categoryDropDown[0]["code"] }));

  //     subCat(categoryDropDown[0]["code"]);
  //   }
  // }, [categoryDropDown]);

  // useEffect(() => {
  //   if (productDropDown?.length > 0) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       product: productDropDown[0]["code"], // Set the default value to the first item
  //     }));
  //     dispatch(updateFormData({ ["product"]: productDropDown[0]["code"] }));

  //     subProduct(productDropDown[0]["code"]);
  //   }
  // }, [productDropDown]);

  // useEffect(() => {
  //   if (subCategoryDropDown?.length > 0) {
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
    <Box>
      <div className="grid grid-cols-2 gap-2">
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <label htmlFor="" className="text-xs text-gray-500">
            Department
          </label>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={formData.department}
            onChange={(event) => handleChange(event, "department")}
            displayEmpty
          >
            <MenuItem value={""}>Select</MenuItem>

            {departmentDropDown?.map((item: any) => (
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
            {assignedToDropDown?.map(
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

            {productDropDown?.map((item: any) => (
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

            {categoryDropDown?.map((item: any) => (
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

            {subCategoryDropDown?.map((item: any) => (
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
    </Box>
  );
};

export default ForwardToExpert;
