// Express
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import path from "path";

// Swagger
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

// Logging
import Logger from "./Logger";

// Properties
import properties from "../properties.js";

// Security
import cors from "cors";
import helmet from "helmet";

// Controllers
import SecurityController from "../controllers/SecurityController";

// Start Import Controllers

// Database
import Database_Manage_Film_Example_db from "./Database_Manage_Film_Example_db.js";

// Controllers
import ActorController from "../controllers/Manage_Film_Example_db/ActorController";
import FilmController from "../controllers/Manage_Film_Example_db/FilmController";
import FilmMakerController from "../controllers/Manage_Film_Example_db/FilmMakerController";
import UserController from "../controllers/Manage_Film_Example_db/UserController";

// End Import Controllers


class Server {
  constructor() {
    this.app = express();
  }

  /**
   * Start the server
   * @returns {Promise<void>}
   */
  async init() {
    Logger.info(
      "\r\n\r\n-----------------------------------\r\n\r\nStarting MyCRM \r\nGenerated by\r\n\r\n   _____ _          __  __      _     _           \r\n  / ____| |        / _|/ _|    | |   | |          \r\n | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __ \r\n  \\___ \\| |/ / _` |  _|  _/ _ \\| |/ _` |/ _ \\ '__|\r\n  ____) |   < (_| | | | || (_) | | (_| |  __/ |   \r\n |_____/|_|\\_\\__,_|_| |_| \\___/|_|\\__,_|\\___|_|   \r\n\r\nFor more documentation please visit https://skaffolder.com/#/documentation\r\n\r\n-----------------------------------\r\n\r\n"
    );

    // Start Init Database
		Database_Manage_Film_Example_db.init();
 // End Init Database

    // Add parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(Logger.expressMiddleware);

    // Securitiy
    this.app.use(helmet());
    this.app.use(cors());

    // Swagger
    const swaggerDocument = yaml.load("./swagger.yaml");
    this.app.use(
      properties.api + "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    // Redirect frontend
    this.app.use("*", (req, res, next) => {
      if (req.originalUrl) {
        let url = req.originalUrl;
        if (!url.startsWith("/api/") && url.indexOf(".") == -1) {
          res
            .status(200)
            .sendFile(
              path.resolve(
                __dirname +
                  "//..//" +
                  properties.publicPath.replace(/\//g, "//") +
                  "//index.html"
              )
            );
        } else {
          next();
        }
      } else {
        next();
      }
    });
    
    // Start App Server
    const server = http.Server(this.app);
    this.app.use(express.static(properties.publicPath));

    await server.listen(properties.port);
    Logger.info("Server started on port " + properties.port);
    Logger.info(
      "Swagger docs at http://localhost:" +
        properties.port +
        properties.api +
        "/docs"
    );

    // Import controllers
    const router = express.Router();
    SecurityController.init(router);

    // Start Init Controllers
		ActorController.init(router);
		FilmController.init(router);
		FilmMakerController.init(router);
		UserController.init(router);
		 // End Init Controllers

    this.app.use("/", router);
  }
}

export default new Server();
