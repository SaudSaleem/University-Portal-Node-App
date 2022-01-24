const express = require("express");
const router = express.Router();
const courseMiddlewares = require("../middlewares/course");
const courseController = require("../controllers/course");
const verifyTokenController = require("../middlewares/token");
/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - course_name
 *         - course_description
 *         - faculty_name
 *         - faculty_id
 *       properties:
 *          id:
 *           type: string
 *           description: The auto-generated id of the course
 *          faculty_name:
 *           type: string
 *           description: Faculty name
 *          course_description:
 *            type: string
 *            description: Course description
 *          course_name:
 *            type: string
 *            description: Course name
 *          faculty_id:
 *            type: string
 *            description: Faculty id
 *       example:
 *         course_name: OOP
 *         course_description: This subject offer OOP related concepts
 *         faculty_name: IT
 *         faculty_id: 1
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Courses managing API
 */

// Routes
/**
 * @swagger
 * /api/course/:
 *   get:
 *     summary: Returns the list of all the courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The list of the Courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */

router.get(
  "/",
  verifyTokenController.verifyToken,
  courseController.getAllCourses
);

/**
 * @swagger
 * /api/course/{id}:
 *   get:
 *     summary: Get course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course id
 *     responses:
 *       200:
 *         description: Course data get by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 */
router.get(
  "/:id",
  verifyTokenController.verifyToken,
  courseController.getCourseById
);

/**
 * @swagger
 * /api/course/:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  verifyTokenController.verifyToken,
  courseMiddlewares.validateCourse,
  courseController.addCourse
);

/**
 * @swagger
 * /api/course/{id}:
 *  patch:
 *    summary: Update the course by the id
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The course id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Course'
 *    responses:
 *      200:
 *        description: The course was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      404:
 *        description: The course was not found
 *      500:
 *        description: Some error happened
 */
router.patch(
  "/:id",
  verifyTokenController.verifyToken,
  courseMiddlewares.validateCourseUpdation,
  courseController.updateCourse
);
/**
 * @swagger
 * /api/course/{id}:
 *   delete:
 *     summary: Remove the course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course id
 *
 *     responses:
 *       200:
 *         description: The course was deleted
 *       404:
 *         description: The course was not found
 */
router.delete(
  "/:id",
  verifyTokenController.verifyToken,
  courseController.deleteCourse
);

module.exports = router;
