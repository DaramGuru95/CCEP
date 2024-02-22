import Modal from "@mui/material/Modal";
import React from "react";

export default function ModalComp({
  children,
  icon,
  heading,
  leftimage,
  show,
  setShow,
}: {
  children: React.ReactNode;
  icon: string;
  heading: string;
  leftimage: string;
  show: any;
  setShow: any;
}) {
  return (
    <Modal
      open={show}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-7/12">
            <div className="bg-white   pb-4 pt-5  sm:pb-4">
              <div className="w-full px-4  pb-4 shadow-md flex flex-row justify-between">
                <div className="flex items-center ">
                  <img className="w-6 h-6 " src={icon} alt="User logo" />
                  <div className="flex-1 ms-2 text-base">
                    <p className=" font-bold  text-color-heading truncate dark:text-white">
                      {heading}
                    </p>
                  </div>
                </div>
                <div>
                  <button onClick={() => setShow(false)}>
                    <img src="/assets/icons/Close.svg" alt="" />
                  </button>
                </div>
              </div>

              <div
                // style={{ height: "400px" }}
                className=" h-auto  w-full mt-4 flex flex-col items-center  justify-between"
              >
                <section className="h-full">
                  <div className="h-full">
                    <div className="g-6 flex overflow-y-auto  h-full mt-4 flex-wrap  justify-center lg:justify-between scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                      <div className="h-full  flex items-center shrink-1 mb-12  grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                          src={leftimage}
                          className=""
                          width={400}
                          alt="not available"
                        />
                      </div>

                      <div className="h-full md:w-8/12 lg:w-5/12 xl:w-5/12 mr-4">
                        {children}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
