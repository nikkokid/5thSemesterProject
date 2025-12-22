import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import Header from './components/Header.tsx'
import FrontPage from "./pages/FrontPage.tsx"
import Grape from './pages/Grape.tsx';
import GrapeElement from "./pages/GrapeElement.tsx";
// import GrapeType from "./pages/grape/GrapeType.tsx";
// import Statistics from "./pages/statistics/Statistics.tsx";
// import Wine from "./pages/wine/Wine.tsx";
// import Juice from "./pages/juice/Juice.tsx";
// import Harvest from "./pages/harvest/Harvest.tsx";
// import Plants from "./pages/plants/Plants.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Header />
      <div className="flex-col items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg w-full p-8 pb-24 flex flex-col items-center gap-10">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/grape" element={<Grape />} />
          <Route path="/grape/:grapeId" element={<GrapeElement/>} />
      {/* <Route path="/statistics" element={<Statistics />} />
      <Route path="/wine" element={<Wine />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/grape-type/:grapeId/" element={<GrapeElement/>} /> {/*Specific grape type such as "Rondo" - see Druesort 2 in prototypes}
      <Route path="/grape-type/:grapeId/juice" element={<Juice/>} />
      <Route path="/grape-type/:grapeId/harvest" element={<Harvest/>} />
      <Route path="/grape-type/:grapeId/plants" element={<Plants/>} /> */}
        </Routes>
        </div>
      </div>
    
    </StrictMode>,
  </BrowserRouter>
)
