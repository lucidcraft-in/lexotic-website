import Link from "next/link"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../axios/axios";


export default function ModalLogin({ isLogin, handleLogin, isRegister, handleRegister }) {

	const [username, setUsername] = useState("")
	const [pass, setPass] = useState("")
	const [loading, setLoading] = useState(false);
	const [isMerchant, setIsMerchant] = useState(false);

	const [showPassword, setShowPassword] = useState(false);



	const handleUserSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {




			// User login
			const res = await Axios.post(`/loginuser`, {
				username, password: pass
			});


			const { token, userId, isFlag } = res.data;


			// Store user or merchant data in session storage
			sessionStorage.setItem("UserInfo", JSON.stringify({ userId, username, token, isFlag }));

			toast.success("Success", { autoClose: 3000 });
			setLoading(false);

		} catch (error) {
			toast.error("Error", { autoClose: 3000 });
			setLoading(false);
		}
	};



	const handleMerchantSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {




			// User login
			const res = await Axios.post(`/loginmerchant`, {
				username, password: pass
			});


			const { token, userId, isFlag } = res.data;


			// Store user or merchant data in session storage
			sessionStorage.setItem("UserInfo", JSON.stringify({ userId, username, token, isFlag }));

			toast.success("Success", { autoClose: 3000 });
			setLoading(false);

		} catch (error) {
			toast.error("Error", { autoClose: 3000 });
			setLoading(false);
		}
	};


console.log(isLogin);

return (
  <>
    <div
      className={`modal fade ${isLogin ? 'show d-block' : ''}`}
      id="modalLogin"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flat-account bg-surface">
            <h3 className="title text-center">
              {isMerchant ? 'Login as Merchant' : 'Login as User'}
            </h3>
            <span className="close-modal icon-close2" onClick={handleLogin} />
            {isMerchant ? (
              <form onSubmit={handleMerchantSubmit}>
                <fieldset className="box-fieldset">
                  <label htmlFor="name">
                    Username<span>*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-contact style-1"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="pass">
                    Password<span>*</span>:
                  </label>
                  <div className="box-password">
                    <input
                      type="password"
                      className="form-contact style-1 password-field"
                      placeholder="Password"
                      onChange={(e) => setPass(e.target.value)}
                      autoComplete="off"
                    />
                    <span className="show-pass">
                      <i className="icon-pass icon-eye" />
                      <i className="icon-pass icon-eye-off" />
                    </span>
                  </div>
                </fieldset>
                <div className="d-flex justify-content-between flex-wrap gap-12">
                  <fieldset className="d-flex align-items-center gap-6">
                    <input
                      type="checkbox"
                      className="tf-checkbox style-2"
                      id="cb1"
                    />
                    <label htmlFor="cb1" className="caption-1 text-variant-1">
                      Remember me
                    </label>
                  </fieldset>
                  <Link href="#" className="caption-1 text-primary">
                    Forgot password?
                  </Link>
                </div>
                <div className="text-variant-1 auth-line">or sign up with</div>
                {/* <div className="login-social">
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
                  </div> */}
                <div>
                  {loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden"></span>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className="tf-btn primary w-100">
                        Login as Merchant
                      </button>
                    </div>
                  )}
                </div>
                {/* <div className="mt-12 text-variant-1 text-center noti">Not registered yet?
										<a onClick={() => { handleLogin(); handleRegister() }} className="text-black fw-5">Sign Up</a>

									</div> */}
              </form>
            ) : (
              <form onSubmit={handleUserSubmit}>
                <fieldset className="box-fieldset">
                  <label htmlFor="name">
                    Username<span>*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-contact style-1"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="pass">
                    Password<span>*</span>:
                  </label>
                  <div className="box-password">
                    <input
                      type={showPassword === true ? 'text' : 'password'}
                      className="form-contact style-1 password-field"
                      placeholder="password"
                      onChange={(e) => setPass(e.target.value)}
                      autoComplete="off"
                    />
                    <span className="show-pass">
												{showPassword === true ?
													<i
														className="icon-pass icon-eye"
														onClick={() => setShowPassword(false)}
													/>
													:
													<i
														className="icon-pass icon-eye-off"
														onClick={() => setShowPassword(true)}
													/>
												}
                    </span>
                  </div>
                </fieldset>
                <div className="d-flex justify-content-between flex-wrap gap-12">
                  <fieldset className="d-flex align-items-center gap-6">
                    <input
                      type="checkbox"
                      className="tf-checkbox style-2"
                      id="cb1"
                    />
                    <label htmlFor="cb1" className="caption-1 text-variant-1">
                      Remember me
                    </label>
                  </fieldset>
                  <Link href="#" className="caption-1 text-primary">
                    Forgot password?
                  </Link>
                </div>
                <div className="text-variant-1 auth-line">or sign up with</div>
                {/* <div className="login-social">
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
                </div> */}
                <div>
                  {loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden"></span>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className="tf-btn primary w-100">
                        Login as User
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}
            <div className="mt-12 text-variant-1 text-center noti">
              Not registered yet?
              <a
                onClick={() => {
                  handleLogin();
                  handleRegister();
                }}
                className="text-black fw-5"
              >
                Sign Up
              </a>
            </div>

            <div className="mt-12 text-variant-1 text-center noti">
              {isMerchant ? (
                <a
                  onClick={() => setIsMerchant(false)}
                  className="text-black fw-5"
                >
                  Login as User
                </a>
              ) : (
                <a
                  onClick={() => setIsMerchant(true)}
                  className="text-black fw-5"
                >
                  Login as Merchant
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {isLogin && (
      <div className={`modal-backdrop fade show`} onClick={handleLogin} />
    )}
  </>
);
}
