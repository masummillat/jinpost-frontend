import React from 'react';

const DefaultLayout = ({ children }: {children: React.Component}) => (
    <>
        <h1>Default layout</h1>
        <div>{children}</div>
    </>
);

export default DefaultLayout;
