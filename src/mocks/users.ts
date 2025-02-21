export const mocks = {
  genericUserMock: {
    fullName: "John Doe",
    email: "johndoe@example.com",
    password: "Password123!",
    userType: "STUDENT",
  },
  emptyUserMock: {
    fullName: "",
    email: "",
    password: "",
    userType: "",
  },
  passwordAboveMaxMock: {
    fullName: "John Doe",
    email: "johndoe@example.com",
    password:
      "PasswordIsWayWayTooBigForTheValidationToAcceptThisValue123456789!",
    userType: "STUDENT",
  },
};
