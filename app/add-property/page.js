'use client'
import Axios from "@/components/axios/axios"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import {useEffect, useState} from "react"
import imageCompression from "browser-image-compression"
import {toast} from "react-toastify";

export default function AddProperty() {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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

    const [uploading, setUploading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [merchants, setMerchants] = useState([]);
    const [merchantId, setMerchantId] = useState('');
    const [selectedMerchant, setSelectedMerchant] = useState('');

    const [amenities, setAmenities] = useState([]);
    const [, setLoading] = useState(false);

    useEffect(() => {
        getData().then(_ => {
        })
    }, [])

    useEffect(() => {

        fetchMerchants().then(_ => {
        });
    }, []);

    const getData = async () => {
        try {
            const res = await Axios.get(`getcategory`)
            console.log(res)
            setCategories(res.data)
            
        } catch (error) {
            console.error(error)
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

    const handleMerchantChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setMerchantId(selectedOption.value); // Set the merchantId from the selected option's value
        setSelectedMerchant(selectedOption.text); // Set the merchant's name

    };

    const handleLocationChange = (e) => {
        const {name, value} = e.target;
        setLocation({...location, [name]: value});
    };
    const [_, setProduct] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!merchantId) {
            setLoading(false);
            toast.error("Please select a merchant!");
            return;
        }

        try {
            const ownerData = {
                merchantId,
                name: selectedMerchant, // The name of the selected merchant
            };
            console.log(photos)

            const res = await Axios.post(`/addproducts`, {
                name, title, description, price, offerPrice, location, categoryId, photos, owner: ownerData, amenities
            })
            console.log(res.data)
            if (res.status === 201) {
                setLoading(false);
                setProduct(res.data)

                toast.success("Product created successfully")
                // navigate('/products');

            } else {
                toast.warning("Error occurred during creating");
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            toast.error("cant create product!!!")
        }
    };

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value); // Set the categoryId from the selected option's value
    };


    const uploadFileHandler = async (e, val) => {
        e.preventDefault()
        const file = e.target.files[0];
        console.log("Original file:", file);

        const options = {
            maxSizeMB: 0.2, // Compress to a maximum of 0.2 MB
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            console.log("Compressed file:", compressedFile);

            const newFile = new File(
                [compressedFile],
                file.type,
            )
            const formData = new FormData();
            formData.append('file', newFile);

            formData.forEach((value, key) => {
                console.log(`${key}:${value}`)
            })
            setUploading(true); // Start uploading state

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            // Make POST request to /upload endpoint
            const data = await Axios.post('/upload', formData, config);
            console.log("Upload successful, response data:", data.data);

            let title = data.data.title
            let url = data.data.url
            console.log(title, url)
            setUploading(false); // Stop uploading state

            // Automatically set the image title as the file name (without extension)
            if (val === 'photos') {
                setPhotos(prevPhotos => [
                    ...prevPhotos,
                    {
                        title, // Image name without extension
                        url    // URL returned from the upload API
                    }
                ]);
            } else if (val === 'amenities') {
                setAmenities(prevAmenities => [
                    ...prevAmenities,
                    {
                        title, // Image name without extension
                        url    // URL returned from the upload API
                    }
                ]);
            }
        } catch (error) {
            console.error("Error during file upload:", error);
            setUploading(false); // Stop uploading state on error
        }
    };
    console.log(photos)

    return (
        <>
            <LayoutAdmin>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h6 className="title mb-3 d-flex justify-content-center">CREATE PRODUCT</h6>
                        <div className="widget-box-2">
                            <h6 className="title">Upload Media</h6>
                            <fieldset className="box box-fieldset">
                                <label htmlFor="upload">Upload Photo:</label>
                                <input
                                    type="file"
                                    className="form-control style-1"
                                    onChange={(e) => uploadFileHandler(e, 'photos')}
                                />
                            </fieldset>
                            {uploading ? <p>Uploading...</p> : null}

                            <h3>Uploaded Photos:</h3>
                            <div>
                                {photos?.map((photo) => (
                                    <div>
                                        <img src={photo.url} height={'100px'} width={'100px'}/>
                                        <br/>
                                    </div>
                                ))}
                                <br/>
                            </div>
                        </div>
                        <div className="widget-box-2">
                            <h6 className="title">Information</h6>
                            <div className="box-info-property">
                                <fieldset className="box box-fieldset">
                                    <label htmlFor="title">
                                        Name:<span>*</span>
                                    </label>
                                    <input type="text" className="form-control style-1"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           placeholder="enter name"/>
                                </fieldset>
                                <fieldset className="box box-fieldset">
                                    <label htmlFor="title">
                                        Title:<span>*</span>
                                    </label>
                                    <input type="text" className="form-control style-1"
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}
                                           placeholder="enter title"/>
                                </fieldset>
                                <fieldset className="box box-fieldset">
                                    <label htmlFor="desc">Description:</label>
                                    <textarea className="textarea-tinymce" name="area"
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}/>
                                </fieldset>
                                <fieldset className="box box-fieldset">
                                    <label htmlFor="title">
                                        Location:<span>*</span>
                                    </label>
                                    <input type="text" className="form-control style-1 mb-2"
                                           name="latitude"
                                           value={location.latitude}
                                           onChange={handleLocationChange}
                                           placeholder="enter latitude"/>
                                    <input type="text" className="form-control style-1 mb-2"
                                           name="longitude"
                                           value={location.longitude}
                                           onChange={handleLocationChange}
                                           placeholder="enter longitude"/>
                                    <input type="text" className="form-control style-1 mb-2"
                                           name="placeName"
                                           value={location.placeName}
                                           onChange={handleLocationChange}
                                           placeholder="enter place"/>
                                    <input type="text" className="form-control style-1 mb-2"
                                           name="address"
                                           value={location.address}
                                           onChange={handleLocationChange}
                                           placeholder="enter address"/>
                                </fieldset>
                                <fieldset className="box box-fieldset">
                                    <label htmlFor="upload">Amenities:</label>
                                    <input
                                        type="file"
                                        className="form-control style-1"
                                        onChange={(e) => uploadFileHandler(e, 'amenities')}
                                    />
                                </fieldset>
                                {uploading ? <p>Uploading...</p> : null}

                                <h3>Uploaded Photos:</h3>
                                <ul>
                                    {amenities.map((photo, index) => (
                                        <li key={index}>
                                            <img src={photo.url} alt={`uploaded-${index}`} style={{width: '200px'}}/>
                                        </li>
                                    ))}
                                </ul>
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
                                               placeholder="enter price"/>
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">
                                            Offer Price:<span>*</span>
                                        </label>
                                        <input type="number" className="form-control style-1"
                                               value={offerPrice}
                                               onChange={(e) => setOfferPrice(e.target.value)}
                                               placeholder="enter offer price"/>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <button className="tf-btn primary">Add Product</button>
                    </div>
                </form>
            </LayoutAdmin>
        </>
    )
}
