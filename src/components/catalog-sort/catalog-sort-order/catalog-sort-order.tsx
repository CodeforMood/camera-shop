import { useLocation, useNavigate } from 'react-router-dom';
import { SortOrders, SortTypes } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentSortOrder, sortCamerasData, setCurrentSortType } from '../../../store/cameras-data/cameras-data';
import { getCurrentSortOrder, getCurrentSortType } from '../../../store/cameras-data/selectors';

export default function CatalogSortOrder(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentSortType = useAppSelector(getCurrentSortType);

  const handleSortChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;

    if(!currentSortType.length) {
      dispatch(setCurrentSortType(SortTypes.SortByPrice));
      queryParams.set('sortOrder', SortOrders.Up);
    }

    dispatch(setCurrentSortOrder(target.id));
    dispatch(sortCamerasData());
    queryParams.set('sortOrder', target.id);
    navigate({ search: queryParams.toString(), hash: location.hash });
  };

  return (
    <div className="catalog-sort__order">
      <div className="catalog-sort__btn catalog-sort__btn--up" data-testid="catalog-sort__btn--up">
        <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={currentSortOrder === SortOrders.Up} onChange={handleSortChange}/>
        <label htmlFor="up">
          <svg width="16" height="14" aria-hidden="false">
            <use xlinkHref="#icon-sort"></use>
          </svg>
        </label>
      </div>
      <div className="catalog-sort__btn catalog-sort__btn--down" data-testid="catalog-sort__btn--down">
        <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={currentSortOrder === SortOrders.Down} onChange={handleSortChange}/>
        <label htmlFor="down">
          <svg width="16" height="14" aria-hidden="false">
            <use xlinkHref="#icon-sort"></use>
          </svg>
        </label>
      </div>
    </div>
  );
}
