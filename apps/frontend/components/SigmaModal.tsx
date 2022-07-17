import React, { useState } from "react";


export const SigmaModal: React.FC<{
    children: JSX.Element | JSX.Element[],
    isOpen: boolean,
    setIsOpen: (newValue: boolean) => void
}> = ({ children, isOpen, setIsOpen }) => {

    if (isOpen) {
        return (
            <>
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl overflow-auto h-full">
                        <div onClick={() => {
                            setIsOpen(false)
                        }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</div>
                        {children}
                    </div>
                </div>
            </>
        )
    }
    return null;
}
