import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import {
    TextInput,
    Redactor
} from '../Utils/Form';

import history from '../../History';
import { validate } from '../../helpers/validationHelper';

const BlogForm = () => {
    const params = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    
    const handleInputChange = (e) => {
        const newBlog = {...blog};
        newBlog[e.target.name] = e.target.value;
        setBlog(newBlog);
    }
    const handleCreate = () => {
        axios
            .post(`http://localhost:3001/blogs`, { ...blog, ...{ uuid: randomStr(20), post_date: moment().unix() } })
            .then(res => history.push('/'));
    }
    const handleUpdate = () => {
        axios
            .put(`http://localhost:3001/blogs/${params.uuid}`, blog)
            .then(res => history.push('/'));
    }
    const handleSubmit = () => {
        const validation = validate(blog, formRules);

        setErrors(validation.errors);
        if (validation.valid) {
            if (blog.uuid) handleUpdate();
            else handleCreate();
        }
    }

    useEffect(() => {
        if (params.uuid) {
            axios
                .get(`http://localhost:3001/blogs/${params.uuid}`)
                .then(res => res.data ? setBlog(res.data) : {})
                .finally(() => setLoading(false));
        }
        else setLoading(false);
    }, []);

    return loading ? null : (
        <div>
            <div className="container-1200 margin-auto-h pad-top-50 pad-bottom-50">
                <div className="txt-xlarge txt-bold txt-capitalize">
                    {params.action} Blog
                </div>
                <div className="margin-top-20">
                    <TextInput
                        label="Title"
                        name="title"
                        value={ blog.title }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                        error={ errors.title }
                    />
                </div>
                <div className="margin-top-20">
                    <TextInput
                        label="Category"
                        name="category"
                        value={ blog.category }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                        error={ errors.category }
                    />
                </div>
                <div className="margin-top-20">
                    <TextInput
                        label="Author"
                        name="author"
                        value={ blog.author }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                        error={ errors.author }
                    />
                </div>
                <div className="margin-top-20">
                    <Redactor
                        label="Content"
                        placeholder="Enter a content here..."
                        name="content"
                        value={ blog.content_draft }
                        onChange={handleInputChange}
                        onBlur={handleInputChange}
                        error={ errors.content }
                    />
                </div>
                <div className="margin-top-20">
                    <TextInput
                        label="Image"
                        name="image"
                        value={ blog.image }
                        onChange={handleInputChange}
                        onKeyEnter={handleSubmit}
                    />
                </div>
                <div className="margin-top-50 flex space-between">
                    <Link
                        to="/"
                        className="btn btn-clear btn-pad-large txt-center txt-dark"
                    >
                        Cancel
                    </Link>
                    <button
                        className="btn btn-success btn-pad-large"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

const randomStr = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const formRules = {
    properties: {
        title: {
            type: 'string',
            required: true,
            allowEmpty: false,
            message: "This field is required"
        },
        content: {
            required: true,
            conform: (data) => {
                return data.replace(/(<([^>]+)>)|(?:\r\n|\r|\n)/gi, '') ? true : false;
            },
            message: "This field is required"
        },
        author: {
            type: 'string',
            required: true,
            allowEmpty: false,
            message: "This field is required"
        },
        category: {
            type: 'string',
            required: true,
            allowEmpty: false,
            message: "This field is required"
        },
    }
 }

export default BlogForm;