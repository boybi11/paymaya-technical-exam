import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

// actions
import {
    toggleCollapse,
    randomStr
} from '@helpers/generalHelper';

const Select = ({ formGroupClassName = "", containerClassName = "", label = "", error = undefined, onKeyEnter = false, containerStyles, ...props }) => {
    const validation = {},
        uid = useRef(randomStr(20)),
        [showOptions, setShowOptions] = useState(false),
        icon = getSelectedOptionProp(props.value, props.options, "icon");

    if (error) {
        validation.invalid = true;
    } else if (error !== undefined) {
        validation.valid = true;
    }

    return ( 
        <div
            className={`form-group-container relative-container ${containerClassName} ${props.disabled ? 'no-pointer' : ''}`}
            style={containerStyles}
        >
            {
                label &&
                <div className="margin-bottom">
                    <Label
                        className="txt-medium txt-regular"
                    >
                        {label}
                    </Label>    
                </div>
            }
            <div className="relative-container">
                <FormGroup
                    className={formGroupClassName + " relative-container"}
                >
                    <div
                        className="relative-container flex align-center clickable"
                        onClick={() => {
                            toggleCollapse(null, `.select-options-${props.name}${uid.current}`);
                            setShowOptions(!showOptions);
                        }}
                    >
                        <div
                            id={props.name}
                            className={`flex-1 clickable`}
                            
                        >
                            <div className={`no-pointer flex align-center`}>
                                {
                                    icon ? (
                                        <div className="margin-left-10">
                                            {
                                                icon
                                            }
                                        </div>
                                    ) : null
                                }
                                <Input 
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onKeyEnter && onKeyEnter();
                                        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                            const currIndex = props.options.findIndex(option => option.value === props.value);
                                            let nextIndex = currIndex + (e.key === "ArrowUp" ? 1 : -1);
                                            
                                            if (nextIndex >= props.options.length) {
                                                nextIndex = 0;
                                            }

                                            if (nextIndex < 0) {
                                                nextIndex = props.options.length - 1;
                                            }

                                            props.onChange({
                                                target: {
                                                    name: props.name,
                                                    value: props.options[nextIndex].value
                                                }
                                            });
                                        }
                                    }}
                                    {...validation}
                                    onChange={() => {}}
                                    value={getSelectedOptionProp(props.value, props.options)}
                                    placeholder={props.placeholder}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <button
                            className={`control no-pointer no-transition pad-left-20`}
                            tabIndex="-1"
                        >
                            <i className="fas fa-caret-down txt-large" />
                        </button>
                    </div>
                </FormGroup>
                {
                    props.options && props.options.length > 0 ? (
                        <div
                            className={`select-options-container flex ${showOptions ? '' : 'no-pointer'} ${processSelectContainerStyles(props.value, props.options, "class")}`}
                            style={{borderBottom: showOptions ? '1px solid #ccc' : 'none'}}
                        >
                            <Scrollbars
                                autoHide
                                autoHeight
                                autoHeightMin={0}
                                autoHeightMax={props.optionHeight ? props.optionHeight : 100}
                            >
                                <div
                                    className={`select-options select-options-${props.name}${uid.current} collapse-container txt-dark flex-1`}
                                >
                                    <div>
                                        {
                                            props.options.filter(option => option.value !== props.value).map(option => {
                                                return (
                                                    <div
                                                        key={`option${option.value}`}
                                                        className="option clickable txt-dark-link flex align-center"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleCollapse(null, `.select-options-${props.name}${uid.current}`);
                                                            setShowOptions(!showOptions);
                                                            props.onChange({
                                                                target: {
                                                                    name: props.name,
                                                                    value: option.value
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        <div className="margin-right-10">
                                                            {
                                                                option.icon ? option.icon : null
                                                            }
                                                        </div>
                                                        <div className="label txt-medium">
                                                            {option.label}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                    ) : null
                }
            </div>
            {error && validation.invalid &&
                <div className="flex flex-end margin-top form-control-error">
                    <div className="badge badge-error text-right txt-light txt-small">
                        <i className="fas fa-exclamation-circle margin-right"/>
                        {error}
                    </div>
                </div>
            }
        </div>
    );
};

const processSelectContainerStyles = (value, options, expected = "style") => {
    let retValue = {
        style: "translateY(0)",
        class: ""
    };

    let index = 0;

    options.map((o, i) => {
        if (o.value === value) {
            index = i;
        }

        return i;
    });

    if (index > 0) {
        if (index === (options.length -1)) {
            retValue = {
                style: "translateY(calc(-66.66%) - 1px)",
                class: "option-end"
            };
        } else {
            retValue = {
                style: "translateY(-33.33%)",
                class: "option-center"
            }
        }
    }

    return retValue[expected];
}

const getSelectedOptionProp = (value, options, prop = "label") => {
    const selectedOption = options.find(option => value === option.value);

    if (selectedOption) {
        return selectedOption[prop];
    }

    return "";
}

Select.propTypes = {
    onKeyEnter: PropTypes.func,
    label: PropTypes.any,
    error: PropTypes.string,
    valid: PropTypes.bool
};

export {Select};