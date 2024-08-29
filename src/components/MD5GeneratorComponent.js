import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "bootstrap/dist/css/bootstrap.min.css";

const MD5Generator = () => {
  const [inputText, setInputText] = useState("");
  const [md5Hash, setMd5Hash] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const generateMD5Hash = () => {
    const hash = CryptoJS.MD5(inputText).toString();
    setMd5Hash(hash);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(md5Hash);
    alert("MD5 hash copied to clipboard!");
  };

  return (
    <div>
      <textarea
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text"
        className="form-control mb-3"
      />
      <button
        onClick={generateMD5Hash}
        className="btn btn-primary mb-3"
        disabled={!inputText}
      >
        Generate MD5
      </button>
      {md5Hash && (
        <div style={{ marginTop: "20px" }}>
          <h3>MD5 Hash Results:</h3>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Hash</th>
                <td style={{ wordBreak: "break-all" }}>{md5Hash}</td>
                <td>
                  <button
                    onClick={copyToClipboard}
                    className="btn btn-secondary"
                  >
                    Copy to Clipboard
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MD5Generator;
