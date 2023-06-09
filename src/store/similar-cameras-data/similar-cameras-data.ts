import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { SimilarCamerasDataState } from '../../types/state';
import { fetchSimilarCamerasDataAction } from '../api-actions';

export const initialSimilarCamerasDataState: SimilarCamerasDataState = {
  isSimilarCamerasDataLoading: false,
  similarCamerasData: [],
};

export const similarCamerasData = createSlice({
  name: SlicesNames.SimilarCamerasData,
  initialState: initialSimilarCamerasDataState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarCamerasDataAction.pending, (state) => {
        state.isSimilarCamerasDataLoading = true;
      })
      .addCase(fetchSimilarCamerasDataAction.fulfilled, (state, action) => {
        state.similarCamerasData = action.payload;
        state.isSimilarCamerasDataLoading = false;
      });
  }
});
