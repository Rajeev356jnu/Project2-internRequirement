const collegeModel = require("../models/collegeModel")
const  internModel = require("../models/internModel")



const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}

// create college controller..................................

const createCollege = async function (req, res) {

  try {
    const data = req.body;

    if (Object.keys(data).length = 0) { return res.status(400).send({ status: false, msg: "Input is required" }) }

      if (!data.name) { return res.status(400).send({ status: false, msg: "Name is required" }) }

      if (!data.fullName) { return res.status(400).send({ status: false, msg: "Full Name is required" }) }


      if (!data.logoLink) { return res.status(400).send({ status: false, msg: " LogoLink is required" }) }

      let checkCollegeName = await collegeModel.findOne({ name: data.name })
      if (checkCollegeName) { return res.status(400).send({ msg: "Name Already exist" }) }

      let CollegeFullName = await collegeModel.findOne({ name: data.fullName })
      if (CollegeFullName) { return res.status(400).send({ msg: "Name Already exist" }) }

      
        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink)))
      {return res.status(400).send({ status: false, msg: "logoLink is invalid" })}

        const savedData = await collegeModel.create(data)
      

        return res.status(201).send({ status: "college Created", data: savedData })

    

  } catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }
}



module.exports.createCollege = createCollege