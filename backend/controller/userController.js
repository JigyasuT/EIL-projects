const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");
const ApplicationModel = require("../models/application");

exports.signup = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      phoneNumber,
      collegeName,
      engineeringField,
      yearofStudy, // corrected field name
      academicDocument,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      lastName,
      email,
      phoneNumber,
      collegeName,
      engineeringField,
      yearofStudy,
      academicDocument,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Signup Successful", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  console.log("logging ...");
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, name: user.name, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// exports.application = async (req, res) => {
//   try {
//     const {
//       title,
//       firstName,
//       middleName,
//       lastName,
//       fatherName,
//       motherName,
//       dateOfBirth,
//       mobileNumber,
//       emailId,
//       address,
//       nationalId,
//       highestExamPassed,
//       yearOfPassing,
//       schoolUniversityName,
//       institutionType,
//       scholarshipCategory,
//       sportsAchievements=[],
//       documents=[],
//     } = req.body;

//      // ✅ Validate address exists and is an object
//     if (!address || typeof address !== "object") {
//       return res.status(400).json({
//         message: "Address must be an object with fields: line1, city, state, etc.",
//         success: false,
//       });
//     }

//     const existingUser = await ApplicationModel.findOne({
//       "basicInfo.emailId": emailId,
//     });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User already exists, you can login",
//         success: false,
//       });
//     }
//     const application = new ApplicationModel({
//       basicInfo: {
//         title,
//         firstName,
//         middleName,
//         lastName,
//         fatherName,
//         motherName,
//         dateOfBirth,
//         mobileNumber,
//         emailId,
//          address: {
//           line1: address.line1 || "",
//           line2: address.line2 || "",
//           city: address.city || "",
//           state: address.state || "",
//           postalCode: address.postalCode || "",
//         },
//         nationalId,
//       },
//       academicInfo: {
//         highestExamPassed,
//         yearOfPassing,
//         schoolUniversityName,
//         institutionType,
//         scholarshipCategory,
//       },
//       sportsAchievements: sportsAchievements.map((item) => ({
//         engineeringField: item.engineeringField,
//         typeOfSports: item.typeOfSports,
//         sportsCategory: item.sportsCategory,
//         tournamentDate: item.tournamentDate,
//         sportsName: item.sportsName,
//         positionLevel: item.positionLevel,
//         resultMetrics: item.resultMetrics,
//       })),
//       documents: documents.map((doc) => ({
//         documentType: doc.documentType,
//         fileName: doc.fileName,
//         filePath: doc.filePath,
//         fileSize: doc.fileSize,
//         mimeType: doc.mimeType,
//       })),
//     });

//     await application.save();

//     res.status(201).json({
//       message: "Signup Successful",
//       success: true,
//       data: {
//         id: application._id,
//         name: `${application.basicInfo.firstName} ${application.basicInfo.lastName}`,
//         email: application.basicInfo.emailId,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         message: "Validation Error",
//         success: false,
//         errors: Object.values(error.errors).map((err) => err.message),
//       });
//     }
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// const ApplicationModel = require("../models/ApplicationModel"); // Make sure this is correctly required

// exports.application = async (req, res) => {
//   try {
//     console.log("body ", req.body);
//     const {
//       title,
//       firstName,
//       middleName,
//       lastName,
//       fatherName,
//       motherName,
//       dateOfBirth,
//       mobileNumber,
//       emailId,
//       address,
//       nationalId,
//       highestExamPassed,
//       yearOfPassing,
//       schoolUniversityName,
//       institutionType,
//       scholarshipCategory,
//       sportsAchievements = [],
//       documents = [],
//     } = req.body;

//     console.log("req.files >>>", req.files)
//     // ✅ Validate address exists and has required fields
//     if (
//       !address ||
//       typeof address !== "object" ||
//       !address.line1 ||
//       !address.city ||
//       !address.state ||
//       !address.postalCode
//     ) {
//       return res.status(400).json({
//         message:
//           "Invalid address. All required address fields must be provided.",
//         success: false,
//       });
//     }

//     // ✅ Convert uploaded files (req.files) to documents array
//     // const documents = req.files.map((file) => ({
//     //   documentType: file.originalname.split(".")[0], // You can extract better if you use metadata in the future
//     //   fileName: file.originalname,
//     //   filePath: "", // Empty for now; fill if storing to disk
//     //   fileSize: file.size,
//     //   mimeType: file.mimetype,
//     // }));

//     // ✅ Check if application already exists for the given email
//     const existingUser = await ApplicationModel.findOne({
//       "basicInfo.emailId": emailId,
//     });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User already exists. You can log in.",
//         success: false,
//       });
//     }

