'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Header, Input, Sidebar, SidebarPlaceholder, useBreakpoint } from '@/modules/core';
import { Card, CardPlaceholder } from '@/product/components';
import { AuthLocalNameTypes } from '@/modules/auth';
import { X } from '@phosphor-icons/react';

type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
};

const ProductsPage = () => {
  const mobileScreen = useBreakpoint('sm');

  const [productsData, setProductsData] = useState<{
    products: ProductType[];
    total?: number;
  }>({
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const accessToken =
    typeof window !== 'undefined'
      ? localStorage.getItem(AuthLocalNameTypes.ACCESS_TOKEN) || ''
      : '';

  const totalPages = productsData.total && Math.ceil(productsData.total / 10);

  const onChangeSearch = (value: string) => {
    setSearchQuery(value);
    setSelectedCategory('');
    setCurrentPage(1);
  };

  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get('https://dummyjson.com/products/categories')
      .then((response) => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        toast(error.message, { type: 'error' });
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
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

  useEffect(() => {
    if (!accessToken) {
      toast('You are not logged in', { type: 'info', position: 'top-right' });
    }
  }, []);

  return (
    <>
      <Header
        onChangeSearch={onChangeSearch}
        searchValue={searchQuery}
        toggleSidebar={() => setIsOpenSidebar((prev) => !prev)}
      />
      <div className='container-lg grid my-5 position-relative'>
        <div className='row'>
          {mobileScreen ? (
            <Sidebar
              isOpen={isOpenSidebar}
              handleClose={() => setIsOpenSidebar(false)}
              title='Categories'>
              {categories.map((category) => (
                <div key={category}>
                  <button
                    className={`btn btn-link text-decoration-none  text-body-tertiary  p-1  btn-sidebar ${category == selectedCategory ? 'btn-sidebar-active' : ''}`}
                    style={{
                      textTransform: 'capitalize',
                    }}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpenSidebar(false);
                    }}>
                    {category}
                  </button>
                </div>
              ))}
              {selectedCategory || searchQuery ? (
                <button
                  className='btn btn-link text-decoration-none fw-medium text-black p-1 btn-sidebar d-flex align-items-center gap-1 pt-2'
                  style={{
                    textTransform: 'capitalize',
                  }}
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}>
                  <X size={14} /> Clear Filters
                </button>
              ) : null}
            </Sidebar>
          ) : null}
          {!mobileScreen && (
            <div className='col-md-4 col-lg-3'>
              {loadingCategories && <SidebarPlaceholder />}

              {!loadingCategories ? (
                <div
                  className='card shadow-sm border-0 sticky-top p-3 pb-5 mt-2 overflow-scroll'
                  style={{
                    maxHeight: 'calc(100vh - 200px)',
                    top: '100px',
                  }}>
                  <span className='fw-semibold fs-5'>Categories</span>
                  {categories.map((category) => (
                    <div key={category}>
                      <button
                        className={`btn btn-link text-decoration-none  text-body-tertiary pt-1 pb-0 btn-sidebar 
                         ${category == selectedCategory ? 'btn-sidebar-active' : ''}
                         `}
                        style={{
                          textTransform: 'capitalize',
                        }}
                        onClick={() => {
                          setSelectedCategory(category);
                        }}>
                        {category}
                      </button>
                    </div>
                  ))}
                  {selectedCategory || searchQuery ? (
                    <button
                      className='btn btn-link text-decoration-none fw-medium text-black p-2 btn-sidebar d-flex align-items-center gap-1'
                      style={{
                        textTransform: 'capitalize',
                      }}
                      onClick={() => {
                        setSelectedCategory('');
                        setSearchQuery('');
                        setCurrentPage(1);
                      }}>
                      <X size={14} /> Clear Filters
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          )}
          <div className='col-12 col-md-8 col-lg-9 d-flex flex-wrap'>
            {!productsData.products.length && !loading ? (
              <>
                <div className='col-12 d-flex flex-column  align-items-center justify-content-center '>
                  <span className='fs-6 text-dark text-center'>
                    Product are not available or not found
                  </span>
                  <span className='fs-5 text-dark text-center'>
                    Please write to us to find out when the product will be available{' '}
                  </span>
                  <span className='fs-5 text-dark'>
                    <a href='mailto:your@email.com'>your@email.com</a>
                  </span>
                </div>
              </>
            ) : null}
            {loading ? (
              <>
                <div className='col-12 col-sm-6 col-md-6 col-lg-4 p-2'>
                  <CardPlaceholder />
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-4 p-2'>
                  <CardPlaceholder />
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-4 p-2'>
                  <CardPlaceholder />
                </div>
              </>
            ) : (
              productsData.products.map((product) => (
                <div key={product.id} className='col-12 col-sm-6 col-md-6 col-lg-4 p-2'>
                  <Card
                    image={product.images[0]}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='row justify-content-center mt-4'>
          {productsData.total
            ? productsData.total > 10 && (
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
              )
            : null}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
