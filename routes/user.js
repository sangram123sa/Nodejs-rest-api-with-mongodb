const express = require('express');

const router = express.Router()
// geting all function from crontroller
const {handleFindAllUser, handleFindUserByID, handleAddUser, handleUpdateUserByID, handleDeleteUserByID} = require("../controllers/user")
// add user
router.post("/", handleAddUser)

// Get all data
router.get("/", handleFindAllUser)

// Get, update and delete data basis on it's id
router.route("/:id")
.get(handleFindUserByID)
.patch(handleUpdateUserByID)
.delete(handleDeleteUserByID)

module.exports = router