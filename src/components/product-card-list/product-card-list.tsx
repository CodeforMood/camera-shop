import { CamerasData } from '../../types/cameras-data';
import ProductCard from '../product-card/product-card';

type ProductCardListProps = {
  camerasData: CamerasData[];
}

export default function ProductCardList({camerasData}: ProductCardListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {camerasData.map((cameraData) => <ProductCard cameraData={cameraData} key={cameraData.id}/>)}
    </div>
  );
}
