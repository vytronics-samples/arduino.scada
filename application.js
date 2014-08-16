/*
Copyright 2014 Vytroncs.com and Charles Weissman

This file is part of "Vytroncs HMI, the 100% Free, Open-Source SCADA/HMI Initiative"
herein referred to as "Vytronics HMI".

Vytronics HMI is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Vytronics HMI is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with Vytronics HMI.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
application.js - Example Vytronics HMI project main application file. The purpose of this file
is to load the vytronics.hmi module, add any custom application modules and code, and then
start the server. Your project.json and wen files go in ./project in this directory or you
can put them somewhere else and set the VYTRONICS_PROJDIR env to point there.
*/

/*
You could define objects and methods here in the global scope that can be accessed
by the server in tag calculations etc.
*/

//Load the vytronics.hmi module. It will parse your ./project/project.json file to load drivers and tags.
//The express web server will use ./project/hmi as the web root.
var server = require("vytronics.hmi");

//Yes, it really is this simple!
server.start();
