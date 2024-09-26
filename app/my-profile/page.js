'use client'

import Axios from "@/components/axios/axios";
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
export default function MyProfile() {

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


	// let user = null
	// let flag = null

	// const userInfo = sessionStorage.getItem("UserInfo")
	// if (userInfo) {
	// 	const { userId, username, token, isFlag } = JSON.parse(userInfo)
	// 	// console.log(userId)
	// 	user = userId
	// 	flag = isFlag
	// }

	console.log(user)


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [phone, setPhone] = useState('');
	const [altphone, setAltPhone] = useState('');
	const [location, setLocation] = useState('');
	const [acc, setAcc] = useState('');
	const [ifsc, setIfsc] = useState('');
	const [branch, setBranch] = useState('');
	const [currency, setCurrency] = useState('');
	const [status, setStatus] = useState('created');
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [userr, setUserr] = useState([])



	const [merchant, setMerchant] = useState([])

	useEffect(() => {
		getData()
	}, [])


	const getData = async () => {
		const res = await Axios.get(`/merchants/${user}`)
		console.log(res.data)
		const merchant = res.data
		setUserr(merchant)
		setName(merchant.name)
		setDescription(merchant.description)
		setImage(merchant.image)
		setEmail(merchant.email)
		setUsername(merchant.username)
		setPassword(merchant.password)
		setPhone(merchant.phone)
		setAltPhone(merchant.altNumber)
		setLocation(merchant.location)
		setAcc(merchant.accountNumber)
		setIfsc(merchant.ifsc)
		setBranch(merchant.branch)
		setCurrency(merchant.currency)
		setStatus(merchant.status)
		setPhotos(merchant?.image)



		if (res.status === 201) {
			setMerchant(res.data)
		}
	}

	// console.log(merchant)

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

	const handleSubmit = async (e) => {
		e.preventDefault()
		const profilePhoto = photos || userr.image

		const data = {
			name, description, email, username,
			phone, altNumber: altphone, location,
			accountNumber: acc, ifsc, branch, currency, status,
			image: profilePhoto

		}
		try {
			setLoading(true)
			const res = await Axios.put(`/updatemerchants/${user}`, data)
			if (res.status === 201) {
				console.log(res.data)
				setLoading(false)
				console.log("successfully updated")
				toast.success(res.json)
				// navigate('/merchant')
			} else {
				toast.warning('error occured')
			}

		} catch (error) {
			setLoading(false)
			toast.error('failed to update')
		}

	}


	return (
		<>

			<LayoutAdmin>
				<div className="widget-box-2 wrap-dashboard-content-2">
					<div className="box">
						<h6 className="title"> Merchant Account Settings</h6>
						{/* <div className="box-agent-account">
							<h6>Agent Account</h6>
							<p className="note">Your current account type is set to agent, if you want to remove your agent account, and return to normal account, you must click the button below</p>
							<Link href="#" className="tf-btn primary">Remove Agent Account</Link>
						</div> */}
					</div>
					<div className="box">
						<h6 className="title">Photo Upload</h6>
						<div className="box-agent-avt">
							<div className="avatar">
								<img src={photos} alt="avatar" loading="lazy" width={128} height={128} />
							</div>
							<div className="content uploadfile">
								<p>Upload a new avatar</p>
								<div className="box-ip">
									<input type="file" className="ip-file"
										onChange={(e) => uploadFileHandler(e)}
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
						<label htmlFor="name">Full Name:<span>*</span></label>
						<input type="text" placeholder="enter name" className="form-control style-1"
							value={name}
							onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="desc">Description:<span>*</span></label>
						<textarea value={description}
							onChange={(e) => setDescription(e.target.value)} />
					</div>
					<div className="box-fieldset">
						<label htmlFor="email">Email address:<span>*</span></label>
						<input type="text" placeholder="themeflat@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)} className="form-control style-1" />
					</div>
					<div className="box-fieldset">
						<label htmlFor="phone">Your Phone:<span>*</span></label>
						<input type="number" placeholder="enter phone number"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="form-control style-1" />
					</div>
					<div className="box-fieldset">
						<label htmlFor="phone">Alternative Phone:<span>*</span></label>
						<input type="number" placeholder="enter phone number"
							value={altphone}
							onChange={(e) => setAltPhone(e.target.value)}
							className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="location">Location:<span>*</span></label>
						<input type="text" placeholder="634 E 236th St, Bronx, NY 10466" className="form-control style-1" />
					</div>
					<div className="box grid-4 gap-30">
						<div className="box-fieldset">
							<label htmlFor="company">Account Number:<span>*</span></label>
							<input type="number" placeholder="enter account number"
								value={acc}
								onChange={(e) => setAcc(e.target.value)} className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="position">Ifsc Code:<span>*</span></label>
							<input type="text" placeholder="enter ifsc code"
								value={ifsc}
								onChange={(e) => setIfsc(e.target.value)} className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="num">Branch Name:<span>*</span></label>
							<input type="text" placeholder="enter your branch name"
								value={branch}
								onChange={(e) => setBranch(e.target.value)} className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="address">Currency<span>*</span></label>
							<input type="text" placeholder="currency"
								value={currency} onChange={(e) => setCurrency(e.target.value)} className="form-control style-1" />
						</div>
					</div>
					<div className="box grid-4 gap-30 box-info-2">
						<div className="box-fieldset">
							<label htmlFor="job">Status:<span>*</span></label>
							<input type="text" value={status} className="form-control style-1" />
						</div>

					</div>

					{/* <div className="box box-fieldset">
						<label htmlFor="fb">Facebook:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="tw">Twitter:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="linkedin">Linkedin:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div> */}
					<div className="box">
						<button className="tf-btn primary" onClick={handleSubmit}>Save &amp; Update</button>
					</div>
					{/* <h6 className="title">Change password</h6>
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
					</div> */}
				</div>

			</LayoutAdmin>
		</>
	)
}