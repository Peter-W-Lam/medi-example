# Medi
![](./client/src/assets/medi-1.jpg)

## Description of Project
Medi is a membership loyalty platform for healthcare professionals, offering discounts and offers to doctors and nurses. The platform aims to work similarly to how Unidays currently does for college students. Registering with the platform is a two-step process, wherein a user first registers with their personal email and password combination for logging in and out of the platform, and then provides their healthcare network email for verifying that they are a healthcare professional.
## Languages Used
This project uses React.js for the front-end, and Node.js, Express, and MongoDB via Mongoose for the back-end. The project itself was bootstrapped using `create-react-app`, and then refactored to create a full-stack application. 
## Testing Instructions
1. Sign up for the platform with any email address. 
2. Once an account has been created, “verify” your status as a healthcare professional. As this is a demo, you can verify your status by selecting “Gmail” as your healthcare system, and then entering any address ending in @gmail.com. This will send a verification email to this address; once confirmed, you will have full access to the platform. 
		* Note: You will receive two verification emails, one from Auth0, and one from a demo email address `reactverifyemail22@gmail.com`. To verify your account on the platform, you will need to click on the link from the latter email. 