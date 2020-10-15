import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';

function App() {
    return (
        <div id="wrapper">
            <Sidebar />
            <Content />
        </div>
    );
}

export default App;