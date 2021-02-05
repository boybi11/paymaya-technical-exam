import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';

const TextArea = ({ className = '', style = {}, ...props }) => {
    return (
        <div>
            {
                props.label ? (
                    <div className="margin-bottom">
                        <Label className="txt-medium txt-regular">
                            {props.label}
                        </Label>
                    </div>
                ) : null
            }
            <textarea
                className={`form-control`}
                style={{
                    minHeight: "150px"
                }}
                {...props}
            />
            {props.error &&
                <div className="flex flex-end margin-top form-control-error">
                    <div className="badge badge-error text-right txt-light txt-small float-in-up-down">
                        <i className="fas fa-exclamation-circle margin-right"/>
                        {props.error}
                    </div>
                </div>
            }
        </div>
    );
};

TextArea.propTypes = {
    className: PropTypes.string
};

export {TextArea};