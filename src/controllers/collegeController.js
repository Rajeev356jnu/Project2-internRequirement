const collegeModel = require("../models/collegeModel")
const  internModel = require("../models/internModel")



const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}

// create college ..................................

const createCollege = async function (req, res) {

  try {
    const data = req.body;

    if (!Object.keys(data).length ) { return res.status(400).send({ status: false, msg: "Input is required" }) }

      if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }

      if (!isValid(data.fullName)) { return res.status(400).send({ status: false, msg: "Full Name is required" }) }


      if (!isValid(data.logoLink)) { return res.status(400).send({ status: false, msg: " LogoLink is required" }) }

      let checkCollegeName = await collegeModel.findOne({ name: data.name })
      if (checkCollegeName) { return res.status(400).send({status:false, msg: "Name Already exist" }) }

      // let CollegeFullName = await collegeModel.findOne({ name: data.fullName })
      // if (CollegeFullName) { return res.status(400).send({ msg: "fullName Already exist" }) }

      
        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink)))
      {return res.status(400).send({ status: false, msg: "logoLink is invalid" })}

        const collegeData = await collegeModel.create(data)
      

        return res.status(201).send({ status: true, data: collegeData })

    

  } catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }
}

// get collegeDetails------------------------------------------------------------------------

const collegeDetails = async function (req, res) {

  try {
    const data = req.query.collegeName
    if (!data) { return res.status(404).send({status:false,err:"college name not found"}) }

    const newData = await collegeModel.findOne({ name: data, isDeleted: false })
    
    if (!isValid(newData)) { return res.status(404).send({status:false, ERROR: "data  not present in college Database" }) }



    const interests = await internModel.find({ collegeId: newData._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
    if (interests.length===0) { return res.status(404).send({ status:false, ERROR: "No intern applied " }) }

    const collegeDetails = { name: newData.name, fullName: newData.fullName, logoLink: newData.logoLink, interests}

    return res.status(200).send({status:true, data: collegeDetails })

  } catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }

}


module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails