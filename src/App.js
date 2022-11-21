
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes/Router';
import { Toaster } from 'react-hot-toast';
import Loading from './sheard/loading/Loading';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={router} fallbackElement={<Loading></Loading>}>
        <Toaster />
      </RouterProvider>
      
    </div>
  );
}

export default App;
