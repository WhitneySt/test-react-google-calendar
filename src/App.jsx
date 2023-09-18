//import React from 'react';
import ApiCalendar from 'react-google-calendar-api';

const CLIENT_ID = '1054787346532-36ptmgliosr43m3vep7kh3u5dk25jb9l.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD93It4ZoSyi45Fb8rEWVrKGmvC_5k4hyg';

const config = {
  "clientId": CLIENT_ID,
  "apiKey": API_KEY,
  "scope": "https://www.googleapis.com/auth/calendar",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}

const apiCalendar = new ApiCalendar(config)

const App = () => {



  const handleItemClick = async (name) => {
    if (name === 'sign-in') {
      const response = await apiCalendar.handleAuthClick();
      console.log(response);
    } else if (name === 'sign-out') {
      const response = apiCalendar.handleSignoutClick();
      console.log(response);
    }
  }

  //Crear evento

  const createAnEvent = async () => {
    try {
      // Define los detalles del evento
      const event = {
        summary: 'Esto es una prueba',
        description: 'Descripción del evento',
        start: {
          dateTime: '2023-09-18T10:00:00',
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: '2023-09-18T11:00:00',
          timeZone: 'America/Los_Angeles',
        },
        attendees: [
          { email: 'whitneystena418@gmail.com' },
          { email: 'hjimenez.florez@gmail.com' },
        ],
      };
      const response = await apiCalendar.createEventWithVideoConference(event);
      console.log(response)
    } catch (error) {
      console.log(error);
    }

  }

  //Listar todos los eventos
  const listEvents =  async() => {
    const date = new Date();
    const newDate = date.setDate(date.getDate() + 10)

    // // The user need to signIn with Handle AuthClick before
    // apiCalendar.listEvents({
    //   timeMin: new Date().toISOString(),
    //   timeMax: new Date(newDate).toISOString(),
    //   showDeleted: true,
    //   maxResults: 10,
    //   orderBy: 'updated'
    // }).then(({ result }) => {
    //   console.log(result.items);
    // }).catch((error)=>console.log(error));

    try {
    // The user need to signIn with Handle AuthClick before
      const { result } = await apiCalendar.listEvents({
      timeMin: new Date().toISOString(),
      timeMax: new Date(newDate).toISOString(),
      showDeleted: true,
      maxResults: 10,
      orderBy: 'updated'
    });
    console.log(result.item)

  } catch (error) {
    console.log(error)
  }

  }
  return (
    <div>
      <button onClick={() => handleItemClick('sign-in')}>Inicio de sesión</button>
      <button onClick={() => handleItemClick('sign-out')}>Cierre de sesión</button>
      <button onClick={createAnEvent}>Crear evento</button>
      <button onClick={listEvents}>Listar eventos</button>
    </div>
  )
}

export default App
