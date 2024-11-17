
import './App.css'
import Layout from './layout/Layout'
import { AppRoutes } from './routes/AppRoutes'


function App() {

  return (
    <>
      <Layout children={<AppRoutes />} />
    </>
  )
}

export default App
