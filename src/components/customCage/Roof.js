import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './customCage.css'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Roof({ isDisabled, parentCallback, setValidRoof, roofs }) {
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (parseInt(value, 10) > 1) {
      setIsInvalid(true);
      setValidRoof(true)
    } else {
      setIsInvalid(false);
      setValidRoof(false)
    }
  };
  const onTrigger = (e) => {
    setSelected(e)
    parentCallback({ item: e, type: "roof", quantity: 1, total: e.price })
  }
  return (
    <div>
      <div className={`flex mt-3 ${isDisabled ? "disabled-element" : ""}`}>
        <Listbox value={selected} onChange={onTrigger}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 w-[40px]">
                Roof:{" "}
              </Listbox.Label>
              <div className="relative ml-5">
                <Listbox.Button className="relative w-[300px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <img
                      src={selected.imagePath}
                      alt=""
                      className="h-5 w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block truncate">{selected.name}</span>
                    <span className="ml-3 block truncate">{!selected.price ? "" : selected.price + "$"}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {roofs.map((roof) => (
                      <Listbox.Option
                        key={roof._id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={roof}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={roof.imagePath}
                                alt=""
                                className="h-5 w-5 flex-shrink-0"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {roof.name}
                              </span>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {roof.price + "$"}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
                {isInvalid && (
                  <div className="text-red-500 mt-2">Invalid Roof</div>
                )}
              </div>
            </>
          )}
        </Listbox>

        <span
          className="pl-2 border ml-5 text-[20px] h-9 rounded-md w-[100px]"
        >{inputValue}</span>
      </div>
    </div>
  );
}
