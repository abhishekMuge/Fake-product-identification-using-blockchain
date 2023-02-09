import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Web3Storage } from "web3.storage";

export default function addProducts({ contractInfo }) {
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUzQjBiNGEzNzljNjAwM2UwRDcxNmIzZDVkNjU5ODBDODg4OWY0NDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM2MDk1NTA1ODQsIm5hbWUiOiJBdXRoZW50aWZpLXN0b3JhZ2UifQ.cCj6Y5tSH5gNr782a01dTYbOGKcI166YMbjVo5M9zKg",
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [prodType, setProdType] = useState("");
  const [request, setRequest] = useState({
    name: "",
    manufacturerId: "",
    manufactuer_address: "",
    ownerId: "",
    owner_address: "",
    prodDescription: "",
  });

  const InputChanges = (event) => {
    event.preventDefault();
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const registerProduct = async (prodId) => {
    let isUnique = prodType == "antique";
    const productSetRequest = await contractInfo.contractInstace.methods
      .registerProduct(
        prodId,
        request.name,
        request.prodDescription,
        request.manufacturerId,
        prodType,
        isUnique,
        request.ownerId,
        request.manufactuer_address
      )
      .send({
        from: contractInfo.contractActiveAddress,
      });
  };

  const uploadDocumentToIPFS = async (prodId) => {
    const rootCid = await client.put(acceptedFiles);
    console.log(rootCid);
    const setUploadFiles = await contractInfo.contractInstace.methods
      .uploadDocuments(prodId, rootCid)
      .send({
        from: contractInfo.contractActiveAddress,
      });
    console.log(setUploadFiles);
    // const info = await client.status(rootCid);
    // console.log(info);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prodId = uuidv4();
    const res = await registerProduct(prodId);
    await uploadDocumentToIPFS(prodId);
    const productGetRequest = await contractInfo.contractInstace.methods
      .getProduct(prodId)
      .call();
    console.log(productGetRequest);
  };

  return (
    <div>
      <h1 className="w-full text-3xl font-bold">Add Products</h1>
      {/* Form */}
      <form className="mt-10 w-full">
        <div class="relative mb-4">
          <label for="name" className="leading-7 text-md text-gray-600">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={request.name}
            onChange={(e) => InputChanges(e)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            required
          />
        </div>

        <div className="flex mb-4">
          <div class="relative mb-4 mr-5 w-1/3">
            <label for="name" className="leading-7 text-md text-gray-600">
              Owner ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ownerId"
              name="ownerId"
              value={request.ownerId}
              onChange={(e) => InputChanges(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <div class="relative mb-4 w-1/3 flex flex-col mr-5">
            <label for="name" className="leading-7 text-md text-gray-600">
              Owner Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="owner_address"
              name="owner_address"
              value={request.owner_address}
              onChange={(e) => InputChanges(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <div class="relative mb-4 mr-5 w-2/5">
            <label for="name" className="leading-7 text-md text-gray-600">
              Manufacturer Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="manufactuer_address"
              name="manufactuer_address"
              value={request.manufactuer_address}
              onChange={(e) => InputChanges(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div class="relative mb-4 mr-5 w-2/5">
            <label for="name" className="leading-7 text-md text-gray-600">
              Manufacturer ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="manufacturerId"
              name="manufacturerId"
              value={request.manufacturerId}
              onChange={(e) => InputChanges(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <div class="relative mb-4 mr-5 w-2/5">
            <div>
              <label
                htmlFor="countries"
                className="leading-7 text-md text-gray-600"
              >
                Type of Product <span className="text-red-500">*</span>
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => {
                  setProdType(e.target.value);
                }}
              >
                <option selected>Choose a Type of Product</option>
                <option value="Antique">Antique</option>
                <option value="sculpture">sculpture</option>
                <option value="Jwellary">Jwellary</option>
                <option value="painting">painting</option>
              </select>
            </div>
          </div>
        </div>

        <div class="relative mb-4">
          <label
            for="prodDescription"
            className="leading-7 text-md text-gray-600"
          >
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            id="prodDescription"
            name="prodDescription"
            value={request.prodDescription}
            onChange={(e) => InputChanges(e)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            required
          />
        </div>

        <span className="leading-7 text-md text-gray-600">
          Upload Certificates and Images <span className="text-red-500">*</span>
        </span>
        <section className="container w-full h-40 mt-3 rounded-lg hover:border-dotted hover:border-teal-400 hover:border-4 text-gray-500 text-center bg-slate-100 flex justify-center items-center">
          <div className="" {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              <span className="text-md font-bold text-black leading-7">
                {acceptedFiles.length} Files are selected
              </span>
            ) : (
              <p>
                Drag 'n' drop some files here,
                <br />
                or click to select files
              </p>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto mt-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
          </div>
        </section>

        <button
          onClick={(e) => handleSubmit(e)}
          className="w-full mt-4 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Register Product
        </button>
      </form>
    </div>
  );
}
