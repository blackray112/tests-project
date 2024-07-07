import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '@apps/constants/api'
import { FAILED, LOADING, SUCCEEDED } from '../../constants/constants'
import { DefaultError } from '../../../types'
import { LoginState, LoginUser } from '../types'
import { AppDispatch } from '../../../store'

const initialState: LoginState = {
  status: 'idle',
  error: undefined,
}

export const loginUser = createAsyncThunk<
  LoginState,
  LoginUser,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    rejectValue: DefaultError
  }
>('user/signup', async (user: LoginUser, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, user)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const loginSlice = createSlice<LoginState, {}>({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = LOADING
      })
      .addCase(loginUser.fulfilled, state => {
        state.status = SUCCEEDED
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = FAILED
        state.error = action.payload
      })
  },
})
