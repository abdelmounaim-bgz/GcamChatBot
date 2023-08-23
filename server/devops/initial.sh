#préparation de l'environnement
##python
apt-get update
apt-get intall python3.8
##nvm
apt-get install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/intall.sh | bash
source ~/.bashrc
##node
nvm intall 18.12.1
nvm use 18

#intallation des packages du serveur
cd /home/abdelmounaim/projects/privateGPT/server
echo "in server"
pip3.8 install -r requirements.txt

#lancement du serveur
python3.8 privateGPT.py &
echo "server on"

#intallation des packages du client 
cd /home/abdelmounaim/projects/privateGPT/client
echo "in client"
npm install

#lancement du client
npm run build
npm run start -- -p 4000 &