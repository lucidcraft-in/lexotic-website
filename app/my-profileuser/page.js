
'use client'
import Axios from "@/components/axios/axios"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function MyProfile() {


	const [user, setUser] = useState([])
	// const [name,setName]=useState('')
	// const [email,setEmail]=useState('')
	// const [place,setPlace]=useState('')
	// const [post,setPost]=useState('')
	// const [pin,setPin]=useState('')
	// const [name,setName]=useState('')
	// const [name,setName]=useState('')
	// const [name,setName]=useState('')
	// const [name,setName]=useState('')


	let userid = null
	let flag = null

	const userInfo = sessionStorage.getItem("UserInfo")
	if (userInfo) {
		const { userId, username, token, isFlag } = JSON.parse(userInfo)
		console.log(userId)
		userid = userId
		flag = isFlag
	}

	console.log(userid)

	useEffect(() => {
		getData()
	}, [])



	const getData = async () => {
		const res = await Axios.get(`/user/${userid}`)
		setUser(res.data)
		

	}

	console.log(user)



	return (
		<>

			<LayoutAdmin>
				<div className="widget-box-2 wrap-dashboard-content-2">
					<div className="box">
						<h6 className="title">User Account Settings</h6>
						{/* <div className="box-agent-account">
							<h6>Agent Account</h6>
							<p className="note">Your current account type is set to agent, if you want to remove your agent account, and return to normal account, you must click the button below</p>
							<Link href="#" className="tf-btn primary">Remove Agent Account</Link>
						</div> */}
					</div>
					<div className="box">
						<h6 className="title">Profile Photo</h6>
						<div className="box-agent-avt">
							<div className="avatar">
								<img src="/images/avatar/account.jpg" alt="avatar" loading="lazy" width={128} height={128} />
							</div>
							<div className="content uploadfile">
								<p>Upload a new avatar</p>
								<div className="box-ip">
									<input type="file" className="ip-file" />
								</div>
								<p>JPEG 100x100</p>
							</div>
						</div>
					</div>
					{/* <div className="box">
						<h6 className="title">Agent Poster</h6>
						<div className="box-agent-avt">
							<div className="img-poster">
								<img src="/images/avatar/account-2.jpg" alt="avatar" loading="lazy" />
							</div>
							<div className="content uploadfile">
								<p>Upload a new poster</p>
								<div className="box-ip">
									<input type="file" className="ip-file" />
								</div>
								<span>JPEG 100x100</span>
							</div>
						</div>
					</div> */}
					<h6 className="title">Information</h6>
					<div className="box box-fieldset">
						<label htmlFor="name">Full name:<span>*</span></label>
						<input type="text" placeholder="enter your name" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="desc">Email address:<span>*</span></label>
						<input type="text" placeholder="themeflat@gmail.com" className="form-control style-1" />


					</div>
					<div className="box grid-4 gap-30">
						<div className="box-fieldset">
							<label htmlFor="company">Place:<span>*</span></label>
							<input type="text" placeholder="enter your place" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="position">Post:<span>*</span></label>
							<input type="text" placeholder="enter your post" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="num">Pin:<span>*</span></label>
							<input type="number" placeholder="emter pin" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="num">Phone Number:<span>*</span></label>
							<input type="number" placeholder="entre phone number" className="form-control style-1" />
						</div>
					</div>
					<div className="box grid-4 gap-30 box-info-2">
						<div className="box-fieldset">
							<label htmlFor="job">Username:<span>*</span></label>
							<input type="text" placeholder="enter username" className="form-control style-1" />
						</div>

					</div>
					<div className="box box-fieldset">
						<label htmlFor="location">Country:<span>*</span></label>
						<input type="text" placeholder="enter your country" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="fb">Currency:<span>*</span></label>
						<input type="text" placeholder="#" className="form-control style-1" />
					</div>
					{/* <div className="box box-fieldset">
						<label htmlFor="tw">Twitter:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="linkedin">Linkedin:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div> */}
					<div className="box">
						<Link href="#" className="tf-btn primary">Save &amp; Update</Link>
					</div>
					<h6 className="title">Change password</h6>
					<div className="box grid-3 gap-30">
						<div className="box-fieldset">
							<label htmlFor="old-pass">Old Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field" placeholder="Password" />
								<span className="show-pass">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
						<div className="box-fieldset">
							<label htmlFor="new-pass">New Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field2" placeholder="Password" />
								<span className="show-pass2">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
						<div className="box-fieldset">
							<label htmlFor="confirm-pass">Confirm Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field3" placeholder="Password" />
								<span className="show-pass3">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
					</div>
					<div className="box">
						<Link href="#" className="tf-btn primary">Update Password</Link>
					</div>
				</div>

			</LayoutAdmin>
		</>
	)
}