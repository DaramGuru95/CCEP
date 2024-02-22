import React, { useEffect, useState } from "react";
import { SupervisiorTab } from "../../Components/ui/supervisor-tab/supervisior_tab";

import { AccordionComp } from "./AccordionComp";
import { AppDispatch, RootState } from "../../Config/Store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import getQandAAction from "../../Config/Store/Slices/actions/QandA_action/QandA_action";

const QandA = () => {
  const [active, setActive] = useState(false);
  const [activeClass, setActiveClass] = useState("mosty_asked");
  const [selectedCategory, setSelectedCategory] = useState(
    "Most Asked Questions"
  );
  const [tabCounts, setTabCounts] = useState<any>({});
  console.log(tabCounts, "tabCounts");

  const handleChangeCategory = (category: any) => {
    setSelectedCategory(category);
  };
  const dispatch: AppDispatch = useDispatch();

  const user_id = useSelector((state: RootState) => state.appState.user_id);
  const faqList = useSelector((state: RootState) => state.getQandAReducer.data);
  // console.log(faqList, "faqList");

  const selectedCategoryData = faqList?.FAQ[selectedCategory] || [];
  // console.log(selectedCategoryData, "selectedCategoryData");

  useEffect(() => {
    dispatch(getQandAAction(user_id));
  }, []);
  useEffect(() => {
    // Calculate counts for each category
    if (faqList) {
      const counts: any = {};
      Object.keys(faqList?.FAQ).forEach((category) => {
        counts[category] = faqList.FAQ[category].length;
      });
      setTabCounts(counts);
    }
  }, [faqList]);

  const tabs = [
    {
      name: "Most Asked Questions",
      url_type: "mosty_asked",
      bedge: `${tabCounts["Most Asked Questions"]}`,
    },
    {
      name: "Credit Card",
      url_type: "credit_card",
      bedge: `${tabCounts["Credit Card"]}`,
    },
    {
      name: "Savings Account",
      url_type: "saving_card",
      bedge: `${tabCounts["Savings Account"]}`,
    },
  ];

  console.log("faqList", selectedCategoryData);
  
  // const accordionRecord = [
  //   {
  //     heading: "Can I get my newly generated PIN online?",
  //     data: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //               Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
  //               eget.`,
  //   },
  //   {
  //     heading: "When will I receive my changed ATM PIN?",
  //     data: "You will receive your new ATM PIN by post within 10 days from when your request has been submitted.",
  //   },
  //   {
  //     heading: "How do I change my password?",
  //     data: `After you have logged in, you can change your password using the "Change password" option in the top part of the screen. You have to type your current password and the new password you have chosen in their respective boxes.`,
  //   },
  // ];

  // const tabs = [
  //   {
  //     name: "Most Asked Questions",
  //     url_type: "mosty_asked",
  //     bedge: accordionRecord.length,
  //   },
  //   {
  //     name: "Credit Card",
  //     url_type: "credit_card",
  //     bedge: faqList?.FAQ["Credit Card"].length,
  //   },
  //   {
  //     name: "Savings Account",
  //     url_type: "saving_card",
  //     bedge: faqList?.FAQ["Savings Account"].length,
  //   },
  // ];

  const addActiveClass = (url_type: string) => {
    setActiveClass(url_type);
  };

  return (
    <div className=" mt-4  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <div className="bg-white  py-1 md:py-3 px-1 md:px-2 xl:px-2 rounded-lg">
        <div className="sm:flex items-center bg-white justify-between  w-full border-b">
          <div className="flex items-center  ">
            {tabs.map((val, key) => (
              <SupervisiorTab
                handleChange={handleChangeCategory}
                name={val.name}
                url_type={val.url_type}
                bedge={val.bedge}
                index={key}
                active={activeClass === "" && active}
                setActive={setActive}
                activeClass={activeClass === val.url_type}
                addActiveClass={addActiveClass}
              />
            ))}
          </div>
        </div>
        <div className="block mt-3 w-full overflow-x-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          {selectedCategoryData.map((val: any, key: number) => (
            <AccordionComp
              // handleChangeAccordion={handleChangeAccordion}
              key={key}
              question={val?.Question}
              answer={val?.Answer}
              // expandedAccordion={expandedAccordion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QandA;
