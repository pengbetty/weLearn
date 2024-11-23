const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
const ProgramController = require("../controllers/programController");
const CollegeController = require("../controllers/collegeController");
const StudentController = require("../controllers/studentController");
const SchoolController = require("../controllers/schoolController");
const ContractController = require("../controllers/contractController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post(
  "/programs",
  verifyToken(["agent", "admin"]),
  ProgramController.createProgram
);
router.get("/programs", ProgramController.getPrograms);
router.get("/colleges", CollegeController.getColleges);

router.get(
  "/students",
  verifyToken(["agent", "admin"]),
  StudentController.listStudents
);
router.post(
  "/students",
  verifyToken(["agent", "admin"]),
  StudentController.createStudent
);

router.get(
  "/schools",
  verifyToken(["agent", "admin"]),
  SchoolController.listSchools
);

router.post(
  "/contracts",
  verifyToken(["admin", "agent"]),
  ContractController.createContract
);
router.get(
  "/contracts",
  verifyToken(["agent", "admin"]),
  ContractController.listContracts
);
router.get(
  "/users",
  verifyToken(["agent", "admin"]),
  authController.listStudents
);
router.put(
  "/contracts/:id",
  verifyToken(["agent", "admin"]),
  ContractController.updateContract
);
router.get(
  "/contracts/:id",
  verifyToken(["agent", "admin"]),
  ContractController.getContractById
);
router.delete(
  "/contracts/:id",
  verifyToken(["agent", "admin"]),
  ContractController.deleteContract
);
module.exports = router;
