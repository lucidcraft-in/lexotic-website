'use client'
import Axios from "@/components/axios/axios"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import { useId } from "react"
import { useEffect, useState } from "react"
export default function Reviews() {


	const [review, setReview] = useState([])

	
	// 
	

	let user = null
	let flag = null

	const userInfo = sessionStorage.getItem("UserInfo")
	if (userInfo) {
		const { userId, username, token, isFlag } = JSON.parse(userInfo)
		// console.log(userId)
		user = userId
		flag = isFlag
	}

	console.log(user)


	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const res = await Axios.get(`/productsreview/${user}`)
			console.log("review data", res.data.reviews)
			setReview(res.data.reviews)

		} catch (error) {
			console.log("some error occured", error)

		}
	}

	return (
		<>

			<LayoutAdmin fixedfooter>
				<div className="widget-box-3 mess-box">
					<div className="container mt-4">
						<div className="row">
							{review.map((review) => (
								<div key={review._id} className="col-md-4 mb-4">
									<div className="card shadow-sm">
										<div className="card-body">
											<h5 className="card-title">{review.userName}</h5>
											<p className="card-text">{review.note}</p>
											<p className="card-text">
												<small className="text-muted">Rating: {review.rating}</small>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

			</LayoutAdmin>
		</>
	)
}