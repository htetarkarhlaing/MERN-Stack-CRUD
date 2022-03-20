import React, { useEffect } from "react";

const CloudinaryUploadWidget = ({ urlDetector }) => {
  useEffect(() => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dev-arkar",
        uploadPreset: "unsigned",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          urlDetector(result.info.url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <button
      id="upload_widget"
      className="block outline-none border border-gray-400 bg-white rounded-md w-64 h-10 px-2 py-1 mb-2"
    >
      Upload Image
    </button>
  );
};

export default CloudinaryUploadWidget;
