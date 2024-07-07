import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '@apps/constants/api'
import { UserState } from '../types'
import { AppDispatch } from '../../../store'
import { FAILED, LOADING, SUCCEEDED } from '../../constants/constants'
import { DefaultError } from '../../../types'
import { DefaultInitialState } from '../../../defaults'

const initialState: UserState = {
  ...DefaultInitialState,
  user: null,
}

export const fetchUser = createAsyncThunk<
  UserState,
  number,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    rejectValue: DefaultError
  }
>('user/fetchUser', async (userId: number, thunkAPI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const userSlice = createSlice<UserState, {}>({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = LOADING
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED
        state.user = action.payload.user
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = FAILED
        state.error = action.payload
      })
  },
})
