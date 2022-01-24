const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/admin");
const adminController = require("../controllers/admin");
const verifyTokenController = require("../middlewares/token");
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - admin_first_name
 *         - admin_last_name
 *         - admin_email
 *         - admin_password
 *         - admin_address
 *         - admin_phone_no
 *       properties:
 *          id:
 *           type: string
 *           description: The auto-generated id of the admin
 *          admin_first_name:
 *           type: string
 *           description: Admin first name
 *          admin_last_name:
 *           type: string
 *           description: Admin last name
 *          admin_email:
 *           type: string
 *           description: Admin email
 *          admin_password:
 *           type: string
 *           description: Admin password
 *          admin_address:
 *           type: string
 *           description: Admin address
 *          admin_phone_no:
 *           type: string
 *           description: Admin phone number
 *       example:
 *         admin_first_name: Mike
 *         admin_last_name:  Hussey
 *         admin_email: mike.hussey@gmail.com
 *         admin_password: 1234567ABC!
 *         admin_address: ST 8, Wall Street NYC
 *         admin_phone_no: +108 216672176
 */

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admins managing API
 */

// Routes
/**
 * @swagger
 * /api/admin/:
 *   get:
 *     summary: Returns the list of all the admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: The list of the admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */

router.get(
  "/",
  verifyTokenController.verifyToken,
  adminController.getAllAdmins
);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Get admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The admi id
 *     responses:
 *       200:
 *         description: The admin description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The admin was not found
 */
router.get(
  "/:id",
  verifyTokenController.verifyToken,
  adminController.getAdminById
);

/**
 * @swagger
 * /api/admin/:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The admin was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 */
router.post(
  "/",
  verifyTokenController.verifyToken,
  adminMiddleware.validateAdmin,
  adminController.addAdmin
);

/**
 * @swagger
 * /api/admin/{id}:
 *  patch:
 *    summary: Update the admin by the id
 *    tags: [Admins]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The admin id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Admin'
 *    responses:
 *      200:
 *        description: The admin was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      404:
 *        description: The admin was not found
 *      500:
 *        description: Some error happened
 */
router.patch(
  "/:id",
  verifyTokenController.verifyToken,
  adminMiddleware.validateAdminUpdation,
  adminController.updateAdmin
);
/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Remove the admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The admin id
 *
 *     responses:
 *       200:
 *         description: The admin was deleted
 *       404:
 *         description: The admin was not found
 */
router.delete(
  "/:id",
  verifyTokenController.verifyToken,
  adminController.deleteAdmin
);

module.exports = router;
