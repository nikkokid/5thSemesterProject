import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import App from './App.tsx'
/*
import {FrontPage} from "/pages/FrontPage.tsx";
import {GrapeType} from "/pages/grape/GrapeType.tsx";
import {Statistics} from "/pages/statistics/Statistics.tsx";
import {GrapeElement} from "/pages/grape/GrapeElement.tsx";
import {Wine} from "/pages/wine/Wine.tsx";
import {Juice} from "/pages/juice/Juice.tsx";
import {Plants} from "/pages/plants/Plants.tsx";

      <Route path="/" element={<FrontPage />} />
      <Route path="/grape-type" element={<GrapeType />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/wine" element={<Wine />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/grape-type/:grapeId/" element={<GrapeElement/>} /> {/*Specific grape type such as "Rondo" - see Druesort 2 in prototypes}
      <Route path="/grape-type/:grapeId/juice" element={<Juice/>} />
      <Route path="/grape-type/:grapeId/harvest" element={<Harvest/>} />
      <Route path="/grape-type/:grapeId/plants" element={<Plants/>} />


*/
import Harvest from './pages/harvest/Harvest.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>

      <Route path="/harvest" element={<Harvest grapeId={1}/>} />
    </Routes>
    
    </BrowserRouter>
  </StrictMode>,
)
