# Zoom Meeting API

## Tech Stack
1. AdonisJS v5
2. NodeJS version : 21.1.0
3. XAMPP version : 7.4.27

## Table of Content
1. Getting Started
   - Prerequisites
   - Installation
   - Run Program
2. Features
3. Licenses
4. Contact

## Getting Started
Zoom Meeting API is an API that develop using NodeJS with AdonisJS as the framework. AdonisJS is a NodeJS framework that's use Typescript as its languange. The API is also connected to a MySQL database using XAMPP. Before you can run the application, you need to install a couple of softwares so that the application can run perfectly.

### Prerequisites
- Node >= 16.14.0
- XAMPP (for Windows)
- MAMP (for MacOS)

### Installation
1. Clone the repository :
   
   ```bash
   git clone https://github.com/TioNovriadiPutra/zoom-meeting-api.git
2. Navigate to zoom-meeting-api folder :

   ```bash
   cd zoom-meeting-api
3. Install the required dependencies:

   ```bash
   npm install
4. Create a `.env` file in the project root and copy paste the env from the file `.env.example` :
5. Change the MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME according to your database :

   ```env
   MYSQL_USER=<your mysql username>
   MYSQL_PASSWORD=<your mysql password>
   MYSQL_DB_NAME=<your database name for the app>
6. Create a new database directly in your MySQL with the name same as the `.env`

   ```mysql
   CREATE DATABASE <your database name for the app>
   USE <your database name for the app>

### Run Program
1. Open XAMPP or MAMP 
2. Run the MySQL server :
   - MAMP (for MacOS) :  
     
     ![mamp](https://github.com/user-attachments/assets/2aa95d47-866f-418e-a1d9-703fadfbdbdc)

   - XAMPP (for Windows) :
     
     ![xampp](https://github.com/user-attachments/assets/e274f69a-8d5d-4dda-a1e9-1312895b4578)

1. Navigate to zoom-meeting-api folder :

   ```bash
   cd zoom-meeting-api
2. Migrate the database :

   ```bash
   node ace migration:run
3. Run :

   ```bash
   node ace serve --watch

## License
This project license under the MIT License. See 
`LICENSE`
for more information.

## Contact
Tio Novriadi Putra - [tio_novriadi](https://instagram.com/tio_novriadi) - [tionvriadi@gmail.com](mailto:tionvriadi@gmail.com)  
Project link : [Pharmacin API](https://github.com/TioNovriadiPutra/zoom-meeting-api)
