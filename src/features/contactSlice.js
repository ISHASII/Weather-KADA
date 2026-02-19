import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  basicInformation: {
    fullName: "",
    email: "",
    number: "",
  },
  eventDetails: {
    eventName: "",
    eventType: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    venueType: "",
  },
  requirement: {
    priorityLevel: "",
    estimateParticipants: "",
    areaSize: "",
    specialRequest: "",
  },
  servicePackage: "",
}

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { section, field, value } = action.payload

      if (section === "servicePackage") {
        state.servicePackage = value
      } else {
        state[section][field] = value
      }
    },

    resetForm: () => initialState,
  },
})

export const { updateField, resetForm } = contactSlice.actions
export default contactSlice.reducer
