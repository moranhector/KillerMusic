import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';

const CLIENT_ID = '194e1f971c73499ca3e70d29189aae94'
const CLIENT_SECRET = 'f092a8aaf35f4fe293c0b7a8b0f9532c'

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

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
        // .then(data => console.log(data.access_token))
        .then(data => setAccessToken(data.access_token))
  },[])

  async function Search(){
    console.log(" Buscando ..." , searchInput) ;

    //Get request using search to get the Artist ID

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    //Acá hago la búsqueda artistas por Nombre
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())    
      .then(data => { return data.artists.items[0].id})
      //.then(data => console.log( data ))

      console.log( "Artist ID is "+ artistID);



    //Acá hago la búsqueda de albumes por ID de ARtista
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID +
                        '/albums' + '?include_groups=album&market=US&limit=50', searchParameters )
                    .then( response => response.json())
                    .then( data => { 
                        console.log( data.items) ;
                        setAlbums(data.items) ;
                     });



  }

  return (
    <div className="App">

      <Container>
          <InputGroup className="mb-3" size="lg">
              <FormControl
                  placeholder="Search For Artist"
                  type="input"
                  onKeyPress={event => {
                  if (event.key === "Enter") {
                    Search();
                  }
                  }}
                  onChange={ event => {setSearchInput(event.target.value)}}
              />
              <Button onClick={ Search }>
                Search
              </Button>
              
          </InputGroup>
      </Container>
      <Container>
                  <Row className="mx-2 row row-cols-4">
                    {albums.map(( album, i ) => {
                      console.log(album);
                      return (
                        <Card>
                          <Card.Img src="#"/>
                          <Card.Body>
                            <Card.Title> Album Name here </Card.Title>
                          </Card.Body>
                      </Card> 
                      )                     

                    })}

                  </Row>

      </Container>


    </div>
  );
}

export default App;
