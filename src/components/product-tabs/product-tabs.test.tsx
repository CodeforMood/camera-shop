import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { SlicesNames } from '../../const';
import { fakeCamera, getMockStore, mockState } from '../../mocks/mocks';
import ProductTabs from './product-tabs';

const store = getMockStore({...mockState,
  [SlicesNames.ProductData]: {
    productData: fakeCamera,
  }
});

describe('Component: ProductTabs', () => {
  it ('should render correctly', () => {
    render (
      <MemoryRouter>
        <Provider store={store}>
          <ProductTabs />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });
});
