const express = require('express')
const routes = express.Router()

const {authenticateUser} = require('../resource/admin')
const {getEvents,addEvent} = require('../resource/event')
const {getGuest, addGuest} = require('../resource/guest')
const {getOrganizer, addOrganizer} = require('../resource/organizer')


routes.get('/', (req, res)=>{
    return res.render('index.ejs', {
        title: 'Inicio'
    })
})

routes.get('/viewEvents', async(req, res)=>{
    const dataEvents = await getEvents()
    //console.log(dataEvents.data)
    return res.render('events.ejs',{
        title: 'Vista Eventos',
        data: dataEvents.data
    })
})

routes.get('/about', (req, res)=>{
    return res.render('about.ejs', {
        title: 'Acerca de nosotros'
    })
})

routes.get('/login', (req, res)=>{
    return res.render('login.ejs',{
        title: "Login"
    })
})

routes.post('/dashboard', async (req, res) => {
    const {inputUserName, inputPassword } = req.body;
    try {
      const authenticatedUser = await authenticateUser(inputUserName, inputPassword);
      if (authenticatedUser) {
        req.session.loggedIn = true;
        const dataEvents = await getEvents()
        //console.log(dataEvents.data)
        return res.render('dashboard.ejs', { 
          title: 'Dashboard',
          data: dataEvents.data
        });
      } else {
        return res.redirect('/login');
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Error al autenticar al usuario',
      });
    }
  });

  routes.get('/dashBoard', async (req, res)=>{
    if (req.session.loggedIn){
      const dataEvents = await getEvents()
      return res.render('dashboard.ejs', {
        title: "Inicio",
        data: dataEvents.data
      })
    }else{
      res.redirect('/login')
    }
  })

routes.get('/registerGuest', (req, res)=>{
  if (req.session.loggedIn){
    return res.render('registerguest.ejs', {
      title: "Registro invitado"
    })
  }else{
    res.redirect('/login')
  }
})


routes.post('/registerGuest', async (req, res) => {
  const { inputIdGuest, inputNameGuest } = req.body;
  console.log(inputIdGuest, "-", inputNameGuest)
  try {
    const guestData = {
      "id": Number(inputIdGuest),
      "nameGuest": inputNameGuest
    };
    const responseFromAPI = await addGuest(guestData);
    //console.log(responseFromAPI)
    if (req.session.loggedIn) {
      return res.redirect('/registerGuest');
    } else {
      return res.redirect('/login');
    }
  } catch (error) {
    console.error('Error al registrar el invitado:', error.message);
    return res.status(500).json({ error: 'Error al registrar el invitado' });
  }
});



routes.get('/registerOrganizer', (req, res)=>{
  if (req.session.loggedIn){
    return res.render('registerorganizer.ejs', {
      title: "Registro organizador"
    })
  }else{
    res.redirect('/login')
  }
})

routes.post('/registerOrganizer', async (req, res) => {
  const { inputIdOrganizer, inputNameOrganizer,inputPhoneOrganizer } = req.body;
  console.log(inputIdOrganizer, "-", inputNameOrganizer, "-" ,inputPhoneOrganizer)
  try {
    const organizerData = {
      "id": Number(inputIdOrganizer),
      "nameOrganize": inputNameOrganizer,
      "phone": Number(inputPhoneOrganizer)
    };
    const responseFromAPI = await addOrganizer(organizerData);
    //console.log(responseFromAPI)
    if (req.session.loggedIn) {
      return res.redirect('/registerOrganizer');
    } else {
      return res.redirect('/login');
    }
  } catch (error) {
    console.error('Error al registrar el organizador:', error.message);
    return res.status(500).json({ error: 'Error al registrar el organizador' });
  }
})




routes.get('/registerEvent', async (req, res)=>{
  if (req.session.loggedIn){
    const dataGuest = await getGuest()
    const dataorganizer = await getOrganizer()
   // console.log(dataGuest)
    return res.render('registerevent.ejs', {
      title: "Registro Evento",
      dataGuest: dataGuest.data,
      dataOrganizer: dataorganizer.data
    })
  }else{
    res.redirect('/login')
  }
})

routes.post('/registerEvent',async (req, res)=>{
  const { inputIdEvent, inputTitleEvent,inputDescriptionEvent, inputDateInitial, inputDateFinish,inputValueEvent, guestSelector,selectOrganizer } = req.body;
  //console.log(inputIdEvent, "-", inputTitleEvent, "-" ,inputDescriptionEvent, "-", inputDateInitial, "-",inputDateFinish ,"-",inputValueEvent,"-", guestSelector, "-", selectOrganizer)
  try {
    const eventData = {
      "id": Number(inputIdEvent),
      "title": inputTitleEvent,
      "description": inputDescriptionEvent,
      "dateInitial": inputDateInitial,
      "dateFinish": inputDateFinish,
      "value": inputValueEvent,
      "guest": guestSelector,
      "organizer": selectOrganizer
    };
    const responseFromAPI = await addEvent(eventData);
    //console.log(responseFromAPI)
    if (req.session.loggedIn) {
      return res.redirect('/dashBoard');
    } else {
      return res.redirect('/login');
    }
  } catch (error) {
   // console.error('Error al registrar el Evento:', error.message);
    return res.status(500).json({ error: 'Error al registrar el Evento '+ error.message });
  }
})



  routes.get('/logOut', (req, res) => {
    if (req.session.loggedIn === true) {
      req.session.loggedIn = false
      return res.redirect('/')
    }
  })
  

module.exports = routes