/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import axios from "axios";
import { MDBNavbar, MDBNavbarBrand, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import "./Detection.css";

export default function Detection() {
  const [selectedFile, setSelectedFile] = useState();
  const [resultImage, setResultImage] = useState();
  const [result, setResult] = useState([]);
  const [location, setLocation] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [ghmc, setGHMC] = useState("");
  const [complaint, setComplaint] = useState("");

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

  const handleSubmitComplaint = () => {
    // Send the complaint to the MongoDB database
    const complaintData = {
      image: resultImage.base64,
      location,
      pinCode,
      ghmc,
      complaint,
    };

    axios
      .post("http://localhost:3001/complaints", complaintData)
      .then((response) => {
        console.log("Complaint submitted successfully");
        // Reset the form
        setSelectedFile(null);
        setResultImage(null);
        setResult([]);
        setLocation("");
        setPinCode("");
        setGHMC("");
        setComplaint("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="box">
      <MDBNavbar color="indigo" dark>
        <MDBNavbarBrand>Dashboard</MDBNavbarBrand>
      </MDBNavbar>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <div className="upload-area">
              <input type="file" id="file" className="input-file" onChange={onSelectFile} />
              <label htmlFor="file" className="file-label">
                Choose Image
              </label>
              <button className="upload-button" onClick={handleUpload}>
                Detect
              </button>
            </div>
          </MDBCol>
          <MDBCol md="6">
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
                    {result
                      .filter((item, index) => result.indexOf(item) === index) // filter out duplicate classes
                      .map((item, index) => (
                        <li key={index}>
                          <span className="damage-class">{item + " "}</span>
                        </li>
                      ))}
                  </ul>
                  <p>Total damages detected: {resultImage.boundingBoxes.length}</p>
                </div>
              </div>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            <MDBInput
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            <MDBInput
              label="Local GHMC"
              value={ghmc}
              onChange={(e) => setGHMC(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              type="textarea"
              label="Complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBBtn color="primary" onClick={handleSubmitComplaint}>
              Submit Complaint
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};


