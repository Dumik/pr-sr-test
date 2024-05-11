'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Header, Input } from '@/modules/core';
import { Card } from '@/product/components';
import { AuthLocalNameTypes } from '@/modules/auth';

type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
};

const ProductsPage = () => {
  const router = useRouter();
  const [productsData, setProductsData] = useState<{
    products: ProductType[];
    total?: number;
  }>({
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://dummyjson.com/products/categories')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast(error.message, { type: 'error' });
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios
        .get(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then((response) => {
          setProductsData(response.data);
          setSearchQuery('');
          setLoading(false);
        })
        .catch((error) => {
          toast(error.message as any, { type: 'error' });
          console.error('Error fetching selected category:', error);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (!selectedCategory) {
        setLoading(true);
        axios
          .get(
            `https://dummyjson.com/products/search?q=${searchQuery}&limit=10&skip=${(currentPage - 1) * 10}`,
          )
          .then((response) => {
            setProductsData(response.data);
            setSelectedCategory('');
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
            toast(error.message as any, { type: 'error' });
            setLoading(false);
          });
      }
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery, currentPage, selectedCategory]);

  const totalPages = productsData.total && Math.ceil(productsData.total / 10);

  const accessToken =
    typeof window !== 'undefined'
      ? localStorage.getItem(AuthLocalNameTypes.ACCESS_TOKEN) || ''
      : '';

  if (!accessToken) {
    return (
      <div
        className='container d-flex align-items-center justify-content-center'
        style={{ height: '100vh' }}>
        <div className='d-flex flex-column'>
          <span className='fs-4'>You must be logged in to view this page</span>
          <button
            type='button'
            className='btn btn-link text-center fs-5'
            onClick={() => router.push('/auth')}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='container grid my-5'>
        <div className='row align-items-center justify-content-center mb-5'>
          <form
            className={`d-flex col-12 col-md-8 gap-2 grid flex-column flex-md-row form-${loading ? 'invisible' : 'visible'}`}
            role='search'>
            <select
              className='form-select order-1 order-md-0'
              aria-label='Default select example'
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}>
              <option value=''>Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className='d-flex gap-2 col-md-8 col-12 order-0 '>
              <Input
                type='search'
                placeholder='Search'
                className='form-control '
                aria-label='Search'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory('');
                }}
              />
            </div>
          </form>
        </div>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <div className='row'>
              {!productsData.products.length ? (
                <div className='col-12'>
                  <span className='fs-5 fw-medium'>Product not found</span>
                </div>
              ) : null}
              {productsData.products.map((product) => (
                <div key={product.id} className='col-12 col-sm-6 col-md-4 col-lg-3 p-2'>
                  <Card
                    image={product.images[0]}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
            {productsData.total
              ? productsData.total > 10 && (
                  <div className='row justify-content-center mt-4'>
                    <nav aria-label='Page navigation example'>
                      <ul className='pagination d-flex justify-content-center flex-wrap'>
                        {Array.from({ length: totalPages! }, (_, index) => (
                          <li
                            key={index}
                            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button className='page-link' onClick={() => setCurrentPage(index + 1)}>
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )
              : null}
          </>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
