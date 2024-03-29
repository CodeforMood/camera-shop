import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogFilterInitialState } from '../../components/catalog-filter/catalog-filter';
import { SlicesNames, SortOrders, SortTypes } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { ReviewData } from '../../types/review-data';
import { CamerasDataState } from '../../types/state';
import { filterByIsPhotocamera, filterByIsVideocamera, filterByСameraIsCollection, filterByСameraIsDigital, filterByСameraIsFilm, filterByСameraIsNonProfessional, filterByСameraIsProfessional, filterByСameraIsSnapshot, filterByСameraIsZeroLevel, filterCameraByMaxPrice, filterCameraByMinPrice, getInitalMaxPrice, getInitalMinPrice, sortCamerasDataByPopularDown, sortCamerasDataByPopularUp, sortCamerasDataByPriceDown, sortCamerasDataByPriceUp, sortReviewsDateDown } from '../../utils';
import { fetchCamerasDataAction, fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';

export const initialCamerasDataState: CamerasDataState = {
  isCamerasDataLoading: false,
  camerasData: [],
  selectedCameraData: {} as CamerasData,
  filteredCamerasData: [],
  filteredByPriceCamerasData: [],
  currentSortType: '',
  currentSortOrder: '',
  isReviewsDataLoading: false,
  productReviewsData: [] as ReviewData[],
  isSuccessReviewSending: false,
  maxPrice: 0,
  minPrice: 0,
  filters: {
    photocamera: false,
    videocamera: false,
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
    zero: false,
    nonProfessional: false,
    professional: false,
  },
};

export const camerasData = createSlice({
  name: SlicesNames.CamerasData,
  initialState: initialCamerasDataState,
  reducers: {
    changeSuccessSendingReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.isSuccessReviewSending = action.payload;
    },
    selectCameraData: (state, action: PayloadAction<CamerasData>) => {
      state.selectedCameraData = action.payload;
    },
    sortCamerasData: (state) => {
      if ((state.currentSortType === SortTypes.SortByPrice) && (state.currentSortOrder === SortOrders.Up)) {
        state.filteredByPriceCamerasData.sort(sortCamerasDataByPriceUp);
      } else if ((state.currentSortType === SortTypes.SortByPrice) && (state.currentSortOrder === SortOrders.Down)) {
        state.filteredByPriceCamerasData.sort(sortCamerasDataByPriceDown);
      } else if ((state.currentSortType === SortTypes.SortByPopular) && (state.currentSortOrder === SortOrders.Up)) {
        state.filteredByPriceCamerasData.sort(sortCamerasDataByPopularUp);
      } else if ((state.currentSortType === SortTypes.SortByPopular) && (state.currentSortOrder === SortOrders.Down)) {
        state.filteredByPriceCamerasData.sort(sortCamerasDataByPopularDown);
      }
    },
    setCurrentSortType: (state, action: PayloadAction<string>) => {
      state.currentSortType = action.payload;
    },
    setCurrentSortOrder: (state, action: PayloadAction<string>) => {
      state.currentSortOrder = action.payload;
    },
    filterCamerasData: (state, action: PayloadAction<CatalogFilterInitialState>) => {
      const filteredCamerasData = [];
      for(const cameraData of state.camerasData) {
        if(filterByIsPhotocamera(action.payload.photocamera, cameraData) &&
        filterByIsVideocamera(action.payload.videocamera, cameraData) &&
        ((!action.payload.digital && !action.payload.film && !action.payload.snapshot && !action.payload.collection) ||
        (filterByСameraIsCollection(action.payload.collection, cameraData) ||
        filterByСameraIsDigital(action.payload.digital, cameraData) ||
        filterByСameraIsFilm(action.payload.film, cameraData) ||
        filterByСameraIsSnapshot(action.payload.snapshot, cameraData))) &&
        ((!action.payload.zero && !action.payload.nonProfessional && !action.payload.professional) ||
        (filterByСameraIsZeroLevel(action.payload.zero, cameraData) ||
        filterByСameraIsNonProfessional(action.payload.nonProfessional, cameraData) ||
        filterByСameraIsProfessional(action.payload.professional, cameraData)))
        ) {
          filteredCamerasData.push(cameraData);
        }
      }
      state.filteredCamerasData = filteredCamerasData;

      if(state.filteredCamerasData.length) {
        state.minPrice = getInitalMinPrice(state.filteredCamerasData);
        state.maxPrice = getInitalMaxPrice(state.filteredCamerasData);
      }
    },
    filterByPriceCamerasData: (state) => {
      state.filteredByPriceCamerasData = state.filteredCamerasData.filter((cameraData) => filterCameraByMinPrice(state.minPrice, cameraData) && filterCameraByMaxPrice(state.maxPrice, cameraData));
    },
    setProductMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setProductMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setFiltersData: (state, action: PayloadAction<CatalogFilterInitialState>) => {
      state.filters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasDataAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasDataAction.fulfilled, (state, action) => {
        state.minPrice = getInitalMinPrice(action.payload);
        state.maxPrice = getInitalMaxPrice(action.payload);
        state.camerasData = action.payload;
        state.filteredCamerasData = action.payload;
        state.filteredByPriceCamerasData = action.payload;
        state.isCamerasDataLoading = false;
      })
      .addCase(fetchReviewsDataAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsDataAction.fulfilled, (state, action) => {
        state.productReviewsData = action.payload.sort(sortReviewsDateDown);
        state.isReviewsDataLoading = false;
      })
      .addCase(sendUserReviewAction.fulfilled, (state, action) => {
        state.productReviewsData.unshift(action.payload);
        state.isSuccessReviewSending = true;
      });
  }
});

export const { selectCameraData, changeSuccessSendingReviewStatus, setCurrentSortOrder,
  setCurrentSortType, sortCamerasData, filterCamerasData, setProductMaxPrice,
  setProductMinPrice, setFiltersData, filterByPriceCamerasData } = camerasData.actions;
