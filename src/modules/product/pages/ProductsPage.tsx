import { Header, Input } from '@/modules/core';
import { InputSizeEnum } from '@/modules/core/ui/Input/Input';

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <div className='grid mt-5 '>
        <div className='row align-items-center justify-content-center'>
          <form className='d-flex col-7' role='search'>
            <Input
              type='search'
              placeholder='Search'
              className='form-control me-2'
              aria-label='Search'
            />

            <button className='btn btn-info ' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
