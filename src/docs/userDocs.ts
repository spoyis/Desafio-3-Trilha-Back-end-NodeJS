/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - cpf
 *       - birthDate
 *       - email
 *       - password
 *       - qualified
 *       - address
 *     properties:
 *       id:
 *         type: string
 *         description: The ID of the user.
 *       name:
 *         type: string
 *         description: The name of the user.
 *       cpf:
 *         type: string
 *         description: The CPF of the user.
 *       birthDate:
 *         type: string
 *         format: date
 *         description: The birth date of the user.
 *       email:
 *         type: string
 *         description: The email of the user.
 *       password:
 *         type: string
 *         description: The password of the user.
 *       qualified:
 *         type: boolean
 *         description: Whether the user is qualified to drive.
 *       address:
 *         $ref: '#/definitions/Address'
 *
 *   Address:
 *     type: object
 *     required:
 *       - cep
 *       - locality
 *       - uf
 *     properties:
 *       cep:
 *         type: number
 *         description: The cep of the user's address.
 *       patio:
 *         type: string
 *         description: The patio of the user's address.
 *       complement:
 *         type: string
 *         description: The complement of the user's address.
 *       neighborhood:
 *         type: string
 *         description: The neighborhood of the user's address.
 *       locality:
 *         type: string
 *         description: The locality of the user's address.
 *       uf:
 *         type: string
 *         description: The UF of the user's address.
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: The authentication token
 */

/**
 * @swagger
 * api/v1/user:
 *   get:
 *     summary: Retrieve a list of all users.
 *     description: This endpoint retrieves a list of all users in the database. The list includes the user's name, CPF, email, and if they are qualified to drive.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the user.
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                   cpf:
 *                     type: string
 *                     description: The CPF of the user.
 *                   email:
 *                     type: string
 *                     description: The email of the user.
 *                   qualified:
 *                     type: boolean
 *                     description: If the user is qualified to drive or not.
 *       404:
 *         description: No users found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     description: Use this endpoint to create a new user with the given data
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               cep:
 *                 type: string
 *               qualified:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/authenticate:
 *   post:
 *     summary: Sign in a user
 *     description: Allows a registered user to sign in to the application with their email and password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *                 example: rogerguedes@corinthians.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: minoxidil
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                  type: object
 *                  properties:
 *                  token:
 *                   type: string
 *                   description: A JWT access token
 *               example:
 *                 status: success
 *                 message: User successfully logged in          
 *                 data:
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         cep:
 *           type: number
 *         patio:
 *           type: string
 *         complement:
 *           type: string
 *         neighborhood:
 *           type: string
 *         locality:
 *           type: string
 *         uf:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - cpf
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         cpf:
 *           type: string
 *           description: CPF number of the user. Must be unique.
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Date of birth of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user. Must be unique.
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user.
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         qualified:
 *           type: boolean
 *           default: false
 *           description: Whether the user is qualified to drive or not.
 *       example:
 *         name: Roger Guedes
 *         cpf: "123.456.789-00"
 *         birthDate: "1910-01-01"
 *         email: rogerguedes@corinthians.com
 *         password: minoxidil
 *         address:
 *           cep: 12345678
 *           patio: My street
 *           complement: My complement
 *           neighborhood: My neighborhood
 *           locality: My city
 *           uf: My state
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 * /api/v1/user:
 *   delete:
 *     summary: Delete the user that is currently signed in
 *     description: Use this endpoint to delete the user that is currently signed in
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: No Content
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         description: Internal Server Error
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization header with JWT token
 */


/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Use this endpoint to get information about a user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */