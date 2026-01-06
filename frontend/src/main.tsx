import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import Header from './Components/Header.tsx'
import FrontPage from "./Pages/FrontPage.tsx"
import Grape from './Pages/Grape/Grape.tsx';
import GrapeElement from "./Pages/Grape/GrapeElement.tsx";
import Wine from "./Pages/Wine/Wine.tsx";
import WineElement from "./Pages/Wine/WineElement.tsx";
import Harvest from "./Pages/Harvest/Harvest.tsx";
import Juice from "./Pages/Juice/Juice.tsx";
import GrapeRowList from './Pages/GrapeRow/GrapeRowList.tsx';
import GrapeRowCreate from './Pages/GrapeRow/GrapeRowCreate.tsx';
import GrapeRowRead from './Pages/GrapeRow/GrapeRowRead.tsx';

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
          <Route path="/wine" element={<Wine />} />
          <Route path="/wine/:wineId" element={<WineElement />} />
          <Route path="/grape/:grapeId/juice" element={<Juice/>} />
          <Route path="/grape-row" element={<GrapeRowList/>} />
          <Route path="/grape-row/:grapeRowId" element={<GrapeRowRead/>} />
          <Route path="/grape-row/create" element={<GrapeRowCreate/>} />
        </Routes>
        </div>
      </div>
    
    </StrictMode>
  </BrowserRouter>
)
