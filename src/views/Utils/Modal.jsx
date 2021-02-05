import React from 'react';

const Modal = ({
    title,
    message,
    onConfirm,
    onCancel
}) => {

    return (
        <div
            className="fixed-cover-container flex align-center justify-center"
            style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
            <div
                className="card shadowed pad-20"
                style={{
                    width: "100%",
                    maxWidth: 600
                }}
            >
                <div className="txt-center txt-bold txt-large">
                    { title }
                </div>
                <div className="margin-top-20 txt-medium-large txt-center">
                    { message }
                </div>
                <div className="flex align-center space-between margin-top-50">
                    <button
                        className="btn btn-clear btn-pad-large txt-dark"
                        onClick={ () => onCancel() }
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-success btn-pad-large txt-dark"
                        onClick={ () => onConfirm() }
                    >
                        Coninue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;