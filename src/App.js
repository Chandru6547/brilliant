import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "KNRR",
    year: 4,
    batch: "CSE-A",
    regNo: "",
    phNo: "",
  });

  const colleges = ["KNRR", "BRIL", "BRIG"];

  const batches = [
    "CSE-A",
    "CSE-B",
    "CSM",
    "CSC",
    "CSD",
    "AI&DS",
    "CSW",
    "ECE",
    "EEE",
    "CIVIL",
    "MECH",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://tssplatform.onrender.com/recreateStudentWithMail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            college: formData.college,
            year: Number(formData.year),
            batch: formData.batch,
            regNo: formData.regNo,
            phNo: formData.phNo,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Student registered successfully!");

        setFormData({
          name: "",
          email: "",
          college: "KNRR",
          year: 4,
          batch: "CSE-A",
          regNo: "",
          phNo: "",
        });
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 650px;
          background: #fff;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }

        .title {
          text-align: center;
          margin-bottom: 30px;
        }

        .title h1 {
          color: #1e293b;
          font-size: 32px;
          margin-bottom: 8px;
        }

        .title p {
          color: #64748b;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
        }

        .field label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #334155;
        }

        .field input,
        .field select {
          padding: 14px;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          outline: none;
          font-size: 15px;
          transition: 0.3s;
          background: #f8fafc;
        }

        .field input:focus,
        .field select:focus {
          border-color: #2563eb;
          background: white;
        }

        .full-width {
          grid-column: span 2;
        }

        .submit-btn {
          width: 100%;
          border: none;
          padding: 16px;
          background: #2563eb;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: #1d4ed8;
        }

        @media (max-width: 768px) {
          .row {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: span 1;
          }

          .card {
            padding: 25px;
          }
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="title">
            <h1>Student Registration</h1>
            <p>Add student details to the platform</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>College</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                >
                  {colleges.map((college) => (
                    <option key={college}>{college}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Year</label>
                <input type="text" value="4" disabled />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Batch</label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                >
                  {batches.map((batch) => (
                    <option key={batch}>{batch}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Register Number</label>
                <input
                  type="text"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  placeholder="Enter register number"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="field full-width">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phNo"
                  value={formData.phNo}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <button className="submit-btn" type="submit">
              Register Student
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;