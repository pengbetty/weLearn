const Student = require("../models/Student");
const { body, validationResult } = require("express-validator");
const School = require("../models/School");
const Contract = require("../models/Contract");

exports.listStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: [
        "stuID",
        "stu1stName",
        "stuMidName",
        "stuLastName",
        "stuEmail",
        "stuPhone",
        "stuDOB",
        "appLevel",
        "stuCity",
        "stuState",
      ],
    });

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.createStudent = [
  body("stu1stName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 10 })
    .withMessage("First name must not exceed 10 characters"),

  body("stuLastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 10 })
    .withMessage("Last name must not exceed 10 characters"),

  body("stuEmail")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const student = await Student.findOne({ where: { stuEmail: value } });
      if (student) {
        throw new Error("Email already exists");
      }
    }),
  body("stuPhone")
    .optional()
    .isString()
    .isLength({ max: 15 })
    .withMessage("Phone number must not exceed 15 characters")
    .custom(async (value) => {
      if (value) {
        const student = await Student.findOne({ where: { stuPhone: value } });
        if (student) {
          throw new Error("Phone number already exists");
        }
      }
    }),

  body("stuCurrentSchID")
    .optional()
    .custom(async (value) => {
      if (value) {
        const school = await School.findByPk(value);
        if (!school) {
          throw new Error("Current school ID does not exist");
        }
      }
    }),
  body("stuGradSchID")
    .optional()
    .custom(async (value) => {
      if (value) {
        const school = await School.findByPk(value);
        if (!school) {
          throw new Error("Graduate school ID does not exist");
        }
      }
    }),
  body("stuCategory")
    .optional()
    .isIn(["A", "B", "C", "NA"])
    .withMessage("Invalid student category"),
  body("stuDOB").optional().isDate().withMessage("Invalid date format"),
  body("appLevel")
    .optional()
    .isIn(["UG", "G", "PG", "PhD", "HS", "S", "AS", "C", "O"])
    .withMessage("Invalid application level"),
  body("appCountry")
    .optional()
    .isIn(["US", "GB", "CA", "AU"])
    .withMessage("Invalid country"),
  body("contractID")
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
      stu1stName,
      stuMidName,
      stuLastName,
      stuEmail,
      stuPhone,
      stuCurrentSchID,
      stuGradSchID,
      stuDOB,
      stuCategory = "NA",
      stuPrefName,
      stuGender,
      stuComments,
      appLevel,
      appCountry,
      stuGPA,
      stuStreet,
      stuCity,
      stuState,
      stuPostcode,
      contractID,
    } = req.body;

    try {
      const student = await Student.create({
        stu1stName,
        stuLastName,
        stuEmail,
        stuPhone: stuPhone || null,
        stuCurrentSchID: stuCurrentSchID || null,
        stuGradSchID: stuGradSchID || null,
        stuDOB: stuDOB || null,
        stuCategory,
        stuPrefName: stuPrefName || null,
        stuMidName: stuMidName || null,
        stuGender: stuGender || null,
        stuComments: stuComments || null,
        appLevel: appLevel || null,
        appCountry: appCountry || null,
        stuGPA: stuGPA || null,
        stuStreet: stuStreet || null,
        stuCity: stuCity || null,
        stuState: stuState || null,
        stuPostcode: stuPostcode || null,
        contractID,
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
