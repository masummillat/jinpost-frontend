import React from 'react';

const BlankLayout = ({ children }: {children: React.ReactChildren}) => (
    <>
        <h1>Blank layout</h1>
        <div>{children}</div>
    </>
);

export default BlankLayout;
