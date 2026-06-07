import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import SourcesPage from './pages/SourcesPage';
import './index.css';

function Nav() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`;
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2">
        <img src="/logo.svg" alt="Think Step" className="h-20 w-auto ml-2" />
        <NavLink to="/" className={linkClass} end>משימות</NavLink>
        <NavLink to="/sources" className={linkClass}>מקורות</NavLink>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/sources" element={<SourcesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
