import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';

import HistoryRouter from '../history-route/history-route';
import App from './app';
import { fakeCamera, mockStore } from '../../mocks/mocks';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={mockStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  afterAll(() => jest.clearAllMocks());

  it('should render "Catalog" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to product', () => {
    history.push(`${AppRoute.Product}${fakeCamera.id}`);
    render(fakeApp);

    expect(screen.getByText(/Всего оценок/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to basket', () => {
    history.push(AppRoute.Basket);
    render(fakeApp);

    expect(screen.getByText(/В данный момент корзина пуста/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
