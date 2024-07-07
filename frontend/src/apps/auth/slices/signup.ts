import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '@apps/constants/api'
import { FAILED, LOADING, SUCCEEDED } from '../../constants/constants'
import { DefaultError } from '../../../types'
import { SignupState, SignupUser } from '../types'
import { AppDispatch } from '../../../store'

const initialState: SignupState = {
  status: 'idle',
  error: undefined,
}

export const signupUser = createAsyncThunk<
  SignupState,
  SignupUser,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    rejectValue: DefaultError
  }
>('user/signup', async (user: SignupUser, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, user)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const signupSlice = createSlice<SignupState, {}>({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.status = LOADING
      })
      .addCase(signupUser.fulfilled, state => {
        state.status = SUCCEEDED
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = FAILED
        state.error = action.payload
      })
  },
})
