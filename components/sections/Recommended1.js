'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import Axios from "../axios/axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



export default function Recommended1() {
	const [isTab, setIsTab] = useState(1)
	const [isVisible, setIsVisible] = useState(true)

	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [product, setProduct] = useState([])

	const handleCategorySelect = async (index, categoryId) => {
		setIsTab(index);
		setSelectedCategory(categoryId);
		setIsVisible(false)

		try {
			const response = await Axios.get(`/productsbycata/${categoryId}`);
			if (response.status === 200) {
				const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
				setProduct(response.data.products);
				console.log(response.data.products);
			} else {
				console.error('Failed to fetch products:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			setIsVisible(true); // Show content after fetching data
		}
	};
console.log(product)



	// const getData = async () => {
	// 	try {

	// 		const res = await Axios.get(`getproducts`)
	// 		console.log(res.data)
	// 		setProduct(res.data)

	// 	} catch (error) {
	// 		console.log('error')

	// 	}

	// }


	// Fetch categories from API

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const res = await Axios.get(`getcategory`)
			console.log(res)
			setCategories(res.data)

		} catch (error) {
			console.log('error')
		}
	};





	return (
		<>

			<section className="flat-section flat-recommended">

				{/* <div className="dropdown">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{selectedCategory}
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => handleCategoryChange('View All')}
							>
								View All
							</a>
						</li>
						{categories.map((category) => (
							<li key={category._id}>
								<a
									className="dropdown-item"
									href="#"
									onClick={() => handleCategoryChange(category.cattype)}
								>
									{category.cattype}
								</a>
							</li>
						))}
					</ul>
				</div> */}
				<div className="container">
					<div className="text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Featured Properties</div>
						<h4 className="mt-4">Recommended For You</h4>
					</div>
					<div className="flat-tab-recommended wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<ul className="nav-tab-recommended justify-content-center" role="tablist">

							{categories.map((cat, index) => (

								<li className="nav-tab-item" key={cat._id} >
									<a
										className={isTab === index ? "nav-link-item active" : "nav-link-item"}
										data-bs-toggle="tab"
										onClick={() => handleCategorySelect(index, cat?._id)}
									>{cat.cattype}</a>
								</li>

							))}
						</ul>


						<div className="tab-content">
							<div style={{ opacity: isVisible ? 1 : 0 }} className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="viewAll" role="tabpanel">
								<div className="row"
								>
									{product?.map((pro) => (
										<div className="col-xl-4 col-lg-6 col-md-6"
										>
											<div className="homeya-box" >
												<div className="archive-top">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src={pro.photos[0]?.url || "images/placeholder.jpg"} alt={pro.photos[0]?.title || "property image"} />
														</div>
														<div className="top">
															<ul className="d-f lex gap-8">
																<li className="flag-tag success">Featured</li>
																<li className="flag-tag style-1">For Sale</li>
															</ul>
															<ul className="d-flex gap-4"
															>
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
													<div className="content"

													>
														<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">{pro?.name}</Link></div>
														<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>{pro?.location.placeName}</p> </div>
														{/* <ul className="meta-list">
															<li className="item">
																<i className="icon icon-bed" />
																<span>3</span>
															</li>
															<li className="item">
																<i className="icon icon-bathtub" />
																<span>2</span>
															</li>
															<li className="item">
																<i className="icon icon-ruler" />
																<span>600 SqFT</span>
															</li>
														</ul> */} <br />
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
														<button className="p-2 me-3 btn btn-primary" type="submit">
															Add to Cart
														</button>
														<button className="p-2 btn btn-info" type="submit">
															Book
														</button>
													</div>
												</div>
											</div>
										</div>
									))}


								</div>
								<div className="text-center">
									<Link href="#" className="tf-btn primary size-1">View All Properties</Link>
								</div>
							</div>
							<div style={{ opacity: isVisible ? 1 : 0 }} className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="apartment" role="tabpanel">
								<div className="row">
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-1.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link"> Casa Lomas de Machalí Machas</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Arlene McCoy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-2.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Apartment</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Villa del Mar Retreat, Malibu</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>72 Sunset Avenue, Los Angeles, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-7.jpg" alt="avt" />
													</div>
													<span>Annette Black</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-3.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Villa</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link">Rancho Vista Verde, Santa Barbara</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-5.jpg" alt="avt" />
													</div>
													<span>Ralph Edwards</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$5050,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v3" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-4.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">House</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v3" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>1040 Ocean, Santa Monica, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-8.jpg" alt="avt" />
													</div>
													<span>Jacob Jones</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v4" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-5.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Office</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v4" className="link">Coastal Serenity Cottage</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>21 Hillside Drive, Beverly Hills, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-9.jpg" alt="avt" />
													</div>
													<span>Kathryn Murphy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-6.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>8 Broadway, Brooklyn, New York</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Floyd Miles</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<Link href="#" className="tf-btn primary size-1">View All Properties</Link>
								</div>
							</div>
							<div style={{ opacity: isVisible ? 1 : 0 }} className={isTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="villa" role="tabpanel">
								<div className="row">
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-1.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link"> Casa Lomas de Machalí Machas</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Arlene McCoy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v3" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-2.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Apartment</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v3" className="link">Villa del Mar Retreat, Malibu</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>72 Sunset Avenue, Los Angeles, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-7.jpg" alt="avt" />
													</div>
													<span>Annette Black</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-3.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Villa</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link">Rancho Vista Verde, Santa Barbara</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-5.jpg" alt="avt" />
													</div>
													<span>Ralph Edwards</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$5050,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v3" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-4.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">House</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v3" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>1040 Ocean, Santa Monica, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-8.jpg" alt="avt" />
													</div>
													<span>Jacob Jones</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-5.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Office</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Coastal Serenity Cottage</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>21 Hillside Drive, Beverly Hills, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-9.jpg" alt="avt" />
													</div>
													<span>Kathryn Murphy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-6.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link">Lakeview Haven, Lake Tahoe</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>8 Broadway, Brooklyn, New York</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Floyd Miles</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<Link href="#" className="tf-btn primary size-1">View All Properties</Link>
								</div>
							</div>
							<div style={{ opacity: isVisible ? 1 : 0 }} className={isTab == 4 ? "tab-pane fade show active" : "tab-pane fade"} id="studio" role="tabpanel">
								<div className="row">
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-1.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link"> Casa Lomas de Machalí Machas</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Arlene McCoy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-2.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Apartment</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Villa del Mar Retreat, Malibu</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>72 Sunset Avenue, Los Angeles, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-7.jpg" alt="avt" />
													</div>
													<span>Annette Black</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-3.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Villa</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link">Rancho Vista Verde, Santa Barbara</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-5.jpg" alt="avt" />
													</div>
													<span>Ralph Edwards</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$5050,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v3" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-4.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">House</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v3" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>1040 Ocean, Santa Monica, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-8.jpg" alt="avt" />
													</div>
													<span>Jacob Jones</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v4" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-5.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Office</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v4" className="link">Coastal Serenity Cottage</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>21 Hillside Drive, Beverly Hills, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-9.jpg" alt="avt" />
													</div>
													<span>Kathryn Murphy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-6.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>8 Broadway, Brooklyn, New York</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Floyd Miles</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<Link href="#" className="tf-btn primary size-1">View All Properties</Link>
								</div>
							</div>
							<div style={{ opacity: isVisible ? 1 : 0 }} className={isTab == 5 ? "tab-pane fade show active" : "tab-pane fade"} id="house" role="tabpanel">
								<div className="row">
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-1.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link"> Casa Lomas de Machalí Machas</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Arlene McCoy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v3" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-2.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Apartment</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v3" className="link">Villa del Mar Retreat, Malibu</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>72 Sunset Avenue, Los Angeles, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-7.jpg" alt="avt" />
													</div>
													<span>Annette Black</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v4" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-3.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Villa</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v4" className="link">Rancho Vista Verde, Santa Barbara</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-5.jpg" alt="avt" />
													</div>
													<span>Ralph Edwards</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$5050,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-4.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">House</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>1040 Ocean, Santa Monica, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-8.jpg" alt="avt" />
													</div>
													<span>Jacob Jones</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-5.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Office</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Coastal Serenity Cottage</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>21 Hillside Drive, Beverly Hills, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-9.jpg" alt="avt" />
													</div>
													<span>Kathryn Murphy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-6.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>8 Broadway, Brooklyn, New York</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Floyd Miles</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<Link href="#" className="tf-btn primary size-1">View All Properties</Link>
								</div>
							</div>
							<div style={{ opacity: isVisible ? 1 : 0 }} className={isTab == 6 ? "tab-pane fade show active" : "tab-pane fade"} id="office" role="tabpanel">
								<div className="row">
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-1.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link"> Casa Lomas de Machalí Machas</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Arlene McCoy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-2.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Apartment</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Villa del Mar Retreat, Malibu</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>72 Sunset Avenue, Los Angeles, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-7.jpg" alt="avt" />
													</div>
													<span>Annette Black</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v2" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-3.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Villa</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link">Rancho Vista Verde, Santa Barbara</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-5.jpg" alt="avt" />
													</div>
													<span>Ralph Edwards</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$5050,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v3" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-4.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">House</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v3" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>1040 Ocean, Santa Monica, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>3</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-8.jpg" alt="avt" />
													</div>
													<span>Jacob Jones</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/month</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v4" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-5.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
														<span className="flag-tag style-2">Office</span>
													</div>
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v4" className="link">Coastal Serenity Cottage</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>21 Hillside Drive, Beverly Hills, California</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>4</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-9.jpg" alt="avt" />
													</div>
													<span>Kathryn Murphy</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$7250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-4 col-lg-6 col-md-6">
										<div className="homeya-box">
											<div className="archive-top">
												<Link href="/property-details-v1" className="images-group">
													<div className="images-style">
														<img src="/images/home/house-6.jpg" alt="img" />
													</div>
													<div className="top">
														<ul className="d-flex gap-8">
															<li className="flag-tag success">Featured</li>
															<li className="flag-tag style-1">For Sale</li>
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
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
													<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>8 Broadway, Brooklyn, New York</p> </div>
													<ul className="meta-list">
														<li className="item">
															<i className="icon icon-bed" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-bathtub" />
															<span>2</span>
														</li>
														<li className="item">
															<i className="icon icon-ruler" />
															<span>600 SqFT</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="archive-bottom d-flex justify-content-between align-items-center">
												<div className="d-flex gap-8 align-items-center">
													<div className="avatar avt-40 round">
														<img src="/images/avatar/avt-6.jpg" alt="avt" />
													</div>
													<span>Floyd Miles</span>
												</div>
												<div className="d-flex align-items-center">
													<h6>$250,00</h6>
													<span className="text-variant-1">/SqFT</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center">
									<Link href="#" className="tf-btn primary size-1">View All Properties</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
