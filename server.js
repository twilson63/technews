var flatiron = require('flatiron'),
  app = flatiron.app,
  connect = require('connect'),
  //ecstatic = require('ecstatic'),
  ejs = require('ejs'),
  Templar = require('templar'),
  templarOptions = { engine: ejs, folder: './views', cache: false },
  es = require('event-stream'),
  createEvent = require('./events/createEvent'),
  saveEvent = require('./events/saveEvent');

Templar.loadFolder('./views');

app.use(flatiron.plugins.http);

app.http.before = [
  //ecstatic(__dirname + '/public', { cache: false, autoIndex: false })
  connect.static(__dirname + '/public')
];

app.router.get('/api', function() {
  this.res.template = Templar(this.req, this.res, templarOptions);
  this.res.template('api.ejs');
});

app.router.get('/', function() {
  this.res.template = Templar(this.req, this.res, templarOptions);
  this.res.template('index.ejs');
});

// api
app.router.post('/events', function(){
  es.pipline(
    this.req,
    es.parse(),
    createEvent(),
    saveEvent(),
    es.stringify(),
    this.res
  );
});

app.router.get('/events', function(){
  
});

app.router.get('/events/:id', function(id){
  
});

app.router.put('/events/:id', function(id){
  
});

app.router.delete('/events/:id', function(id){
  
});


app.start(3000);

console.log('Listening on Port 3000...');
console.log('CTRL-C to quit');
