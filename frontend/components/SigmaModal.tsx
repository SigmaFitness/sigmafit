import React, { useState } from "react";


export const SigmaModal: React.FC<{
    children: JSX.Element | JSX.Element[],
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ children, isOpen, setIsOpen }) => {

    if (isOpen) {
        return (
            <>
                <div className="modal modal-open">
                    <div className="modal-box overflow-auto h-full">
                        <div onClick={() => {
                            console.log('hey', setIsOpen(false))
                        }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</div>
                        {children}
                    </div>
                </div>
            </>
        )
    }
    return null;
}
