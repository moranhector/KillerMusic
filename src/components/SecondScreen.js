import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

import { ListGroup } from 'react-bootstrap';

function SecondScreen() {
    const { param1, param2 } = useParams();

    const [album, setAlbum] = useState([]);
    const [tapaAlbum, setTapaAlbum] = useState("");
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        console.log("Parámetro recibido 1:", param1);
        console.log("Parámetro recibido 2:", param2);

        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + param2
            }
        };

        //console.log('ruta', `https://api.spotify.com/v1/albums/${param1}/tracks`);

        //Acá hago la búsqueda de album con sus tracks
        fetch(`https://api.spotify.com/v1/albums/${param1}/tracks`, searchParameters)
            .then(response => response.json())
            .then(data => {
                setTracks(data.items);
                console.log("tracks data items", data.items);
            });



        //Acá hago la búsqueda LA INFO DEL ALBUM
        fetch(`https://api.spotify.com/v1/albums/${param1}`, searchParameters)
            .then(response => response.json())
            .then(data => {

                setTapaAlbum(data.images[0].url);
                console.log("ALBUM ", data.images[0].url);
            });



    }, [param1, param2]);

    return (
        <div>
            {/* <h1>Pantalla secundaria</h1>
            <p>Parámetro recibido 1: {param1}</p>
            <p>Parámetro recibido 2: {param2}</p> */}


            <Container>
                <Row className="mx-2 row row-cols-4">


                   
                    <Card>
                        <Card.Img src={tapaAlbum} />
                        <Card.Body>
                            <Card.Title>ALBUM</Card.Title>
                            <Card.Title>CANCIO</Card.Title>
                        </Card.Body>


                        <h2>Lista de canciones</h2>

                        <ListGroup>
                            {tracks.map((tracks, i ) => (
                                <ListGroup.Item key={tracks.id}>{tracks.name}</ListGroup.Item>
                            ))}
                        </ListGroup>


                    </Card>
                 


                </Row>
            </Container>

        </div>
    );
}

export default SecondScreen;
