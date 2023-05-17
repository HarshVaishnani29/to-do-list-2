import 'bootstrap/dist/css/bootstrap.min.css';
import AddProducts from './Components/AddProducts';
import ViewData from './Components/ViewData/ViewData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AddProducts/>}/>
      <Route path='/ViewData' element={<ViewData/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
