'use client';

import Axios from '@/components/axios/axios';
import DeleteFile from '@/components/elements/DeleteFile';
import LayoutAdmin from '@/components/layout/LayoutAdmin';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function MyProperty() {
  const [order, setOrder] = useState([]);

  // const [userInfo, setUserInfo] = useState(null)

  // let user = null
  // let flag = null
  // let storageUserInfo

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     storageUserInfo = sessionStorage.getItem('UserInfo')
  //     setUserInfo(storageUserInfo)

  //   }
  // }, [])

  // if (storageUserInfo) {
  //   const { userId, username, token, isFlag } = JSON.parse(userInfo)
  //   user = userId
  //   flag = isFlag
  // }


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
    getData();
  }, []);

  const getData = async () => {
    const res = await Axios.get(`/ordermerchant/${user}`);

    setOrder(res.data);
  };

  console.log(order);

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
            <h6 className="title"> Order Details</h6>
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Rental Start Date</th>
                      <th>Rental End Date</th>
                      <th>Price per Day</th>
                      <th>Number of Person</th>
                      <th>Total Item Price</th>
                      <th>Order Date</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  {order.map((singleOrder) => (
                    <tbody key={singleOrder._id}>
                      {singleOrder.items.map((item) => (
                        <tr className="file-delete" key={item._id}>
                          <td>{item.productId}</td>
                          <td>{new Date(item.rentalStartDate).toLocaleDateString()}</td>
                          <td>{new Date(item.rentalEndDate).toLocaleDateString()}</td>
                          <td>{item.pricePerDay}</td>
                          <td>{item.quantity}</td>
                          <td>{item.totalItemPrice}</td>
                          <td>{new Date(singleOrder.orderDate).toLocaleDateString()}</td>
                          <td>{singleOrder.orderStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  ))}
                </table>
              </div>
              {/* <ul className="wd-navigation">
                <li>
                  <Link href="#" className="nav-item active">
                    1
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-item">
                    2
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-item">
                    3
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-item">
                    <i className="icon icon-arr-r" />
                  </Link>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
