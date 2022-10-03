import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductModal from '../components/shared/product/productModal';
import { postData } from '../utils/apiCall';
import { Empty } from 'antd';
import ProductCard from '../components/shared/product/productCard';
import CategoryFilter from '../components/shared/shop/categories';
import PriceFilter from '../components/shared/shop/PriceFilter';
import NewArrivalProducts from '../components/shared/shop/NewArrivalProducts';
import BrandFilter from '../components/shared/shop/BrandFilter';
import ShopMobileFilter from '../components/shared/shop/ShopMobileFilter';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_SHOPFILTER, OPEN_SHOPFILTER } from '../redux/action/type';
import AttributesFilter from '../components/shared/shop/AttributesFilter';
import InfiniteScroll from 'react-infinite-scroll-component';
import TypesFilter from '../components/shared/shop/TypesFilter';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useSelector((state) => state.menu);
  const searchParams = useLocation().search;
  const catId = new URLSearchParams(searchParams).get('catId');
  const sub_catId = new URLSearchParams(searchParams).get('sub_catId');
  const sub_subcategory_id = new URLSearchParams(searchParams).get('sub_subcategory_id');

  const search = new URLSearchParams(searchParams).get('search');
  const brand_id = new URLSearchParams(searchParams).get('brand_id');
  // const price_gt = new URLSearchParams(searchParams).get('price_gt');
  // const price_lt = new URLSearchParams(searchParams).get('price_lt');

  const [filterAttributes, setFilterAttributes] = useState(false);
  const [isProductVisible, setProductVisible] = useState(false);
  const [product, setProduct] = useState();
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);
  const [pageSize, setPageSize] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [field, setField] = useState();
  const [order, setOrder] = useState();
  const [hasMore, sethasMore] = useState(true);

  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subSubCategoryName, setSubSubCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [readMoreStatus, setReadMoreStatus] = useState(true);
  const [price_gt, setPricegt] = useState('');
  const [price_lt, setPricelt] = useState('');

  const isMobileFilterVisible = useSelector((state) => state.shopFilterSlider);
  const closeMobileFilter = () => {
    dispatch({ type: CLOSE_SHOPFILTER });
  };

  useEffect(() => {
    async function fetchMyAPICategories() {
      const res = await postData('/products/getFilters');
      setBrands(res?.data.brands);
    }

    fetchMyAPICategories();
  }, []);

  const fetchData = async () => {
    const products = await getProducts({
      page: 1,
      catId,
      sub_catId,
      sub_subcategory_id,
      search,
      brand_id,
      field,
      order,
      price_gt,
      price_lt,
      attribute_ids: selectedAttributes.join(','),
      type_ids: selectedTypes.join(','),
    });
    if (products.length === 0 || products.length < 20) {
      sethasMore(false);
    }
    filterAttributes && setFilterAttributes(false);
    setProductItems(products);
    closeMobileFilter();
  };
  useEffect(() => {
    fetchData();
    sethasMore(true);
    setCurrentPage(2);
  }, [
    catId,
    sub_catId,
    sub_subcategory_id,
    search,
    brand_id,
    field,
    order,
    selectedAttributes,
    selectedTypes,
    filterAttributes,
  ]);

  useEffect(() => {
    if (catId) {
      let cat_name = menu.find(({ id }) => id === Number(catId));
      if (cat_name) {
        setCategoryName({ id: cat_name.id, name: cat_name.name });
        setCategoryDesc(cat_name.description);
        if (sub_catId) {
          let subCat_name = cat_name?.subCategory?.find(({ id }) => id === Number(sub_catId));
          subCat_name && setSubCategoryName({ id: subCat_name.id, name: subCat_name.name });
          if (sub_subcategory_id) {
            let subSubCat_name = subCat_name.children.find(
              ({ id }) => id === Number(sub_subcategory_id),
            );
            subSubCat_name && setSubSubCategoryName(subSubCat_name.name);
          } else setSubSubCategoryName('');
        } else setSubCategoryName('');
      }
    } else {
      setCategoryName('');
      setSubCategoryName('');
      setSubSubCategoryName('');
      setCategoryDesc('');
    }
  }, [catId, sub_catId, sub_subcategory_id, menu]);

  const getProducts = async ({
    page,
    field,
    order,
    catId,
    sub_catId,
    sub_subcategory_id,
    search,
    brand_id,
    price_gt,
    price_lt,
    attribute_ids,
    type_ids,
  }) => {
    let data = {
      page: 1,
      field: '',
      order: '',
      catId,
      sub_catId,
      sub_subcategory_id,
      search,
      brand_id,
      price_gt,
      price_lt,
      attribute_ids,
      type_ids,
    };
    const params = new URLSearchParams();
    page && params.append('offSet', page);
    field && params.append('field', field);
    order && params.append('order', order);
    catId && params.append('category_id', catId);
    sub_catId && params.append('subcategory_id', sub_catId);
    sub_subcategory_id && params.append('sub_subcategory_id', sub_subcategory_id);

    search && params.append('name', search);
    brand_id && params.append('brand_id', brand_id);
    price_lt && params.append('price1', price_lt);
    price_gt && params.append('price2', price_gt);
    attribute_ids && params.append('attribute_ids', attribute_ids);
    type_ids && params.append('type_ids', type_ids);

    const res = await postData('/products/getProducts', params);
    if (res.success === 1) {
      if (res && res.page) {
        setTotal(res.page.total);
        setPageSize(res.page.pageSize);
      }
      return res.data;
    }
  };

  const fetchProductsData = async () => {
    const newPageProducts = await getProducts({
      page: currentPage,
      catId,
      sub_catId,
      sub_subcategory_id,
      search,
      brand_id,
      field,
      order,
      price_gt,
      price_lt,
    });
    setProductItems([...productItems, ...newPageProducts]);
    if (newPageProducts.length === 0 || newPageProducts.length < 20) {
      sethasMore(false);
    }
    setCurrentPage(currentPage + 1);
  };

  const resetPrice = () => {
    setFilterAttributes(true);
    setPricegt('');
    setPricelt('');
  };

  return (
    <Layout>
      <ShopMobileFilter
        isVisible={isMobileFilterVisible}
        closeMobileFilter={() => closeMobileFilter()}
        brands={brands}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        setFilterAttributes={setFilterAttributes}
        pricelt={price_lt}
        pricegt={price_gt}
        setPricegt={setPricegt}
        setPricelt={setPricelt}
        resetPrice={resetPrice}
      />
      <main
        className='main__content_wrapper'
        onClick={() => {
          if (isMobileFilterVisible) {
            closeMobileFilter();
          }
        }}
      >
        {/* Start breadcrumb section */}
        <section className='breadcrumb__section breadcrumb__bg'>
          <div className='row row-cols-1 ML-20'>
            <div className='col'>
              <ul className='breadcrumb__content--menu d-flex '>
                <li className='breadcrumb__content--menu__items'>
                  <Link className='text-red' to='/'>
                    Home
                  </Link>
                </li>
                {categoryName ? (
                  <>
                    <li className='breadcrumb__content--menu__items'>
                      {subCategoryName ? (
                        <Link to={`/shop?catId=${categoryName.id}`}>
                          <span className='text-red'>{categoryName?.name}</span>
                        </Link>
                      ) : (
                        <span className='text-red'>{categoryName?.name}</span>
                      )}
                    </li>
                    {subCategoryName && (
                      <>
                        <li className='breadcrumb__content--menu__items'>
                          {subSubCategoryName ? (
                            <Link
                              to={`/shop?catId=${categoryName.id}&sub_catId=${subCategoryName.id}`}
                            >
                              <span className='text-red'>{subCategoryName?.name}</span>
                            </Link>
                          ) : (
                            <span className='text-red'>{subCategoryName?.name}</span>
                          )}
                        </li>
                        {subSubCategoryName && (
                          <li className='breadcrumb__content--menu__items'>
                            <span className='text-red'>{subSubCategoryName}</span>
                          </li>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <li className='breadcrumb__content--menu__items'>
                    <span className='text-red'>Shop</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start shop section */}
        <section className='shop__section section--padding'>
          <div className='container-fluid'>
            <div className='shop__header bg__gray--color d-flex align-items-center mb-30'>
              <button
                className='widget__filter--btn d-none d-md-2-flex align-items-center'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: OPEN_SHOPFILTER });
                }}
              >
                <svg
                  className='widget__filter--btn__icon'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={28}
                    d='M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80'
                  />
                  <circle
                    cx={336}
                    cy={128}
                    r={28}
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={28}
                  />
                  <circle
                    cx={176}
                    cy={256}
                    r={28}
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={28}
                  />
                  <circle
                    cx={336}
                    cy={384}
                    r={28}
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={28}
                  />
                </svg>
                <span className='widget__filter--btn__text'>Filter</span>
              </button>
              <div className='product__view--mode d-flex align-items-center'>
                {/* <div className='product__view--mode__list product__short--by align-items-center d-none d-lg-flex'>
                  <label className='product__view--label'>Prev Page :</label>
                  <div className='select shop__header--select'>
                    <select className='product__view--select' defaultValue={1}>
                      <option value={1}>65</option>
                      <option value={2}>40</option>
                      <option value={3}>42</option>
                      <option value={4}>57 </option>
                      <option value={5}>60 </option>
                    </select>
                  </div>
                </div> */}
                <div className='product__view--mode__list product__short--by align-items-center d-none d-lg-flex'>
                  <label className='product__view--label'>Sort By :</label>
                  <div className='select shop__header--select'>
                    <select
                      className='product__view--select'
                      defaultValue={0}
                      onChange={(e) => {
                        if (e.target.value === '1') {
                          setField('id');
                          setOrder('desc');
                        } else if (e.target.value === '2') {
                          setField('price');
                          setOrder('asc');
                        } else if (e.target.value === '3') {
                          setField('price');
                          setOrder('desc');
                        }
                      }}
                    >
                      <option value={0}>Sort Products</option>

                      <option value={1}>Sort by latest</option>
                      <option value={2}>Sort by Price: low to high</option>
                      <option value={3}>Sort by price: high to low</option>
                    </select>
                  </div>
                </div>
                {/* <div className='product__view--mode__list'>
                  <div className='product__grid--column__buttons d-flex justify-content-center'>
                    <button
                      className='product__grid--column__buttons--icons active'
                      aria-label='product grid button'
                      data-toggle='tab'
                      data-target='#product_grid'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={13}
                        height={13}
                        viewBox='0 0 9 9'
                      >
                        <g transform='translate(-1360 -479)'>
                          <rect
                            id='Rectangle_5725'
                            data-name='Rectangle 5725'
                            width={4}
                            height={4}
                            transform='translate(1360 479)'
                            fill='currentColor'
                          />
                          <rect
                            id='Rectangle_5727'
                            data-name='Rectangle 5727'
                            width={4}
                            height={4}
                            transform='translate(1360 484)'
                            fill='currentColor'
                          />
                          <rect
                            id='Rectangle_5726'
                            data-name='Rectangle 5726'
                            width={4}
                            height={4}
                            transform='translate(1365 479)'
                            fill='currentColor'
                          />
                          <rect
                            id='Rectangle_5728'
                            data-name='Rectangle 5728'
                            width={4}
                            height={4}
                            transform='translate(1365 484)'
                            fill='currentColor'
                          />
                        </g>
                      </svg>
                    </button>
                    <button
                      className='product__grid--column__buttons--icons'
                      aria-label='product list button'
                      data-toggle='tab'
                      data-target='#product_list'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={17}
                        height={16}
                        viewBox='0 0 13 8'
                      >
                        <g
                          id='Group_14700'
                          data-name='Group 14700'
                          transform='translate(-1376 -478)'
                        >
                          <g transform='translate(12 -2)'>
                            <g id='Group_1326' data-name='Group 1326'>
                              <rect
                                id='Rectangle_5729'
                                data-name='Rectangle 5729'
                                width={3}
                                height={2}
                                transform='translate(1364 483)'
                                fill='currentColor'
                              />
                              <rect
                                id='Rectangle_5730'
                                data-name='Rectangle 5730'
                                width={9}
                                height={2}
                                transform='translate(1368 483)'
                                fill='currentColor'
                              />
                            </g>
                            <g id='Group_1328' data-name='Group 1328' transform='translate(0 -3)'>
                              <rect
                                id='Rectangle_5729-2'
                                data-name='Rectangle 5729'
                                width={3}
                                height={2}
                                transform='translate(1364 483)'
                                fill='currentColor'
                              />
                              <rect
                                id='Rectangle_5730-2'
                                data-name='Rectangle 5730'
                                width={9}
                                height={2}
                                transform='translate(1368 483)'
                                fill='currentColor'
                              />
                            </g>
                            <g id='Group_1327' data-name='Group 1327' transform='translate(0 -1)'>
                              <rect
                                id='Rectangle_5731'
                                data-name='Rectangle 5731'
                                width={3}
                                height={2}
                                transform='translate(1364 487)'
                                fill='currentColor'
                              />
                              <rect
                                id='Rectangle_5732'
                                data-name='Rectangle 5732'
                                width={9}
                                height={2}
                                transform='translate(1368 487)'
                                fill='currentColor'
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div> */}
                <div className='product__view--mode__list product__view--search d-none d-lg-block'>
                  <form className='product__view--search__form' action='#'>
                    <label>
                      <input
                        className='product__view--search__input border-0'
                        placeholder='Search by'
                        type='text'
                        onChange={(e) => {
                          setSearchString(e.target.value);
                        }}
                      />
                    </label>
                    <button
                      className='product__view--search__btn'
                      aria-label='shop button'
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/shop?search=${searchString}`);
                      }}
                    >
                      <svg
                        className='product__view--search__btn--svg'
                        xmlns='http://www.w3.org/2000/svg'
                        width='22.51'
                        height='20.443'
                        viewBox='0 0 512 512'
                      >
                        <path
                          d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                          fill='none'
                          stroke='currentColor'
                          strokeMiterlimit={10}
                          strokeWidth={32}
                        />
                        <path
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          strokeWidth={32}
                          d='M338.29 338.29L448 448'
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              {/* <p className='product__showing--count'>Showing 1–9 of 21 results</p> */}
            </div>
            <div className='row'>
              <div className='col-xl-3 col-lg-4'>
                <div className='shop__sidebar--widget widget__area d-md-2-none'>
                  <CategoryFilter />
                  {/* <BrandFilter brands={brands} /> */}
                  <TypesFilter
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                    setFilterAttributes={setFilterAttributes}
                  />
                  <AttributesFilter
                    selectedAttributes={selectedAttributes}
                    setSelectedAttributes={setSelectedAttributes}
                    setFilterAttributes={setFilterAttributes}
                  />
                  <PriceFilter
                    pricelt={price_lt}
                    pricegt={price_gt}
                    setPricegt={setPricegt}
                    setPricelt={setPricelt}
                    reset={resetPrice}
                    setFilterAttributes={setFilterAttributes}
                  />
                  <NewArrivalProducts />
                </div>
              </div>
              <div className='col-xl-9 col-lg-8'>
                {productItems?.length > 0 ? (
                  <div className='shop__product--wrapper'>
                    {/* {productItems?.length > 0 &&
                              productItems.map((product) => (
                                <ProductCard
                                  key={product.id}
                                  product={product}
                                  setVisible={setProductVisible}
                                  setProduct={setProduct}
                                />
                              ))} */}
                    <InfiniteScroll
                      dataLength={productItems.length} //This is important field to render the next data
                      next={fetchProductsData}
                      style={{ overflow: 'hidden' }}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center', paddingTop: '20px' }}>No more products!</p>
                      }
                    >
                      <div className='tab_content'>
                        <div id='product_grid' className='tab_pane active show'>
                          <div className='product__section--inner product__grid--inner'>
                            <div className='row row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30'>
                              {productItems.map((product) => (
                                <ProductCard
                                  key={product.id}
                                  product={product}
                                  setVisible={setProductVisible}
                                  setProduct={setProduct}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </InfiniteScroll>
                    <div className='mb-5 mt-5 box'>
                      {categoryDesc?.length > 200 && (
                        <p>
                          {readMoreStatus ? categoryDesc.slice(0, 200) + '... ' : categoryDesc}{' '}
                          <span
                            style={{ cursor: 'pointer', color: 'red', textDecoration: 'underline' }}
                            onClick={() => {
                              setReadMoreStatus(!readMoreStatus);
                            }}
                          >
                            {readMoreStatus ? 'read more' : 'read less'}
                          </span>
                        </p>
                      )}
                      {categoryDesc?.length <= 200 && <p>{categoryDesc}</p>}
                    </div>

                    {/* <div className='pagination__area bg__gray--color'>
                    <nav className='pagination'>
                      <ul className='pagination__wrapper d-flex align-items-center justify-content-center'>
                        <li className='pagination__list'>
                          <a href='shop.html' className='pagination__item--arrow  link '>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='22.51'
                              height='20.443'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={48}
                                d='M244 400L100 256l144-144M120 256h292'
                              />
                            </svg>
                            <span className='visually-hidden'>pagination arrow</span>
                          </a>
                        </li>
                        <li></li>
                        <li className='pagination__list'>
                          <span className='pagination__item pagination__item--current'>1</span>
                        </li>
                        <li className='pagination__list'>
                          <a href='shop.html' className='pagination__item link'>
                            2
                          </a>
                        </li>
                        <li className='pagination__list'>
                          <a href='shop.html' className='pagination__item link'>
                            3
                          </a>
                        </li>
                        <li className='pagination__list'>
                          <a href='shop.html' className='pagination__item link'>
                            4
                          </a>
                        </li>
                        <li className='pagination__list'>
                          <a href='shop.html' className='pagination__item--arrow  link '>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='22.51'
                              height='20.443'
                              viewBox='0 0 512 512'
                            >
                              <path
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={48}
                                d='M268 112l144 144-144 144M392 256H100'
                              />
                            </svg>
                            <span className='visually-hidden'>pagination arrow</span>
                          </a>
                        </li>
                        <li></li>
                      </ul>
                    </nav>
                  </div> */}
                    {/* {!loading && (
                      <div className='shop-pagination'>
                        <Pagination
                          total={total - 1}
                          pageSize={pageSize}
                          responsive={true}
                          showSizeChanger={false}
                          current={currentPage !== undefined ? parseInt(currentPage) : 1}
                          onChange={(e) => handlePagination(e)}
                        />
                      </div>
                    )} */}
                  </div>
                ) : (
                  <Empty description={'No products found'} />
                )}
              </div>
            </div>
          </div>
        </section>
        {/* End shop section */}
        <ProductModal
          isVisible={isProductVisible}
          setVisible={setProductVisible}
          product={product}
        />
      </main>
    </Layout>
  );
};

export default Shop;
