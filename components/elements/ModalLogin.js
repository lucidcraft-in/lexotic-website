import Link from "next/link"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../axios/axios";


export default function ModalLogin({ isLogin, handleLogin, isRegister, handleRegister }) {

	const [username, setUsername] = useState("")
	const [pass, setPass] = useState("")
	const [loading, setLoading] = useState(false);



	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true);

		try {
			const res = await Axios.post(`/login`, {
				username, password: pass
			})
			console.log(res, "login data")
			toast.success("success", { autoClose: 3000 })
			sessionStorage.setItem("UserInfo", username)
			setLoading(false);



		} catch (error) {
			toast.error("error", { autoClose: 3000 })
			setLoading(false);

		}
	}
	return (
		<>
			<div className={`modal fade ${isLogin ? "show d-block" : ""}`} id="modalLogin">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="flat-account bg-surface">
							<h3 className="title text-center">Log In</h3>
							<span className="close-modal icon-close2" onClick={handleSubmit} />
							<form onSubmit={handleSubmit} >
								<fieldset className="box-fieldset">
									<label htmlFor="name">Username<span>*</span>:</label>
									<input type="text" className="form-contact style-1" placeholder="Enter Username"
										onChange={(e) => setUsername(e.target.value)}
										autoComplete="off" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="pass">Password<span>*</span>:</label>
									<div className="box-password">
										<input type="password" className="form-contact style-1 password-field" placeholder="Password"
											onChange={(e) => setPass(e.target.value)}
											autoComplete="off" />
										<span className="show-pass">
											<i className="icon-pass icon-eye" />
											<i className="icon-pass icon-eye-off" />
										</span>
									</div>
								</fieldset>
								<div className="d-flex justify-content-between flex-wrap gap-12">
									<fieldset className="d-flex align-items-center gap-6">
										<input type="checkbox" className="tf-checkbox style-2" id="cb1" />
										<label htmlFor="cb1" className="caption-1 text-variant-1">Remember me</label>
									</fieldset>
									<Link href="#" className="caption-1 text-primary">Forgot password?</Link>
								</div>
								<div className="text-variant-1 auth-line">or sign up with</div>
								<div className="login-social">
									<Link href="#" className="btn-login-social">
										<img src="/images/logo/fb.jpg" alt="img" />
										Continue with Facebook
									</Link>
									<Link href="#" className="btn-login-social">
										<img src="/images/logo/google.jpg" alt="img" />
										Continue with Google
									</Link>
									<Link href="#" className="btn-login-social">
										<img src="/images/logo/tw.jpg" alt="img" />
										Continue with Twitter
									</Link>
								</div>
								<div>
									{loading ? (
										<div
											className="spinner-border text-primary"
											role="status"
										>
											<span className="visually-hidden">

											</span>
										</div>) : (
										<div>
											
											<button type="submit" className="tf-btn primary w-100">Login</button>

										</div>

									)
									}
								</div>
								<div className="mt-12 text-variant-1 text-center noti">Not registered yet?
									<a onClick={() => { handleLogin(); handleRegister() }} className="text-black fw-5">Sign Up</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{isLogin &&
				<div className={`modal-backdrop fade show`} onClick={handleLogin} />
			}

		</>
	)
}
