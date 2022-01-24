const express = require("express");
const router = express.Router();
const studentTeacherController = require("../controllers/studentTeacher");
const studentTeacherMiddlewares = require("../middlewares/studentTeacher");
/**
 * @swagger
 * components:
 *   schemas:
 *     StudentTeacher:
 *       type: object
 *       required:
 *         - assigned_teacher_id
 *         - assigned_student_id
 *         - user_id
 *       properties:
 *          id:
 *           type: string
 *           description: The auto-generated id
 *          assigned_teacher_id:
 *           type: string
 *           description: Id of teacher that assigned to student. This field will be null if user role is student
 *          assigned_student_id:
 *           type: string
 *           description: Id of student that assigned to teacher. This field will be null if user role is teacher
 *          user_id:
 *           type: string
 *           description: Foreign key which represent user in Users table
 *       example:
 *         assigned_teacher_id: 12 || null
 *         assigned_student_id: null || 9
 *         user_id: 3
 */

/**
 * @swagger
 * tags:
 *   name: StudentsTeacher
 *   description: Student Teacher managing API
 */

// Routes
/**
 * @swagger
 * /api/studentTeacher/:
 *   get:
 *     summary: Returns the list
 *     tags: [StudentsTeacher]
 *     responses:
 *       200:
 *         description: List of all records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentTeacher'
 */

router.get("/", studentTeacherController.getAllUsersMeta);
// POST API'S
/**
 * @swagger
 * /api/studentTeacher/:
 *   post:
 *     summary: Create a new record
 *     tags: [StudentsTeacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentTeacher'
 *     responses:
 *       200:
 *         description: Record successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTeacher'
 *       500:
 *         description: Some server error
 */
router.post("/", studentTeacherController.addUserMeta);

/**
 * @swagger
 * /api/studentTeacher/assignStudent:
 *   post:
 *     summary: Assign student to teacher
 *     tags: [StudentsTeacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentTeacher'
 *     responses:
 *       200:
 *         description: Student assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTeacher'
 *       500:
 *         description: Some server error
 */
router.post(
  "/assignStudent",
  studentTeacherMiddlewares.validateAssignStudent,
  studentTeacherController.assignStudent
);

/**
 * @swagger
 * /api/studentTeacher/getTeacherStudents:
 *   post:
 *     summary: Get students of particular teacher
 *     tags: [StudentsTeacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentTeacher'
 *     responses:
 *       200:
 *         description: Students get successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTeacher'
 *       500:
 *         description: Some server error
 */
router.post("/getTeacherStudents", studentTeacherController.getTeacherStudents);

/**
 * @swagger
 * /api/studentTeacher/{id}:
 *  put:
 *    summary: Update the record by the id
 *    tags: [StudentsTeacher]
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
 *            $ref: '#/components/schemas/StudentTeacher'
 *    responses:
 *      200:
 *        description: Record was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StudentTeacher'
 *      404:
 *        description: Record was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", studentTeacherController.updateUserMeta);
/**
 * @swagger
 * /api/studentTeacher/{id}:
 *   delete:
 *     summary: Remove the user meta record by id
 *     tags: [StudentsTeacher]
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
router.delete("/:id", studentTeacherController.deleteUserMeta);

module.exports = router;
