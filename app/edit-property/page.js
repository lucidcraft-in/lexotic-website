'use client'
import Axios from "@/components/axios/axios"
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import imageCompression from "browser-image-compression"
export default function AddProperty({ searchParams }) {

	// console.log(searchParams._id)


	const [selectedRadio, setSelectedRadio] = useState('radio1')

	const handleRadioChange = (event) => {
		const selectedRadioId = event.target.id
		setSelectedRadio(selectedRadioId)
	}



	const [productName, setProductName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [offerPrice, setOfferPrice] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [categories, setCategories] = useState([]);
	const [location, setLocation] = useState({
		latitude: '',
		longitude: '',
		placeName: '',
		address: ''
	});
	const [photos, setPhotos] = useState([{ title: '', url: '' }]);
	const [merchants, setMerchants] = useState([]);
	const [merchantId, setMerchantId] = useState('');
	const [selectedMerchant, setSelectedMerchant] = useState('');

	const [amenities, setAmenities] = useState([{ name: '', image: '' }]);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);


	const id = searchParams._id
	useEffect(() => {
		getData()
		fetchMerchants()

	}, [])
	// console.log(id)
	useEffect(() => {
		if (id) {
			fetchProductData(id)
		}
	}, [id])

	const getData = async () => {
		try {
			const res = await Axios.get(`getcategory`)
			// console.log(res)
			setCategories(res.data)

		} catch (error) {
			console.log('error')
		}
	}

	const fetchMerchants = async () => {
		try {
			const response = await Axios.get(`getmerchants`);
			setMerchants(response.data);
		} catch (error) {
			console.error('Error fetching merchants:', error);
		}
	};

	let existingPhotos, existingAmenities

	const fetchProductData = async (id) => {
		try {
			const res = await Axios.get(`/products/${id}`);
			const product = res.data;
			// console.log(product)
			setProductName(product.name);
			setTitle(product.title);
			setDescription(product.description);
			setPrice(product.price);
			setOfferPrice(product.offerPrice);
			setLocation(product.location);
			setPhotos(product.photos);
			setMerchantId(product.owner.merchantId);
			setSelectedMerchant(product.owner.name);
			setAmenities(product.amenities);
			setCategoryId(product.categoryId);
			existingPhotos = product.photo
			existingAmenities = product.amenities
		} catch (error) {
			console.error('Error fetching product data:', error);
		}
	};




	const handleMerchantChange = (e) => {
		const selectedOption = e.target.options[e.target.selectedIndex];
		setMerchantId(selectedOption.value); // Set the merchantId from the selected option's value
		setSelectedMerchant(selectedOption.text); // Set the merchant's name

	};


	const handleLocationChange = (e) => {
		const { name, value } = e.target;
		setLocation({ ...location, [name]: value });
	};

	// const handlePhotoChange = (index, e) => {
	// 	const { name, value } = e.target;
	// 	const updatedPhotos = [...photos];
	// 	updatedPhotos[index][name] = value;
	// 	setPhotos(updatedPhotos);
	// };

	// const handleAmenityChange = (index, e) => {
	// 	const { name, value } = e.target;
	// 	const updatedAmenities = [...amenities];
	// 	updatedAmenities[index][name] = value;
	// 	setAmenities(updatedAmenities);
	// };

	// const addPhotoField = () => {
	// 	setPhotos([...photos, { title: '', url: '' }]);
	// };

	// const addAmenityField = () => {
	// 	setAmenities([...amenities, { name: '', image: '' }]);
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!merchantId) {
			setLoading(false);
			toast.error("Please select a merchant!");
			return;
		}

		const productData = {
			name: productName,
			title,
			description,
			price,
			offerPrice,
			location,
			photos,
			photos: photos.length ? photos : existingPhotos,  // `existingPhotos` should be the previous photos fetched from DB
			owner: {
				merchantId,
				name: selectedMerchant,
			},
			// If new amenities are uploaded, use them, otherwise use old ones
			amenities: amenities.length ? amenities : existingAmenities,  // `existingAmenities` are fetched from DB
			categoryId: categoryId,
		};

		try {

			const res = await Axios.put(`/products/${id}`, productData)

			if (res.status === 201) {
				toast.success("Product updated successfully");
				navigate('/products');

			} else {
				toast.warning("Error occurred during update");
			}
		} catch (error) {
			toast.error("Can't update product!");
		} finally {
			setLoading(false);
		}
	};


	const handleCategoryChange = (e) => {
		setCategoryId(e.target.value);
	};


	console.log(photos)
	// const uploadFileHandler = async (e, val) => {
	// 	e.preventDefault()
	// 	const file = e.target.files[0];

	// 	// Log the original file to check size and other attributes
	// 	console.log("Original file:", file);

	// 	// Image compression options
	// 	const options = {
	// 		maxSizeMB: 0.2, // Compress to a maximum of 0.2 MB
	// 		maxWidthOrHeight: 800,
	// 		useWebWorker: true,
	// 	};

	// 	try {
	// 		// Compress the image
	// 		const compressedFile = await imageCompression(file, options);

	// 		// Log the compressed file to check size reduction
	// 		console.log("Compressed file:", compressedFile);

	// 		const newFile = new File(
	// 			[compressedFile],
	// 			file.type,
	// 			// { type: file.type }
	// 		)

	// 		const formData = new FormData();
	// 		formData.append('file', newFile);

	// 		formData.forEach((value, key) => {
	// 			console.log(`${key}:${value}`)
	// 		})
	// 		setUploading(true); // Start uploading state

	// 		const config = {
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data',
	// 			},
	// 		};

	// 		// Make POST request to /upload endpoint
	// 		const data = await Axios.post('/upload', formData, config);



	// 		console.log("Upload successful, response data:", data.data);
	// 		let title = data.data.title
	// 		let url = data.data.url
	// 		console.log(title, url)
	// 		setUploading(false); // Stop uploading state



	// 		// Automatically set the image title as the file name (without extension)


	// 		if (val === 'photos') {
	// 			setPhotos(prevPhotos => [
	// 				...prevPhotos,
	// 				{
	// 					title, // Image name without extension
	// 					url    // URL returned from the upload API
	// 				}
	// 			]);
	// 		} else if (val === 'amenities') {
	// 			setAmenities(prevAmenities => [
	// 				...prevAmenities,
	// 				{
	// 					title, // Image name without extension
	// 					url    // URL returned from the upload API
	// 				}
	// 			]);
	// 		}


	// 	} catch (error) {
	// 		console.error("Error during file upload:", error);
	// 		setUploading(false); // Stop uploading state on error
	// 	}
	// };


	const uploadFileHandler = async (e, val) => {
		e.preventDefault();
		const files = e.target.files;

		// Compress and upload multiple files
		const options = {
			maxSizeMB: 0.2, // Compress to a maximum of 0.2 MB
			maxWidthOrHeight: 800,
			useWebWorker: true,
		};

		let uploadedPhotos = [];

		try {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];

				// Compress each image
				const compressedFile = await imageCompression(file, options);
				const newFile = new File([compressedFile], file.name, { type: file.type });

				const formData = new FormData();
				formData.append('file', newFile);

				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};

				// Upload each file
				const { data } = await Axios.post('/upload', formData, config);

				// Collect the uploaded file data (title and URL)
				uploadedPhotos.push({
					title: data.title,
					url: data.url,
				});
			}

			// Update the state with the new uploaded photos
			if (val === 'photos') {
				setPhotos((prevPhotos) => [...prevPhotos, ...uploadedPhotos]);
			} else if (val === 'amenities') {
				setAmenities((prevAmenities) => [...prevAmenities, ...uploadedPhotos]);
			}
		} catch (error) {
			console.error('Error during file upload:', error);
		}
	};

	const removePhotoHandler = (index, val) => {
		if (val === 'photos') {
			setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
		} else if (val === 'amenities') {
			setAmenities((prevAmenities) => prevAmenities.filter((_, i) => i !== index));
		}
	};


	return (
		<>

			{/* <DeleteFile /> */}



			<LayoutAdmin>

				<form onSubmit={handleSubmit}>
					<div>
						<h6 className="title">Update Product</h6>

						<div className="widget-box-2">
							<h6 className="title">Upload Media</h6>
							{/* <div className="box-uploadfile text-center">
								<label className="uploadfile">
									<span className="icon icon-img-2" />
									{photos.map((photo, index) => (
										<>
											<div className="btn-upload">
												<Link href="#" className="tf-btn primary">Choose Image</Link>
												<input type="file" className="ip-file"
													name="url"
													value={photo.url}
													onChange={(e) => handlePhotoChange(index, e)} />
												<p className="file-name fw-5">Or drop image here to upload</p>


											</div>
											<div className="mb-4">
												<input type="text" placeholder="file name"
													name="title"
													value={photo.title}
													onChange={(e) => handlePhotoChange(index, e)} />


											</div>
										</>
									))}

									<button type="button" className="btn btn-link " onClick={addPhotoField}>
										Add Another Photo
									</button>

								</label>
							</div> */}

							{/* <fieldset className="box box-fieldset">
								<label htmlFor="upload">Upload Photo:</label>
								<input
									type="file"
									className="form-control style-1"
									onChange={(e) => uploadFileHandler(e, 'photos')}
								/>
							</fieldset>
							{uploading ? <p>Uploading...</p> : null}

							<h3>Uploaded Photos:</h3>
							<ul>
								{photos.map((photo, index) => (
									<li key={index}>
										<img src={photo.url} alt={`uploaded-${index}`} style={{ width: '200px' }} />
									</li>
								))}
							</ul> */}
							<ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
								{photos.map((photo, index) => (
									<li key={index} style={{ margin: '10px', textAlign: 'center' }}>
										<img src={photo.url} alt={`uploaded-${index}`}
											style={{ width: '200px', height: 'auto', display: 'block' }} />
										<button
											style={{
												marginTop: '5px',
												padding: '5px 10px',
												backgroundColor: '#ff4d4f',
												color: 'white',
												border: 'none',
												borderRadius: '5px',
												cursor: 'pointer',
											}}
											onClick={() => removePhotoHandler(index, 'photos')}>Remove</button>
									</li>
								))}
							</ul>

							<h6>Upload Multiple Photos:</h6>
							<fieldset className="box box-fieldset">
								<label htmlFor="upload">Upload Photo(s):</label>
								<input
									type="file"
									multiple // Enable multiple file uploads
									className="form-control style-1"
									onChange={(e) => uploadFileHandler(e, 'photos')}
								/>
							</fieldset>


						</div>
						<div className="widget-box-2">
							<h6 className="title">Information</h6>
							<div className="box-info-property">
								<fieldset className="box box-fieldset">
									<label htmlFor="title">
										Name:<span>*</span>
									</label>
									<input type="text" className="form-control style-1"
										value={productName}
										onChange={(e) => setProductName(e.target.value)}
										placeholder="enter name" />
								</fieldset>
								<fieldset className="box box-fieldset">
									<label htmlFor="title">
										Title:<span>*</span>
									</label>
									<input type="text" className="form-control style-1"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										placeholder="enter title" />
								</fieldset>
								<fieldset className="box box-fieldset">
									<label htmlFor="desc">Description:</label>
									<textarea className="textarea-tinymce" name="area"
										value={description}
										onChange={(e) => setDescription(e.target.value)} />
								</fieldset>
								<fieldset className="box box-fieldset">
									<label htmlFor="desc">Quantity:</label>
									<input
										type="number"
										// value={description}
										onChange={(e) => setQuantity(e.target.value)} />
								</fieldset>
								<fieldset className="box box-fieldset">
									<label htmlFor="title">
										Location:<span>*</span>
									</label>
									<input type="text" className="form-control style-1 mb-2"
										name="latitude"
										value={location.latitude}
										onChange={handleLocationChange}
										placeholder="enter latitude" />
									<input type="text" className="form-control style-1 mb-2"
										name="longitude"
										value={location.longitude}
										onChange={handleLocationChange}
										placeholder="enter longitude" />
									<input type="text" className="form-control style-1 mb-2"
										name="placeName"
										value={location.placeName}
										onChange={handleLocationChange}
										placeholder="enter place" />
									<input type="text" className="form-control style-1 mb-2"
										name="address"
										value={location.address}
										onChange={handleLocationChange}
										placeholder="enter address" />
								</fieldset>
								{/* <div className="box grid-3 gap-30">
								<fieldset className="box-fieldset">
									<label htmlFor="address">
										Full Address:<span>*</span>
									</label>
									<input type="text" className="form-control style-1" placeholder="Enter property full address" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="zip">
										Zip Code:<span>*</span>
									</label>
									<input type="text" className="form-control style-1" placeholder="Enter property zip code" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="country">
										Country:<span>*</span>
									</label>
									<select className="nice-select">

										<option data-value={1} className="option selected">United States</option>
										<option data-value={2} className="option">United Kingdom</option>
										<option data-value={3} className="option">Russia</option>

									</select>
								</fieldset>
							</div> */}


								<div className="widget-box-2">
									<h6 className="title">Upload Media</h6>
									{/* <div className="box-uploadfile text-center">
								<label className="uploadfile">
									<span className="icon icon-img-2" />
									{photos.map((photo, index) => (
										<>
											<div className="btn-upload">
												<Link href="#" className="tf-btn primary">Choose Image</Link>
												<input type="file" className="ip-file"
													name="url"
													value={photo.url}
													onChange={(e) => handlePhotoChange(index, e)} />
												<p className="file-name fw-5">Or drop image here to upload</p>


											</div>
											<div className="mb-4">
												<input type="text" placeholder="file name"
													name="title"
													value={photo.title}
													onChange={(e) => handlePhotoChange(index, e)} />


											</div>
										</>
									))}

									<button type="button" className="btn btn-link " onClick={addPhotoField}>
										Add Another Photo
									</button>

								</label>
							</div> */}

									{/* <fieldset className="box box-fieldset">
										<label htmlFor="upload">Amenities:</label>
										<input
											type="file"
											className="form-control style-1"
											onChange={(e) => uploadFileHandler(e, 'amenities')}
										/>
									</fieldset> */}
									{/* {uploading ? <p>Uploading...</p> : null}

									<h3>Uploaded Photos:</h3>
									<ul>
										{amenities.map((photo, index) => (
											<li key={index}>
												<img src={photo.url} alt={`uploaded-${index}`} style={{ width: '200px' }} />
											</li>
										))}
									</ul> */}

									<h3>Uploaded Amenities:</h3>
									<ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
										{amenities.map((photo, index) => (
											<li key={index} style={{ margin: '10px', textAlign: 'center' }}>
												<img
													src={photo.url}
													alt={`uploaded-amenities-${index}`}
													style={{ width: '200px', height: 'auto', display: 'block' }}
												/>
												<button
													onClick={() => removePhotoHandler(index, 'amenities')}
													style={{
														marginTop: '5px',
														padding: '5px 10px',
														backgroundColor: '#ff4d4f',
														color: 'white',
														border: 'none',
														borderRadius: '5px',
														cursor: 'pointer',
													}}
												>
													Remove
												</button>
											</li>
										))}
									</ul>


									<h6>Upload Multiple Amenities Photos:</h6>
									<fieldset className="box box-fieldset">
										<label htmlFor="upload">Upload Amenities:</label>
										<input
											type="file"
											multiple // Enable multiple file uploads
											className="form-control style-1"
											onChange={(e) => uploadFileHandler(e, 'amenities')}
										/>
									</fieldset>
								</div>

								<div className="box grid-2 gap-30">
									<fieldset className="box-fieldset">
										<label htmlFor="state">
											Category:<span>*</span>
										</label>
										<select className="nice-select"
											value={categoryId}
											onChange={handleCategoryChange}>

											<option value="" disabled>Select Category</option>
											{categories?.map((cat) => (
												<option key={cat._id} value={cat._id}>
													{cat?.cattype}
												</option>
											))}
										</select>
									</fieldset>
									<fieldset className="box-fieldset">
										<label htmlFor="merchantSelect">
											Select Merchant:<span>*</span>
										</label>
										<select className="nice-select"
											id="merchantSelect"

											value={merchantId}
											onChange={handleMerchantChange}>

											<option value="">Select a merchant</option>
											{merchants.map((merchant) => (
												<option key={merchant._id} value={merchant._id}>
													{merchant.name}
												</option>
											))}
										</select>
									</fieldset>
								</div>
								{/* <div className="box box-fieldset">
								<label htmlFor="location">Location:<span>*</span></label>
								<div className="box-ip">
									<input type="text" className="form-control style-1" />
									<Link href="#" className="btn-location"><i className="icon icon-location" /></Link>
								</div>
								<PropertyMap singleMap />
							</div> */}
							</div>
						</div>
						<div className="widget-box-2">
							<h6 className="title">Price</h6>
							<div className="box-price-property">
								<div className="box grid-2 gap-30">
									<fieldset className="box box-fieldset">
										<label htmlFor="title">
											Price:<span>*</span>
										</label>
										<input type="number" className="form-control style-1"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											placeholder="enter price" />
									</fieldset>
									<fieldset className="box box-fieldset">
										<label htmlFor="title">
											Offer Price:<span>*</span>
										</label>
										<input type="number" className="form-control style-1"
											value={offerPrice}
											onChange={(e) => setOfferPrice(e.target.value)}
											placeholder="enter offer price" />
									</fieldset>

								</div>
								{/* <div className="grid-2 gap-30">
								<fieldset className="box-fieldset">
									<label htmlFor="price">
										Before Price Label:<span>*</span>
									</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="price">
										After Price Label:<span>*</span>
									</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
							</div>
							<fieldset className="box-cb d-flex align-items-center gap-6">
								<input type="checkbox" className="tf-checkbox" id="cb-ip" />
								<label htmlFor="cb-ip">Price to Call</label>
							</fieldset> */}
							</div>
						</div >
						{/* <div className="widget-box-2">
						<h6 className="title">Addtional Information</h6>
						<div className="box grid-3 gap-30">
							<fieldset className="box-fieldset">
								<label htmlFor="type">
									Property Type:<span>*</span>
								</label>
								<select className="nice-select">

									<option data-value={1} className="option">Apartment</option>
									<option data-value={2} className="option">Villa</option>
									<option data-value={3} className="option">Studio</option>
									<option data-value={4} className="option">Studio</option>
									<option data-value={5} className="option">Office</option>
									<option data-value={6} className="option">Townhouse</option>

								</select>
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="status">
									Property Status:<span>*</span>
								</label>
								<select className="nice-select">

									<option data-value={1} className="option">For Rent</option>
									<option data-value={2} className="option">For Sale</option>

								</select>
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="label">
									Property Label:<span>*</span>
								</label>
								<select className="nice-select">

									<option data-value={1} className="option">New Listing</option>
									<option data-value={2} className="option">Open House</option>

								</select>
							</fieldset >
						</div >
						<div className="box grid-3 gap-30">
							<fieldset className="box-fieldset">
								<label htmlFor="size">
									Size (SqFt):<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="land">
									Land Area (SqFt):<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="id">
									Property ID:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
						</div>
						<div className="box grid-3 gap-30">
							<fieldset className="box-fieldset">
								<label htmlFor="rom">
									Rooms:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="bedrooms">
									Bedrooms:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="bathrooms">
									Bathrooms:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
						</div>
						<div className="box grid-3 gap-30">
							<fieldset className="box-fieldset">
								<label htmlFor="garages">
									Garages:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="garages-size">
									Garages Size (SqFt):<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<fieldset className="box-fieldset">
								<label htmlFor="year">
									Year Built:<span>*</span>
								</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
						</div>
					</div > */}
						{/* <div className="widget-box-2">
						<h6 className="title">Amenities<span>*</span></h6>
						<div className="box-amenities-property">
							<div className="box-amenities">
								<div className="title-amenities fw-7">Home safety:</div>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb1" defaultChecked />
									<label htmlFor="cb1" className="text-cb-amenities">Smoke alarm</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb2" />
									<label htmlFor="cb2" className="text-cb-amenities">Carbon monoxide alarm</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb3" defaultChecked />
									<label htmlFor="cb3" className="text-cb-amenities">First aid kit</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb4" defaultChecked />
									<label htmlFor="cb4" className="text-cb-amenities">Self check-in with lockbox</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb5" />
									<label htmlFor="cb5" className="text-cb-amenities">Security cameras</label>
								</fieldset>
							</div>
							<div className="box-amenities">
								<div className="title-amenities fw-7">Bedroom:</div>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb6" />
									<label htmlFor="cb6" className="text-cb-amenities">Hangers</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb7" defaultChecked />
									<label htmlFor="cb7" className="text-cb-amenities">Bed linens</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb8" />
									<label htmlFor="cb8" className="text-cb-amenities">Extra pillows &amp; blankets</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb9" />
									<label htmlFor="cb9" className="text-cb-amenities">Iron</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb10" defaultChecked />
									<label htmlFor="cb10" className="text-cb-amenities">TV with standard cable</label>
								</fieldset>
							</div>
							<div className="box-amenities">
								<div className="title-amenities fw-7">Kitchen:</div>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb11" />
									<label htmlFor="cb11" className="text-cb-amenities">Refrigerator</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb12" />
									<label htmlFor="cb12" className="text-cb-amenities">Microwave</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb13" />
									<label htmlFor="cb13" className="text-cb-amenities">Dishwasher</label>
								</fieldset>
								<fieldset className="amenities-item">
									<input type="checkbox" className="tf-checkbox style-1 primary" id="cb14" />
									<label htmlFor="cb14" className="text-cb-amenities">Coffee maker</label>
								</fieldset>
							</div>
						</div>
					</div> */}
						{/* <div className="widget-box-2">
						<h6 className="title">File Attachments</h6>
						<div className="box-uploadfile text-center">
							<label className="uploadfile style-1">
								<span className="icon icon-img-2" />
								<div className="btn-upload">
									<Link href="#" className="tf-btn primary">Choose File</Link>
									<input type="file" className="ip-file" />
								</div>
								<p className="file-name fw-5">Or drop file here to upload</p>
							</label>
						</div>
					</div>
					<div className="widget-box-2">
						<h6 className="title">Virtual Tour 360</h6>
						<div className="box-radio-check">
							<div className="fw-7">Virtual Tour Type:</div>
							<fieldset className="fieldset-radio">
								<input
									type="radio"
									className="tf-radio"
									name="radio"
									id="radio1"
									checked={selectedRadio === 'radio1'}
									onChange={handleRadioChange}
								/>
								<label htmlFor="radio1" className="text-radio">
									Embedded code
								</label>
							</fieldset>

							<fieldset className="fieldset-radio">
								<input
									type="radio"
									className="tf-radio"
									name="radio"
									id="radio2"
									checked={selectedRadio === 'radio2'}
									onChange={handleRadioChange}
								/>
								<label htmlFor="radio2" className="text-radio">
									Upload image
								</label>
							</fieldset>
						</div>
						<fieldset className="box-fieldset">
							<label htmlFor="embedded">Embedded Code Virtual 360</label>
							<textarea className="textarea" defaultValue={""} />
						</fieldset>
					</div>
					<div className="widget-box-2">
						<h6 className="title">Videos</h6>
						<fieldset className="box-fieldset">
							<label htmlFor="video">Video URL:</label>
							<input type="text" className="form-control style-1" placeholder="Youtube, vimeo url" />
						</fieldset>
					</div>
					<div className="widget-box-2">
						<h6 className="title">Floors</h6>
						<div className="box-radio-check">
							<div className="fw-7">Enable Floor Plan:</div>
							<fieldset className="fieldset-radio">
								<input type="radio" className="tf-radio" name="radio2" id="radio3" defaultChecked />
								<label htmlFor="radio3" className="text-radio">Enable</label>
							</fieldset>
							<fieldset className="fieldset-radio">
								<input type="radio" className="tf-radio" name="radio2" id="radio4" />
								<label htmlFor="radio4" className="text-radio">Disable</label>
							</fieldset>
						</div>
						<div className="box-floor-property file-delete">
							<div className="top d-flex justify-content-between align-items-center">
								<h6>Floor 1:</h6>
								<Link href="#" className="remove-file tf-btn primary">Delete Floor 1</Link>
							</div>
							<fieldset className="box box-fieldset">
								<label htmlFor="name">Floor Name:</label>
								<input type="text" className="form-control style-1" />
							</fieldset>
							<div className="grid-2 box gap-30">
								<fieldset className="box-fieldset">
									<label htmlFor="floor-price">Floor Price (Only Digits):</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="price-postfix">Price Postfix:</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
							</div>
							<div className="grid-2 box gap-30">
								<fieldset className="box-fieldset">
									<label htmlFor="floor-size">Floor Size (Only Digits):</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="size-postfix">Size Postfix:</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
							</div>
							<div className="grid-2 box gap-30">
								<fieldset className="box-fieldset">
									<label htmlFor="bedrooms">Bedrooms:</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="bathrooms">Bathrooms:</label>
									<input type="text" className="form-control style-1" />
								</fieldset>
							</div>
							<div className="grid-2 box gap-30">
								<fieldset className="box-fieldset">
									<label htmlFor="bedrooms">Floor Image:</label>
									<div className="box-floor-img uploadfile">
										<div className="btn-upload">
											<Link href="#" className="tf-btn primary">Choose File</Link>
											<input type="file" className="ip-file" />
										</div>
										<p className="file-name fw-5">Or drop file here to upload</p>
									</div>
								</fieldset>
								<fieldset className="box-fieldset">
									<label htmlFor="bathrooms">Description:</label>
									<textarea className="textarea" defaultValue={""} />
								</fieldset>
							</div>
						</div>
						<Link href="#" className="tf-btn primary btn-add-floor">Add New Floor</Link>
					</div>
					<div className="widget-box-2">
						<h6 className="title">Agent Information</h6>
						<div className="box-radio-check">
							<div className="fw-7">Choose type agent infomation?</div>
							<fieldset className="fieldset-radio">
								<input type="radio" className="tf-radio" name="radio3" id="radio5" defaultChecked />
								<label htmlFor="radio5" className="text-radio">Your current user information</label>
							</fieldset>
							<fieldset className="fieldset-radio">
								<input type="radio" className="tf-radio" name="radio3" id="radio6" />
								<label htmlFor="radio6" className="text-radio">Other contact</label>
							</fieldset>
						</div>
					</div> */}
						<button className="tf-btn primary">Update </button>
					</div >
				</form>

			</LayoutAdmin >
		</>
	)
}