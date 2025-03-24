import { createSlice } from "@reduxjs/toolkit";

const totalSteps = 8;

const savedStep = parseInt(localStorage.getItem("currentStep")) || 1;
const savedProgress = parseFloat(localStorage.getItem("progress")) || 0;

const initialState = {
  currentStep: savedStep,
  progress: savedProgress,
};

const stepperSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < totalSteps) {
        state.currentStep += 1;
        state.progress = ((state.currentStep - 1) / (totalSteps - 1)) * 100;

        // Save step and progress to localStorage
        localStorage.setItem("currentStep", state.currentStep);
        localStorage.setItem("progress", state.progress);
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        state.progress = ((state.currentStep - 1) / (totalSteps - 1)) * 100;

        // Save step and progress to localStorage
        localStorage.setItem("currentStep", state.currentStep);
        localStorage.setItem("progress", state.progress);
      }
    },
    resetStep: (state) => {
      state.currentStep = 1;
      state.progress = 0;

      // Reset localStorage
      localStorage.setItem("currentStep", 1);
      localStorage.setItem("progress", 0);
    },
    triggerStep: (state, action) => {
      const step = action.payload; // Step passed during dispatch
      if (step >= 1 && step <= totalSteps) {
        state.currentStep = step; // Set currentStep to the dispatched value
        state.progress = ((step - 1) / (totalSteps - 1)) * 100; // Update progress based on the step
    
        // Sync with localStorage
        localStorage.setItem("currentStep", state.currentStep);
        localStorage.setItem("progress", state.progress);
      }
    },
    
  },
});

export const { nextStep, prevStep, resetStep, triggerStep } = stepperSlice.actions;
export default stepperSlice.reducer;
