const express = require("express");
const router = express.Router();
const courseMetaController = require("../controllers/courseMeta");

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseMeta:
 *       type: object
 *       required:
 *         - course_id
 *         - user_id
*          - user_role
 *       properties:
 *          id:
 *           type: integer
 *           description: The auto-generated id
 *          course_id:
 *           type: integer
 *           description: Id of course which refer to the Courses table
 *          user_id:
 *           type: integer
 *           description: Id of user which refer to the Users table
 *          user_role:
 *           type: string
 *           description: User role (teacher | student)
 *       example:
 *         faculty_id: 12 
 *         user_id: 3
 *         user_role: teacher | student
 */

/**
 * @swagger
 * tags:
 *   name: CoursesMeta
 *   description: Courses meta managing API
 */

// Routes
/**
 * @swagger
 * /api/courseMeta/:
 *   get:
 *     summary: Returns the list
 *     tags: [CoursesMeta]
 *     responses:
 *       200:
 *         description: List of all records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseMeta'
 */

router.get("/", courseMetaController.getAllCoursesMeta);

/**
 * @swagger
 * /api/courseMeta/:
 *   post:
 *     summary: Create a new meta record
 *     tags: [CoursesMeta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseMeta'
 *     responses:
 *       200:
 *         description: Record successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseMeta'
 *       500:
 *         description: Some server error
 */
router.post("/", courseMetaController.addCourseMeta);

/**
 * @swagger
 * /api/courseMeta/{id}:
 *  put:
 *    summary: Update the record by the id
 *    tags: [CoursesMeta]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The course meta id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CourseMeta'
 *    responses:
 *      200:
 *        description: Record was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CourseMeta'
 *      404:
 *        description: Record was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", courseMetaController.updateCourseMeta);
/**
 * @swagger
 * /api/courseMeta/{id}:
 *   delete:
 *     summary: Remove the course meta record by id
 *     tags: [CoursesMeta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Record id
 *
 *     responses:
 *       200:
 *         description: Record was deleted
 *       404:
 *         description: Record was not found
 */
router.delete("/:id", courseMetaController.deleteCourseMeta);

module.exports = router;
