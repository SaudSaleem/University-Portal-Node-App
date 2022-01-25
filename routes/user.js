const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user");
const userController = require("../controllers/user");
const verifyTokenController = require("../middlewares/token");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_first_name
 *         - user_last_name
 *         - user_email
 *         - user_password
 *         - user_role
 *         - user_address
 *         - user_phone_no
 *       properties:
 *          id:
 *           type: string
 *           description: The auto-generated id of the user
 *          user_first_name:
 *           type: string
 *           description: User first name
 *          user_last_name:
 *           type: string
 *           description: User last name
 *          user_email:
 *           type: string
 *           description: User email
 *          user_password:
 *           type: string
 *           description: User password
 *          user_role:
 *           type: string
 *           description: User role name
 *          user_address:
 *           type: string
 *           description: User address
 *          user_phone_no:
 *           type: string
 *           description: User phone number
 *       example:
 *         user_first_name: Rickey
 *         user_last_name:  PONTING
 *         user_email: ponting@gmail.com
 *         user_password: 1234567ABC!
 *         user_role: Student
 *         user_address: ST 8, Wall Street NYC
 *         user_phone_no: +108 763567532
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users managing API
 */

// Routes
/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get(
  "/:id",
  verifyTokenController.verifyToken,
  userController.getUserById
);

/**
 * @swagger
 * /api/user/:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  verifyTokenController.verifyToken,
  userMiddleware.validateUser,
  userController.addUser
);

/**
 * @swagger
 * /api/user/{id}:
 *  patch:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
router.patch(
  "/:id",
  verifyTokenController.verifyToken,
  userMiddleware.validateUserUpdation,
  userController.updateUser
);
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete(
  "/:id",
  verifyTokenController.verifyToken,
  userController.deleteUser
);

/**
 * @swagger
 * /api/user/assignCourse/:
 *   post:
 *     summary: Assign a course to user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The course was assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The user or course was not found
 *       500:
 *         description: Some server error
 */
router.post(
  "/assignCourse/",
  verifyTokenController.verifyToken,
  userController.assignCourse
);

/**
 * @swagger
 * /api/user/getUserCourses/{id}:
 *   get:
 *     summary: Get specific user courses
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user courses in which he/she enrolled or teaching
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: The user was not found
 *       500:
 *         description: Server error
 */
router.get(
  "/getUserCourses/:id",
  verifyTokenController.verifyToken,
  userController.getUserCourses
);
module.exports = router;
