import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import Scan from '@/routes/Scan';
import Upload from '@/routes/Upload';
import Create from '@/routes/Create';
import History from '@/routes/History';
import NotFound from '@/routes/NotFound';

import '../css/QRaw.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scan />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/create" element={<Create />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
