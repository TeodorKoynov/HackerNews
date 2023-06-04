import React from 'react'
import {useState} from 'react';
import * as ReactDOM from "react-dom/client";
import './index.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ThemeProvider} from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'

const Posts = React.lazy(() => import('./components/Posts'))
const Post = React.lazy(() => import('./components/Post'))
const User = React.lazy(() => import('./components/User'))

function App() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');

    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className='container'>
                        <Nav toggleTheme={toggleTheme}/>
                        <React.Suspense fallback={<Loading/>}>
                            <Routes>
                                <Route
                                    path='/'
                                    element={<Posts type={'top'}/>}
                                />
                                <Route
                                    path='/new'
                                    element={<Posts type={'new'}/>}
                                />
                                <Route path='/post' element={<Post/>}/>
                                <Route path='/user' element={<User/>}/>
                                <Route render={() => <h1>404</h1>}/>
                            </Routes>
                        </React.Suspense>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);
root.render(<App/>);

// ReactDOM.render(
//     <App/>,
//     document.getElementById('app')
// )