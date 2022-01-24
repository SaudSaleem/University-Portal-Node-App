const express = require("express");
const router = express.Router();
const facultyMiddlewares = require('../middlewares/faculty')
const facultyController = require("../controllers/faculty");

/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       required:
 *         - faculty_name
 *         - faculty_description
 *       properties:
 *          id:
 *           type: string
 *           description: The auto-generated id of the faculty
 *          faculty_name:
 *           type: string
 *           description: Faculty name
 *          faculty_description:
 *           type: string
 *           description: Faculty description
 *       example:
 *         faculty_name: IT
 *         faculty_description: This faculty offer IT related subjects.
 */

/**
 * @swagger
 * tags:
 *   name: Faculties
 *   description: Faculties managing API
 */

// Routes
/**
 * @swagger
 * /api/faculty/:
 *   get:
 *     summary: Returns the list of all the Faculties
 *     tags: [Faculties]
 *     responses:
 *       200:
 *         description: The list of the Faculties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faculty'
 */

router.get("/", facultyController.getAllFaculties);

/**
 * @swagger
 * /api/faculty/{id}:
 *   get:
 *     summary: Get faculty by id
 *     tags: [Faculties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Faculty id
 *     responses:
 *       200:
 *         description: Faculty data get by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       404:
 *         description: The faculty was not found
 */
router.get("/:id", facultyController.getFacultyById);

/**
 * @swagger
 * /api/faculty/:
 *   post:
 *     summary: Create a new faculty
 *     tags: [Faculties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faculty'
 *     responses:
 *       200:
 *         description: The faculty was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       500:
 *         description: Some server error
 */
router.post("/",facultyMiddlewares.validateFaculty, facultyController.addFaculty);

/**
 * @swagger
 * /api/faculty/{id}:
 *  patch:
 *    summary: Update the faculty by the id
 *    tags: [Faculties]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The faculty id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Faculty'
 *    responses:
 *      200:
 *        description: The faculty was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Faculty'
 *      404:
 *        description: The faculty was not found
 *      500:
 *        description: Some error happened
 */
router.patch("/:id",facultyMiddlewares.validateFacultyUpdation, facultyController.updateFaculty);
/**
 * @swagger
 * /api/faculty/{id}:
 *   delete:
 *     summary: Remove the faculty by id
 *     tags: [Faculties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The faculty id
 *
 *     responses:
 *       200:
 *         description: The faculty was deleted
 *       404:
 *         description: The faculty was not found
 */
router.delete("/:id", facultyController.deleteFaculty);


/**
 * @swagger
 * /api/faculty/getFacultyUsers:
 *   get:
 *     summary: Returns the list of all Users of specific faculty
 *     tags: [Faculties]
 *     responses:
 *       200:
 *         description: The list  of all Users of specific faculty
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faculty'
 */

 router.get("/getFacultyUsers/:id", facultyController.getFacultyUsers);

/**
 * @swagger
 * /api/faculty/getFacultyCourses:
 *   get:
 *     summary: Returns the list of all Courses of specific faculty
 *     tags: [Faculties]
 *     responses:
 *       200:
 *         description: The list of all Courses of specific faculty
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faculty'
 */

 router.get("/getFacultyCourses/:id", facultyController.getFacultyCourses);
 
module.exports = router;
