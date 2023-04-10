/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API for managing cars
 * 
 * definitions:
 *   Car:
 *     type: object
 *     required:
 *       - model
 *       - color
 *       - year
 *       - value_per_day
 *     properties:
 *       model:
 *         type: string
 *       color:
 *         type: string
 *       year:
 *         type: number
 *         minimum: 1950
 *         maximum: 2023
 *       value_per_day:
 *         type: number
 *       accessories:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *         uniqueItems: true
 *         minItems: 1
 *       number_of_passengers:
 *         type: number
 * 
 *   CarResponse:
 *     type: object
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 *       cars:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Car'
 * 
* CarInput:
*  type: object
*  properties:
*    model:
*      type: string
*    color:
*      type: string
*    year:
*      type: integer
*      minimum: 1950
*      maximum: 2023
*    value_per_day:
*      type: number
*    accessories:
*      type: array
*      items:
*        $ref: '#/components/schemas/Accessory'
*      uniqueItems: true
*      minItems: 1
*    number_of_passengers:
*      type: integer
*      minimum: 1
*  required:
*    - model
*    - color
*    - year
*    - value_per_day
*/

 /**
 * @swagger
 * /api/v1/car:
 *   get:
 *     summary: Retrieve a list of cars
 *     description: Retrieve a list of cars filtered by optional parameters, limited by page size.
 *     tags: [Cars]
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *         type: string
 *         required: true
 *         description: json web token auth string, you need a valid jwt token to access this route
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: The model of the car
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: The color of the car
 *       - in: query
 *         name: year
 *         type: integer
 *         description: The year of the car
 *       - in: query
 *         name: value_per_day
 *         type: number
 *         description: The value per day of the car
 *       - in: query
 *         name: accessories
 *         type: string
 *         description: The description of an accessory for the car
 *       - in: body
 *         name: pageIndex
 *         type: integer
 *         description: The index of the page to retrieve (default is 0)
 *         example:
 *          pageIndex: 0
 *     responses:
 *       200:
 *         description: A list of cars that match the given parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Car'
 *       400:
 *         description: The request parameters are invalid
 *       404:
 *         description: No cars found with the given parameters
 *       500:
 *         description: An internal server error occurred
 */

 /**
 * @swagger
 *
 * /api/v1/car:
 *   post:
 *     summary: Create a new car.
 *     operationId: createCar
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *         type: string
 *         required: true
 *         description: json web token auth string, you need a valid jwt token to access this route
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Car'
 *     responses:
 *       '201':
 *         description: Car successfully registered.
 *       '400':
 *         description: Invalid request body.
 *       '500':
 *         description: Internal server error.
 */


 /**
 * @swagger
 *
 * /api/v1/car/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: Update an existing car by ID with the given parameters
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *         type: string
 *         required: true
 *         description: json web token auth string, you need a valid jwt token to access this route
 *       - name: id
 *         in: path
 *         description: ID of the car to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated car object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *              model: "Honda Civic"
 *              color: "black"
 *              year: "2020"
 *              value_per_day: 50
 *     responses:
 *       200:
 *         description: Successfully updated car
 *       400:
 *         description: Bad request
 *       404:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */

 /**
 * @swagger
 *
 * /api/v1/car/{id}:
 *   delete:
 *     summary: Deletes a car by ID.
 *     description: Deletes a car by ID. Returns a 404 error if the car with the given ID is not found.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *         type: string
 *         required: true
 *         description: json web token auth string, you need a valid jwt token to access this route
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the car to delete.
 *     responses:
 *       204:
 *         description: The car was deleted successfully.
 *       404:
 *         description: The car with the given ID was not found.
 *       500:
 *         description: Internal server error.
 */

 /**
 * @swagger
 * /api/v1/car/{id}/accessories/{id}:
 *  patch:
 *    summary: Update car accessory
 *    description: Updates an accessory of the specified car. If the accessory is already present in the list of accessories, it will be deleted. If not, it will be added.
 *    tags:
 *      - Cars
 *    parameters:
 *      - in: header
 *        name: jwt
 *        schema:
 *        type: string
 *        required: true
 *        description: json web token auth string, you need a valid jwt token to access this route
 *      - in: path
 *        name: id
 *        description: ID of the car to update the accessory for
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Accessory to be updated
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string
 *                description: Description of the accessory.
 *    responses:
 *      200:
 *        description: car accessory updated
 *      400:
 *        description: bad request
 *      500:
 *        description: Internal server error.
 */

 /**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *        - model
 *        - color
 *        - year
 *        - value_per_day
 *        - accessories
 *        - number_of_passengers
 *       properties:
 *         model:
 *           type: string
 *         color:
 *           type: string
 *         year:
 *           type: number
 *           minimum: 1950
 *           maximum: 2023
 *         value_per_day:
 *           type: number
 *         accessories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *           uniqueItems: true
 *           minItems: 1
 *         number_of_passengers:
 *           type: number
 *       example:
 *         $ref: '#/definitions/Car'
 */