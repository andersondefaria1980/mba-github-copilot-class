# Prompt 1 - Initial Structure and Scripts

Create monorepo structure: /backend and /frontend folders. Create .gitignore at root including node_modules, .env, dist, .DS_Store. Create start.sh script that: checks if Docker is installed (command -v docker), runs 'docker-compose down -v', 'docker-compose up --build -d', waits 10 seconds (sleep 10), displays 'Application started! Access http://localhost'. Create stop.sh script that runs 'docker-compose down -v' and displays 'Application stopped and volumes removed'. Make both executable with chmod +x start.sh stop.sh.
