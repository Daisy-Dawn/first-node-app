const http = require('node:http')

// Create the server
const server = http.createServer(async (req, res) => {
    const whoIAm = {
        name: 'Daisy Dawn',
        favoriteActor: 'James Carter',
        hottestActor: 'Young Brad Pitt',
        hobbies:
            'Reading Novels, Watching movies, watching football, writing, and coding',
    }
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(whoIAm))
    } else if (req.url === '/users' && req.method === 'GET') {
        try {
            // Fetch users from JSONPlaceholder
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            )
            const users = await response.json()

            // Transform user data to only include id, name, username, email, and phone
            const transformedUsers = users.map((user) => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
            }))

            // Set response headers
            res.writeHead(200, { 'Content-Type': 'application/json' })

            // Send transformed user data as JSON
            res.end(JSON.stringify(transformedUsers))
        } catch (error) {
            // Handle errors
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Something went wrong' }))
        }
    } else {
        // Handle 404 for any other routes
        res.writeHead(404, { 'Content-Type': 'application/json' })
        // res.end('Page not found')
        res.end(JSON.stringify({ message: 'Route not found' }))
    }
})

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000')
})
