import React from 'react';
import moment from 'moment';
import { TextInput } from '../../Utils/Form';

const Ingredients = ({
    data,
    onChange,
    onSubmit
}) => {
    const handleAddIngredient = () => {
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
                    Ingredients
                </div>
                <div>
                    <button
                        className="btn btn-success txt-center"
                        onClick={handleAddIngredient}
                    >
                        Add
                    </button>
                </div>
            </div>
            <div>
                {
                    data && data.length ? (
                        data.map((ingredient, index) => (
                            <div
                                key={`ingredient${index}`}
                                className="margin-top-20 card pad-10"
                            >
                                <div className="grid grid-3 grid-gap-20" >
                                    <TextInput
                                        label="Name"
                                        name="name"
                                        placeholder="name"
                                        value={ ingredient.name }
                                        onChange={ e => handleInputChange(e, index) }
                                        onKeyEnter={ onSubmit }
                                    />
                                    <TextInput
                                        label="Measurement"
                                        name="measurement"
                                        placeholder="measurement"
                                        value={ ingredient.measurement }
                                        onChange={ e => handleInputChange(e, index) }
                                        onKeyEnter={ onSubmit }
                                    />
                                    <TextInput
                                        label="Amount"
                                        name="amount"
                                        placeholder="amount"
                                        value={ ingredient.amount }
                                        onChange={ e => handleInputChange(e, index) }
                                        onKeyEnter={ onSubmit }
                                    />
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
                        <div className="txt-center pad-50">Ingredients is Empty</div>
                    )
                }
            </div>
        </div>
    );
};

export { Ingredients };