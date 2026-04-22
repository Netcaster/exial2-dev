import ExialProductionSite from './components/ExialSite'
import GatePage, { useGateAccess } from './components/GatePage'
import './index.css'

export default function App() {
  const { granted, grant } = useGateAccess()
  if (!granted) return <GatePage onAccess={grant} />
  return <ExialProductionSite />
}
