

import Login from './components/login/Login.js';
import Main from './components/main/Main.js';
import { useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';


function App() {
  const Token = useSelector((state) =>{
    console.log(state.LoginUserToken.Token);
    return state.LoginUserToken.Token ;
  });

  return (<>
<SnackbarProvider maxSnack={3}>
    { !Token && <Login/>}
    <div className="App">
      { Token && <Main/>}
    
    </div>
  </SnackbarProvider>
  </>
  );
}

export default App;
