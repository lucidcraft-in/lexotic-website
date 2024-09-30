'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Axios from '../axios/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useParams } from 'next/navigation';


// import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigate } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';



// let user = null
// let flag = null

// const userInfo = sessionStorage.getItem("UserInfo")
// if (userInfo) {
//   const { userId, username, token, isFlag } = JSON.parse(userInfo)
//   // console.log(userId)
//   user = userId
//   flag = isFlag
// }



export default function Recommended1() {
  const [isTab, setIsTab] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState([]);
  const { id } = useParams;


  let user = null
  let flag = null
  let storageUserInfo

  useEffect(() => {
    if (typeof window !== "undefined") {
      storageUserInfo = sessionStorage.getItem('UserInfo')
      // setUserInfo(storageUserInfo)

    }
  }, [])

  if (storageUserInfo) {
    const { userId, username, token, isFlag } = JSON.parse(userInfo)
    user = userId
    flag = isFlag
  }



  const photoUrls = (product?.photos || []).map(photo => {
    console.log(photo?.url); // Log each URL to check for correctness
    return photo?.url;
  });
  console.log(photoUrls)
  const handleCategorySelect = async (index, categoryId) => {
    setIsTab(index);
    setSelectedCategory(categoryId);
    setIsVisible(false);

    try {
      const response = await Axios.get(`/productsbycata/${categoryId}`);
      if (response.status === 200) {
        const data = Array.isArray(response.data.products)
          ? response.data.products
          : []; // Ensure data is an array
        setProduct(data);
        // console.log(response.data.products);
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsVisible(true); // Show content after fetching data
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await Axios.get(`getcategory`);

      setCategories(res.data);

      handleCategorySelect(0, res.data?.[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flat-section flat-recommended">
        <div className="container">
          <div
            className="text-center wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <div className="text-subtitle text-primary">
              Featured Properties
            </div>
            <h4 className="mt-4">Recommended For You</h4>
          </div>
          <div
            className="flat-tab-recommended wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <ul
              className="nav-tab-recommended justify-content-center"
              role="tablist"
            >
              {categories.map((cat, index) => (
                <li className="nav-tab-item" key={cat._id}>
                  <a
                    className="nav-link-item active"
                    // data-bs-toggle="tab"
                    onClick={() => handleCategorySelect(index, cat?._id)}
                  >
                    {cat.cattype}
                  </a>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              <div>
                <div className="row">
                  {product?.map((pro) => (
                    <div className="col-xl-4 col-lg-6 col-md-6">
                      <div className="homeya-box">
                        <div className="archive-top">
                          <Link
                            href="/property-details-v1"
                            className="images-group"
                          >
                            <div className="images-style">
                              {/* Carousel for product photos */}
                              {pro.photos && pro.photos.length > 0 ? (
                                <Swiper spaceBetween={10}
                                  slidesPerView={1} loop={true}
                                // pagination={false}
                                >
                                  {pro.photos.map((photo, idx) => (
                                    <SwiperSlide key={idx}>
                                      <img
                                        src={photo.url}
                                        alt={photo.title}
                                        style={{ width: '100%', height: 'auto' }}
                                      />
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              ) : (
                                <p>No photos available</p>
                              )}
                              {/* <img src={photoUrls} alt="property image" /> */}
                            </div>
                            <div className="top">
                              <ul className="d-f lex gap-8">
                                <li className="flag-tag success">Featured</li>
                                <li className="flag-tag style-1">For Rent</li>
                              </ul>
                              <ul className="d-flex gap-4">
                                <li className="box-icon w-32">
                                  <span className="icon icon-arrLeftRight" />
                                </li>
                                <li className="box-icon w-32">
                                  <span className="icon icon-heart" />
                                </li>
                                <li className="box-icon w-32">
                                  <span className="icon icon-eye" />
                                </li>
                              </ul>
                            </div>
                            <div className="bottom">
                              <span className="flag-tag style-2">Studio</span>
                            </div>
                          </Link>
                          <div className="content">
                            <div className="h7 text-capitalize fw-7">
                              <Link
                                href="/property-details-v1"
                                className="link"
                              >
                                {pro?.name}
                              </Link>
                            </div>
                            <div className="desc">
                              <i className="fs-16 icon icon-mapPin" />
                              <p>{pro?.location.placeName}</p>{' '}
                            </div>

                            <br />
                            <span>{pro.description}</span>
                          </div>
                        </div>
                        <div className="archive-bottom d-flex justify-content-between align-items-center">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img src="/images/avatar/avt-6.jpg" alt="avt" />
                            </div>
                            <span>{pro.owner.name}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <h6>{pro?.offerPrice}</h6>
                            <span className="text-variant-1">/SqFT</span>
                          </div>
                          <div className="mt-3 ">
                            <Link
                              href={{
                                pathname: '/property-details-v1',
                                query: { _id: pro?._id },
                              }}
                            >
                              <button
                                className="p-2 btn btn-primary"
                                type="submit"
                              >
                                Book Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link href="/sidebar-list" className="tf-btn primary size-1">
                    View All Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
