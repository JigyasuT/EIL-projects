// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema({
//   // Step 1: Basic Information
//   basicInfo: {
//     title: { type: String, enum: ["Mr", "Ms", "Mrs"] },
//     firstName: { type: String, required: true, trim: true },
//     middleName: { type: String, trim: true },
//     lastName: { type: String, required: true, trim: true },
//     fatherName: { type: String, required: true, trim: true },
//     motherName: { type: String, required: true, trim: true },
//     dateOfBirth: { type: Date, required: true },
//     mobileNumber: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function (v) {
//           return /^[0-9]{10,15}$/.test(v);
//         },
//         message: (props) => `${props.value} is not a valid phone number!`,
//       },
//     },
//     emailId: {
//       type: String,
//       required: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please fill a valid email address",
//       ],
//     },
//     address: {
//       line1: { type: String, required: true },
//       line2: { type: String },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       postalCode: { type: String, required: true },
//     },
//     nationalId: { type: String, required: true },
//   },

//   // Step 2: Academic Information
//   academicInfo: {
//     highestExamPassed: {
//       type: String,
//       required: true,
//       enum: [
//         "Class X",
//         "Class XII",
//         "Diploma",
//         "Bachelor's Degree",
//         "Master's Degree",
//         "PhD",
//       ],
//     },
//     yearOfPassing: {
//       type: Number,
//       required: true,
//       min: 1950,
//       max: new Date().getFullYear(),
//     },
//     schoolUniversityName: { type: String, required: true },
//     institutionType: {
//       type: String,
//       required: true,
//       enum: ["iit", "nit", "iiit", "government", "private", "deemed", "other"],
//     },
//     scholarshipCategory: { type: String },
//   },

//   // Step 3: Sports Achievements (Max 2)
//   sportsAchievements: [
//     {
//       engineeringField: {
//         type: String,
//         required: true,
//         enum: [
//           "Chemical Engineering",
//           "Civil Engineering",
//           "Computer Science Engineering",
//           "Electrical Engineering",
//           "Electronics Engineering",
//           "Information Technology",
//           "Mechanical Engineering",
//           "Process Engineering",
//           "Environmental Engineering",
//           "Instrumentation Engineering",
//           "Petroleum Engineering",
//           "Other",
//         ],
//       },
//       typeOfSports: {
//         type: String,
//         required: true,
//         enum: ["Kabadi", "Badminton", "Cricket", "Chess", "Football"],
//       },
//       sportsCategory: {
//         type: String,
//         required: true,
//         enum: ["institutional", "statelevel", "national", "international"],
//       },
//       tournamentDate: { type: Date, required: true },
//       sportsName: { type: String, required: true },
//       positionLevel: {
//         type: String,
//         required: true,
//         enum: ["First", "Second", "Third", "Participation"],
//       },
//       resultMetrics: { type: String, required: true },
      
//     },
//   ],

//   // Step 4: Documents
//   documents: [
//     {
//       documentType: {
//         type: String,
//         required: true,
//         enum: [
//           "photograph",
//           "signature",
//           "proofOfAge",
//           "nationalIdCopy",
//           "academicCertificate",
//           "sportsCertificate",
//         ],
//       },
//       fileName: { type: String, required: true },
//       filePath: { type: String, required: true },
//       fileSize: { type: Number, required: true }, // in bytes
//       mimeType: { type: String, required: true },
//       uploadedAt: { type: Date, default: Date.now },
//     },
//   ],

// });


// const ApplicationModel = mongoose.model("application-data", applicationSchema);
// module.exports = ApplicationModel;


const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  basicInfo: {
    title: {
      type: String,
      enum: ["mr", "ms", "mrs"],
      lowercase: true,
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    fatherName: { type: String, required: true, trim: true },
    motherName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: v => /^[0-9]{10,15}$/.test(v),
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    emailId: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    nationalId: { type: String, required: true },
  },

  academicInfo: {
    highestExamPassed: {
      type: String,
      required: true,
      enum: [
        "Class X",
        "Class XII",
        "Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
      ],
    },
    yearOfPassing: {
      type: Number,
      required: true,
      min: 1950,
      validate: {
        validator: v => v <= new Date().getFullYear(),
        message: props => `${props.value} exceeds the current year.`,
      },
    },
    schoolUniversityName: { type: String, required: true },
    institutionType: {
      type: String,
      required: true,
      enum: ["iit", "nit", "iiit", "government", "private", "deemed", "other"],
    },
    scholarshipCategory: { type: String },
  },

  sportsAchievements: [
    {
      engineeringField: {
        type: String,
        required: true,
        enum: [
          "Chemical Engineering",
          "Civil Engineering",
          "Computer Science Engineering",
          "Electrical Engineering",
          "Electronics Engineering",
          "Information Technology",
          "Mechanical Engineering",
          "Process Engineering",
          "Environmental Engineering",
          "Instrumentation Engineering",
          "Petroleum Engineering",
          "Other",
        ],
      },
      typeOfSports: {
        type: String,
        required: true,
        enum: ["Kabadi", "Badminton", "Cricket", "Chess", "Football"],
      },
      sportsCategory: {
        type: String,
        required: true,
        enum: ["institutional", "statelevel", "national", "international"],
      },
      tournamentDate: { type: Date, required: true },
      sportsName: { type: String, required: true },
      positionLevel: {
        type: String,
        required: true,
        enum: ["First", "Second", "Third", "Participation"],
      },
      resultMetrics: { type: String, required: true },
    },
  ],

  documents: [
    {
      documentType: {
        type: String,
        required: true,
        enum: [
          "photograph",
          "signature",
          "proofOfAge",
          "nationalIdCopy",
          "academicCertificate",
          "sportsCertificate",
        ],
      },
      fileName: { type: String, required: true },
      filePath: { type: String, required: true },
      fileSize: { type: Number, required: true },
      mimeType: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

const ApplicationModel = mongoose.model("application-data", applicationSchema);
module.exports = ApplicationModel;
