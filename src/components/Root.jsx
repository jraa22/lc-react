import React from 'react';
import App from './App';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NoMatch from './pages/NoMatch';

export default function Root() {
  const routes = [
    { path: '/', name: 'Home', Component: App, exact: true },
    { path: '/about', name: 'About', Component: About, exact: true },
    { path: '/contact', name: 'Contact', Component: Contact, exact: true },
    { path: '/blog', name: 'Blog', Component: Blog, exact: true },
    { path: '/blog/:id', name: 'Post', Component: BlogPost, exact: false },
    { path: '*', name: 'No match', Component: NoMatch, exact: false },
  ];

  return (
    <Router>
      <div className="todo-app-container">
        <NavigationBar />
        <div className="content">
          <Routes>
            {routes.map(({ path, Component, exact }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                element={<Component />}
              />
            ))}
            {/*<Route exact path="/" element={<App />} />

            <Route exact path="/about" element={<About />} />

            <Route exact path="/contact" element={<Contact />} />

            <Route exact path="/blog" element={<Blog />} />

            <Route exact path="/blog/:id" element={<BlogPost />} />

            <Route path="*" element={<NoMatch />} />
            */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
