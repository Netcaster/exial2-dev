import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExialProductionSite from './components/ExialSite'
import PlatformPage from './components/PlatformPage'
import GatePage, { useGateAccess } from './components/GatePage'
import './index.css'

function AppRoutes() {
  const { granted, grant } = useGateAccess()
  if (!granted) return <GatePage onAccess={grant} />
  return (
    <Routes>
      <Route path="/" element={<ExialProductionSite />} />
      <Route path="/platform/:page" element={<PlatformPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="*" element={<ExialProductionSite />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
