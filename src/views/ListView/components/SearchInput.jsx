import React, { useState, useEffect } from 'react';

//components
import { TextInput } from '../../Utils/Form';
const SearchInput = ({ onSearch, initialValue = '' }) => {
    const [keyword, setKeyword] = useState(initialValue);
    
    useEffect(() => {
        setKeyword(initialValue);
    }, [initialValue]);
    return(
        <div className="flex-1 flex align-center">
            <div className="flex-1">
                <TextInput
                    name="keyword"
                    placeholder="Search keyword here..."
                    value={ keyword }
                    onChange={ e => setKeyword(e.target.value) }
                    onKeyEnter={ () => onSearch(keyword) }
                />
            </div>
            <button
                className="btn btn-pad-large txt-center margin-left-10"
                onClick={ () => onSearch(keyword) }
            >
                Search
            </button>
        </div>
    );
};

export { SearchInput };