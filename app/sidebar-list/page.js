'use client'
import Axios from "@/components/axios/axios"
import RangeSlider from "@/components/elements/RangeSlider"
import SidebarFilter from "@/components/elements/SidebarFilter"
import TabNav from "@/components/elements/TabNav"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import GoogleMapComponent from "../google-map/page"
export default function SidebarList() {
	const [isTab, setIsTab] = useState(2)
	const handleTab = (i) => {
		setIsTab(i)
	}


	const [product, setProduct] = useState([])


	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		fetchCategories();
	}, []);

	const getData = async () => {
		try {
			const res = await Axios.get(`getproducts`)
			// console.log(res)
			setProduct(res.data)

		} catch (error) {
			console.log('error')
		}
	}


	const [categories, setCategories] = useState([]);
	console.log(categories)


	const fetchCategories = async () => {
		try {
			const res = await Axios.get(`getcategory`);

			setCategories(res.data);

			handleCategorySelect(0, res.data?.[0]?._id);
		} catch (error) {
			console.log(error);
		}
	};


	const [keyword, setKeyword] = useState('');
	const [location, setLocation] = useState('');
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();

		// Create a filter criteria object
		const criteria = {
			keyword,
			location,
			checkIn,
			checkOut,
			category: selectedCategory
		};

		// Assuming you have a function to filter the products
		const filteredProducts = filterProducts(criteria);
		console.log(filteredProducts); // Display the filtered products or set them in state
	};

	const filterProducts = (criteria) => {
		// Filter logic based on the criteria
		return product.filter(product => {
			const matchesKeyword = criteria.keyword ? product.name.includes(criteria.keyword) : true;
			// const matchesLocation = criteria.location ? product.location.includes(criteria.location) : true;
			const matchesCheckIn = criteria.checkIn ? new Date(product.availableFrom) <= new Date(criteria.checkIn) : true;
			const matchesCheckOut = criteria.checkOut ? new Date(product.availableTo) >= new Date(criteria.checkOut) : true;
			const matchesCategory = criteria.category ? product.categoryId === criteria.category : true;

			return matchesKeyword  && matchesCheckIn && matchesCheckOut && matchesCategory;
		});
	};


	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<section className="flat-section-v6 flat-recommended flat-sidebar">
					<div className="container">
						<div className="box-title-listing">
							<div className="d-flex align-items-center" >
								<h5 className="mx-auto">Product List</h5>
							</div>

							<div className="box-filter-tab">
								{/* <ul className="nav-tab-filter" role="tablist">
									<li className="nav-tab-item" onClick={() => handleTab(1)}>
										<a className={isTab == 1 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab"><i className="icon icon-grid" /></a>
									</li>
									<li className="nav-tab-item" onClick={() => handleTab(2)}>
										<a className={isTab == 2 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab"><i className="icon icon-list" /></a>
									</li>
								</ul> */}
								{/* <select className="nice-select">

									<option data-value={1} className="option">10 Per Page</option>
									<option data-value={2} className="option">11 Per Page</option>
									<option data-value={3} className="option selected">12 Per Page</option>
								</select>
								<select className="nice-select">

									<option data-value="default" className="option selected">Sort by (Default)</option>
									<option data-value="new" className="option">Newest</option>
									<option data-value="old" className="option">Oldest</option>
								</select> */}
							</div>
						</div>
						<div className="row">
							<div className="col-xl-4 col-lg-5">
								<div className="widget-sidebar fixed-sidebar">
									<div className="flat-tab flat-tab-form widget-filter-search widget-box bg-surface">
										<div className="h7 title fw-7">Search</div>
										<ul className="nav-tab-form" role="tablist">
											<TabNav />
										</ul>
										<div className="tab-content">
											<div className="tab-pane fade active show" role="tabpanel">
												<div className="form-sl">
													<form onSubmit={handleSearch}>
														<div className="wd-filter-select">
															<div className="inner-group inner-filter">
																<div className="form-style">
																	<label className="title-select">Keyword</label>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Search Keyword."
																		name="s"
																		title="Search for"
																		value={keyword}
																		onChange={(e) => setKeyword(e.target.value)}
																		required
																	/>
																</div>
																<div className="form-style">
																	<label className="title-select">Location</label>
																	{/* <div className="group-ip ip-icon">
																		<input
																			type="text"
																			className="form-control"
																			placeholder="Search Location"
																			name="s"
																			title="Search for"
																			value={location}
																			onChange={(e) => setLocation(e.target.value)}
																			required
																		/>
																		<Link href="#" className="icon-right icon-location" />
																	</div> */}
																	<GoogleMapComponent/>
																</div>

																<div className="row p-3">
																	<div className="col-md-6">
																		<div className="form-style">
																			<label className="title-select">Check In</label>
																			<div className="group-ip ip-icon">
																				<input
																					type="date"
																					className="form-control"
																					value={checkIn}
																					onChange={(e) => setCheckIn(e.target.value)}
																					required
																				/>
																			</div>
																		</div>
																	</div>
																	<div className="col-md-6">
																		<div className="form-style">
																			<label className="title-select">Check Out</label>
																			<div className="group-ip ip-icon">
																				<input
																					type="date"
																					className="form-control"
																					value={checkOut}
																					onChange={(e) => setCheckOut(e.target.value)}
																					required
																				/>
																			</div>
																		</div>
																	</div>
																</div>

																<div className="form-style">
																	<label className="title-select">Type</label>
																	<div className="group-select">
																		<select
																			className="form-control"
																			defaultValue=""
																			onChange={(e) => setSelectedCategory(e.target.value)}
																		>
																			<option value="" disabled>Select a category</option>
																			{categories.map((cat) => (
																				<option key={cat._id} value={cat._id} className="option">
																					{cat.cattype}
																				</option>
																			))}
																		</select>
																	</div>
																</div>

																<div className="form-style">
																	<button type="submit" className="tf-btn primary">
																		Find Properties
																	</button>
																</div>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div >
									{/* <div className="widget-box bg-surface box-latest-property">
										<div className="h7 fw-7 title">Latest Propeties</div>
										<ul>
											<li className="latest-property-item">
												<Link href="/property-details-v1" className="images-style">
													<img src="/images/home/house-sm-3.jpg" alt="img" />
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Casa Lomas de Mach...</Link></div>
													<ul className="meta-list">
														<li className="item">
															<span>Bed:</span>
															<span className="fw-7">4</span>
														</li>
														<li className="item">
															<span>Bath:</span>
															<span className="fw-7">2</span>
														</li>
														<li className="item">
															<span className="fw-7">600 SqFT</span>
														</li>
													</ul>
													<div className="d-flex align-items-center">
														<div className="h7 fw-7">$5050,00</div>
														<span className="text-variant-1">/SqFT</span>
													</div>
												</div>
											</li>
											<li className="latest-property-item">
												<Link href="/property-details-v1" className="images-style">
													<img src="/images/home/house-sm-9.jpg" alt="img" />
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven...</Link></div>
													<ul className="meta-list">
														<li className="item">
															<span>Bed:</span>
															<span className="fw-7">4</span>
														</li>
														<li className="item">
															<span>Bath:</span>
															<span className="fw-7">2</span>
														</li>
														<li className="item">
															<span className="fw-7">600 SqFT</span>
														</li>
													</ul>
													<div className="d-flex align-items-center">
														<div className="h7 fw-7">$5050,00</div>
														<span className="text-variant-1">/SqFT</span>
													</div>
												</div>
											</li>
											<li className="latest-property-item">
												<Link href="/property-details-v1" className="images-style">
													<img src="/images/home/house-sm-1.jpg" alt="img" />
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Sunset Heights Estate</Link></div>
													<ul className="meta-list">
														<li className="item">
															<span>Bed:</span>
															<span className="fw-7">4</span>
														</li>
														<li className="item">
															<span>Bath:</span>
															<span className="fw-7">2</span>
														</li>
														<li className="item">
															<span className="fw-7">600 SqFT</span>
														</li>
													</ul>
													<div className="d-flex align-items-center">
														<div className="h7 fw-7">$5050,00</div>
														<span className="text-variant-1">/SqFT</span>
													</div>
												</div>
											</li>
											<li className="latest-property-item">
												<Link href="/property-details-v1" className="images-style">
													<img src="/images/home/house-sm-4.jpg" alt="img" />
												</Link>
												<div className="content">
													<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">de Machalí Machas...</Link></div>
													<ul className="meta-list">
														<li className="item">
															<span>Bed:</span>
															<span className="fw-7">4</span>
														</li>
														<li className="item">
															<span>Bath:</span>
															<span className="fw-7">2</span>
														</li>
														<li className="item">
															<span className="fw-7">600 SqFT</span>
														</li>
													</ul>
													<div className="d-flex align-items-center">
														<div className="h7 fw-7">$5050,00</div>
														<span className="text-variant-1">/SqFT</span>
													</div>
												</div>
											</li>
										</ul>
									</div> */}
								</div >
							</div >
							<div className="col-xl-8 col-lg-7">
								<div className="tab-content">
									<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="gridLayout" role="tabpanel">
										<div className="row">
											<div className="col-md-6">
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
											<div className="col-md-6">
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
											<div className="col-md-6">
												<div className="homeya-box">
													<div className="archive-top">
														<Link href="/property-details-v1" className="images-group">
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
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Rancho Vista Verde, Santa Barbara</Link></div>
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
											<div className="col-md-6">
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
											<div className="col-md-6">
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
											<div className="col-md-6">
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
											<div className="col-md-6">
												<div className="homeya-box">
													<div className="archive-top">
														<Link href="/property-details-v1" className="images-group">
															<div className="images-style">
																<img src="/images/home/house-11.jpg" alt="img" />
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
											<div className="col-md-6">
												<div className="homeya-box">
													<div className="archive-top">
														<Link href="/property-details-v1" className="images-group">
															<div className="images-style">
																<img src="/images/home/house-12.jpg" alt="img" />
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
																<img src="/images/avatar/avt-12.jpg" alt="avt" />
															</div>
															<span>Kathryn Murphy</span>
														</div>
														<div className="d-flex align-items-center">
															<h6>$2050,00</h6>
															<span className="text-variant-1">/SqFT</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<ul className="wd-navigation">
											<li><Link href="#" className="nav-item active">1</Link></li>
											<li><Link href="#" className="nav-item">2</Link></li>
											<li><Link href="#" className="nav-item">3</Link></li>
											<li><Link href="#" className="nav-item"><i className="icon icon-arr-r" /></Link></li>
										</ul>
									</div>
									<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="listLayout" role="tabpanel">
										<div className="row">
											{product?.map((pro) => (
												<div className="col-md-12">
													<div className="homeya-box list-style-1 list-style-2">
														<Link href="/property-details-v1" className="images-group">
															<div className="images-style">
																<img src={pro?.photos[0]?.url} alt="img" />
															</div>
															<div className="top">
																<ul className="d-flex gap-4 flex-wrap">
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
																<span className="flag-tag style-2">{pro.title}</span>
															</div>
														</Link>
														<div className="content">
															<div className="archive-top">
																<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">{pro.name}</Link></div>
																<div className="desc"><i className="icon icon-mapPin" /><p>{pro?.location?.address}</p> </div>
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
																	<li>
																		<Link href={{ pathname: "/property-details-v1", query: { _id: pro._id } }} >
																			<button className="btn btn-primary w-100 mb-3">Book Now</button>

																			{/* <button className="btn btn-primary w-100 mb-3">Check out</button> */}
																		</Link>
																	</li>
																</ul>
															</div>
															<div className="d-flex justify-content-between align-items-center archive-bottom">
																<div className="d-flex gap-8 align-items-center">
																	<div className="avatar avt-40 round">
																		<img src="/images/avatar/avt-8.jpg" alt="avt" />
																	</div>
																	<span>{pro.owner.name}</span>
																</div>
																<div className="d-flex align-items-center">
																	<div className="h7 fw-7">{pro.price}</div>
																	<span className="text-variant-1">/SqFT</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											))}

											{/* <div className="col-md-12">
												<div className="homeya-box list-style-1 list-style-2">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src="/images/home/house-10.jpg" alt="img" />
														</div>
														<div className="top">
															<ul className="d-flex">
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
															<span className="flag-tag style-2">House</span>
														</div>
													</Link>
													<div className="content">
														<div className="archive-top">
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe </Link></div>
															<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
														<div className="d-flex justify-content-between align-items-center archive-bottom">
															<div className="d-flex gap-8 align-items-center">
																<div className="avatar avt-40 round">
																	<img src="/images/avatar/avt-10.jpg" alt="avt" />
																</div>
																<span>Floyd Miles</span>
															</div>
															<div className="d-flex align-items-center">
																<div className="h7 fw-7">$250,00</div>
																<span className="text-variant-1">/month</span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="homeya-box list-style-1 list-style-2">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src="/images/home/house-6.jpg" alt="img" />
														</div>
														<div className="top">
															<ul className="d-flex">
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
														<div className="archive-top">
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
															<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
														<div className="d-flex justify-content-between align-items-center archive-bottom">
															<div className="d-flex gap-8 align-items-center">
																<div className="avatar avt-40 round">
																	<img src="/images/avatar/avt-5.jpg" alt="avt" />
																</div>
																<span>Ralph Edwards</span>
															</div>
															<div className="d-flex align-items-center">
																<div className="h7 fw-7">$5050,00</div>
																<span className="text-variant-1">/SqFT</span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="homeya-box list-style-1 list-style-2">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src="/images/home/house-5.jpg" alt="img" />
														</div>
														<div className="top">
															<ul className="d-flex">
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
															<span className="flag-tag style-2">apartment</span>
														</div>
													</Link>
													<div className="content">
														<div className="archive-top">
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
															<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
														<div className="d-flex justify-content-between align-items-center archive-bottom">
															<div className="d-flex gap-8 align-items-center">
																<div className="avatar avt-40 round">
																	<img src="/images/avatar/avt-9.jpg" alt="avt" />
																</div>
																<span>Annette Black</span>
															</div>
															<div className="d-flex align-items-center">
																<div className="h7 fw-7">$250,00</div>
																<span className="text-variant-1">/month</span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="homeya-box list-style-1 list-style-2">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src="/images/home/house-1.jpg" alt="img" />
														</div>
														<div className="top">
															<ul className="d-flex">
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
															<span className="flag-tag style-2">apartment</span>
														</div>
													</Link>
													<div className="content">
														<div className="archive-top">
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Casa Lomas de Machalí Machas</Link></div>
															<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
														<div className="d-flex justify-content-between align-items-center archive-bottom">
															<div className="d-flex gap-8 align-items-center">
																<div className="avatar avt-40 round">
																	<img src="/images/avatar/avt-8.jpg" alt="avt" />
																</div>
																<span>Jacob Jones</span>
															</div>
															<div className="d-flex align-items-center">
																<div className="h7 fw-7">$5050,00</div>
																<span className="text-variant-1">/SqFT</span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="homeya-box list-style-1 list-style-2">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src="/images/home/house-13.jpg" alt="img" />
														</div>
														<div className="top">
															<ul className="d-flex">
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
															<span className="flag-tag style-2">apartment</span>
														</div>
													</Link>
													<div className="content">
														<div className="archive-top">
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
															<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
														<div className="d-flex justify-content-between align-items-center archive-bottom">
															<div className="d-flex gap-8 align-items-center">
																<div className="avatar avt-40 round">
																	<img src="/images/avatar/avt-9.jpg" alt="avt" />
																</div>
																<span>Annette Black</span>
															</div>
															<div className="d-flex align-items-center">
																<div className="h7 fw-7">$250,00</div>
																<span className="text-variant-1">/month</span>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="homeya-box list-style-1 list-style-2">
													<Link href="/property-details-v1" className="images-group">
														<div className="images-style">
															<img src="/images/home/house-4.jpg" alt="img" />
														</div>
														<div className="top">
															<ul className="d-flex">
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
															<span className="flag-tag style-2">House</span>
														</div>
													</Link>
													<div className="content">
														<div className="archive-top">
															<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
															<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
														<div className="d-flex justify-content-between align-items-center archive-bottom">
															<div className="d-flex gap-8 align-items-center">
																<div className="avatar avt-40 round">
																	<img src="/images/avatar/avt-9.jpg" alt="avt" />
																</div>
																<span>Kathryn Murphy</span>
															</div>
															<div className="d-flex align-items-center">
																<div className="h7 fw-7">$250,00</div>
																<span className="text-variant-1">/month</span>
															</div>
														</div>
													</div>
												</div>
											</div> */}
										</div>
										{/* <ul className="justify-content-center wd-navigation">
											<li><Link href="#" className="nav-item active">1</Link></li>
											<li><Link href="#" className="nav-item">2</Link></li>
											<li><Link href="#" className="nav-item">3</Link></li>
											<li><Link href="#" className="nav-item"><i className="icon icon-arr-r" /></Link></li>
										</ul> */}
									</div>
								</div>
							</div>
						</div >
					</div >
				</section >

			</Layout >
		</>
	)
}