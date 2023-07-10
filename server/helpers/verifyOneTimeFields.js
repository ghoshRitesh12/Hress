import User from "../models/User.model";

/**
 * @param {object} { pancardNo, bankAccountNo, ifsc }
 */
const verifyOneTimeFields = async ({ pancardNo, bankAccountNo, ifsc }) => {
  try {
    
    if(pancardNo && await User.exists({ 'info.pancardNo': pancardNo })) {
      throw new Error('Pancard already in use')
    }
    if(bankAccountNo && await User.exists({ 'info.bankAccountNo': bankAccountNo })) {
      throw new Error('Bank account already in use')
    }

    ifsc && await $fetch(`https://ifsc.razorpay.com/${ifsc}`).catch(() => {
      throw new Error('Invalid IFSC')
    })

  } catch (err) {
    throw err
  }
}

export default verifyOneTimeFields
