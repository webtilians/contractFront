import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: null,
    isLoggedIn: !!localStorage.getItem('token'), // Comprobación inicial del token
    votingContracts: [], // Almacena las direcciones de los contratos de votación creados
    tokenContracts: [], // Almacena las direcciones de los tokens creados
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.address = null;
      state.isLoggedIn = false;
      state.votingContracts = [];
      state.tokenContracts = [];
      localStorage.removeItem('token');
    },
    addVotingContract: (state, action) => {
      state.votingContracts.push(action.payload);
    },
    addTokenContract: (state, action) => {
      state.tokenContracts.push(action.payload);
    },
  },
});

export const {
  setUserAddress,
  setIsLoggedIn,
  logout,
  addVotingContract,
  addTokenContract,
} = userSlice.actions;

export default userSlice.reducer;
