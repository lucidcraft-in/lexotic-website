
'use client'
import Axios from "@/components/axios/axios"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { useEffect, useState } from "react"
import imageCompression from "browser-image-compression"
export default function MyProfile() {


	const [userr, setUserr] = useState([])
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [place, setPlace] = useState('')
	const [post, setPost] = useState('')
	const [pin, setPin] = useState('')
	const [phone, setPhone] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [newpassword, setNewPassword] = useState('')
	const [country, setCountry] = useState('')
	const [currency, setCurrency] = useState('')


	const [userInfo, setUserInfo] = useState(null)

	let userid = null
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
	  userid = userId
	  flag = isFlag
	}


	// let userid = null
	// let flag = null

	// const userInfo = sessionStorage.getItem("UserInfo")
	// if (userInfo) {
	// 	const { userId, username, token, isFlag } = JSON.parse(userInfo)
	// 	// console.log(userId)
	// 	userid = userId
	// 	flag = isFlag
	// }



	useEffect(() => {
		getData()
	}, [])



	const getData = async () => {
		const res = await Axios.get(`/user/${userid}`)
		const userData = res.data
		console.log(userData)
		setUserr(res.data)
		setName(userData?.name)
		setCountry(userData?.country)
		setEmail(userData?.email)
		setPlace(userData?.place)
		setPhone(userData?.phone)
		setUsername(userData?.username)
		setPassword(userData.password)
		setCurrency(userData.currency)
		setPost(userData?.post)
		setPin(userData?.pin)
		setPhotos(userData?.image)


	}

	const handleUpdate = async () => {
		const profilePhoto = photos || userr.image
		const data = {
			name,
			email,
			place,
			post,
			pin,
			phone,
			username,
			country,
			currency,
			image:profilePhoto
		}

		try {
			const res = await Axios.put(`/updateuser/${userid}`, data)
			console.log("successfully updated")
		} catch (error) {
			console.log(error, "some error occured!!!")

		}
	}

	// console.log(userid,"hhhhhhhhhhh")
	const [photos, setPhotos] = useState([]);

	const uploadFileHandler = async (e, val) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (!file) {
			console.error("No file selected");
			return;
		}

		// Log file info
		console.log("Selected file:", file);

		const options = {
			maxSizeMB: 0.2, // Compress to a maximum of 0.2 MB
			maxWidthOrHeight: 800,
			useWebWorker: true,
		};

		try {
			const compressedFile = await imageCompression(file, options);

			const newFile = new File([compressedFile], file.name, { type: file.type });

			const formData = new FormData();
			formData.append('file', newFile);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const response = await Axios.post('/upload', formData, config);
			console.log("Upload successful, response data:", response.data);

			// if (val === 'photos') {
				setPhotos(response.data.url);
			// }

		} catch (error) {
			console.error("Error during file upload:", error);
		}
	};


	console.log(photos)

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
								<img src={photos} alt="avatar" loading="lazy" width={128} height={128} />
							</div>
							<div className="content uploadfile">
								<p>Upload a new avatar</p>
								<div className="box-ip">
									<input type="file" className="ip-file"
									onChange={(e)=>uploadFileHandler(e)}
									// accept="image/jpeg,image/png"
									 />
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
						<input type="text" placeholder="enter your name" className="form-control style-1"
							value={name}
							onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="desc">Email address:<span>*</span></label>
						<input type="text" placeholder="themeflat@gmail.com" className="form-control style-1"
							value={email}
							onChange={(e) => setEmail(e.target.value)} />


					</div>
					<div className="box grid-4 gap-30">
						<div className="box-fieldset">
							<label htmlFor="company">Place:<span>*</span></label>
							<input type="text" placeholder="enter your place" className="form-control style-1"
								value={place}
								onChange={(e) => setPlace(e.target.value)} />
						</div>
						<div className="box-fieldset">
							<label htmlFor="position">Post:<span>*</span></label>
							<input type="text" placeholder="enter your post" className="form-control style-1"
								value={post}
								onChange={(e) => setPost(e.target.value)} />
						</div>
						<div className="box-fieldset">
							<label htmlFor="num">Pin:<span>*</span></label>
							<input type="number" placeholder="emter pin" className="form-control style-1"
								value={pin}
								onChange={(e) => setPin(e.target.value)} />
						</div>
						<div className="box-fieldset">
							<label htmlFor="num">Phone Number:<span>*</span></label>
							<input type="number" placeholder="entre phone number" className="form-control style-1"
								value={phone}
								onChange={(e) => setPhone(e.target.value)} />
						</div>
					</div>
					<div className="box grid-4 gap-30 box-info-2">
						<div className="box-fieldset">
							<label htmlFor="job">Username:<span>*</span></label>
							<input type="text" placeholder="enter username" className="form-control style-1"
								value={username}
								onChange={(e) => setUsername(e.target.value)} />
						</div>

					</div>
					<div className="box box-fieldset">
						<label htmlFor="location">Country:<span>*</span></label>
						<input type="text" placeholder="enter your country" className="form-control style-1"
							value={country}
							onChange={(e) => setCountry(e.target.value)} />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="fb">Currency:<span>*</span></label>
						<input type="text" placeholder="#" className="form-control style-1"
							value={currency}
							onChange={(e) => { setCurrency(e.target.value) }} />
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
						<button className="tf-btn primary" onClick={handleUpdate}>Save &amp; Update</button>
					</div>
					{/* <h6 className="title">Change password</h6>
					<div className="box grid-3 gap-30">
						<div className="box-fieldset">
							<label htmlFor="old-pass">Old Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field" placeholder="Password"
									value={password} />
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
								<input type="password" className="form-contact style-1 password-field3" placeholder="Password"
									value={newpassword} />
								<span className="show-pass3">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
					</div> */}
					{/* <div className="box">
						<Link href="#" className="tf-btn primary">Update Password</Link>
					</div> */}
				</div>

			</LayoutAdmin>
		</>
	)
}