import { Hono } from 'hono'

const app = new Hono().basePath("/api/v1")

app.post('/api/v1/signup', (c) => {
	return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.post('/api/v1/blog', (c) => {
	return c.text('post blog route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('update blog route')
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get specific blog route')
})

app.get("/api/v1/blog/bulk",(c)=>{
  return c.text("get all blogs")
})


export default app
