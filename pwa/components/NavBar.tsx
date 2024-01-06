import React from "react";
import { Dialog } from "@headlessui/react";

const navigation = [
  { name: "Line Chart", id: "line-chart" },
  { name: "Bar Chart", id: "bar-chart" },
  { name: "Pie Chart", id: "pie-chart" },
];

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, setActiveChart, activeChart }) => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8 bg-opacity-50 backdrop-filter backdrop-blur-lg"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ImmoVista</span>
            <img
              className="h-8 w-auto"
              src="https://e7.pngegg.com/pngimages/669/146/png-clipart-house-real-estate-computer-icons-home-estate-agent-house-angle-logo.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <img
              className="h-12 w-12"
              aria-hidden="true"
              src="https://cdn.icon-icons.com/icons2/3215/PNG/512/hamburger_menu_navbar_options_icon_196495.png"
              alt="new"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 flex-col lg:flex-row">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveChart(item.id)}
              className={`${
                activeChart === item.id
                  ? "border-b-2 border-blue-500"
                  : "border-b border-transparent"
              } hover:border-b-2 hover:border-blue-500`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://e7.pngegg.com/pngimages/669/146/png-clipart-house-real-estate-computer-icons-home-estate-agent-house-angle-logo.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <ul className="space-y-2 py-6">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => setActiveChart(item.id)}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
