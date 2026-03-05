const Contact = require("../models/Contact")

exports.identifyContact = async (req,res)=>{

 const {email, phoneNumber} = req.body

 try{

  // find contacts with same email or phone
  const contacts = await Contact.find({
   $or:[
    {email: email},
    {phoneNumber: phoneNumber}
   ]
  })

  // if no contact exists
  if(contacts.length === 0){

   const newContact = await Contact.create({
    email,
    phoneNumber,
    linkPrecedence:"primary"
   })

   return res.json({
    contact:{
     primaryContactId:newContact._id,
     emails:[newContact.email],
     phoneNumbers:[newContact.phoneNumber],
     secondaryContactIds:[]
    }
   })
  }

  // find primary contact
  let primaryContact = contacts.find(c=>c.linkPrecedence==="primary") || contacts[0]

  // create secondary contact
  const secondary = await Contact.create({
   email,
   phoneNumber,
   linkedId:primaryContact._id,
   linkPrecedence:"secondary"
  })

  // collect emails
  const emails = [...new Set(contacts.map(c=>c.email).concat(email))]

  // collect phone numbers
  const phones = [...new Set(contacts.map(c=>c.phoneNumber).concat(phoneNumber))]

  // collect secondary ids
  const secondaryIds = contacts
   .filter(c=>c.linkPrecedence==="secondary")
   .map(c=>c._id)

  secondaryIds.push(secondary._id)

  return res.json({
   contact:{
    primaryContactId:primaryContact._id,
    emails,
    phoneNumbers:phones,
    secondaryContactIds:secondaryIds
   }
  })

 }catch(err){
  res.status(500).json({error:err.message})
 }

}