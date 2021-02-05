import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router';
import axios from 'axios';

const ListView = () => {
    const [blog, setBlog] = useState(null);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/blogs/${params.uuid}`)
                .then(res => res.data ? setBlog(res.data) : {});
    }, []);
    
    return blog ? (
        <div>
            <div style={{
                backgroundImage: `url(${ blog.image })`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundColor: "#ccc",
                height: 400
            }} />
            <div className="container-1200 margin-auto-h pad-top-50 pad-bottom-50">
                <div className="margin-bottom-10">
                    <Link to="/" className="btn btn-clear-bordered-black txt-center">
                        Go Back
                    </Link>
                </div>
                <div className="margin-top-30 txt-medium txt-uppercase">
                    { blog.category }
                </div>
                <div className="txt-header-2 txt-bold">
                    { blog.title }
                </div>
                <div className="margin-top">
                    Posted by <strong>{ blog.author }</strong>
                </div>
                <div className="margin-top">
                    Posted on <strong>{ moment.unix(blog.post_date).format("MMM DD, YYYY") }</strong>
                </div>
                <div
                    className="margin-top-50 txt-medium-large"
                    style={{lineHeight: 1.4}}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </div>
    ) : null
}

export default ListView;