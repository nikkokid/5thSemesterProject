import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import Header from './components/Header.tsx'
import FrontPage from "./pages/FrontPage.tsx"
import Grape from './Pages/Grape/Grape.tsx';
import GrapeElement from "./Pages/Grape/GrapeElement.tsx";
// import GrapeType from "./pages/grape/GrapeType.tsx";
// import Statistics from "./pages/statistics/Statistics.tsx";
// import Wine from "./pages/wine/Wine.tsx";
import Juice from "./Pages/Juice/Juice.tsx";
import Harvest from "./Pages/harvest/Harvest.tsx";
// import Plants from "./pages/plants/Plants.tsx";
import GrapeRowList from './pages/GrapeRow/GrapeRowList.tsx';
import GrapeRowCreate from './pages/GrapeRow/GrapeRowCreate.tsx';
import GrapeRowRead from './pages/GrapeRow/GrapeRowRead.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Header />
      <div className="flex-col items-center justify-center p-5 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full pt-12 pb-24 flex flex-col items-center gap-10 ">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/grape" element={<Grape />} />
          <Route path="/grape/:grapeId/" element={<GrapeElement/>} />
          <Route path="/grape/:grapeId/harvest" element={<Harvest/>} />
          <Route path="/grape/:grapeId/juice" element={<Juice/>} />
      {/*<Route path="/statistics" element={<Statistics />} />
      <Route path="/wine" element={<Wine />} />
      <Route path="/statistics" element={<Statistics />} />
       {/*Specific grape type such as "Rondo" - see Druesort 2 in prototypes}
      <Route path="/grape-type/:grapeId/harvest" element={<Harvest/>} />
      <Route path="/grape-type/:grapeId/plants" element={<Plants/>} /> */}
        </Routes>
        </div>
      </div>
    
    </StrictMode>,
  </BrowserRouter>
)
