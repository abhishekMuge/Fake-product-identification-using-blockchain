import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function DrawerComponent({ data, openState, toggleDrawer }) {
  return (
    <div>
      <Drawer
        open={openState}
        onClose={toggleDrawer}
        direction="right"
        size="20vw"
      >
        <div className="main-container m-3">
          <div className="container-body">
            <h1 className="my-3 text-2xl font-bold leading-2">
              Customer Details
            </h1>
            <form>
              <div className="flex flex-col mb-4">
                <div class="relative mb-2 mr-5 w-full">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value=""
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-2 mr-5 w-full">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value=""
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-2 mr-5 w-full">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value=""
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-2 mr-5 w-full">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value=""
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-2 mr-5 w-full">
                  <label for="name" className="leading-7 text-md text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value=""
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="close-btn flex">
            <button
              onClick={toggleDrawer}
              className="flex items-center justify-center w-full px-10 py-2 text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-black focus:bg-black focus:ring focus:ring-black focus:ring-opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="mx-1">Close</span>
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerComponent;
