'use client'
import Axios from "@/components/axios/axios"
import PropertyMap from "@/components/elements/PropertyMap"
import RangeSlider from "@/components/elements/RangeSlider"
import SidebarFilter from "@/components/elements/SidebarFilter"
import TabNav from "@/components/elements/TabNav"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, Button, Table, Modal, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/fontawesome-free"
export default function PropertyHalfmapList() {
	const [isTab, setIsTab] = useState(2)
	const handleTab = (i) => {
		setIsTab(i)
	}

	const [userInfo, setUserInfo] = useState(null)

	let user = null
	let flag = null
	let storageUserInfo
  
	useEffect(() => {
	  if (typeof window !== "undefined") {
		storageUserInfo = sessionStorage.getItem('UserInfo')
		setUserInfo(storageUserInfo)
  
	  }
	}, [])
  
	if (storageUserInfo) {
	  const { userId, username, token, isFlag } = JSON.parse(userInfo)
	  user = userId
	  flag = isFlag
	}

	const [paymentMethod, setPaymentMethod] = useState('');
	const [showModal, setShowModal] = useState(false);

	const handlePaymentSubmit = (e) => {
		e.preventDefault();
		console.log('Selected Payment Method:', paymentMethod);
		// Further processing based on selected payment method
	};

	const getData = async () => {
		try {
			const res = await Axios.get(`/cart/${user}`);
			// console.log(res.data);
			// Ensure the response structure matches your expectations
			setCart(res.data || { items: [] }); // Default to empty items array if data is not available
		} catch (error) {
			console.error("Failed to fetch cart data:", error);
			setCart({ items: [] }); // Handle error by setting an empty cart
		}
	};

	console.log(cart)

	const handleCheckout = async (e) => {
		e.preventDefault();
		console.log(cart);

		// Initialize totalAmount
		let totalAmount = 0;

		// Select the first cart in the array (adjust as needed)
		const selectedCart = cart[0]; // or apply logic to choose the appropriate cart

		// Ensure selectedCart and selectedCart.items are defined and is an array
		if (selectedCart && Array.isArray(selectedCart.items)) {
			const items = selectedCart.items.map(item => {
				const days = (new Date(item.rentalEndDate) - new Date(item.rentalStartDate)) / (1000 * 60 * 60 * 24);
				const totalItemPrice = item.pricePerDay * item.quantity * days;
				totalAmount += totalItemPrice;
				return {
					...item,
					totalItemPrice
				};
			});

			const data = {
				userId: user,
				items,
				totalAmount,
				orderDate: new Date().toISOString(),
				merchantId: selectedCart.merchantId,
				orderStatus: 'pending',
				status: 'done',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString() // Fixed typo
			};

			console.log(data);

			try {
				const res = await Axios.post(`/order`, data);
				console.log("Order created successfully", res.data);
			} catch (error) {
				console.log("Failed to create order", error);
			}
		} else {
			console.error("Selected cart or selectedCart.items is not properly defined");
		}
	};

	// Ensure you pass handleCheckout as a function


	const onRemove = async (cartId) => {
		// console.log(cartId)
		const del = await Axios.delete(`/cart/${cartId}`)
		console.log("deleted successfully", del)
		getData()
	}

	let photoUrl;
	const convenienceFeePercentage = 0.05; // 5% convenience fee
	const taxPercentage = 0.1; // 10% tax
	// Initialize total amounts
	let totalProductPrice = 0;

	const cartItems = cart.map((cartItem, cartIndex) => {
		return cartItem.items.map(item => {
			const days = (new Date(item.rentalEndDate) - new Date(item.rentalStartDate)) / (1000 * 60 * 60 * 24);
			const totalItemPrice = item.pricePerDay * item.quantity * days;
			totalProductPrice += totalItemPrice;

			// Access properties from item.productId
			const product = item.productId;
			const photo = product.photos[0] || {}; // Access the first photo or default to an empty object
			 photoUrl = photo.url || '/path/to/default-image.jpg'; // Provide a default image if no photo
			const photoTitle = photo.title || 'No Title'; // Provide a default title if no photo

			return (
				<tr key={item._id}>
					<td>{cartIndex + 1}</td>
					<td>{product._id}</td> {/* Or use another property like product.name if available */}
					<td>{new Date(item.rentalStartDate).toLocaleDateString()}</td>
					<td>{new Date(item.rentalEndDate).toLocaleDateString()}</td>
					<td>${item.pricePerDay.toFixed(2)}</td>
					<td>{item.quantity}</td>
					<td>${totalItemPrice.toFixed(2)}</td>
					<td>
						<img src={photoUrl} alt={photoTitle} style={{ width: '50px', height: '50px' }} /> {/* Display photo */}
					</td>
				</tr>
			);
		});
	});

	console.log(photoUrl)

	// Calculate convenience fee and tax
	const convenienceFee = totalProductPrice * convenienceFeePercentage;
	const tax = totalProductPrice * taxPercentage;
	const finalTotal = totalProductPrice + convenienceFee + tax;





	return (
		<>

			<Layout headerStyle={1}>
				<section className="wrapper-layout-3">



					<div className="wrap-inner">
						<div className="box-title-listing style-1">

						</div>
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
								</div>
							</div>
							<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="listLayout" role="tabpanel">
								<div className="row">
									{/* <div className="col-md-12">
										<div className="homeya-box list-style-1 list-style-2">
											<Link href="/property-details-v1" className="images-group">
												<div className="images-style">
													<img src="/images/home/house-9.jpg" alt="img" />
												</div>
												<div className="top">
													<ul className="d-flex gap-4 flex-wrap">
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
									</div> */}
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
									</div> */}
									{/* <div className="col-md-12">
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
									</div> */}


									<div className="col-md-12">
										{cart.length > 0 ? (
											cart.map((cart, index) => (
												cart.items.length > 0 ? (
													cart.items.map((item, index) => (


														<div className="homeya-box list-style-1 list-style-2">
															<Link href="/property-details-v1" className="images-group">
																<div className="images-style">
																	<img src={photoUrl} alt="img" />
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
																			<span>{cart.items[0]?.quantity}</span>
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
																		{/* <span>Annette Black</span> */}
																		<span>Total Price : {cart?.totalRentalPrice}</span>
																	</div>
																	<div className="d-flex align-items-center">
																		<div className="h7 fw-7">{cart.items[0].pricePerDay}</div>
																		<span className="text-variant-1">/month</span>
																	</div>
																	{/* Remove Icon Button */}
																	<button
																		className="btn btn-danger"
																		onClick={() => onRemove(cart._id)}
																		aria-label="Remove item"
																	>
																		Remove
																	</button>
																</div>
															</div>
														</div>
													))
												)
													: (
														<p>No items in cart</p>

													)
											))
										) : (
											<p>No carts available</p>

										)
										}


									</div>

									{/* <div className="d-flex justify-content-center ">
										<button type="submit" className="btn btn-primary " onClick={handleCheckout}> Check Out</button>
									</div> */}




								</div>
							</div>
						</div>
					</div >











					{/* ///////////////////////// */}

					<div className="wrap-sidebar">
						{/* <div className="flat-tab flat-tab-form widget-filter-search">
							<div className="h7 title fw-7">Search</div>
							<ul className="nav-tab-form" role="tablist">
								<TabNav />
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade active show" role="tabpanel">
									<div className="form-sl">
										<form method="post">
											<div className="wd-filter-select">
												<div className="inner-group inner-filter">
													<div className="form-style">
														<label className="title-select">Keyword</label>
														<input type="text" className="form-control" placeholder="Search Keyword." name="s" title="Search for" required />
													</div>
													<div className="form-style">
														<label className="title-select">Location</label>
														<div className="group-ip ip-icon">
															<input type="text" className="form-control" placeholder="Search Location" name="s" title="Search for" required />
															<Link href="#" className="icon-right icon-location" />
														</div>
													</div>
													<div className="form-style">
														<label className="title-select">Type</label>
														<div className="group-select">
															<select className="nice-select">

																<li data-value className="option selected">All</li>
																<option data-value="villa" className="option">Villa</option>
																<option data-value="studio" className="option">Studio</option>
																<option data-value="office" className="option">Office</option>
															</select>
														</div>
													</div>
													<div className="form-style box-select">
														<label className="title-select">Rooms</label>
														<select className="nice-select">

															<option data-value={2} className="option">1</option>
															<option data-value={2} className="option selected">2</option>
															<option data-value={3} className="option">3</option>
															<option data-value={4} className="option">4</option>
															<option data-value={5} className="option">5</option>
															<option data-value={6} className="option">6</option>
															<option data-value={7} className="option">7</option>
															<option data-value={8} className="option">8</option>
															<option data-value={9} className="option">9</option>
															<option data-value={10} className="option">10</option>
														</select>
													</div>
													<div className="form-style box-select">
														<label className="title-select">Bathrooms</label>
														<select className="nice-select">

															<option data-value="all" className="option">All</option>
															<option data-value={1} className="option">1</option>
															<option data-value={2} className="option">2</option>
															<option data-value={3} className="option">3</option>
															<option data-value={4} className="option selected">4</option>
															<option data-value={5} className="option">5</option>
															<option data-value={6} className="option">6</option>
															<option data-value={7} className="option">7</option>
															<option data-value={8} className="option">8</option>
															<option data-value={9} className="option">9</option>
															<option data-value={10} className="option">10</option>
														</select>
													</div>
													<div className="form-style box-select">
														<label className="title-select">Bedrooms</label>
														<select className="nice-select">

															<option data-value={1} className="option">All</option>
															<option data-value={1} className="option">1</option>
															<option data-value={2} className="option">2</option>
															<option data-value={3} className="option">3</option>
															<option data-value={4} className="option selected">4</option>
															<option data-value={5} className="option">5</option>
															<option data-value={6} className="option">6</option>
															<option data-value={7} className="option">7</option>
															<option data-value={8} className="option">8</option>
															<option data-value={9} className="option">9</option>
															<option data-value={10} className="option">10</option>
														</select>
													</div>
													<div className="form-style widget-price">
														<RangeSlider />
													</div>
													<div className="form-style widget-price wd-price-2">
														<RangeSlider />
													</div>
													<SidebarFilter />
													<div className="form-btn-fixed">
														<button type="submit" className="tf-btn primary" href="#">Find Properties</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div >
						</div > */}


						<div className="container mt-4">
							<Card className="mb-3">
								<Card.Header>
									<h4>Cart Summary</h4>
								</Card.Header>

								<Card.Body>
									<div className="table-responsive">
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>#</th>
													<th>Product ID</th>
													<th>From</th>
													<th>To</th>
													<th>Price Per Day</th>
													<th>Quantity</th>
													<th>Total Item Price</th>
												</tr>
											</thead>
											<tbody>
												{cartItems}
											</tbody>
										</Table>


									</div>
								</Card.Body>

								<Card.Footer>
									<div className="d-flex justify-content-between">
										<span>Total Product Price:</span>
										<span>${totalProductPrice.toFixed(2)}</span>
									</div>
									<div className="d-flex justify-content-between">
										<span>Convenience Fee (5%):</span>
										<span>${convenienceFee.toFixed(2)}</span>
									</div>
									<div className="d-flex justify-content-between">
										<span>Tax (10%):</span>
										<span>${tax.toFixed(2)}</span>
									</div>
									<hr />
									<div className="d-flex justify-content-between font-weight-bold">
										<span>Total Amount:</span>
										<span>${finalTotal.toFixed(2)}</span>
									</div>

									<br />
									<br />
									<br />


									<div className="payment-section mt-4">
										<h5>Select Payment Method</h5>
										<Form onSubmit={handlePaymentSubmit}>
											<Form.Check
												type="radio"
												label="Cash on Delivery (COD)"
												value="COD"
												name="paymentMethod"
												onChange={(e) => setPaymentMethod(e.target.value)}
												className="mb-2"
											/>
											<Form.Check
												type="radio"
												label="Online Payment"
												value="Online"
												name="paymentMethod"
												onChange={(e) => setPaymentMethod(e.target.value)}
												className="mb-2"
											/>
											{/* <Button type="submit" variant="success" className="mt-3">
												Proceed with {paymentMethod || 'Payment'}
											</Button> */}
										</Form>
									</div>



									<Button className="mt-3 w-100"  onClick={handleCheckout}>
										Checkout
									</Button>


								</Card.Footer>
							</Card>
						</div>
					</div >
					{/* <div className="wrap-map">
						<PropertyMap />
					</div> */}
				</section >

			</Layout >
		</>
	)
}