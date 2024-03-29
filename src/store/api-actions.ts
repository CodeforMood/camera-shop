import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { CamerasData } from '../types/cameras-data';
import { CouponData } from '../types/coupon-data';
import { OrderData } from '../types/order-data';
import { PromoData } from '../types/promo-data';
import { ReviewData } from '../types/review-data';
import { UserReviewData } from '../types/user-review-data';

export const fetchCamerasDataAction = createAsyncThunk<CamerasData[], undefined, {
    extra: AxiosInstance;
  }>(
    'fetchCamerasData',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<CamerasData[]>(APIRoute.Cameras);

      return data;
    },
  );

export const fetchPromoDataAction = createAsyncThunk<PromoData [], undefined, {
    extra: AxiosInstance;
  }>(
    'fetchPromoData',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<PromoData []>(APIRoute.Promo);

      return data;
    },
  );

export const fetchProductDataAction = createAsyncThunk<CamerasData, string, {
    extra: AxiosInstance;
  }>(
    'fetchProductData',
    async (id, {extra: api}) => {
      const {data} = await api.get<CamerasData>(APIRoute.Cameras + id);

      return data;
    },
  );

export const fetchSimilarCamerasDataAction = createAsyncThunk<CamerasData[], string, {
    extra: AxiosInstance;
  }>(
    'fetchSimilarCamerasData',
    async (id, {extra: api}) => {
      const {data} = await api.get<CamerasData[]>(APIRoute.Cameras + id + APIRoute.SimilarCameras);

      return data;
    },
  );

export const fetchReviewsDataAction = createAsyncThunk<ReviewData[], string, {
    extra: AxiosInstance;
  }>(
    'fetchReviewsData',
    async (id, {extra: api}) => {
      const {data} = await api.get<ReviewData[]>(APIRoute.Cameras + id + APIRoute.Reviews);

      return data;
    },
  );

export const sendUserReviewAction = createAsyncThunk<ReviewData, {
  formData: UserReviewData;
    },
  {
    extra: AxiosInstance;
  }>(
    'sendUserReview',
    async({formData}, {extra: api}) => {
      const {data} = await api.post<ReviewData>(APIRoute.Reviews, formData);

      return data;
    }
  );

export const checkCouponAction = createAsyncThunk<string, {
    formData: CouponData;
      },
    {
      extra: AxiosInstance;
    }>(
      'checkCoupon',
      async({formData}, {extra: api}) => {
        const {data} = await api.post<string>(APIRoute.Coupons, formData);

        return data;
      }
    );

export const setOrderAction = createAsyncThunk<unknown, OrderData,
{
  extra: AxiosInstance;
}>('setOrder',
  async(orderData, {extra: api}) => {
    const data = await api.post(APIRoute.Orders, orderData);

    return data;
  }
);
