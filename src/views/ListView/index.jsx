import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import queryString from 'query-string';

import { BlogCard, SearchInput } from './components';

const ListView = () => {
    const history = useHistory();
    const [blogs, setBlogs] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [filters, setFilters] = useState({
        page: 1,
        keyword: '',
        sort: ''
    });
    const [pages, setPages] = useState(0);
    const formQryString = (params) => {
        let qrystr = '';
        if (params.page) qrystr += `page=${ params.page }`;
        if (params.keyword) qrystr += `&keyword=${ params.keyword }`;
        if (params.sort === "asc") qrystr += `&sort=${ params.sort }`;

        return qrystr;
    }
    const retreiveQryStrings = () => {
        let queryparams = {
            page: 1,
            keyword: '',
            sort: ''
        };
        
        if (history.location.search) {
            queryparams = queryString.parse(history.location.search);
        }

        if (!queryparams.page) queryparams.page = 1;
        queryparams.page = parseInt(queryparams.page);

        if(!queryparams.sort) queryparams.sort = '';
        
        setFilters(queryparams);
    }
    const getList = () => {
        let qrystr = `_page=${filters.page}&_limit=9`;

        if ( filters.keyword ) qrystr += `&title_like=${ filters.keyword }`;
        if ( !filters.sort ) qrystr += `&_sort=post_date&_order=desc`;

        axios
            .get(`http://localhost:3001/blogs?${qrystr}`)
            .then(res => {
                setPages(generatePaginationLinks(res.headers));
                if (res.data) setBlogs(res.data);
            });
    };
    const handleSearch = (keyword) => {
        const newFilters = {...filters};
        newFilters.page = 1;
        newFilters.keyword = keyword;
        history.push(`?${ formQryString(newFilters) }`);
        setFilters(newFilters);
    }

    useEffect(() => {
        setMounted(true);
        retreiveQryStrings();
    }, []);

    useEffect(() => {
        if(mounted) getList();
    }, [filters]);

    return (
        <div>
            <div className="container-1200 margin-auto-h pad-top-50 pad-bottom-50">
                <div className="flex flex-end">
                    <div>
                        <Link
                            to="/blog/create"
                            className="btn btn-pad-large btn-success txt-center"
                        >
                            Create
                        </Link>
                    </div>
                </div>
                <div className="txt-header-2 txt-bold margin-top-30 txt-center">
                    Blogs
                </div>
                <div className="margin-top-10">
                    <div className="flex-1">
                        <SearchInput onSearch={ handleSearch } initialValue={ filters.keyword }/>
                    </div>
                    <div className="flex align-center flex-end margin-top-20">
                        <div className="margin-left-20">
                            <Link
                                className={`btn ${!filters.sort ? '' : 'btn-clear-bordered-black'}  btn-pad-large`}
                                onClick={ () => setFilters({ ...filters, ...{ sort: '' } }) }
                                to={`?${ formQryString({ ...filters, ...{ sort: '' } }) }`}
                            >
                                Sort Descending
                            </Link>
                        </div>
                        <div className="margin-left-20">
                            <Link
                                className={`btn ${filters.sort ? '' : 'btn-clear-bordered-black'}  btn-pad-large`}
                                onClick={ () => setFilters({ ...filters, ...{ sort: 'asc' } }) }
                                to={`?${ formQryString({ ...filters, ...{ sort: 'asc' } }) }`}
                            >
                                Sort Ascending
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="margin-top-20 grid grid-3 grid-gap-20">
                    {
                        blogs.map(blog => (
                            <div key={ blog.uuid } >
                                <BlogCard
                                    blog={ blog }
                                    deleteCallback={ getList }
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    pages ? (
                        <div className="margin-top-100 flex align-center justify-center">
                            {
                                [...Array(pages)].map((p, index) => (
                                    <Link
                                        className={`btn btn-icon ${ (index + 1) === filters.page ? "btn-success" : "txt-dark" }`}
                                        onClick={() => setFilters({ ...filters, ...{page: index + 1} })}
                                        to={`?${ formQryString({ ...filters, ...{ page: index + 1 } }) }`}
                                    >
                                        { index + 1}
                                    </Link>
                                ))
                            }
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

const generatePaginationLinks = (resHeader) => {
    let pages = 0;
    if (resHeader.link) {
        const lastLink = resHeader.link.split(",").pop();
        try {
            pages = lastLink
                    .split(';')[0]
                    .replace('http://localhost:3001/blogs?', '')
                    .split('&')
                    .find(param => param.includes("_page"))
                    .replace("_page=", '')
                    .replace('<', '');
        }
        catch(err) {
            pages = 0;
        }
    }

    return parseInt(pages);
}

export default ListView;