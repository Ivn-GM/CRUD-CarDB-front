import './App.css';
import { Navbar } from '@mantine/core';
import { CarContent } from './components/CarContent';

function App() {
  return (
    <div>
        <Navbar style={{marginBottom: "2rem", backgroundColor: "lightblue", width: "auto", height: 80}} />
        <CarContent />
    </div>
  );
}

export default App;
