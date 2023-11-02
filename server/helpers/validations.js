const { ObjectId } = require("mongodb");
const moment = require("moment");


const validString = function error_handling_for_string( userInput,  inputParameter) {
  /**
   * @param {userInput} string - The input given by the user to be validated as a string
   * @param {inputParameter} string - The name of the input variable
   * @throws {MissingInput} `Please provide ${inputParameter}`
   */
  if (!userInput)
    throw `Please provide ${inputParameter}!`;
  if (typeof userInput !== "string" || typeof userInput === "undefined")
    throw `${inputParameter} must be a string!`;
  if (userInput.trim().length === 0)
    throw (
      inputParameter + " cannot be an empty string or string with just spaces!"
    );
};

const validObjectId = function error_handling_for_id(inputId, inputParameter) {
  /**
   * @param {inputId} string - The input given by the user to be validated as a objectid
   * @param {inputParameter} string - The name of the input variable
   * @throws {MissingInput} `Please provide ${inputParameter}`
   * @throws {InvalidObjectID} `Invalid object " + inputParameter`
   */
  if (!inputId) throw "You must provide an " + inputParameter;
  if (typeof inputId !== "string" || typeof inputId === "undefined")
    throw inputParameter + " must be a string!";
  if (inputId.trim().length === 0)
    throw inputParameter + " cannot be an empty string or just spaces!";

  if (!ObjectId.isValid(inputId.trim()))
    throw `Invalid object ${inputParameter}!`;
};
const validName = function error_handling_for_name(inputName, inputParameter) {
  /**
   * @param {inputName} string - The input given by the user to be validated as a valid name
   * @param {inputParameter} string - The name of the input variable
   * @throws {Format1} `inputParameter + " must be at least 3 character long and should not contain special characters or numbers"`
   * @throws {Format2} `inputParameter + " should be in valid format`
   */
  if (!inputName) throw `Please provide ${inputParameter}!`;
  if (typeof inputName !== "string" || typeof inputName === "undefined")
    throw inputParameter + " must be a string!";
  if (inputName.trim().length === 0)
    throw (
      inputParameter + " cannot be an empty string or string with just spaces!"
    );
  const name = inputName.trim().split(" ");
  if (name.length > 1) {
    throw inputParameter + " should be in valid format!";
  } else {
    let format = /[`0123456789!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
    if (inputName.length < 3 || format.test(inputName)) {
      throw (
        inputParameter +
        " must be at least 3 characters long and should not contain special characters or numbers!"
      );
    }
  }
};
const validStatus = function error_handling_for_status(
  inputStatus,
  inputParameter
) {
  /**
   * @param {inputStatus} string - The input given by the user to be validated as a valid status
   * @param {inputParameter} string - The name of the input variable
   * @throws {statusFormat} `"Please enter valid " + inputParameter + " type"`
   */
  if (!inputStatus) throw `Please provide ${inputParameter}!`;
  if (typeof inputStatus !== "string" || typeof inputStatus === "undefined")
    throw inputParameter + " must be a string!";
  if (inputStatus.trim().length === 0)
    throw (
      inputParameter + " cannot be an empty string or string with just spaces!"
    );
  let statusFormat = ["Accepted", "Rejected", "Pending"];
  if (!statusFormat.includes(inputStatus.trim()))
    throw "Please enter valid " + inputParameter + " type!";
};
const validLogin = function error_handling_for_login(
  inputUsername,
  inputPassword
) {
  /**
   * @param {inputUsername} string - The input given by the user to be validated as a valid username
   * @param {inputPassword} string - The input given by the user to be validated as a valid password
   * @throws {MissingInput} `You must provide username and password`
   * @throws {noSpecialChar} `Please enter valid username .i.e without special characters or spaces`
   * @throws {passwordLength} `Password should be at least 6 characters long.`
   * @throws {passwordSpaces} `Password cannot contain spaces`
   * @throws {passwordFormat} `Password should contain at least one uppercase character, at least one number and at least one special character`
   */
  let format = /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let spaces = /(.*\s{1,}.*)|(^\s+.*)|(.*\s+$)/g;
  let password_format = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g;
  inputUsername = inputUsername.trim();
  if (!inputUsername || !inputPassword)
    throw "You must provide username and password!";
  if (typeof inputUsername !== "string" || typeof inputUsername === "undefined")
    throw "Username must be a string!";
  if (typeof inputPassword !== "string" || typeof inputPassword === "undefined")
    throw "Password must be a string!";
  if (inputUsername.length < 4)
    throw "Username should be at least 4 characters long!";
  // if(spaces.test(inputUsername)) throw 'Username cannot contain spaces';
  if (format.test(inputUsername))
    throw "Please enter valid username .i.e without special characters or spaces!";
  if (inputPassword.length < 6)
    throw "Password should be at least 6 characters long!";
  if (spaces.test(inputPassword)) throw "Password cannot contain spaces!";
  if (!password_format.test(inputPassword))
    throw "Password should contain at least one uppercase character, at least one number and at least one special character!";
};
const validEmail = function error_handling_for_email(inputEmail) {
  /**
   * @param {inputEmail} string - The input given by the user to be validated as a valid email address
   * @throws {emailFormat} `"Please enter valid Email Address" `
   */
  let emailFormat =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
  inputEmail = inputEmail.trim();
  if (!inputEmail) throw "You must provide Email Address!";
  if (typeof inputEmail !== "string" || typeof inputEmail === "undefined")
    throw "Email Address must be a string!";
  if (!emailFormat.test(inputEmail))
    throw "Please enter a valid Email Address!";
};


const validPassword = (password) => {
  // INSTRUCTIONS:
  /**For the password, it must be a valid string (no empty spaces and no spaces but can be any other character
   * including special characters) and should be at least 6 characters long. If it fails any of those conditions,
   * you will throw an error.  The constraints for password will be: There needs to be at least one uppercase
   * character, there has to be at least one number and there has to be at least one special character:
   * for example:  Not valid: test123, test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*% */
  if (!password || typeof password != "string" || password.trim().length === 0)
    throw `Missing Password`;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/;
  if (!passwordRegex.test(password)) throw `Invalid Password: The password must contain at least 1 uppercase character, 1 lowercase character, 1 number, 1 special character and be atleast 8 characters long`;
  return true;
};

const validAge = function error_handling_for_age(age) {
  /**
   * @param {age} number - The input given by the user to be validated as a valid age
   * @throws {validFormat} `"Please enter valid age" `
   */
  age = parseInt(age);
  if (age < 13) throw "Minimum age should be 13!";
};


module.exports = {
  validObjectId: validObjectId,
  validName: validName,
  validStatus: validStatus,
  validString: validString,
  validLogin: validLogin,
  validEmail: validEmail,
  validPassword,
  validAge,
};
