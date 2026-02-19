import { useState } from "react"
import "./contact.css"
import { updateField, resetForm } from "../features/contactSlice"
import { useDispatch, useSelector } from "react-redux"

function BookingPage() {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.contact)
  const [showModal, setShowModal] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)

  const handleChange = (section, field) => (e) => {
    dispatch(
      updateField({
        section,
        field,
        value: e.target.value,
      }),
    )
  }

  const handlePackageChange = (e) => {
    dispatch(
      updateField({
        section: "servicePackage",
        value: e.target.value,
      }),
    )
  }

  return (
    <div className="booking-page">
      <div className="card-wrapper">
        <h1>Booking Now!</h1>
        <p className="tagline">Weather is not predicted. It is negotiated.</p>
        <div className="form-container">
          {/* <!-- A. Basic Information --> */}
          <div className="form-header">Basic Information</div>

          <div className="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              value={formData.basicInformation.fullName}
              onChange={handleChange("basicInformation", "fullName")}
            />
          </div>

          <div className="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              value={formData.basicInformation.email}
              onChange={handleChange("basicInformation", "email")}
            />
          </div>

          <div className="form-group">
            <label for="phone">WhatsApp Number</label>
            <input
              type="text"
              value={formData.basicInformation.number}
              onChange={handleChange("basicInformation", "number")}
            />
          </div>

          {/* <!-- B. Event Details --> */}
          <div className="form-header">Event Details</div>

          <div className="form-group">
            <label for="eventName">Event Name</label>
            <input
              type="text"
              value={formData.eventDetails.eventName}
              onChange={handleChange("eventDetails", "eventName")}
            />
          </div>

          <div className="form-group">
            <label for="eventType">Event Type</label>
            <select
              value={formData.eventDetails.eventType}
              onChange={handleChange("eventDetails", "eventType")}
            >
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="concert">Concert</option>
              <option value="festival">Festival</option>
              <option value="corporate">Corporate Event</option>
              <option value="film">Film Production</option>
            </select>
          </div>

          <div className="form-group">
            <label for="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              value={formData.eventDetails.eventDate}
              onChange={handleChange("eventDetails", "eventDate")}
            />
          </div>

          <div className="form-group">
            <label>Start Time – End Time</label>
            <div className="time-group">
              <input
                type="time"
                value={formData.eventDetails.startTime}
                onChange={handleChange("eventDetails", "startTime")}
              />
              <span>–</span>
              <input
                type="time"
                value={formData.eventDetails.endTime}
                onChange={handleChange("eventDetails", "endTime")}
              />
            </div>
          </div>

          <div className="form-group">
            <label for="location">Location (City + Full Address)</label>
            <input
              type="text"
              value={formData.eventDetails.location}
              onChange={handleChange("eventDetails", "location")}
            />
          </div>

          <div className="form-group">
            <label for="venueType">Venue Type</label>
            <select
              id="venueType"
              value={formData.eventDetails.venueType}
              onChange={handleChange("eventDetails", "venueType")}
            >
              <option value="">Select Venue Type</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>

          {/* <!-- C. Weather Protection Requirements --> */}
          <div className="form-header">Weather Protection Requirements</div>

          <div className="form-group">
            <label for="priority">Priority Level</label>
            <select
              id="priority"
              name="priority"
              value={formData.requirement.priorityLevel}
              onChange={handleChange("requirement", "priorityLevel")}
            >
              <option value="">Select Priority Level</option>
              <option value="standard">Standard</option>
              <option value="high">High</option>
              <option value="critical">Critical (VIP / Large Scale)</option>
            </select>
          </div>

          <div className="form-group">
            <label for="participants">Estimated Number of Participants</label>
            <input
              type="number"
              value={formData.requirement.estimateParticipants}
              onChange={handleChange("requirement", "estimateParticipants")}
            />
          </div>

          <div className="form-group">
            <label for="area">Area Size (Optional)</label>
            <input
              type="text"
              value={formData.requirement.areaSize}
              onChange={handleChange("requirement", "areaSize")}
            />
          </div>

          <div className="form-group">
            <label for="specialRequest">Special Requests</label>
            <textarea
              id="specialRequest"
              name="specialRequest"
              rows="4"
              value={formData.requirement.specialRequest}
              onChange={handleChange("requirement", "specialRequest")}
            ></textarea>
          </div>

          {/* <!-- D. Service Package --> */}
          <div className="form-header">Service Package</div>

          <div className="form-group">
            <label>
              <input
                type="radio"
                value="Basic Atmospheric Safeguard"
                checked={
                  formData.servicePackage === "Basic Atmospheric Safeguard"
                }
                onChange={handlePackageChange}
              />
              Basic Atmospheric Safeguard
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="radio"
                value="Strategic Climate Protection"
                checked={
                  formData.servicePackage === "Strategic Climate Protection"
                }
                onChange={handlePackageChange}
              />
              Strategic Climate Protection
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="radio"
                value="Premium Full-Day Sky Control"
                checked={
                  formData.servicePackage === "Premium Full-Day Sky Control"
                }
                onChange={handlePackageChange}
              />
              Premium Full-Day Sky Control
            </label>
          </div>
        </div>
        <div className="form-group agreement">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            I agree to the Terms & Conditions and Privacy Policy
          </label>
        </div>
        <button
          className="btn-konfirmasi"
          disabled={!isAgreed}
          onClick={() => {
            if (!isAgreed) {
              alert("You must agree to the policy first.")
              return
            }

            console.log("Data Form:", formData)
            setShowModal(true)
          }}
        >
          Submit
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <h2>Confirm Your Booking</h2>

            <div className="summary-section">
              <h3>Basic Information</h3>
              <p>
                <strong>Name:</strong> {formData.basicInformation.fullName}
              </p>
              <p>
                <strong>Email:</strong> {formData.basicInformation.email}
              </p>
              <p>
                <strong>WhatsApp:</strong> {formData.basicInformation.number}
              </p>
            </div>

            <div className="summary-section">
              <h3>Event Details</h3>
              <p>
                <strong>Event:</strong> {formData.eventDetails.eventName}
              </p>
              <p>
                <strong>Type:</strong> {formData.eventDetails.eventType}
              </p>
              <p>
                <strong>Date:</strong> {formData.eventDetails.eventDate}
              </p>
              <p>
                <strong>Time:</strong> {formData.eventDetails.startTime} -{" "}
                {formData.eventDetails.endTime}
              </p>
              <p>
                <strong>Location:</strong> {formData.eventDetails.location}
              </p>
              <p>
                <strong>Venue:</strong> {formData.eventDetails.venueType}
              </p>
            </div>

            <div className="summary-section">
              <h3>Requirements</h3>
              <p>
                <strong>Priority:</strong> {formData.requirement.priorityLevel}
              </p>
              <p>
                <strong>Participants:</strong>{" "}
                {formData.requirement.estimateParticipants}
              </p>
              <p>
                <strong>Area:</strong> {formData.requirement.areaSize}
              </p>
              <p>
                <strong>Special Request:</strong>{" "}
                {formData.requirement.specialRequest}
              </p>
            </div>

            <div className="summary-section">
              <h3>Selected Package</h3>
              <p>{formData.servicePackage}</p>
            </div>

            <div className="modal-buttons">
              <button
                className="confirm-btn"
                onClick={() => {
                  dispatch(resetForm())
                  setIsAgreed(false)
                  setShowModal(false)
                }}
              >
                Confirm Booking
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Animasi Hujan */}
      <div className="rain">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="drop"
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 1 + Math.random() * 1.5 + "s",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default BookingPage
