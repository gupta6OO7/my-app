import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    let navigate = useNavigate();
    const [data, setdata] = useState([]);

    useEffect(() => {
        async function authorize() {
            if (!localStorage.getItem('authToken')) {
                navigate('/login');
                return;
            }
            const response = await fetch('http://localhost:5000/api/extractUserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ authToken: localStorage.getItem('authToken') })
            });
            const json = await response.json()
            if (!json.success) {
                navigate('/login');
                return;
            }

            const nextresponse = await fetch('http://localhost:5000/api/getAllProducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const nextjson = await nextresponse.json()
            setdata(nextjson.data);
        }
        authorize();
    }, [navigate])

    const [creds, setcreds] = useState({
        product_id: "",
        name: "",
        price: "",
        featured: "false",
        rating: "",
        created_at: "",
        company: ""
    })

    const handleSubmit = async (e) => {

        if (
            creds.name === "" ||
            creds.price === 0 ||
            creds.created_at === "" ||
            creds.company === "" ||
            creds.product_id === ""
        ) {
            alert('Enter Valid Details');
            return;
        }

        for (let i = 0; i < creds.price.length; i++) {
            if (creds.price[i] < '0' || creds.price[i] > '9') {
                alert('Price should be a number');
                return;
            }
        }

        for (let i = 0; i < creds.rating.length; i++) {
            if (creds.rating[i] < '0' || creds.rating[i] > '9') {
                alert('Rating should be a number');
                return;
            }
        }

        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: creds.product_id,
                name: creds.name,
                price: creds.price,
                featured: creds.featured,
                rating: creds.rating,
                created_at: creds.created_at,
                company: creds.company
            })
        });

        const json = await response.json()
        if (!json.success) {
            alert('Enter Valid Details');
        }
        else {
            alert('Product Added');
        }
    }

    const handlelogout = () => {
        console.log(localStorage.getItem('authToken'));
        localStorage.removeItem('authToken');

        navigate('/login');
    }

    const onChange = (event) => {
        setcreds({ ...creds, [event.target.name]: event.target.value })
    }

    return (
        <div>

            <button className="btn m-3 btn-danger" onClick={handlelogout}>Logout</button>

            <hr></hr>

            <form style={{
                paddingTop: '40px',
                paddingLeft: '500px',
                paddingRight: '500px'
            }} onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Product ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="from"
                        name='product_id'
                        value={creds.product_id}
                        onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="from"
                        name='name'
                        value={creds.name}
                        onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="ts"
                        name='price'
                        value={creds.price}
                        onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label for="usertype">Featured</label>
                    <select
                        class="form-control"
                        id="usertype"
                        name='featured'
                        value={creds.featured}
                        onChange={onChange}>
                        <option>false</option>
                        <option>true</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        id="ts"
                        name='rating'
                        value={creds.rating}
                        onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Created At</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date" name='created_at'
                        value={creds.created_at}
                        onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Company</label>
                    <input
                        type="text"
                        className="form-control"
                        id="too"
                        placeholder="Destination"
                        name='company'
                        value={creds.company}
                        onChange={onChange}></input>
                </div>

                {
                    (!localStorage.getItem('authToken')) ?
                        <button className="btn m-3 btn-primary">Log in first</button>
                        : <button type="submit" className="btn m-3 btn-primary">Submit</button>
                }

                <div className="btn m-3 btn-success">Scroll down for products.</div>

            </form>

            <br></br>

            <div style={{ padding: "100px" }}>
                <div className="row row-cols-1 row-cols-md-2 g-4" >
                    {data.map(i => {
                        return (
                            <div className='col'>
                                <div className="card "
                                    style={{ padding: '10px', width: '650px' }}>
                                    <div className="card-body">
                                        <div className='cardb'>
                                            <div className='cardb'>
                                                <h3 className="card-title">{i.Name} <span style={{ fontSize: '20px' }}>({i.Price})</span> </h3>
                                            </div>
                                            <div>
                                                {
                                                    (i.Featured) ?
                                                        <h3>Featured</h3>
                                                        : <h3>Not featured</h3>
                                                }
                                            </div>
                                        </div>

                                        <div className='cardb'>
                                            <div>Rating - {i.Rating}</div>
                                            <div className='d-flex ms-auto'>Company - {i.Company}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
