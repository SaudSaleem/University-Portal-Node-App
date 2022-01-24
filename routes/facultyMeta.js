const express = require("express");
const router = express.Router();
const facultyMetaController = require("../controllers/facultyMeta");

/**
 * @swagger
 * components:
 *   schemas:
 *     FacultyMeta:
 *       type: object
 *       required:
 *         - faculty_id
 *         - user_id
 *       properties:
 *          id:
 *           type: string
 *           description: The auto-generated id
 *          faculty_id:
 *           type: string
 *           description: Id of faculty which refer to the Faculties table
 *          user_id:
 *           type: string
 *           description: Id of user which refer to the Users table
 *       example:
 *         faculty_id: 12 
 *         user_id: 3
 */

/**
 * @swagger
 * tags:
 *   name: FacultiesMeta
 *   description: Faculties meta managing API
 */

// Routes
/**
 * @swagger
 * /api/facultyMeta/:
 *   get:
 *     summary: Returns the list
 *     tags: [FacultiesMeta]
 *     responses:
 *       200:
 *         description: List of all records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacultyMeta'
 */

router.get("/", facultyMetaController.getAllFacultiesMeta);

/**
 * @swagger
 * /api/facultyMeta/:
 *   post:
 *     summary: Create a new meta record
 *     tags: [FacultiesMeta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacultyMeta'
 *     responses:
 *       200:
 *         description: Record successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacultyMeta'
 *       500:
 *         description: Some server error
 */
router.post("/", facultyMetaController.addFacultyMeta);

/**
 * @swagger
 * /api/facultyMeta/{id}:
 *  put:
 *    summary: Update the record by the id
 *    tags: [FacultiesMeta]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The faculty meta id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FacultyMeta'
 *    responses:
 *      200:
 *        description: Record was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FacultyMeta'
 *      404:
 *        description: Record was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", facultyMetaController.updateFacultyMeta);
/**
 * @swagger
 * /api/facultyMeta/{id}:
 *   delete:
 *     summary: Remove the faculty meta record by id
 *     tags: [FacultiesMeta]
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
router.delete("/:id", facultyMetaController.deleteFacultyMeta);

module.exports = router;
