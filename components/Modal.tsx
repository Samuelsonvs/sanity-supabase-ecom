import { App } from "@/interfaces/app";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const Modal = ({
  isOpen,
  setIsOpen,
  handler,
  firstButtonMessage = "Got it, thanks!",
  secondButtonMessage = "",
  dialogTitleMessage = "Payment successful",
  dialogMessage = "Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.",
}: App.Modal) => {
  const completeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const answerCancelHandler = () => {
    setIsOpen(false);
  };

  const answerYesHandler = () => {
    setIsOpen(false);
    handler();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          initialFocus={completeButtonRef}
          className="fixed inset-0 z-10 overflow-y-auto bg-gray-700 bg-opacity-70"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {dialogTitleMessage}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{dialogMessage}</p>
                </div>

                <div className="mt-4 flex justify-evenly">
                  <button
                    ref={completeButtonRef}
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-yellow-600 hover:bg-yellow-700 text-white border border-transparent rounded-md focus:outline-none"
                    onClick={answerCancelHandler}
                  >
                    {firstButtonMessage}
                  </button>
                 <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-yellow-600 hover:bg-yellow-700 text-white border border-transparent rounded-md focus:outline-none"
                    onClick={answerYesHandler}
                  >
                    {secondButtonMessage}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
