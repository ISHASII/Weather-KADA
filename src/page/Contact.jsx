import { useState } from "react"
import "./contact.css"
import { updateField, resetForm } from "../features/contactSlice"
import { useDispatch, useSelector } from "react-redux"

function BookingPage() {
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.contact)
  const [showModal, setShowModal] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (section, field) => (e) => {
    dispatch(
      updateField({
        section,
        field,
        value: e.target.value,
      }),
    )

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  const handlePackageChange = (e) => {
    dispatch(
      updateField({
        section: "servicePackage",
        value: e.target.value,
      }),
    )
  }

  const validateForm = () => {
    const newErrors = {}

    // Basic Information
    if (!formData.basicInformation.fullName.trim()) {
      newErrors.fullName = "Full Name is required"
    }

    if (!formData.basicInformation.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.basicInformation.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.basicInformation.number.trim()) {
      newErrors.number = "WhatsApp number is required"
    }

    // Event Details
    if (!formData.eventDetails.eventName.trim()) {
      newErrors.eventName = "Event name is required"
    }

    if (!formData.eventDetails.eventType) {
      newErrors.eventType = "Select event type"
    }

    if (!formData.eventDetails.eventDate) {
      newErrors.eventDate = "Select event date"
    }

    if (!formData.eventDetails.startTime || !formData.eventDetails.endTime) {
      newErrors.time = "Start & End time required"
    }

    if (!formData.eventDetails.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.eventDetails.venueType) {
      newErrors.venueType = "Select venue type"
    }

    // Requirements
    if (!formData.requirement.priorityLevel) {
      newErrors.priorityLevel = "Select priority level"
    }

    if (!formData.requirement.estimateParticipants) {
      newErrors.estimateParticipants = "Enter participants"
    }

    // Package
    if (!formData.servicePackage) {
      newErrors.servicePackage = "Select a service package"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const cards = [
    {
      title: "Atmospheric Event Safeguarding",
      desc: "Professional Weather Protection for Your Events.",
      detail:
        "We provide dedicated weather safeguarding services to ensure your event runs smoothly without disruption from rain, including:",
      price: "💵 Rp1.500.000 – Rp2.000.000 / event",
      list: [
        "Outdoor concerts & festivals.",
        "Weddings & private events.",
        "Product launches.",
        "Government functions.",
        "Film & television productions.",
      ],
    },
    {
      title: "Strategic Weather Assessment",
      desc: "Weather Risk Analysis & Event Planning Consultation.",
      detail:
        "Make informed decisions with our strategic weather assessment services.",
      price: "💵 Rp2.500.000 – Rp3.000.000 / event",
      list: [
        "Comprehensive weather risk analysis based on your event location, season, and time frame.",
        "Optimal scheduling recommendations, helping you select the best date and time to minimize weather-related disruptions.",
        "Pre-event consultation sessions to support smarter planning, logistics alignment, and contingency preparation.",
        "Customized weather insights tailored to your event scale, audience size, and operational needs.",
        "Ideal for clients who prioritize precision, reliability, and proactive coordination to ensure a seamless event experience.",
      ],
    },
    {
      title: "Localized Atmospheric Intervention",
      desc: "Location-Based Weather Management.",
      detail:
        "We apply adaptive techniques tailored to each venue’s unique conditions, including:",
      price: "💵 Rp3.500.000 – Rp4.000.000 / event",
      list: [
        "Geographic condition assessment, evaluating terrain, elevation, and surrounding environments.",
        "Local wind pattern analysis to anticipate atmospheric movement affecting your event area.",
        "Regional weather history evaluation to identify recurring climate trends and risks.",
        "Site-specific intervention strategies, customized for each location to maximize effectiveness.",
        "A fully tailored operational approach, ensuring optimal results through precise, location-driven solutions.",
      ],
    },
    {
      title: "Premium Confidential Service",
      desc: "Exclusive & Discreet Event Handling.",
      detail: "Designed for high-profile or sensitive occasions:",
      price: "💵 Rp4.500.000 – Rp5.000.000 / event",
      list: [
        "Dedicated core team support.",
        "Strict client confidentiality.",
        "No public documentation.",
        "Limited coordination with authorized parties only.",
        "Perfect for VIP events requiring privacy and professionalism.",
      ],
    },
  ]

  const selectedCard = cards.find(
    (card) => card.title === formData.servicePackage,
  )

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
            {errors.fullName && (
              <small className="error-text">{errors.fullName}</small>
            )}
          </div>

          <div className="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              value={formData.basicInformation.email}
              onChange={handleChange("basicInformation", "email")}
            />
            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </div>

          <div className="form-group">
            <label for="phone">WhatsApp Number</label>
            <input
              type="text"
              value={formData.basicInformation.number}
              onChange={handleChange("basicInformation", "number")}
            />
            {errors.number && (
              <small className="error-text">{errors.number}</small>
            )}
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
            {errors.eventName && (
              <small className="error-text">{errors.eventName}</small>
            )}
          </div>

          <div className="form-group">
            <label for="eventType">Event Type</label>
            <select
              value={formData.eventDetails.eventType}
              onChange={handleChange("eventDetails", "eventType")}
            >
              <option value="">Select Event Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Concert">Concert</option>
              <option value="Festival">Festival</option>
              <option value="Corporate">Corporate Event</option>
              <option value="Other">Other</option>
            </select>
            {errors.eventType && (
              <small className="error-text">{errors.eventType}</small>
            )}
          </div>

          <div className="form-group">
            <label for="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              value={formData.eventDetails.eventDate}
              onChange={handleChange("eventDetails", "eventDate")}
            />
            {errors.eventDate && (
              <small className="error-text">{errors.eventDate}</small>
            )}
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
            {errors.time && <small className="error-text">{errors.time}</small>}
          </div>

          <div className="form-group">
            <label for="location">Location (City + Full Address)</label>
            <input
              type="text"
              value={formData.eventDetails.location}
              onChange={handleChange("eventDetails", "location")}
            />
            {errors.location && (
              <small className="error-text">{errors.location}</small>
            )}
          </div>

          <div className="form-group">
            <label for="venueType">Venue Type</label>
            <select
              id="venueType"
              value={formData.eventDetails.venueType}
              onChange={handleChange("eventDetails", "venueType")}
            >
              <option value="">Select Venue Type</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
            {errors.venueType && (
              <small className="error-text">{errors.venueType}</small>
            )}
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
              <option value="Standard">Standard</option>
              <option value="High">High</option>
              <option value="Critical">Critical (VIP / Large Scale)</option>
            </select>
            {errors.priorityLevel && (
              <small className="error-text">{errors.priorityLevel}</small>
            )}
          </div>

          <div className="form-group">
            <label for="participants">Estimated Number of Participants</label>
            <input
              type="number"
              value={formData.requirement.estimateParticipants}
              onChange={handleChange("requirement", "estimateParticipants")}
            />
            {errors.estimateParticipants && (
              <small className="error-text">
                {errors.estimateParticipants}
              </small>
            )}
          </div>

          <div className="form-group">
            <label for="area">
              Area Size in m<sup>2</sup> (Optional)
            </label>
            <input
              type="text"
              value={formData.requirement.areaSize}
              onChange={handleChange("requirement", "areaSize")}
            />
            {errors.areaSize && (
              <small className="error-text">{errors.areaSize}</small>
            )}
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

          {errors.servicePackage && (
            <small className="error-text">{errors.servicePackage}</small>
          )}
          <div className="package-group">
            {[
              "Premium Confidential Service",
              "Localized Atmospheric Intervention",
              "Strategic Weather Assessment",
              "Atmospheric Event Safeguarding",
            ].map((pkg) => (
              <label
                key={pkg}
                className={`package-card ${
                  formData.servicePackage === pkg ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  value={pkg}
                  checked={formData.servicePackage === pkg}
                  onChange={handlePackageChange}
                />
                <div className="card-indicator"></div>

                <div className="card-content">
                  <h4>{pkg}</h4>
                  <p>Professional weather management solution</p>
                </div>
              </label>
            ))}
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

            const isValid = validateForm()

            if (!isValid) return

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

              {selectedCard && (
                <div className="selected-package-card">
                  <h4>{selectedCard.title}</h4>
                  <p className="package-desc">{selectedCard.desc}</p>
                  <p className="package-detail">{selectedCard.detail}</p>

                  <ul>
                    {selectedCard.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <div className="package-price">{selectedCard.price}</div>
                </div>
              )}
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
