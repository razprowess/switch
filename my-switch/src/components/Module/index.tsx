import React, {FC} from 'react';
import './module.css';

interface ModuleProps extends React.HTMLProps<HTMLElement> {
    marginTop?: string;
    marginBottom?: string;
    background?: string;
}

export const Module: FC<ModuleProps> = ({children, marginBottom, marginTop, background}) => {

 return <div className="container" style={{
        marginTop: `${marginTop !== undefined ? marginTop : '8px' }`, 
        marginBottom: `${marginBottom !== undefined ? marginBottom : '100px' }`,
        background: background }}>
     {children}
 </div>
}





