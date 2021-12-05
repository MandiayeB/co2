import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Emissions from '../views/Emissions'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Emissions />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;
