/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - start_date
 *         - end_date
 *         - id_car
 *         - id_user
 *         - final_value
 *       properties:
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: The start date of the reservation
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: The end date of the reservation
 *         id_car:
 *           type: string
 *           description: The ID of the car being reserved
 *         id_user:
 *           type: string
 *           description: The ID of the user making the reservation
 *         final_value:
 *           type: number
 *           description: The final price of the reservation
 *       example:
 *         start_date: '2023-04-10T08:00:00.000Z'
 *         end_date: '2023-04-15T17:00:00.000Z'
 *         id_car: '61177d0f0f89f4348bfae9b9'
 *         id_user: '61177d0f0f89f4348bfae9c0'
 *         final_value: 100.50
 *
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing reservations
 */

/**
 * @swagger
 * /api/v1/reserve/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     description: Retrieves a single reservation by its ID.
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
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
 *           type: string
 *         required: true
 *         description: The ID of the reservation to retrieve
 *     responses:
 *       '200':
 *         description: A reservation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '500':
 *         description: An error occurred while retrieving the reservation
 */   


/**
 * @swagger
 * api/v1/reserve:
 *   get:
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     description: Returns a list of reservations filtered by car properties
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *         type: string
 *         required: true
 *         description: json web token auth string, you need a valid jwt token to access this route
 *       - in: query
 *         name: id_user
 *         schema:
 *           type: string
 *         description: ID of the user to filter by
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Brand of the car to filter by
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Model of the car to filter by
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year of the car to filter by
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Color of the car to filter by
 *     responses:
 *       200:
 *         description: A list of reservations that match the specified filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid query parameters provided
 */

/**
 * @swagger
 * api/v1/reserve:
 *   post:
 *     summary: Create a new reservation
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the reservation
 *                 start_date:
 *                   type: string
 *                   format: date-time
 *                   description: The start date and time of the reservation
 *                 end_date:
 *                   type: string
 *                   format: date-time
 *                   description: The end date and time of the reservation
 *                 id_car:
 *                   type: string
 *                   description: The id of the car being reserved
 *                 id_user:
 *                   type: string
 *                   description: The id of the user making the reservation
 *                 final_value:
 *                   type: number
 *                   description: The final value of the reservation
 *       '400':
 *         description: Bad request, some required parameter is missing or invalid
 *       '404':
 *         description: Not found, the car or user with the given id does not exist
 *       '409':
 *         description: Conflict, the car or user is already booked in the given timeframe
 *       '500':
 *         description: Internal server error, something went wrong while creating the reservation
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ReservationInput:
 *      type: object
 *      properties:
 *        id_car:
 *          type: string
 *          description: The ID of the car being reserved.
 *        start_date:
 *          type: string
 *          format: date-time
 *          description: The start date of the reservation.
 *        end_date:
 *          type: string
 *          format: date-time
 *          description: The end date of the reservation.
 *      required:
 *      - id_car
 *      - start_date
 *      - end_date
 *      - final_value
 */

/**
 * @swagger
 * api/v1/reserve/{id}:
 *   put:
 *     summary: Update a reservation by ID
 *     tags: 
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           description: The Object ID of the reservation to update.
 *         description: Reservation ID.
 *       - in: body
 *         name: reservation
 *         required: true
 *         description: The reservation to update.
 *         schema:
 *           $ref: '#/components/schemas/ReservationInput'
 *     responses:
 *       200:
 *         description: Reservation updated successfully.
 *       400:
 *         description: Invalid reservation ID or reservation data.
 *       401:
 *         description: Unauthorized. The user must be logged in to update a reservation.
 *       404:
 *         description: Reservation not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * api/v1/reserve/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     description: Deletes a reservation with the specified ID. Authenticated users can delete any reservation.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The ID of the reservation to delete
 *         example: 6154dc2eb82e371538dd7b51
 *     responses:
 *       204:
 *         description: The reservation was successfully deleted
 *       404:
 *         description: The reservation with the specified ID was not found
 *       500:
 *         description: Internal Server Error
 */