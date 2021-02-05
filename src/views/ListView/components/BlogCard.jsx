import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Modal from '../../Utils/Modal';

const BlogCard = ({ blog, deleteCallback }) => {
    const [deleting, setDeleting] = useState(false);
    const handleDelete = () => {
        axios
            .delete(`http://localhost:3001/blogs/${ blog.uuid }`)
            .then(res => {
                deleteCallback();
                setDeleting(false);
            })
    }

    return (
        <>
            <div  className="card flex direction-column" style={{ height: "100%" }}>
                <div style={{ background: "#ccc" }}>
                    <img
                        className="img img-cover"
                        src={ blog.image ? blog.image : 'https://picsum.photos/200/300'}
                        style={{
                            width: "100%",
                            height: 200
                        }}
                    />
                </div>
                <div className="pad-20 flex-1">
                    <div className="txt-small txt-uppercase">
                        { blog.category }
                    </div>
                    <div className="txt-bold txt-large">
                        { blog.title }
                    </div>
                    <div className="txt-xsmall margin-top">
                        Posted: { moment(blog.post_date).format("MMMM DD, YYYY") }
                    </div>
                    <div className="margin-top-10 txt-medium">
                        { moreChar(blog.content, 255) }
                    </div>
                </div>
                <div className="margin-top-20 flex flex-end pad-20">
                    <button
                        onClick={ () => setDeleting(true) }
                        className="btn btn-clear-bordered-red btn-width-auto txt-small"
                    >
                        Delete
                    </button>
                    <Link
                        to={`/blog/edit/${ blog.uuid }`}
                        className="btn btn-clear-bordered-green btn-width-auto txt-small margin-left-20"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/blog/view/${ blog.uuid }`}
                        className="btn btn-clear-bordered-black btn-width-auto txt-small margin-left-20"
                    >
                        View
                    </Link>
                </div>
            </div>
            {
                deleting ? (
                    <Modal
                        title="Confirm Action"
                        message="Are you sure you want to continue?"
                        onConfirm={handleDelete}
                        onCancel={ () => setDeleting(false) }
                    />
                ) : null
            }
        </>
    )
};



const moreChar = (text, limit = 100, textOverflow = "...") => {
    text = text.replace(/(<([^>]+)>)/ig,"");

    if (text) {
        if (text.length > limit) {
            text = text.substr(0, (limit + textOverflow.length) < text.length ? limit : (text.length - textOverflow.length)) + textOverflow;
        }
    }

    return text;
}

export { BlogCard };