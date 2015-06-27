reep.io
=======
A browser based peer-to-peer file transfer platform. It is running at [https://reep.io](https://reep.io)

What is reep.io?
---
reep.io uses WebRTC technology to enable peer-to-peer file transfers between two browser without any server interaction. 
This repository holds the sources to run the reep.io frontend.  
**You will need a ICE and Peering server to run this project.** You can find the reep.io peering server [here](https://github.com/KodeKraftwerk/reepio-peering-server)

Configuration
---
You can set some options in the public/config.js (if it does not exist, copy the config.dist.js)
Have a look into the `config.dist.js` to get an overview over the available options

Installation
---
> npm install
> grunt
> npm start

You can now access the site by visiting [http://127.0.0.1:8080/index_dev.html](http://127.0.0.1:8080/index_dev.html)

License
---
reep.io uses the [GPL v2](http://www.gnu.org/licenses/gpl-2.0.html) license  
