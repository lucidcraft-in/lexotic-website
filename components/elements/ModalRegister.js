import { useState } from "react";
import Axios from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ModalRegister({ isRegister, handleRegister, handleLogin }) {

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [pass, setPass] = useState("")
	const [cpass, setCpass] = useState("")
	const [place, setPlace] = useState("")
	const [post, setPost] = useState("")
	const [pin, setPin] = useState("")
	const [phone, setPhone] = useState("")
	const [country, setCountry] = useState("")
	const [currency, setCurrency] = useState("")
	const [loading, setLoading] = useState(false);





	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true);

		const data = {
			name,
			email,
			username,
			password: pass,
			cpassword: cpass,
			place,
			post,
			pin,
			country,
			currency,
			phone
		}


		try {
			const res = await Axios.post(`/registeruser`, data)
			console.log(res, "data")
			toast.success(res.json(201), { autoClose: 3000 })
			setLoading(false)

		} catch (error) {
			toast.error(res.json(400), { autoClose: 3000 })
			setLoading(false)

		}
	}


	return (
		<>
			<div className={`modal fade ${isRegister ? "show d-block" : ""}`} id="modalRegister">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="flat-account bg-surface">
							<h3 className="title text-center">Register</h3>
							<span className="close-modal icon-close2" />
							<form onSubmit={handleSubmit}>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Name<span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="enter name here"
										onChange={(e) => setName(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Email Address<span>*</span>:</label>
									<input type="email" className="form-contact style-1" placeholder="example@gmail.com"
										onChange={(e) => setEmail(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Place<span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="enter your place"
										onChange={(e) => setPlace(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Post<span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="enter post here"
										onChange={(e) => setPost(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Pin<span>*</span>:</label>
									<input type="number" className="form-contact style-1" placeholder="enter pincode"
										onChange={(e) => setPin(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Phone<span>*</span>:</label>
									<input type="number" className="form-contact style-1" placeholder="enter phone number"
										onChange={(e) => setPhone(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Country<span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="enter your country"
										onChange={(e) => setCountry(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Currency<span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="enter your currency"
										onChange={(e) => setCurrency(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="name">Username <span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="type username"
										onChange={(e) => setUsername(e.target.value)} />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="pass">Password<span>*</span>:</label>
									<div className="box-password">
										<input type="password" className="form-contact style-1 password-field" placeholder="enter password"
											onChange={(e) => setPass(e.target.value)} />
										<span className="show-pass">
											<i className="icon-pass icon-eye" />
											<i className="icon-pass icon-eye-off" />
										</span>
									</div>
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="confirm">Confirm Password<span>*</span>:</label>
									<div className="box-password">
										<input type="password" className="form-contact style-1 password-field2" placeholder="enter password"
											onChange={(e) => setCpass(e.target.value)} />
										<span className="show-pass2">
											<i className="icon-pass icon-eye" />
											<i className="icon-pass icon-eye-off" />
										</span>
									</div>
								</fieldset>
								<fieldset className="d-flex align-items-center gap-6">
									<input type="checkbox" className="tf-checkbox style-2" id="cb1" />
									<label htmlFor="cb1" className="caption-1 text-variant-1">I agree to the <span className="fw-5 text-black">Terms of User</span></label>
								</fieldset>
								<div>
									{loading ? (
										<div
											className="spinner-border text-primary"
											role="status"
										>
											<span className="visually-hidden">

											</span>
										</div>
									) : (
										<div >
											<button type="submit" className="tf-btn primary w-100">Register</button>


										</div>
									)}
								</div>
								<div className="mt-12 text-variant-1 text-center noti">Already have an account?
									<a onClick={() => { handleLogin(); handleRegister() }} className="text-black fw-5">Login Here</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{isRegister &&
				<div className={`modal-backdrop fade show`} onClick={handleRegister} />
			}
		</>
	)
}
