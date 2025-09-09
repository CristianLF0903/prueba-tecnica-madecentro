import { app } from './src/app.js'
import { PORT } from './src/utils/config.js'

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
