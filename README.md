<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CastillejaCode/tometracker">
    <img src="client/public/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">tomeTracker</h3>

  <p align="center">
    A simple book tracking website. 
    <br />
    <br />
    <a href="https://github.com/CastillejaCode/tometracker">View Demo</a>
    ·
    <a href="https://github.com/CastillejaCode/tometracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/CastillejaCode/tometracker/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
Desktop              |  Mobile 
-------------------------|-------------------------
<img src="https://i.imgur.com/Bw4vEvn.png" alt="Desktop screenshot">  |  <img src="https://i.imgur.com/NslJFox.png" alt="Mobile screenshot">

### Built With


<a href="https://react.dev/">  
<img alt="React Static Badge" src="https://img.shields.io/badge/React-0b1120?style=for-the-badge&logo=react&logoColor=#149eca&color=2e2e2e" height="50">
</a>
<br/>
<a href="https://tailwindcss.com/">  
<img alt="TailwindCSS Static Badge" src="https://img.shields.io/badge/TailwindCSS-0b1120?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8" height="50">
</a> 
<br/>
<a href="https://expressjs.com/">  
<img alt="Express Static Badge" src="https://img.shields.io/badge/Express-ffffff?style=for-the-badge&logo=express&logoColor=000000" height="50">
</a> 
<br/>
<a href="https://www.mongodb.com/">  
<img alt="Mongo Static Badge" src="https://img.shields.io/badge/MongoDB-ffffff?style=for-the-badge&logo=mongodb&logoColor=#001e2b" height="50">
</a> 

### Features
- Track books you've read.
- Save book rating, time spent reading, and your reviews.
- Choose which image you want for your book.
- Filter and sort your books. 


### How It's Made

This was one of my first big projects I made by myself.

I made a typical CRUD app using React and MongoDB. I used Redux ToolKit for all the global state management, which was great to use after learning barebones Redux.

I went back and completely redid the structure of the project so it could be more easily understood and scaled. 

For a first project, I'm happy with how it turned out. 

### Optimizations

- I refactored a lot to cut down on the unnecessary usage of global state management, which came mainly from introducing routing. 
- I liked using typescript for the backend. While annoying, it helped with stability in the long-term.
- I updated the project structure of the frontend, a complete overhaul for the better, namely implementing features.
- I also redid the API a bit, since I was calling it too many times when once would have sufficed. 


### Learning Outcomes

| The Good                               | The Bad                                              | The Ugly |
|----------------------------------------|------------------------------------------------------|----------|
| My first big project!   | Didn't utilize routing from the start  | Made a whole function for focusing when I could have jsut used autofocus          |
| Utilizing a UI library to help move things along |   CSS could be improved in places                       |          |
|             Refactored the project structure            |   Not enough error handling                                                   |          |
|             Implemented a queue for toasts           |                                                      |          |
|             Refactored away much global state management           |                                                      |          |



<!-- GETTING STARTED -->
## Getting Started

If you want to get a local copy running, here ya go. 

### Prerequisites

* pnpm
  ```
  npm install -g pnpm
  ```

### Installation

1. Clone the repo
   ```
   git clone https://github.com/CastillejaCode/tometracker.git
   ```
2. Install NPM packages
   ```
   pnpm install 
   ```
3. Run tow local development servers
   ```
   cd client && pnpm dev
   cd server && pnpm dev
   ```
   I should really add a master package.json, for now it's pretty much two different repos you have to start individually.
 4. Switch out my info for yours
    <br/>
    Add your MONGODB env variable in the server, and change the client's base url to localhost:3000.
    And of course you'll need to have the same exact schema in your MongoDB, so have fun with that. 

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Julian Krzysiak - jkrzysiak13@gmail.com

Project Link: https://github.com/CastillejaCode/tometracker

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Favicon generator - [favicon.io](https://favicon.io/)
* SVG Icons - [Hero Icons](https://heroicons.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
