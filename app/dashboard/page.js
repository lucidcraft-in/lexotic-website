
'use client'
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import CountetNumber from "@/components/elements/CountetNumber"
import DashboardChart from "@/components/elements/DashboardChart"
import DeleteFile from "@/components/elements/DeleteFile"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import Axios from "@/components/axios/axios"
import { Chela_One } from "next/font/google"
export default function Dashboard() {
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())

	const [countreport, setCountReport] = useState([])


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


	useEffect(() => {

		getData()
	}, [])


	const [order, setOrder] = useState([])






	const [totalOrders, setTotalOrders] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);

	const handleSearch = async () => {
		if (!startDate || !endDate || !user) {
			alert('Please select both start and end dates and enter the merchant ID.');
			return;
		}

		try {
			// console.log(user)

			const response = await Axios.get(
				`orderReport/${user}`, // API endpoint
				{
					startDate,
					// Format as YYYY-MM-DD
					endDate
				}
			);

			setOrder(response.data.orders); // Update the orders list with the response
		} catch (error) {
			console.error('Error fetching orders:', error);
			alert('Error fetching orders. Check console for more details.');
		}

	};


	const getData = async () => {
		const res = await Axios.get(`/reportcounts/${user}`)
		console.log(res.data)
		setCountReport(res.data)
	}

	return (
		<>
			<DeleteFile />
			<LayoutAdmin>
				<div>
					<div className="flat-counter-v2 tf-counter">
						<div className="counter-box">
							<div className="box-icon w-68 round">
								<span className="icon icon-list-dashes" />
							</div>
							<div className="content-box">
								<div className="title-count">your products</div>
								<div className="d-flex align-items-end">
									{/* <h6 className="number" data-speed={2000} data-to={17} ><CountetNumber count={17} /></h6> */}
									<h6 className="fw-7 text-variant-2">{countreport.productCount}</h6>
								</div>
							</div>
						</div>
						<div className="counter-box">
							<div className="box-icon w-68 round">
								<span className="icon icon-clock-countdown" />
							</div>
							<div className="content-box">
								<div className="title-count">Pending orders</div>
								<div className="d-flex align-items-end">
									{/* <h6 className="number" data-speed={2000} data-to={0}><CountetNumber count={0} /></h6> */}
									<h6 className="fw-7 text-variant-2">{countreport.pendingOrdersCount}</h6>

								</div>
							</div>
						</div>
						<div className="counter-box">
							<div className="box-icon w-68 round">
								<span className="icon icon-bookmark" />
							</div>
							<div className="content-box">
								<div className="title-count">total orders</div>
								<div className="d-flex align-items-end">
									{/* <h6 className="number" data-speed={2000} data-to={1}><CountetNumber count={1} /></h6> */}
									<h6 className="fw-7 text-variant-2">{countreport.countorder}</h6>

								</div>
							</div>
						</div>
						<div className="counter-box">
							<div className="box-icon w-68 round">
								<span className="icon icon-review" />
							</div>
							<div className="content-box">
								<div className="title-count">Reviews</div>
								<div className="d-flex align-items-end">
									{/* <h6 className="number" data-speed={2000} data-to={17}><CountetNumber count={17} /></h6> */}
									<h6 className="fw-7 text-variant-2">{countreport.reviewCount}</h6>

								</div>
							</div>
						</div>
					</div>
					<div className="wrapper-content row">
						<div className="col-xl-9">
							<div className="widget-box-2 wd-listing">
								<h6 className="title">Revenue</h6>
								<div className="wd-filter">
									{/* <div className="ip-group">
										<input type="text" placeholder="Search" />
									</div> */}
									<div className="ip-group icon">
										<DatePicker
											selected={startDate}
											onChange={(date) => setStartDate(date)}
											className="ip-datepicker icon hasDatepicker" />
									</div>
									<div className="ip-group icon">
										<DatePicker
											selected={endDate}
											onChange={(date) => setEndDate(date)}
											className="ip-datepicker icon hasDatepicker" />
									</div>
									<div>
										<button className="btn btn-success"
											onClick={handleSearch}>Search</button>
									</div>
									{/* <div className="ip-group">
										<select className="nice-select">

											<option data-value={1} className="option selected">Select</option>
											<option data-value={2} className="option">Today</option>
											<option data-value={3} className="option">Yesterday</option>

										</select>
									</div> */}
								</div>
								{/* <div className="d-flex gap-4"><span className="text-primary fw-7">17</span><span className="text-variant-1">Results found</span></div> */}
								<div className="wrap-table">
									<div className="table-responsive">
										<table>

											<thead>
												<tr>
													<th>Total Order(count)</th>
													<th>Amount</th>
													{/* <th>Action</th> */}
												</tr>
											</thead>

											{order.map((order) => (
												<tbody key={order._id}>
													<tr className="file-delete">
														<td>{order.totalAmount}</td>
														<td>{new Date(order.orderDate).toLocaleDateString()}</td>
														{/* <td></td> */}
													</tr>


												</tbody>
											))}

										</table>
									</div>
									{/* <ul className="wd-navigation">
										<li><Link href="#" className="nav-item active">1</Link></li>
										<li><Link href="#" className="nav-item">2</Link></li>
										<li><Link href="#" className="nav-item">3</Link></li>
										<li><Link href="#" className="nav-item"><i className="icon icon-arr-r" /></Link></li>
									</ul> */}
								</div>
							</div>
							{/* <div className="widget-box-2 wd-chart">
								<h6 className="title">Page Inside</h6>
								<div className="wd-filter-date">
									<div className="left">
										<div className="dates active">Day</div>
										<div className="dates">Week</div>
										<div className="dates">Month</div>
										<div className="dates">Year</div>
									</div>
									<div className="right">
										<div className="ip-group icon">
											<input type="text" id="datepicker3" className="ip-datepicker icon" placeholder="From Date" />
										</div>
										<div className="ip-group icon">
											<input type="text" id="datepicker4" className="ip-datepicker icon" placeholder="To Date" />
										</div>
									</div>
								</div>
								<div className="chart-box">
									<DashboardChart />
								</div>
							</div> */}
						</div>
						{/* <div className="col-xl-3">
							<div className="widget-box-3 mess-box">
								<h6>Messages</h6>
								<span className="text-variant-1">No message</span>
							</div>
							<div className="widget-box-3 recent-box">
								<h6>Recent Reviews</h6>
								<div className="box-tes-item">
									<div className="box-avt d-flex align-items-center gap-12">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-2.jpg" alt="avatar" />
										</div>
										<p>February 18, 2024</p>
									</div>
									<p className="note p-16">
										The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
									</p>
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
								</div>
								<div className="box-tes-item">
									<div className="box-avt d-flex align-items-center gap-12">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-2.jpg" alt="avatar" />
										</div>
										<p>February 18, 2024</p>
									</div>
									<p className="note p-16">
										The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
									</p>
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
								</div>
								<div className="box-tes-item">
									<div className="box-avt d-flex align-items-center gap-12">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-2.jpg" alt="avatar" />
										</div>
										<p>February 18, 2024</p>
									</div>
									<p className="note p-16">
										The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
									</p>
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
								</div>
								<div className="box-tes-item">
									<div className="box-avt d-flex align-items-center gap-12">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-2.jpg" alt="avatar" />
										</div>
										<p>February 18, 2024</p>
									</div>
									<p className="note p-16">
										The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
									</p>
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
								</div>
							</div>
						</div> */}
					</div>
				</div>

			</LayoutAdmin >
		</>
	)
}