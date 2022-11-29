export default function transferProduct() {
  return (
    <div>
      <h1 className="w-full text-3xl font-bold">Transfer Product</h1>
      <form className="mt-10 w-full">
        <div className="relative mb-4">
          <label for="name" className="leading-7 text-md text-gray-600">
            Product ID
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="flex mb-4">
          <div className="relative mb-4 mr-5 w-1/2">
            <label for="name" className="leading-7 text-md text-gray-600">
              Owner Address
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4 mr-5 w-2/5">
            <label for="name" className="leading-7 text-md text-gray-600">
              New Owner Addrees
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <button className="bg-black rounded-lg text-white hover:bg-gray-800 hover:text-grey-600 py-4 w-full flex justify-center items-center">
          <span className="mr-3 font-semibold leading-7">Transfer</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 -rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
