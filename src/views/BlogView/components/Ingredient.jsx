import React from 'react';

const Ingredient = ({ ingredient, specials }) => {
    const ingSpecial = specials.find(special => special.ingredientId === ingredient.uuid);

    return (
        <div className="pad-10">
            <div>
                <span className="txt-bold">{ ingredient.name }</span> x { ingredient.amount } { ingredient.measurement }
            </div>
            {
                ingSpecial ? (
                    <div className="card pad-10 margin-top">
                        <div className="txt-uppercase txt-small txt-bold txt-primary">
                            { ingSpecial.type }
                        </div>
                        <div className="txt-medium-large txt-bold margin-top-10">
                            { ingSpecial.title }
                        </div>
                        <div className="margin-top">
                            { ingSpecial.text }
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
};

export { Ingredient };