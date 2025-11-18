import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

