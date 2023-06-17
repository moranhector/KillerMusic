import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';

const CLIENT_ID = '194e1f971c73499ca3e70d29189aae94'
const CLIENT_SECRET = 'f092a8aaf35f4fe293c0b7a8b0f9532c'

function App() {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
      // API Acces Token
      var authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      }
      fetch('https://accounts.spotify.com/api/token', authParameters )
        .then( result => result.json() )
        .then(data => console.log(data))
  },[])

  return (
    <div className="App">

      <Container>
          <InputGroup className="mb-3" size="lg">
              <FormControl
                  placeholder="Search For Artist"
                  type="input"
                  onKeyPress={event => {
                  if (event.key == "Enter") {
                    console.log("Pressed enter");
                  }
                  }}
                  onChange={ event => {setSearchInput(event.target.value)}}
              />
              <Button onClick={ event => {console.log("click bottom")}}>
                Search
              </Button>
              
          </InputGroup>
      </Container>
      <Container>
                  <Row>
                    <Card>
                      <Card.Img src="#"/>
                      <Card.Body>
                        <Card.Title> Album Name here </Card.Title>
                      </Card.Body>
                    </Card>
                  </Row>

      </Container>


    </div>
  );
}

export default App;
