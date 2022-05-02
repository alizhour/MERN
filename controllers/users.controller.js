const Users = require('../models/users.models')
const ValidateUser = require('../validation/Users.validation')
const validatePhoneNumber = require('../validation/phone.validation')
const request = require('request');





const AddUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        }
        else {
            await Users.findOne({ customerMobileNumber: req.body.customerMobileNumber })
                .then(async (exist) => {
                    if (exist) {
                        errors.customerMobileNumber = "Customer Exist"
                        res.status(404).json(errors)
                    }
                    else {

                        request(`http://apilayer.net/api/validate?access_key=0c7da92b584f1d8788f80efef3203b3e&number=${req.body.customerMobileNumber}`, function (error, response, body) {

                            const json = JSON.parse(body)
                            const valid = json["valid"]


                            const countryCode = json["country_code"];
                            const countryName = json["country_name"];
                            const operatorName = json["carrier"];
                            const customerName = req.body.customerName;
                            const customerAdress = req.body.customerAdress;
                            const customerMobileNumber = req.body.customerMobileNumber;

                            if (valid) {

                                // res.json({countryCode, countryName, operatorName, customerName, customerAdress, customerMobileNumber});
                                const newUser = new Users({
                                    countryCode,
                                    countryName,
                                    operatorName,
                                    customerName,
                                    customerAdress,
                                    customerMobileNumber,
                                });
                                newUser.save()

                                    .then(() => res.status(201).json(
                                        { message: "Customer added with success" }))
                                    .catch(err => res.status(400).json('Error: ' + err));
                            }
                            else {
                                errors.customerMobileNumber = "Phone Number Not Valid!"
                                res.status(404).json(errors)
                            }

                        });
                    }
                })
        }
    } catch (error) {
        console.log(error, message)
    }
}

const FindAllUsers = async (req, res) => {
    try {
        const data = await Users.find()
        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)
    }
}

const FindSingleUser = async (req, res) => {
    try {
        const data = await Users.findOne({ _id: req.params.id })
        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)
    }
}

const UpdateUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        }
        else {

            request(`http://apilayer.net/api/validate?access_key=0c7da92b584f1d8788f80efef3203b3e&number=${req.body.customerMobileNumber}`, function (error, response, body) {

                const json = JSON.parse(body)
                const valid = json["valid"]


                const countryCode = json["country_code"];
                const countryName = json["country_name"];
                const operatorName = json["carrier"];
                const customerName = req.body.customerName;
                const customerAdress = req.body.customerAdress;
                const customerMobileNumber = req.body.customerMobileNumber;


                if (valid) {
                    Users.findById(req.params.id)
                        .then(Users => {
                            Users.countryCode = json["country_code"];
                            Users.countryName = json["country_name"];
                            Users.operatorName = json["carrier"];
                            Users.customerName = req.body.customerName;
                            Users.customerAdress = req.body.customerAdress;
                            Users.customerMobileNumber = req.body.customerMobileNumber;

                            Users.save()
                            .then( () => res.status(201).json(Users))
                            .catch(err => res.status(400).json('Error: ' + err));
                        })
             

    


                }
                else {
                    errors.customerMobileNumber = "Phone Number Not Valid!"
                    res.status(404).json(errors)
                }



            });


        }

    }
    catch (error) {
        console.log(error, message)
    }
}



const DeleteUser = async (req, res) => {
    try {
        await Users.deleteOne({ _id: req.params.id })
        res.status(201).json({ message: "Customer deleted with success" })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    AddUser,
    FindAllUsers,
    FindSingleUser,
    UpdateUser,
    DeleteUser
}