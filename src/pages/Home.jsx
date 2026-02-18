import { useState } from "react"
import "./BookingPage.css"

function BookingPage() {
  return (
    <div className="booking-page">
      <div className="card-wrapper">
        <h1>Booking Now!</h1>
        <p className="tagline">Weather is not predicted. It is negotiated.</p>
        <div class="form-container">
          {/* <!-- A. Basic Information --> */}
          <div class="form-header">Basic Information</div>

          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" />
          </div>

          <div class="form-group">
            <label for="phone">WhatsApp Number</label>
            <input type="text" id="phone" name="phone" />
          </div>

          {/* <!-- B. Event Details --> */}
          <div class="form-header">Event Details</div>

          <div class="form-group">
            <label for="eventName">Event Name</label>
            <input type="text" id="eventName" name="eventName" />
          </div>

          <div class="form-group">
            <label for="eventType">Event Type</label>
            <select id="eventType" name="eventType">
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="concert">Concert</option>
              <option value="festival">Festival</option>
              <option value="corporate">Corporate Event</option>
              <option value="film">Film Production</option>
            </select>
          </div>

          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input type="date" id="eventDate" name="eventDate" />
          </div>

          <div class="form-group">
            <label>Start Time – End Time</label>
            <div class="time-group">
              <input type="time" name="startTime" />
              <span>–</span>
              <input type="time" name="endTime" />
            </div>
          </div>

          <div class="form-group">
            <label for="location">Location (City + Full Address)</label>
            <input type="text" id="location" name="location" />
          </div>

          <div class="form-group">
            <label for="venueType">Venue Type</label>
            <select id="venueType" name="venueType">
              <option value="">Select Venue Type</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>

          {/* <!-- C. Weather Protection Requirements --> */}
          <div class="form-header">Weather Protection Requirements</div>

          <div class="form-group">
            <label for="priority">Priority Level</label>
            <select id="priority" name="priority">
              <option value="">Select Priority Level</option>
              <option value="standard">Standard</option>
              <option value="high">High</option>
              <option value="critical">Critical (VIP / Large Scale)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="participants">Estimated Number of Participants</label>
            <input type="number" id="participants" name="participants" />
          </div>

          <div class="form-group">
            <label for="area">Area Size (Optional)</label>
            <input
              type="text"
              id="area"
              name="area"
              placeholder="Example: 2000 m²"
            />
          </div>

          <div class="form-group">
            <label for="specialRequest">Special Requests</label>
            <textarea
              id="specialRequest"
              name="specialRequest"
              rows="4"
              placeholder="Describe any special requirements..."
            ></textarea>
          </div>

          {/* <!-- D. Service Package --> */}
          <div class="form-header">Service Package</div>

          <div class="form-group">
            <label>
              <input type="radio" name="package" value="basic" />
              Basic Atmospheric Safeguard
            </label>
          </div>

          <div class="form-group">
            <label>
              <input type="radio" name="package" value="strategic" />
              Strategic Climate Protection
            </label>
          </div>

          <div class="form-group">
            <label>
              <input type="radio" name="package" value="premium" />
              Premium Full-Day Sky Control
            </label>
          </div>
        </div>
        <button className="btn-konfirmasi">Submit</button>
      </div>
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
