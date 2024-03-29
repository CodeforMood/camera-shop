export enum AppRoute {
    Root = '/',
    Product = '/product/',
    Basket = '/basket',

}

export enum SlicesNames {
  CamerasData = 'CAMERAS_DATA',
  PromoData = 'PROMO_DATA',
  ProductData = 'PRODUCT_DATA',
  SimilarCamerasData = 'SIMILAR_CAMERAS_DATA',
  ReviewsData = 'REVIEWS_DATA',
  BasketData = 'BASKET_DATA',
}

export enum APIRoute {
  Cameras = '/cameras/',
  Promo = '/promo',
  SimilarCameras = '/similar',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum ScreenNames {
  Catalog = 'Catalog',
  Product = 'Product',
}

export enum ProductTabNames {
  Description = 'Описание',
  Characteristics = 'Характеристики',
}

export enum TabsHash {
  Description = '#description',
  Characteristics = '#characteristics'
}

export enum SortTypes {
  SortByPrice = 'sortPrice',
  SortByPopular = 'sortPopular'
}

export enum SortOrders {
  Up = 'up',
  Down = 'down'
}

export enum FilterByPriceTypes {
  Min = 'priceMin',
  Max = 'priceMax',
}

export enum InputTitle {
  Name = 'Ваше имя',
  Advantage = 'Достоинства',
  Disadvantage ='Недостатки',
  Review = 'Комментарий',
  Rating = 'Рейтинг'
}

export enum InputPlaceholder {
  Name = 'Введите ваше имя',
  Advantage = 'Основные преимущества товара',
  Disadvantage = 'Главные недостатки товара',
  Review = 'Поделитесь своим опытом покупки',
}

export enum CouponStatus {
  noDiscount = '1',
  InvalidCoupon = '0',
}


export const CAROUSEL_VISIBLE_CLASS = 'is-active';

export const MAX_CAROUSEL_ITEMS = 3;

export const MAX_PRODUCTS_PAGE = 9;

export const MIN_SLIDER_ITEM_INDEX = 0;

export const SPINNER_COLOR = '#7777FF';
