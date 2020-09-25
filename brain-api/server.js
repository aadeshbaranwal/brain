const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');
const bcrypt = require('bcrypt');

const postgres=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'password',
    database : 'brain'
  }
})

const app=express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
	res.json("server is working")
})

app.post('/signin', (req,res) => {
	postgres.select('email','hash').from('login')
		.where('email','=',req.body.email)
		.then(data => {
			const isvalid=bcrypt.compareSync(req.body.password,data[0].hash)
			if(isvalid){
				postgres.select('*').from('users')
				.where('email','=',req.body.email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('unable to get user'))
			}
			else{
				res.status(400).json('wrong credentials')
			}

		})
		.catch(err => res.status(400).json('unable to login'))
})

app.post('/register', (req,res) => {
	const {name,email,password}=req.body;
	const hash = bcrypt.hashSync(password,10);

	postgres.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {	
			return trx('users')
				.returning('*')
				.insert({
					name:name,
					email:loginEmail[0],
					joined:new Date()
				})
				.then(user => {
						res.json(user[0]);
					}
				)
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id',(req,res) => {
	const {id}=req.params;
	
	postgres.select('*').from('users').where({
		id:id
	})
	.then(user => {
		if(user.length)
			res.json(user[0])
		else
			res.status(400).json('id does not exist')
	})
	.catch(err => err.status(400).json('error getting this id'))
})

app.put('/image', (req,res) => {
	const { id }=req.body;
	let found=false;

	postgres('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		console.log(entries[0]);
		res.json(entries[0]);
	})
	.catch(err => err.status(400).json('error getting this id'));
})

app.listen(3001,()=>{
	console.log("port 3001 is responding");
});