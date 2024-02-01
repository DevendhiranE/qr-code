import { useState } from "react";
import "./App.css";

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://www.ddutips.com/");
  const [size, setSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error while QR Code Generating ", error);
    } finally {
      setLoading(false);
    }
  }

  const downloadQR = () => {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <>
      <div className="bg-[#2c2c54]  max-w-lg mx-auto my-10 flex flex-col justify-center items-center rounded">
        <h2 className="text-xl font-semibold p-2 text-white mt-2">
          QR Code Generator
        </h2>
        {loading && <p className="text-white">Please wait...</p>}
        {img && (
          <img
            src={img}
            alt="QR-Code"
            className=" p-2 border-2 border-[#aaa69d] m-2 shadow-lg rounded"
          />
        )}
        <div className="my-2 p-5 ">
          <label
            htmlFor="data"
            className="my-1 font-semibold text-sm text-white"
          >
            Data For QR Code
          </label>
          <input
            type="text"
            id="data"
            value={qrData}
            placeholder="Enter Your Text / URL"
            className="w-full outline-none py-2 px-3 rounded mb-2 text-sm"
            required
            onChange={(e) => setQrData(e.target.value)}
            autoFocus
          />

          <label
            htmlFor="size"
            className="my-1 font-semibold text-sm text-white"
          >
            Image Size (eg.150)
          </label>
          <input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Enter image size"
            className="w-full outline-none py-2 px-3 rounded mt-1 text-sm"
          />

          <div className="flex justify-between items-center">
            <button
              className="generateBtn bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white font-semibold rounded my-3 mr-5 "
              disabled={loading}
              onClick={generateQR}
            >
              Generate QR Code
            </button>
            <button
              className="downloadBtn bg-green-700 hover:bg-green-800 px-3 py-2 text-white font-semibold rounded"
              onClick={downloadQR}
            >
              Download QR Code
            </button>
          </div>
          <p className="my-3 font-semibold text-white text-center">
            Designed By <a href="#">Deva</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
