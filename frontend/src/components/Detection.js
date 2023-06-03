import React, { useState } from "react";
import axios from "axios";
import "./Detection.css";

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [resultImage, setResultImage] = useState();
  const [result, setResult] = useState([]);

  const onSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("http://localhost:8000/object-to-img", formData)
        .then((response) => {
          const result = response.data.result;
          setResult(result);
          const imageBody = JSON.parse(response.data.img.body);
          const imageBase64 = imageBody.image;
          const boundingBoxes = result.map((label) => ({
            x: label.x,
            y: label.y,
            width: label.width,
            height: label.height,
          }));

          setResultImage({ base64: imageBase64, boundingBoxes: boundingBoxes });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderBoundingBoxes = () => {
    if (!resultImage || !resultImage.boundingBoxes) {
      return null;
    }

    return resultImage.boundingBoxes.map((box, index) => (
      <div
        key={index}
        className="bounding-box"
        style={{
          left: box.x,
          top: box.y,
          width: box.width,
          height: box.height,
        }}
      ></div>
    ));
  };

  return (
    <div className="container">
      <div className="upload-area">
        <input type="file" id="file" className="input-file" onChange={onSelectFile} />
        <label htmlFor="file" className="file-label">
          Choose Image
        </label>
        <button className="upload-button" onClick={handleUpload}>
          Detect
        </button>
      </div>
      {resultImage && (
        <div className="result-area">
          <div className="image-container">
            <img
              src={`data:image/jpeg;base64,${resultImage.base64}`}
              alt="Result Image"
              className="result-image"
            />
            <div className="bounding-boxes">{renderBoundingBoxes()}</div>
          </div>
          <div className="damage-info">
            <h3>Damage Information</h3>
            <ul className="damage-list">
              {resultImage.boundingBoxes.map((box, index) => (
                <li key={index}>
                  <span className="damage-class">{result}</span>
                  
                </li>
              ))}
            </ul>
            <p>Total damages detected: {resultImage.boundingBoxes.length}</p>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Detection;
