import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge
} from "mdb-react-ui-kit";


export default function AdminDashBoard() {
  const [complaints, setComplaints] = useState([]);
  const [modal, setModal] = useState(false);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/complaint/Getcomplaints"
      );
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const generateChartData = () => {
    const cityData = {};

    complaints.forEach((complaint) => {
      const city = complaint.location;

      if (!cityData[city]) {
        cityData[city] = 1;
      } else {
        cityData[city] += 1;
      }
    });

    const labels = Object.keys(cityData);
    const values = Object.values(cityData);

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#33FF7E",
            "#8C33FF",
            "#FF3333",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#33FF7E",
            "#8C33FF",
            "#FF3333",
          ],
        },
      ],
    });
  };

  return (
    <div className="admin-dashboard-container">
      <MDBNavbar color="indigo" dark>
        <MDBNavbarBrand>GHMC Admin Dashboard</MDBNavbarBrand>
        <MDBBtn color="primary" onClick={toggleModal}>
          Get Complaints
        </MDBBtn>
      </MDBNavbar>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
           
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Modal for displaying complaints */}
      <MDBModal isOpen={modal} toggle={toggleModal} size="lg">
        <MDBModalHeader toggle={toggleModal}>User Complaints</MDBModalHeader>
        <MDBModalBody>
          <MDBListGroup>
            {complaints.map((complaint) => (
              <MDBListGroupItem key={complaint._id}>
                <div>
                  <strong>Location:</strong> {complaint.location}
                </div>
                <div>
                  <strong>Pin Code:</strong> {complaint.pinCode}
                </div>
                <div>
                  <strong>GHMC:</strong> {complaint.ghmc}
                </div>
                <div>
                  <strong>Complaint:</strong> {complaint.complaint}
                </div>
                <div>
                  <strong>Damages:</strong>{" "}
                  {complaint.damages.map((damage, index) => (
                    <MDBBadge key={index} color="danger" className="mr-1">
                      {damage}
                    </MDBBadge>
                  ))}
                </div>
                <div>
                  <strong>Status:</strong> {complaint.status}
                </div>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleModal}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
  );
}
