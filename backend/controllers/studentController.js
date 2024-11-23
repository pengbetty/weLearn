const Student = require("../models/Student");
const { body, validationResult } = require("express-validator");
const School = require("../models/School");
const Contract = require("../models/Contract");

exports.listStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: [
        "StuID",
        "Stu1stName",
        "StuLastName",
        "StuEmail",
        "StuPhone",
        "StuDOB",
        "AppLevel",
        "StuCity",
        "StuState",
      ],
    });

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.createStudent = [
  body("Stu1stName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 10 })
    .withMessage("First name must not exceed 10 characters"),
  body("StuLastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 10 })
    .withMessage("Last name must not exceed 10 characters"),
  body("StuEmail")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const student = await Student.findOne({ where: { StuEmail: value } });
      if (student) {
        throw new Error("Email already exists");
      }
    }),
  body("StuPhone")
    .optional()
    .isString()
    .isLength({ max: 15 })
    .withMessage("Phone number must not exceed 15 characters")
    .custom(async (value) => {
      if (value) {
        const student = await Student.findOne({ where: { StuPhone: value } });
        if (student) {
          throw new Error("Phone number already exists");
        }
      }
    }),
  body("StuCurrentSchID")
    .optional()
    .custom(async (value) => {
      if (value) {
        const school = await School.findByPk(value);
        if (!school) {
          throw new Error("Current school ID does not exist");
        }
      }
    }),
  body("StuGradSchID")
    .optional()
    .custom(async (value) => {
      if (value) {
        const school = await School.findByPk(value);
        if (!school) {
          throw new Error("Graduate school ID does not exist");
        }
      }
    }),
  body("StuCategory")
    .optional()
    .isIn(["A", "B", "C", "NA"])
    .withMessage("Invalid student category"),
  body("StuDOB").optional().isDate().withMessage("Invalid date format"),
  body("AppLevel")
    .optional()
    .isIn(["UG", "G", "PG", "PhD", "HS", "S", "AS", "C", "O"])
    .withMessage("Invalid application level"),
  body("AppCountry")
    .optional()
    .isIn(["US", "GB", "CA", "AU"])
    .withMessage("Invalid country"),
  body("ContractID")
    .notEmpty()
    .withMessage("Contract ID is required")
    .isInt()
    .withMessage("Contract ID must be an integer")
    .custom(async (value) => {
      const contract = await Contract.findByPk(value);
      if (!contract) {
        throw new Error("Contract ID does not exist");
      }
    }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      Stu1stName,
      StuLastName,
      StuEmail,
      StuPhone,
      StuCurrentSchID,
      StuGradSchID,
      StuDOB,
      StuCategory = "NA",
      StuPrefName,
      StuMidName,
      StuGender,
      StuComments,
      AppLevel,
      AppCountry,
      StuGPA,
      StuStreet,
      StuCity,
      StuState,
      StuPostcode,
      ContractID,
    } = req.body;

    try {
      const student = await Student.create({
        Stu1stName,
        StuLastName,
        StuEmail,
        StuPhone: StuPhone || null,
        StuCurrentSchID: StuCurrentSchID || null,
        StuGradSchID: StuGradSchID || null,
        StuDOB: StuDOB || null,
        StuCategory,
        StuPrefName: StuPrefName || null,
        StuMidName: StuMidName || null,
        StuGender: StuGender || null,
        StuComments: StuComments || null,
        AppLevel: AppLevel || null,
        AppCountry: AppCountry || null,
        StuGPA: StuGPA || null,
        StuStreet: StuStreet || null,
        StuCity: StuCity || null,
        StuState: StuState || null,
        StuPostcode: StuPostcode || null,
        ContractID,
      });

      res.status(201).json({
        message: "Student created successfully",
        studentId: student.StuID,
      });
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
  },
];
