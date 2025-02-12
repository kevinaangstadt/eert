import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import DirectorySelector from './DirectorySelector';
import DirectoryPrinter from './DirectoryPrinter';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <DirectorySelector />
        </Row>
        <Row>
          <DirectoryPrinter />
        </Row>
      </Container>
    </div>
  );
}

export default App;
