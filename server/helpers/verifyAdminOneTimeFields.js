import User from "../models/User.model";

/**
 * @param {object} { pancardNo, bankAccountNo, ifsc }
 * @param {id} mongodb_id
 */
const verifyAdminOneTimeFields = async ({ pancardNo, bankAccountNo, ifsc }, id) => {
  try {
    if(!id) throw new Error('Something went wrong');
    
    if(pancardNo && await User.exists({ 'info.pancardNo': pancardNo }).where('_id').ne(id)) {
      throw new Error('Pancard already in use')
    }
    if(bankAccountNo && await User.exists({ 'info.bankAccountNo': bankAccountNo }).where('_id').ne(id)) {
      throw new Error('Bank account already in use')
    }

    ifsc && await $fetch(`https://ifsc.razorpay.com/${ifsc}`).catch(() => {
      throw new Error('Invalid IFSC')
    })

  } catch (err) {
    throw err
  }
}

export default verifyAdminOneTimeFields
