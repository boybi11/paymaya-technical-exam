import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const TextInput = ({
    formGroupClassName = "",
    containerClassName = "",
    label = "",
    error = undefined,
    onKeyEnter = false,
    containerStyles,
    onChange,
    rightIcon,
    leftIcon,
    customButtons,
    hideClearBtn = false,
    pattern,
    ...props
}) => {
    const validation = {},
        inputRef = useRef(null),
        isPassword = props.type === "password",
        [showPass, setShowPass] = useState(false);

    let select = false;

    if (props.value === undefined) {
        props.value = "";
    }

    if (error) {
        validation.invalid = true;
    } else if (error !== undefined) {
        validation.valid = true;
    }

    if (props.type === "password") {
        props.type = showPass ? "text" : "password";
    }

    if (props.type === "select") {
        props.type = "text"
        select = true;
    }

    if (props.numeric) {
        if (props.numeric === "money") {
            props.onChange = e => parseToMoney(e, props.value ? props.value : '', {...props}, onChange);
        } else {
            props.onChange = e => parseToNumber(e, props.value ? props.value : '', props.numeric, {...props}, onChange);
        }

        props.onBlur = (e) => {
            if (props.numeric === "money") {
                parseToMoney(e, props.value ? props.value : (props.min ? props.min : 0), {...props}, onChange, "blur");
            } else {
                parseToNumber(e, props.value ? props.value : (props.min ? props.min : 0), props.numeric, {...props}, onChange);
            }
        }
    } else {
        props.onChange = e => onTextChange(e, {...props}, pattern, onChange);
    }

    //** used for money auto parsing */
    // useEffect(() => {
    //     if(inputRef.current === document.activeElement && (props.numeric === "money")) {
    //         if(props.value.toString().substr(-3) === ".00") {
    //             const pos = props.value.toString().indexOf('.');
    //             inputRef.current.focus();
    //             inputRef.current.setSelectionRange(pos, pos);
    //         }
    //     }
    // }, [props.value]);

    useEffect(() => {
        if (props.numeric && props.max) {
            if (props.numeric === "money") {
                parseToMoney({target: {name: props.name, value: props.value}}, props.value, {...props}, onChange);
            } else {
                parseToNumber({target: {name: props.name, value: props.value}}, props.value ? props.value : '', props.numeric, {...props}, onChange);
            }
        }
    }, [props.max]);

    useEffect(() => {

        return () => {
            inputRef.current = null;
        }
    }, []);

    return ( 
        <div
            className={`form-group-container relative-container ${containerClassName} ${props.disabled ? 'disabled' : ''}`}
            style={containerStyles}
        >
            {
                label ? (
                    <div className="margin-bottom flex align-center">
                        {
                            label ? (
                                <Label
                                    className="txt-medium txt-regular"
                                >
                                    {label}
                                </Label>
                            ) : null
                        }
                    </div>
                ) : null
            }
            <div className={`relative-container ${props.disabled ? 'no-pointer' : ''}`}>
                <FormGroup
                    className={formGroupClassName + " relative-container"}
                >
                    <div className="relative-container flex align-center">
                        {
                            leftIcon ? (
                                <div
                                    className={`txt-medium pad-left-10 no-pointer`}
                                    tabIndex="-1"
                                >
                                    {leftIcon}
                                </div>
                            ) : null
                        }
                        <div
                            id={props.name}
                            className={`flex-1 ${select ? 'clickable' : ''}`}
                        >
                            <div className={`${select ? 'no-pointer' : ''} flex`}>
                                <Input 
                                    innerRef={inputRef}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onKeyEnter && onKeyEnter(e);
                                        }
                                    }}
                                    {...validation}
                                    {...props}
                                    className={"form-control txt-medium-large"}
                                />
                            </div>
                        </div>
                        {
                            !select && !props.disabled && (
                                <>
                                    {
                                        customButtons ? customButtons : null
                                    }
                                    {
                                        !hideClearBtn ? (
                                            <button
                                                className={`control clear-form transitioned-fast ${isPassword ? "" : "pad-right-10"}`}
                                                onClick={() => {
                                                    let newValue = "";

                                                    if (props.numeric && props.min) {
                                                        newValue = props.min;
                                                    }

                                                    props.onChange({target: {name: props.name, value: newValue}});
                                                }}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-times-circle" />
                                            </button>
                                        ) : null
                                    }
                                    {
                                        isPassword && !props.disabled && (
                                            <button
                                                className={`control clear-form transitioned-fast pad-right-10`}
                                                onClick={() => setShowPass(!showPass)}
                                                tabIndex="-1"
                                            >
                                                <i className={`far fa-eye${showPass ? '-slash' : ''}`} />
                                            </button>
                                        )
                                    }
                                    {
                                        rightIcon ? (
                                            <div
                                                className={`txt-medium pad-right-10 no-pointer`}
                                                tabIndex="-1"
                                            >
                                                {rightIcon}
                                            </div>
                                        ) : null
                                    }
                                </>
                            )
                        }
                        {
                        (select || (props.options && props.options.length > 0)) && !props.hideDropDownIcon && (
                                <button
                                    className={`control clear-form select-down no-pointer no-transition pad-left-10`}
                                    tabIndex="-1"
                                >
                                    <i className="fas fa-caret-down txt-large" />
                                </button>
                            )
                        }
                    </div>
                </FormGroup>
                {
                    select && props.options && props.options.length > 0 ? (
                        <div className="select-options txt-dark">
                            <div>
                                {
                                    props.options.map(option => {
                                        return (
                                            <div className="option">
                                                {option.label}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }
            </div>
            {error && validation.invalid &&
                <div className="flex flex-end margin-top form-control-error">
                    <div className="badge badge-error text-right txt-light txt-small">
                        <div className="flex">
                            <i className="fas fa-exclamation-circle margin-right pulse"/>
                            <div>
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

const parseToNumber = (e, originalValue, type, props, callback) => {
    if (!isNaN(e.target.value) && e.target.value.indexOf('.') === -1) {
        let newValue = e.target.value;
        if (newValue !== '') {
            if (type === "int") {
                newValue = parseInt(newValue);
                if (props.max && (newValue > parseInt(props.max))) {
                    newValue = parseInt(props.max).toString();
                }

                if (props.min && (parseFloat(newValue) < parseFloat(props.min))) {
                    newValue = parseFloat(props.min).toString();
                }
            }
            
            newValue = newValue.toString();
        } else {
            if (props.min) {
                newValue = props.min.toString();
            }
        }

        callback({target: {value: newValue, name: e.target.name}});
    } else {
        callback({target: {value: originalValue, name: e.target.name}});
    }
}

const parseToMoney = (e, originalValue, props, callback, action = "onChange") => {
    if (!isNaN(e.target.value)) {
        let newValue = e.target.value;
        if (newValue !== '' && newValue !== undefined && newValue !== null) {
            
            if (!isNaN(props.max) && (parseFloat(newValue) > parseFloat(props.max))) {
                newValue = parseFloat(props.max);
            }

            if (props.min && (parseFloat(newValue) < parseFloat(props.min))) {
                newValue = parseFloat(props.min);
            }
            // if (!newValue.toString().includes('.')) {
            //     newValue = parseFloat(newValue).toFixed(2).toString();
            // }
            
            newValue = newValue.toString();
        }

        if (action === "blur") {

            if (!newValue) {
                newValue = props.min ? props.min : '';
            } else {
                newValue = parseFloat(newValue).toFixed(2);
            }

            newValue = newValue.toString();
        }

        callback({target: {value: newValue, name: e.target.name}});
    } else {
        callback({target: {value: originalValue, name: e.target.name}});
    }
}

const onTextChange = (e, props, pattern, callback) => {
    if (props.max && parseInt(props.max) < e.target.value.length) {
        e.target.value = props.value;
    }

    if (pattern) {
        e.target.value = e.target.value.replace(pattern,'');
    }

    callback(e);
}

export {TextInput};