//     // ✅ Construct and save the application
//     const application = new ApplicationModel({
//       basicInfo: {
//         title: title?.toLowerCase(), // Ensure it matches enum ["mr", "ms", "mrs"]
//         firstName,
//         middleName,
//         lastName,
//         fatherName,
//         motherName,
//         dateOfBirth,
//         mobileNumber,
//         emailId,
//         address: {
//           line1: address.line1,
//           line2: address.line2 || "",
//           city: address.city,
//           state: address.state,
//           postalCode: address.postalCode,
//         },
//         nationalId,
//       },
//       academicInfo: {
//         highestExamPassed,
//         yearOfPassing,
//         schoolUniversityName,
//         institutionType,
//         scholarshipCategory,
//       },
//       sportsAchievements: sportsAchievements.map((item) => ({
//         engineeringField: item.engineeringField,
//         typeOfSports: item.typeOfSports,
//         sportsCategory: item.sportsCategory,
//         tournamentDate: item.tournamentDate,
//         sportsName: item.sportsName,
//         positionLevel: item.positionLevel,
//         resultMetrics: item.resultMetrics,
//       })),
//       // documents  : documents.map((doc) => ({
//       //   documentType: doc.documentType,
//       //   fileName: doc.fileName,
//       //   filePath: doc.filePath, // ⚠️ Must NOT be empty!
//       //   fileSize: doc.fileSize,
//       //   mimeType: doc.mimeType,
//       // })),
//       documents: req.files.map((file) => ({
//         documentType: file.originalname.split(".")[0], // or map from fieldname if needed
//         fileName: file.originalname,
//         filePath: "", // could be updated if using diskStorage
//         fileSize: file.size,
//         mimeType: file.mimetype,
//       })),
//     });

//     await application.save();

//     res.status(201).json({
//       message: "Application submitted successfully.",
//       success: true,
//       data: {
//         id: application._id,
//         name: `${application.basicInfo.firstName} ${application.basicInfo.lastName}`,
//         email: application.basicInfo.emailId,
//       },
//     });
//   } catch (error) {
//     console.error("Submission Error:", error);
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         message: "Validation Error",
//         success: false,
//         errors: Object.values(error.errors).map((err) => err.message),
//       });
//     }
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };


exports.application = async (req, res) => {
  try {
    console.log("body ", req.body);
    console.log("req.files >>>", req.files);

    const {
      title,
      firstName,
      middleName,
      lastName,
      fatherName,
      motherName,
      dateOfBirth,
      mobileNumber,
      emailId,
      nationalId,
      highestExamPassed,
      yearOfPassing,
      schoolUniversityName,
      institutionType,
      scholarshipCategory,
      address,
      sportsAchievements = [],
    } = req.body;

    // ✅ Validate address fields
    if (
      !address ||
      typeof address !== "object" ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      return res.status(400).json({
        message: "Invalid address. All required address fields must be provided.",
        success: false,
      });
    }

    // ✅ Check for duplicate email
    const existingUser = await ApplicationModel.findOne({
      "basicInfo.emailId": emailId,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. You can log in.",
        success: false,
      });
    }

    // ✅ Process documents
    const validDocumentTypes = [
      "photograph",
      "signature",
      "proofOfAge",
      "nationalIdCopy",
      "academicCertificate",
      "sportsCertificate",
    ];

    const documents = req.files.map((file) => {
      // Extract clean documentType from originalname (strip _0, .jpg etc.)
      const rawType = file.originalname.replace(/(_\d+)?(\.\w+)?$/, "");

      const documentType = validDocumentTypes.includes(rawType)
        ? rawType
        : "academicCertificate"; // Fallback to a valid default type

      return {
        documentType,
        fileName: file.originalname,
        filePath: `/uploads/${file.originalname}`, // 🔧 Update if saving to disk
        fileSize: file.size,
        mimeType: file.mimetype,
      };
    });

    // ✅ Create the application object
    const application = new ApplicationModel({
      basicInfo: {
        title: title?.toLowerCase(),
        firstName,
        middleName,
        lastName,
        fatherName,
        motherName,
        dateOfBirth,
        mobileNumber,
        emailId,
        nationalId,
        address: {
          line1: address.line1,
          line2: address.line2 || "",
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
        },
      },
      academicInfo: {
        highestExamPassed,
        yearOfPassing,
        schoolUniversityName,
        institutionType,
        scholarshipCategory,
      },
      sportsAchievements: sportsAchievements.map((item) => ({
        engineeringField: item.engineeringField,
        typeOfSports: item.typeOfSports,
        sportsCategory: item.sportsCategory,
        tournamentDate: item.tournamentDate,
        sportsName: item.sportsName,
        positionLevel: item.positionLevel,
        resultMetrics: item.resultMetrics,
      })),
      documents,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully.",
      success: true,
      data: {
        id: application._id,
        name: `${application.basicInfo.firstName} ${application.basicInfo.lastName}`,
        email: application.basicInfo.emailId,
      },
    });
  } catch (error) {
    console.error("Submission Error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        success: false,
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

