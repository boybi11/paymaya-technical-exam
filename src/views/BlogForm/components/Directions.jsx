import React from 'react';
import moment from 'moment';
import {
    TextInput,
    Toggle
} from '../../Utils/Form';

const Directions = ({
    data,
    onChange,
    onSubmit
}) => {
    const handleAddDirection = () => {
        let newData = data ? [...data] : [];

        newData.push({uuid: moment().unix()});
        onChange(newData);
    }
    const handleInputChange = (e, index) => {
        let newData = data ? [...data] : [];

        newData[index][e.target.name] = e.target.value;
        onChange(newData);
    }
    const handleRemove = (index) => {
        let newData = data ? [...data] : [];

        newData.splice(index, 1);
        onChange(newData);
    }
    
    return (
        <div
            className="margin-top-30 pad-top-30"
            style={{ borderTop: "2px solid #ccc" }}
        >
            <div className="flex align-center space-between">
                <div className="txt-large txt-bold">
                    Directions
                </div>
                <div>
                    <button
                        className="btn btn-success txt-center"
                        onClick={handleAddDirection}
                    >
                        Add
                    </button>
                </div>
            </div>
            <div>
                {
                    data && data.length ? (
                        data.map((direction, index) => (
                            <div
                                key={`direction${index}`}
                                className="margin-top-20 card pad-10"
                            >
                                <div className="flex align-center" >
                                    <div className="flex-1">
                                        <TextInput
                                            label="Instructions"
                                            name="instructions"
                                            placeholder="instructions"
                                            value={ direction.instructions }
                                            onChange={ e => handleInputChange(e, index) }
                                            onKeyEnter={ onSubmit }
                                        />
                                    </div>
                                    <div className="margin-left-40">
                                        <div className="margin-bottom-10">
                                            Optional
                                        </div>
                                        <Toggle
                                            value={ direction.optional }
                                            onChange={ value => handleInputChange({target: {name: "optional", value}}, index) }
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-end margin-top-10">
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="btn btn-clear txt-error"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="txt-center pad-50">Directions is Empty</div>
                    )
                }
            </div>
        </div>
    );
};

export { Directions };