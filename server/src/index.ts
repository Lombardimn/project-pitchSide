import app from "./connection/app"
import { PORT } from "./connection/config"

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
