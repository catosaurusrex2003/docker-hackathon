"use client";

import Loadinganimation from "@/components/LoadingAnimation";
import ImageInput from "@/components/imageInput";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    setData(null);
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("returnType", "image");
      formData.append("returnFormat", "base64");
      formData.append("file", file);
      formData.append(
        "coordinate",
        JSON.stringify({ latitude: 5, longitude: -5 })
      );
      const response = await axios.post(
        "http://3.110.135.59:5000/predict",
        formData
      );
      setLoading(false);
      console.log(response.data);
      setData(response.data);
    }
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto mt-10 w-fit">
        <h1 className="text-lg text-center my-2 mb-10">Pothole Detection</h1>
        <div className="flex justify-between">
          <div>
            <div className="border relative border-slate-400 rounded-lg border-dashed h-48 w-96">
              <input
                type="file"
                onChange={(e) => {
                  setData(null);
                  console.log(e.target.files);
                  setFile(e.target.files?.[0] || null);
                }}
                className="opacity-0 absolute w-full z-10 h-full"
              ></input>
              <div className="flex gap-2 w-full flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4.58301 16.6667C4.24967 16.6667 3.95801 16.5417 3.70801 16.2917C3.45801 16.0417 3.33301 15.75 3.33301 15.4167V13.0625C3.33301 12.8855 3.39325 12.737 3.51374 12.6172C3.63424 12.4974 3.78354 12.4375 3.96165 12.4375C4.13978 12.4375 4.28787 12.4974 4.40592 12.6172C4.52398 12.737 4.58301 12.8855 4.58301 13.0625V15.4167H15.4163V13.0625C15.4163 12.8855 15.4766 12.737 15.5971 12.6172C15.7176 12.4974 15.8669 12.4375 16.045 12.4375C16.2231 12.4375 16.3712 12.4974 16.4893 12.6172C16.6073 12.737 16.6663 12.8855 16.6663 13.0625V15.4167C16.6663 15.75 16.5413 16.0417 16.2913 16.2917C16.0413 16.5417 15.7497 16.6667 15.4163 16.6667H4.58301ZM9.37467 5.75004L7.31217 7.81254C7.18995 7.93754 7.04481 7.99657 6.87676 7.98962C6.7087 7.98268 6.55946 7.91671 6.42903 7.79171C6.30946 7.66671 6.24967 7.5174 6.24967 7.34379C6.24967 7.17018 6.31217 7.02087 6.43717 6.89587L9.56217 3.77087C9.63162 3.70143 9.70199 3.65282 9.77328 3.62504C9.84458 3.59726 9.92097 3.58337 10.0024 3.58337C10.0839 3.58337 10.1594 3.59726 10.2288 3.62504C10.2983 3.65282 10.3677 3.70143 10.4372 3.77087L13.583 6.91671C13.708 7.04171 13.7705 7.18754 13.7705 7.35421C13.7705 7.52087 13.7107 7.66671 13.5912 7.79171C13.4607 7.91671 13.3087 7.97921 13.1351 7.97921C12.9615 7.97921 12.8122 7.91671 12.6872 7.79171L10.6247 5.75004V12.8542C10.6247 13.0313 10.5644 13.1797 10.4439 13.2995C10.3234 13.4193 10.1741 13.4792 9.99603 13.4792C9.8179 13.4792 9.66981 13.4193 9.55176 13.2995C9.4337 13.1797 9.37467 13.0313 9.37467 12.8542V5.75004Z"
                    fill="#6B7280"
                    fillOpacity="0.8"
                  />
                </svg>
                <p className="text">
                  Drag & Drop or <span className="text-[#4282E1]">Choose</span>{" "}
                  file to upload
                </p>
                <span className="text-sm text-[#6B7280]">PDF or DOC</span>
              </div>
            </div>

            <div className="flex items-center w-fit mx-auto my-2">
              <hr className="w-40 border-slate-300" />
              <span className="mx-3">OR</span>
              <hr className="w-40 border-slate-300" />
            </div>

            <div>
              <h2>Import from URL</h2>
              <input
                type="text"
                placeholder="http://s3-file.source.com"
                className="px-4 py-2 text-sm border border-slate-400 mt-1 w-full rounded"
              />
              <div className="mt-2 flex items-center justify-between">
                <button className="px-4 py-2 text-sm border bg-amber-50 text-yellow-700 border-yellow-200 font-normal  mt-1 rounded">
                  Size Limit: 10 MB
                </button>
                <div>
                  <button className="px-4 py-2 text-sm border border-slate-500 mt-1 rounded">
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm ml-2 border border-blue-200 mt-1 bg-blue-500 text-white rounded">
                    Import
                  </button>
                </div>
              </div>
            </div>
            <div>
              {file && (
                <div className="w-full h-[74px] px-2 py-[15px] relative mt-2 bg-white rounded shadow border border-gray-200 justify-between items-start inline-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    className="absolute top-2 right-2 "
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.14623 3.64669C4.23998 3.55305 4.36706 3.50046 4.49956 3.50046C4.63206 3.50046 4.75914 3.55305 4.85289 3.64669L8.49956 7.29335L12.1462 3.64669C12.192 3.59756 12.2472 3.55816 12.3085 3.53083C12.3699 3.50351 12.4361 3.48881 12.5032 3.48763C12.5703 3.48644 12.637 3.49879 12.6993 3.52394C12.7615 3.54909 12.8181 3.58652 12.8656 3.634C12.9131 3.68147 12.9505 3.73803 12.9756 3.80029C13.0008 3.86255 13.0131 3.92923 13.012 3.99637C13.0108 4.0635 12.9961 4.12971 12.9687 4.19105C12.9414 4.25238 12.902 4.30758 12.8529 4.35335L9.20623 8.00002L12.8529 11.6467C12.902 11.6925 12.9414 11.7477 12.9687 11.809C12.9961 11.8703 13.0108 11.9365 13.012 12.0037C13.0131 12.0708 13.0008 12.1375 12.9756 12.1998C12.9505 12.262 12.9131 12.3186 12.8656 12.366C12.8181 12.4135 12.7615 12.451 12.6993 12.4761C12.637 12.5012 12.5703 12.5136 12.5032 12.5124C12.4361 12.5112 12.3699 12.4965 12.3085 12.4692C12.2472 12.4419 12.192 12.4025 12.1462 12.3534L8.49956 8.70669L4.85289 12.3534C4.75811 12.4417 4.63275 12.4898 4.50321 12.4875C4.37368 12.4852 4.25009 12.4327 4.15848 12.3411C4.06687 12.2495 4.0144 12.1259 4.01211 11.9964C4.00982 11.8668 4.05791 11.7415 4.14623 11.6467L7.79289 8.00002L4.14623 4.35335C4.05259 4.2596 4 4.13252 4 4.00002C4 3.86752 4.05259 3.74044 4.14623 3.64669Z"
                      fill="#FC7044"
                    />
                  </svg>

                  <div className="text-sm flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mr-1"
                    >
                      <path
                        d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19ZM6 17H18L14.25 12L11.25 16L9 13L6 17Z"
                        fill="black"
                      />
                    </svg>
                    <div>
                      <p className=" truncate w-11/12">{file.name}</p>
                      <p className="text-slate-400">{file.size / 1024} Kb </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className={`px-4 py-3 text-sm w-full border border-blue-200 mt-2 drop-shadow-sm ${
                loading ? "bg-gray-700" : "bg-blue-500"
              } text-white rounded`}
            >
              Analyze
            </button>
          </div>
          {/* //output */}
          <div className="ml-10">
            <h1>Result</h1>
            <div
              className={`bg-slate-100 border border-slate-400 w-80 ${
                data?.data ? "h-fit" : "h-96"
              } rounded-lg`}
            >
              {data && (
                <img
                  className="h-full mx-auto border-2 rounded-lg border-blue-500"
                  src={`data:image/png;base64,${data}`}
                />
              )}
              {loading && <Loadinganimation />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
