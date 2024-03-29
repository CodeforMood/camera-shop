import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, getMockStore } from '../../mocks/mocks';
import { SlicesNames } from '../../const';
import ModalAddItem from './modal-add-item';

const store = getMockStore({
  [SlicesNames.CamerasData]: {
    selectedCameraData: fakeCamera,
  }
});

describe('Component: ModalAddItem', () => {
  const setModalAddItem = jest.fn();
  const setModalAddItemSuccess = jest.fn();

  it('should render correctly ModalAddItem modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalAddItem setModalAddItemSuccess={setModalAddItemSuccess} setModalAddItem={setModalAddItem} isModalAddItem/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('add-item-modal')).toBeInTheDocument();
  });

  it('setModalAddItem should called when close the modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalAddItem setModalAddItemSuccess={setModalAddItemSuccess} setModalAddItem={setModalAddItem} isModalAddItem/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(setModalAddItem).toBeCalled();
  });
});
