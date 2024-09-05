
'use client'
import Axios from "@/components/axios/axios"
import DeleteFile from "@/components/elements/DeleteFile"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function MyProperty() {


	let userid = null
	let flag = null

	const userInfo = sessionStorage.getItem("UserInfo")
	if (userInfo) {
		const { userId, username, token, isFlag } = JSON.parse(userInfo)
		// console.log(userId)
		userid = userId
		flag = isFlag
	}

	const [product, setProduct] = useState([])


	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const res = await Axios.get(`getproductsByMerchant/${userid}`)
			setProduct(res.data)

		} catch (error) {
			console.log('error')
		}
	}

console.log(product)

	return (
		<>
			<DeleteFile />
			<LayoutAdmin>
				<div className="wrap-dashboard-content">
					{/* <div className="row">
						<div className="col-md-3">
							<fieldset className="box-fieldset">
								<label htmlFor="title">
									Post Status:<span>*</span>
								</label>
								<select className="nice-select">

									<option data-value={1} className="option selected">Select</option>
									<option data-value={2} className="option">Publish</option>
									<option data-value={3} className="option">Pending</option>
									<option data-value={3} className="option">Hidden</option>
									<option data-value={3} className="option">Sold</option>

								</select>
							</fieldset>
						</div>
						<div className="col-md-9">
							<fieldset className="box-fieldset">
								<label htmlFor="title">
									Post Status:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" placeholder="Search by title" />
							</fieldset>
						</div>
					</div> */}
					<div className="widget-box-2 wd-listing">
						<h6 className="title">My Product</h6>
						<div className="wrap-table">
							<div className="table-responsive">
								<table>
									<thead>
										<tr>
											<th>Product Name</th>
											<th>Title</th>
											<th>Description</th>
											<th>Price</th>
											<th>OfferPrice</th>
											<th></th>
										</tr>
									</thead>
									{product.map((pro) => (
										<tbody>
											<tr className="file-delete">
												<td>{pro?.name}</td>
												<td>{pro?.title}</td>
												<td>{pro?.description}</td>
												<td>{pro?.price}</td>
												<td>{pro?.offerPrice}</td>
												<td>
													<Link href={{pathname:"/edit-property",query: { _id: pro?._id }}}  > <button className="btn beating-button">Edit</button></Link>

												</td>
											</tr>

										</tbody>
									))}
								</table>
							</div>
							<ul className="wd-navigation">
								<li><Link href="#" className="nav-item active">1</Link></li>
								<li><Link href="#" className="nav-item">2</Link></li>
								<li><Link href="#" className="nav-item">3</Link></li>
								<li><Link href="#" className="nav-item"><i className="icon icon-arr-r" /></Link></li>
							</ul>
						</div>
					</div>
				</div >

			</LayoutAdmin >
		</>
	)
}