import { createSlice } from "@reduxjs/toolkit";
import { COLLAPSABLE_CARDS_POSITIONS } from "src/components/modals/ExploreModals/SearchModal/SearchModal.utils";

const initialState = { isCollapsed: COLLAPSABLE_CARDS_POSITIONS.allClosed };

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    toggleLocationCollapse: (state) => {
      state.isCollapsed = state.isCollapsed.location ? 
      COLLAPSABLE_CARDS_POSITIONS.locationPressed :
        COLLAPSABLE_CARDS_POSITIONS.allClosed
    },
    toggleCheckinCollapse: (state) => {
      state.isCollapsed = state.isCollapsed.checkin ? 
      COLLAPSABLE_CARDS_POSITIONS.checkInPressed :
        COLLAPSABLE_CARDS_POSITIONS.allClosed
    },
    toggleCheckoutCollapse: (state) => {
      state.isCollapsed = state.isCollapsed.checkout ? 
      COLLAPSABLE_CARDS_POSITIONS.checkOutPressed :
        COLLAPSABLE_CARDS_POSITIONS.allClosed
    },
  }
})