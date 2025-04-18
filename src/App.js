import { ToastContainer } from 'react-toastify';
import './App.css';
import { useInfoContext } from './context/Context';
import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';


function App() {
  const { currentUser } = useInfoContext()

  return (


    <div className="App">
      {currentUser ? <Chat></Chat> : <Auth></Auth>}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
