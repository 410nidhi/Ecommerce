const StripeSecretKey = "sk_test_51LJZf6SItqCH2fCQb3CX1JjJdHh3ohkimsJo78cfyUFkeIPnLYM0uQuEaIYeVTC9z0cqa9RQM7fXh4vN2cagqcwA00GieTmnVw"
const StripeApiKey = "pk_test_51LJZf6SItqCH2fCQ7oED5vYjbLeVLeqwALeowp6xS9vAvk8XpVWxHmb7V0oJrfqnQCtuHE6O3noh4jVkrhGaITAr00leHsuWIt"

const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const stripe = require("stripe")(StripeSecretKey)

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata:{
            company: "Ecommerce"
        }
    })

    res.status(200).json({success: true, client_secret: myPayment.client_secret})
})

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
        res.status(200).json({stripeApiKey : StripeApiKey})
})