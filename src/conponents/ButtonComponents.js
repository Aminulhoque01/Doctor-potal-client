import React from 'react';

const ButtonComponents = ({children}) => {
    return (
        <div>
            <button className="btn btn-primary h-14 bg-gradient-to-r  from-primary to-secondary">{children}</button>
        </div>
    );
};

export default ButtonComponents;