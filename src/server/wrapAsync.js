/* this function wrap async routes and 
 * calls the next middleware to handle the error.
 * This enables us to trats the error outside the controller. 
 */
export default function wrapAsync (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next)
    }
}